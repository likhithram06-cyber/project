import React, { useState, useRef, useEffect } from 'react';
import { Message } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Copy, BookOpen, Volume2 } from 'lucide-react';

interface TranscriptPanelProps {
  messages: Message[];
}

const TranscriptPanel: React.FC<TranscriptPanelProps> = ({ messages }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`transition-all duration-500 ease-in-out ${
      isExpanded ? 'h-80' : 'h-16'
    }`}>
      <Card className="h-full bg-classroom-overlay/90 backdrop-blur-classroom border-golden-400/30 border-t-2 rounded-t-xl rounded-b-none">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-golden-400/20">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-golden-400" />
            <span className="font-cinema text-golden-300 tracking-wider">
              CONVERSATION TRANSCRIPT
            </span>
          </div>
          
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="ghost"
            className="text-golden-300 hover:text-golden-200 hover:bg-golden-400/10"
          >
            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </Button>
        </div>

        {/* Messages */}
        {isExpanded && (
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-cinematic"
            style={{ maxHeight: 'calc(100% - 64px)' }}
          >
            {messages.length === 0 ? (
              <div className="text-center text-golden-400/60 py-8">
                <p className="text-sm">Start a conversation to see the transcript here</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-golden-600/20 border border-golden-400/30'
                        : 'bg-classroom-bg/40 border border-golden-400/20'
                    }`}
                  >
                    <div className="flex items-start justify-between space-x-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-xs font-medium ${
                            message.sender === 'user' ? 'text-golden-300' : 'text-golden-400'
                          }`}>
                            {message.sender === 'user' ? 'You' : 'LinguaVista AI'}
                          </span>
                          <span className="text-xs text-golden-500">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          {message.type === 'voice' && (
                            <div className="w-2 h-2 bg-golden-400 rounded-full animate-pulse" />
                          )}
                        </div>
                        
                        <p className="text-golden-100 text-sm leading-relaxed">
                          {message.content}
                        </p>

                        {/* Grammar Corrections */}
                        {message.corrections && message.corrections.length > 0 && (
                          <div className="mt-2 p-2 bg-red-500/10 border border-red-400/30 rounded">
                            <p className="text-xs text-red-300 font-medium mb-1">Grammar Corrections:</p>
                            {message.corrections.map((correction, index) => (
                              <div key={index} className="text-xs text-red-200">
                                <span className="line-through text-red-400">{correction.original}</span>
                                {' → '}
                                <span className="text-green-300">{correction.corrected}</span>
                                <p className="text-red-300/80 mt-1">{correction.explanation}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Vocabulary Suggestions */}
                        {message.vocabulary && message.vocabulary.length > 0 && (
                          <div className="mt-2 p-2 bg-blue-500/10 border border-blue-400/30 rounded">
                            <p className="text-xs text-blue-300 font-medium mb-1">Vocabulary Enhancement:</p>
                            {message.vocabulary.map((vocab, index) => (
                              <div key={index} className="text-xs text-blue-200">
                                <span className="font-medium text-blue-300">{vocab.word}</span>
                                <p className="text-blue-200/80">{vocab.definition}</p>
                                <p className="text-blue-200/60 italic">"{vocab.example}"</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-1">
                        <Button
                          onClick={() => copyToClipboard(message.content)}
                          variant="ghost"
                          size="sm"
                          className="w-6 h-6 p-0 text-golden-400 hover:text-golden-300"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        
                        {message.sender === 'ai' && (
                          <Button
                            onClick={() => speakText(message.content)}
                            variant="ghost"
                            size="sm"
                            className="w-6 h-6 p-0 text-golden-400 hover:text-golden-300"
                          >
                            <Volume2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default TranscriptPanel;