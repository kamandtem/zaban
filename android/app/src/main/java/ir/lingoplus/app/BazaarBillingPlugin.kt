package ir.lingoplus.app

import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import ir.cafebazaar.poolakey.Connection
import ir.cafebazaar.poolakey.Payment
import ir.cafebazaar.poolakey.config.PaymentConfiguration
import ir.cafebazaar.poolakey.config.SecurityCheck
import ir.cafebazaar.poolakey.request.PurchaseRequest

@CapacitorPlugin(name = "BazaarBilling")
class BazaarBillingPlugin : Plugin() {
    private var payment: Payment? = null
    private var billingConnection: Connection? = null

    @PluginMethod
    fun initialize(call: PluginCall) {
        val rsaPublicKey = call.getString("rsaPublicKey")?.trim()
        if (rsaPublicKey.isNullOrEmpty()) {
            call.reject("کلید عمومی پرداخت بازار تنظیم نشده است.", "INVALID_RSA_KEY")
            return
        }

        val currentPayment = payment ?: Payment(
            context = context,
            config = PaymentConfiguration(
                localSecurityCheck = SecurityCheck.Enable(rsaPublicKey = rsaPublicKey)
            )
        ).also { payment = it }

        billingConnection?.disconnect()
        billingConnection = currentPayment.connect {
            connectionSucceed {
                call.resolve(JSObject().put("connected", true))
            }
            connectionFailed { error ->
                call.reject(error.message ?: "اتصال به بازار برقرار نشد.", "BAZAAR_CONNECTION_FAILED")
            }
            disconnected {
                notifyListeners("billingDisconnected", JSObject())
            }
        }
    }

    @PluginMethod
    fun getPurchasedProducts(call: PluginCall) {
        val currentPayment = payment
        if (currentPayment == null) {
            call.reject("ابتدا اتصال به بازار را برقرار کن.", "BAZAAR_NOT_CONNECTED")
            return
        }

        currentPayment.getPurchasedProducts {
            querySucceed { purchases ->
                val productIds = JSArray()
                purchases.forEach { purchase -> productIds.put(purchase.productId) }
                call.resolve(JSObject().put("productIds", productIds))
            }
            queryFailed { error ->
                call.reject(error.message ?: "بازیابی خریدهای بازار انجام نشد.", "PURCHASE_QUERY_FAILED")
            }
        }
    }

    @PluginMethod
    fun purchaseProduct(call: PluginCall) {
        val currentPayment = payment
        val productId = call.getString("productId")?.trim()
        if (currentPayment == null) {
            call.reject("ابتدا اتصال به بازار را برقرار کن.", "BAZAAR_NOT_CONNECTED")
            return
        }
        if (productId.isNullOrEmpty()) {
            call.reject("شناسه‌ی محصول پرداخت خالی است.", "INVALID_PRODUCT_ID")
            return
        }

        val dynamicPriceToken = call.getString("dynamicPriceToken")?.trim()?.takeIf { it.isNotEmpty() }
        val request = PurchaseRequest(
            productId = productId,
            payload = "lingoplus-premium-onetime",
            dynamicPriceToken = dynamicPriceToken
        )

        currentPayment.purchaseProduct(
            registry = activity.activityResultRegistry,
            request = request
        ) {
            purchaseSucceed { purchase ->
                call.resolve(JSObject().put("productId", purchase.productId))
            }
            purchaseCanceled {
                call.reject("خرید لغو شد.", "PURCHASE_CANCELED")
            }
            purchaseFailed { error ->
                call.reject(error.message ?: "پرداخت بازار ناموفق بود.", "PURCHASE_FAILED")
            }
            failedToBeginFlow { error ->
                call.reject(error.message ?: "شروع فرایند پرداخت ممکن نشد.", "PURCHASE_FLOW_FAILED")
            }
        }
    }

    override fun handleOnDestroy() {
        billingConnection?.disconnect()
        billingConnection = null
        super.handleOnDestroy()
    }
}
