export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'voice';
  corrections?: GrammarCorrection[];
  vocabulary?: VocabularyItem[];
  pronunciation?: PronunciationFeedback;
}

export interface GrammarCorrection {
  original: string;
  corrected: string;
  explanation: string;
  rule: string;
}

export interface VocabularyItem {
  word: string;
  definition: string;
  example: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface PronunciationFeedback {
  word: string;
  accuracy: number;
  suggestions: string[];
  phonetic: string;
}

export interface LearningRecommendation {
  title: string;
  description: string;
  type: 'exercise' | 'paper' | 'practice';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  url?: string;
}

export interface ConversationState {
  isListening: boolean;
  isFullscreen: boolean;
  isMuted: boolean;
  currentTopic: string;
  learningFocus: 'grammar' | 'vocabulary' | 'pronunciation' | 'conversation';
}