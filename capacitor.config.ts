import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ir.lingoplus.app',
  appName: 'لینگوپلاس',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
    backgroundColor: '#FEF9F0',
  },
  plugins: {
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#FEF9F0',
      overlaysWebView: false,
    },
  },
};

export default config;
