import React, { useState, useRef, useEffect } from 'react';
import { useConversation } from '@/contexts/ConversationContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2,
  Settings,
  BookOpen,
  TrendingUp,
  Clock
} from 'lucide-react';
import Avatar3D from './Avatar3D';
import TranscriptPanel from './TranscriptPanel';
import LearningPanel from './LearningPanel';

const ChatInterface: React.FC = () => {
  const { user, logout } = useAuth();
  const { messages, state, updateState, addMessage, processAIResponse } = useConversation();
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    initializeCamera();
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const toggleMicrophone = async () => {
    if (!state.isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = async () => {
    if (!cameraStream) return;

    try {
      const mediaRecorder = new MediaRecorder(cameraStream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        // Here you would process the audio with speech-to-text
        const transcribedText = await processAudioToText(audioBlob);
        
        if (transcribedText) {
          addMessage({
            content: transcribedText,
            sender: 'user',
            type: 'voice'
          });
          
          await processAIResponse(transcribedText);
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      updateState({ isListening: true, isFullscreen: true });
      
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      updateState({ isListening: false });
    }
  };

  const processAudioToText = async (audioBlob: Blob): Promise<string> => {
    // Mock speech-to-text processing
    // In a real implementation, you'd use Web Speech API or send to a service
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Hello, I would like to practice my English pronunciation today.");
      }, 1000);
    });
  };

  const toggleFullscreen = () => {
    updateState({ isFullscreen: !state.isFullscreen });
  };

  const toggleMute = () => {
    updateState({ isMuted: !state.isMuted });
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-cinematic bg-noise">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-classroom-overlay/80 backdrop-blur-classroom border-b border-golden-400/20">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-8 bg-gradient-golden rounded-sm" />
          <div>
            <h1 className="text-xl font-cinema text-gradient-golden">LINGUAVISTA</h1>
            <p className="text-xs text-golden-300 tracking-wider">AI LANGUAGE TUTOR</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-golden-300 hover:text-golden-200 hover:bg-golden-400/10">
            <BookOpen className="w-4 h-4 mr-2" />
            LESSONS
          </Button>
          <Button variant="ghost" className="text-golden-300 hover:text-golden-200 hover:bg-golden-400/10">
            <TrendingUp className="w-4 h-4 mr-2" />
            PROGRESS
          </Button>
          <Button variant="ghost" className="text-golden-300 hover:text-golden-200 hover:bg-golden-400/10">
            <Settings className="w-4 h-4 mr-2" />
            SETTINGS
          </Button>
          <div className="flex items-center space-x-2 text-golden-300">
            <Clock className="w-4 h-4" />
            <span className="font-cinema text-sm">{getCurrentTime()}</span>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* User Video Panel */}
        <div className="w-1/3 p-4">
          <Card className="h-full bg-classroom-overlay/60 backdrop-blur-classroom border-golden-400/30 overflow-hidden">
            <div className="relative h-full">
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-classroom-bg/80 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-golden-300 text-sm font-medium">You</span>
                </div>
              </div>
              
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover rounded-lg"
              />
              
              {/* Video Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <Button
                  onClick={toggleMicrophone}
                  className={`w-12 h-12 rounded-full ${
                    state.isListening 
                      ? 'bg-red-600 hover:bg-red-500 animate-speaking-indicator' 
                      : 'bg-classroom-bg/80 hover:bg-golden-600'
                  } transition-all duration-300`}
                >
                  {state.isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                
                <Button className="w-12 h-12 rounded-full bg-classroom-bg/80 hover:bg-golden-600 transition-all duration-300">
                  <Video className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Avatar Panel */}
        <div className="flex-1 p-4">
          <Card className="h-full bg-classroom-overlay/60 backdrop-blur-classroom border-golden-400/30 overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-classroom-bg/80 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-connection-strong rounded-full animate-golden-pulse" />
                  <span className="text-golden-300 text-sm font-medium">LINGUAVISTA AI</span>
                </div>
                <p className="text-golden-400 text-xs">PROFESSIONAL TUTOR</p>
              </div>
            </div>

            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <Button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-classroom-bg/80 hover:bg-golden-600 transition-all duration-300"
              >
                {state.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              
              <Button
                onClick={toggleFullscreen}
                className="w-10 h-10 rounded-full bg-classroom-bg/80 hover:bg-golden-600 transition-all duration-300"
              >
                {state.isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>

            {/* 3D Avatar */}
            <div className="w-full h-full">
              <Avatar3D 
                isListening={state.isListening}
                isSpeaking={false}
                isFullscreen={state.isFullscreen}
              />
            </div>

            {/* Speaking Indicator */}
            {state.isListening && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-red-600/20 backdrop-blur-sm rounded-full px-4 py-2 border border-red-400/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    <span className="text-red-300 text-sm font-medium">Listening...</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Transcript Panel */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <TranscriptPanel messages={messages} />
      </div>

      {/* Learning Panel */}
      <LearningPanel />
    </div>
  );
};

export default ChatInterface;