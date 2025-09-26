import React, { createContext, useContext, useState, useCallback } from 'react';
import { Message, ConversationState, GrammarCorrection, VocabularyItem, PronunciationFeedback, LearningRecommendation } from '@/types';

interface ConversationContextType {
  messages: Message[];
  state: ConversationState;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateState: (updates: Partial<ConversationState>) => void;
  clearMessages: () => void;
  processAIResponse: (userMessage: string) => Promise<void>;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
};

export const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [state, setState] = useState<ConversationState>({
    isListening: false,
    isFullscreen: false,
    isMuted: false,
    currentTopic: 'general',
    learningFocus: 'conversation'
  });

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const updateState = useCallback((updates: Partial<ConversationState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const processAIResponse = useCallback(async (userMessage: string) => {
    // Check if message is English learning related
    const isEnglishLearningQuery = checkIfEnglishLearningQuery(userMessage);
    
    if (!isEnglishLearningQuery) {
      const redirectMessage = "I'm here to help you learn English! Let's focus on improving your grammar, vocabulary, pronunciation, or conversation skills. What would you like to practice today?";
      
      addMessage({
        content: redirectMessage,
        sender: 'ai',
        type: 'text'
      });
      return;
    }

    // Simulate AI processing with English learning features
    const aiResponse = await generateEnglishLearningResponse(userMessage);
    
    addMessage({
      content: aiResponse.content,
      sender: 'ai',
      type: 'text',
      corrections: aiResponse.corrections,
      vocabulary: aiResponse.vocabulary,
      pronunciation: aiResponse.pronunciation
    });
  }, [addMessage]);

  return (
    <ConversationContext.Provider value={{
      messages,
      state,
      addMessage,
      updateState,
      clearMessages,
      processAIResponse
    }}>
      {children}
    </ConversationContext.Provider>
  );
};

// Helper functions
function checkIfEnglishLearningQuery(message: string): boolean {
  const englishLearningKeywords = [
    'grammar', 'vocabulary', 'pronunciation', 'english', 'learn', 'practice',
    'speak', 'write', 'read', 'listen', 'conversation', 'word', 'sentence',
    'tense', 'verb', 'noun', 'adjective', 'adverb', 'preposition', 'article',
    'meaning', 'definition', 'example', 'correct', 'mistake', 'error',
    'improve', 'better', 'help', 'teach', 'explain', 'understand'
  ];
  
  const lowerMessage = message.toLowerCase();
  return englishLearningKeywords.some(keyword => lowerMessage.includes(keyword)) ||
         lowerMessage.includes('how do you say') ||
         lowerMessage.includes('what does') ||
         lowerMessage.includes('is this correct');
}

async function generateEnglishLearningResponse(userMessage: string): Promise<{
  content: string;
  corrections?: GrammarCorrection[];
  vocabulary?: VocabularyItem[];
  pronunciation?: PronunciationFeedback;
}> {
  // This would integrate with Gemini API
  // For now, return a mock response with learning features
  
  const corrections: GrammarCorrection[] = [];
  const vocabulary: VocabularyItem[] = [];
  
  // Mock grammar correction
  if (userMessage.includes('I are')) {
    corrections.push({
      original: 'I are',
      corrected: 'I am',
      explanation: 'Use "am" with the pronoun "I"',
      rule: 'Subject-verb agreement'
    });
  }
  
  // Mock vocabulary suggestion
  if (userMessage.includes('good')) {
    vocabulary.push({
      word: 'excellent',
      definition: 'extremely good; outstanding',
      example: 'Your pronunciation is excellent!',
      difficulty: 'intermediate'
    });
  }
  
  return {
    content: `Great question! Let me help you with that. ${userMessage.includes('grammar') ? 'Grammar is fundamental to clear communication.' : 'Keep practicing - you\'re doing well!'} Would you like to practice more examples?`,
    corrections: corrections.length > 0 ? corrections : undefined,
    vocabulary: vocabulary.length > 0 ? vocabulary : undefined
  };
}