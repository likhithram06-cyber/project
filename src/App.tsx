import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ConversationProvider } from '@/contexts/ConversationContext';
import LoginPage from '@/components/LoginPage';
import ChatInterface from '@/components/ChatInterface';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-cinematic flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-12 bg-gradient-golden rounded-sm animate-golden-pulse mb-4 mx-auto" />
          <h1 className="text-2xl font-cinema font-bold text-gradient-golden mb-2">
            LINGUAVISTA
          </h1>
          <p className="text-golden-300">Loading your learning environment...</p>
        </div>
      </div>
    );
  }

  return user ? <ChatInterface /> : <LoginPage />;
};

function App() {
  return (
    <AuthProvider>
      <ConversationProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<AppContent />} />
          </Routes>
        </Router>
      </ConversationProvider>
    </AuthProvider>
  );
}

export default App;