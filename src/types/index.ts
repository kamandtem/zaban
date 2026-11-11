export type TenseCategory = 'present' | 'past' | 'future';

export interface TenseInfo {
  id: string;
  category: TenseCategory;
  nameFa: string;
  nameEn: string;
  shortConcept: string;
  description: string;
  formula: {
    positive: string;
    negative: string;
    question: string;
  };
  persianComparison: string;
  timeMarkers: string[];
  examples: {
    en: string;
    fa: string;
    note?: string;
  }[];
  quiz: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export type ExerciseType = 'wheel' | 'multiple_choice' | 'word_order' | 'fill_blank';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  promptFa: string;
  sentenceWithBlank?: string; // e.g. "I ___ a student."
  explanation: string;
  categoryTag?: string;
}

export interface WheelExerciseItem extends BaseExercise {
  type: 'wheel';
  options: string[];
  correctOption: string;
  prefixText?: string;
  suffixText?: string;
  categoryTag?: string; // e.g. 'فعل be', 'ضمیر فاعلی', 'فعل کمکی'
}

export interface MultipleChoiceExerciseItem extends BaseExercise {
  type: 'multiple_choice';
  questionEn: string;
  options: string[];
  correctIndex: number;
}

export interface WordOrderExerciseItem extends BaseExercise {
  type: 'word_order';
  scrambledWords: string[];
  correctSentence: string;
  meaningFa: string;
}

export interface FillBlankExerciseItem extends BaseExercise {
  type: 'fill_blank';
  sentenceWithBlank: string;
  options: string[];
  correctOption: string;
}

export type LessonExercise =
  | WheelExerciseItem
  | MultipleChoiceExerciseItem
  | WordOrderExerciseItem
  | FillBlankExerciseItem;

export interface VocabularyWord {
  id: string;
  word: string;
  pronunciationFa?: string;
  partOfSpeech: string;
  meaningFa: string;
  exampleEn: string;
  exampleFa: string;
  category: string;
}

export interface Lesson {
  id: number;
  slug: string;
  titleFa: string;
  titleEn: string;
  badge: string;
  estimatedMinutes: number;
  mainIdea: string;
  persianComparison: string;
  formulas: {
    title: string;
    positive: string;
    negative: string;
    question: string;
    shortAnswer?: string;
    notes?: string;
    positiveSteps?: { roleFa: string; example: string; noteFa?: string; auxVerb?: string }[];
    negativeSteps?: { roleFa: string; example: string; noteFa?: string; auxVerb?: string }[];
    questionSteps?: { roleFa: string; example: string; noteFa?: string; auxVerb?: string }[];
  };
  examples: {
    en: string;
    fa: string;
    breakdown?: string;
  }[];
  vocabulary: VocabularyWord[];
  commonMistake: {
    wrong: string;
    correct: string;
    reason: string;
  };
  exercises: LessonExercise[];
  quickReview: string[];
}

export interface UserProgress {
  streakDays: number;
  lastActiveDate: string;
  completedLessons: number[];
  completedTenses: string[];
  completedBasics: string[];
  totalExercisesCompleted: number;
  correctAnswersCount: number;
  mistakes: {
    id: string;
    lessonId?: number;
    questionText: string;
    wrongAnswer: string;
    correctAnswer: string;
    explanation: string;
    timestamp: number;
  }[];
  bookmarkedWords: string[];
  leitnerCards: Record<string, { box: number; dueDate: string }>;
  leitnerNewDate: string;
  leitnerNewCount: number;
  dailyGoal: number; // e.g. 5 exercises per day
  todayCompletedCount: number;
}
