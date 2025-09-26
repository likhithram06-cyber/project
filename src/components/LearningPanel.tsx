import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Award, 
  Clock,
  ChevronRight,
  Lightbulb,
  FileText,
  Headphones
} from 'lucide-react';

const LearningPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'suggestions' | 'progress' | 'resources'>('suggestions');

  const suggestions = [
    {
      title: "Practice Past Tense Verbs",
      description: "Based on your recent conversation, let's work on irregular past tense forms.",
      type: "grammar",
      difficulty: "intermediate",
      estimatedTime: "15 min"
    },
    {
      title: "Business Vocabulary",
      description: "Expand your professional vocabulary with common business terms.",
      type: "vocabulary",
      difficulty: "advanced",
      estimatedTime: "20 min"
    },
    {
      title: "Pronunciation: TH Sounds",
      description: "Master the challenging 'th' sound with guided practice.",
      type: "pronunciation",
      difficulty: "beginner",
      estimatedTime: "10 min"
    }
  ];

  const resources = [
    {
      title: "English Grammar Fundamentals",
      type: "paper",
      description: "Comprehensive guide to English grammar rules and exceptions.",
      url: "#"
    },
    {
      title: "Advanced Conversation Patterns",
      type: "exercise",
      description: "Interactive exercises for natural conversation flow.",
      url: "#"
    },
    {
      title: "Pronunciation Training Audio",
      type: "practice",
      description: "Audio exercises for accent reduction and clarity.",
      url: "#"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'grammar': return <BookOpen className="w-4 h-4" />;
      case 'vocabulary': return <Target className="w-4 h-4" />;
      case 'pronunciation': return <Headphones className="w-4 h-4" />;
      case 'paper': return <FileText className="w-4 h-4" />;
      case 'exercise': return <Lightbulb className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'advanced': return 'bg-red-500/20 text-red-300 border-red-400/30';
      default: return 'bg-golden-500/20 text-golden-300 border-golden-400/30';
    }
  };

  return (
    <div className="fixed right-4 top-24 bottom-20 w-80 z-40">
      <Card className="h-full bg-classroom-overlay/90 backdrop-blur-classroom border-golden-400/30 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-golden-400/20">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="w-5 h-5 text-golden-400" />
            <span className="font-cinema text-golden-300 tracking-wider">
              LEARNING CENTER
            </span>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-classroom-bg/40 rounded-lg p-1">
            <Button
              onClick={() => setActiveTab('suggestions')}
              variant="ghost"
              className={`flex-1 text-xs py-2 ${
                activeTab === 'suggestions'
                  ? 'bg-golden-600/30 text-golden-200'
                  : 'text-golden-400 hover:text-golden-300'
              }`}
            >
              Suggestions
            </Button>
            <Button
              onClick={() => setActiveTab('progress')}
              variant="ghost"
              className={`flex-1 text-xs py-2 ${
                activeTab === 'progress'
                  ? 'bg-golden-600/30 text-golden-200'
                  : 'text-golden-400 hover:text-golden-300'
              }`}
            >
              Progress
            </Button>
            <Button
              onClick={() => setActiveTab('resources')}
              variant="ghost"
              className={`flex-1 text-xs py-2 ${
                activeTab === 'resources'
                  ? 'bg-golden-600/30 text-golden-200'
                  : 'text-golden-400 hover:text-golden-300'
              }`}
            >
              Resources
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-cinematic">
          {activeTab === 'suggestions' && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-golden-300 mb-3">
                Personalized Recommendations
              </h3>
              {suggestions.map((suggestion, index) => (
                <Card key={index} className="p-3 bg-classroom-bg/40 border-golden-400/20 hover:border-golden-400/40 transition-all duration-200 cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(suggestion.type)}
                        <h4 className="text-sm font-medium text-golden-200 group-hover:text-golden-100">
                          {suggestion.title}
                        </h4>
                      </div>
                      <p className="text-xs text-golden-400/80 mb-2">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${getDifficultyColor(suggestion.difficulty)}`}>
                          {suggestion.difficulty}
                        </Badge>
                        <div className="flex items-center space-x-1 text-xs text-golden-500">
                          <Clock className="w-3 h-3" />
                          <span>{suggestion.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-golden-400 group-hover:text-golden-300 transition-colors" />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-golden-300 mb-3">
                Your Learning Journey
              </h3>
              
              <div className="space-y-3">
                <div className="bg-classroom-bg/40 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-golden-300">Grammar Mastery</span>
                    <span className="text-sm text-golden-400">78%</span>
                  </div>
                  <div className="w-full bg-classroom-bg/60 rounded-full h-2">
                    <div className="bg-gradient-golden h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>

                <div className="bg-classroom-bg/40 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-golden-300">Vocabulary</span>
                    <span className="text-sm text-golden-400">65%</span>
                  </div>
                  <div className="w-full bg-classroom-bg/60 rounded-full h-2">
                    <div className="bg-gradient-golden h-2 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>

                <div className="bg-classroom-bg/40 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-golden-300">Pronunciation</span>
                    <span className="text-sm text-golden-400">82%</span>
                  </div>
                  <div className="w-full bg-classroom-bg/60 rounded-full h-2">
                    <div className="bg-gradient-golden h-2 rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-golden-600/10 border border-golden-400/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-golden-400" />
                  <span className="text-sm font-medium text-golden-300">This Week</span>
                </div>
                <p className="text-xs text-golden-400">
                  You've completed 5 lessons and improved your pronunciation score by 12%!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-golden-300 mb-3">
                Learning Resources
              </h3>
              {resources.map((resource, index) => (
                <Card key={index} className="p-3 bg-classroom-bg/40 border-golden-400/20 hover:border-golden-400/40 transition-all duration-200 cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(resource.type)}
                        <h4 className="text-sm font-medium text-golden-200 group-hover:text-golden-100">
                          {resource.title}
                        </h4>
                      </div>
                      <p className="text-xs text-golden-400/80">
                        {resource.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-golden-400 group-hover:text-golden-300 transition-colors" />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LearningPanel;