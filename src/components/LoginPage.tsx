import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Chrome, Mail, Lock, User } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      login({
        id: Date.now().toString(),
        name: name || email.split('@')[0],
        email: email
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    // Simulate Google OAuth
    setTimeout(() => {
      login({
        id: 'google_' + Date.now().toString(),
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-cinematic flex items-center justify-center p-4 bg-noise">
      <div className="absolute inset-0 bg-gradient-to-br from-golden-900/20 via-transparent to-golden-600/10" />
      
      <Card className="w-full max-w-md bg-classroom-overlay/80 backdrop-blur-classroom border-golden-400/30 shadow-cinematic relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-12 bg-gradient-golden rounded-sm" />
            <div>
              <CardTitle className="text-2xl font-cinema text-gradient-golden">
                LINGUAVISTA
              </CardTitle>
              <CardDescription className="text-golden-300 text-sm font-medium tracking-wider">
                AI LANGUAGE TUTOR
              </CardDescription>
            </div>
          </div>
          <p className="text-golden-200 text-sm">
            {isSignUp ? 'Create your account to start learning' : 'Sign in to continue your English journey'}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-golden-600 hover:bg-golden-500 text-black font-medium py-3 transition-all duration-300 hover:shadow-golden-glow"
          >
            <Chrome className="w-5 h-5 mr-2" />
            {isLoading ? 'Connecting...' : 'Continue with Google'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-golden-400/30" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-classroom-overlay text-golden-300">or</span>
            </div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            {isSignUp && (
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-golden-400" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-classroom-bg/50 border-golden-400/30 text-golden-100 placeholder-golden-400/60 focus:border-golden-400 focus:ring-golden-400/20"
                  required={isSignUp}
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-golden-400" />
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-classroom-bg/50 border-golden-400/30 text-golden-100 placeholder-golden-400/60 focus:border-golden-400 focus:ring-golden-400/20"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-golden-400" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-classroom-bg/50 border-golden-400/30 text-golden-100 placeholder-golden-400/60 focus:border-golden-400 focus:ring-golden-400/20"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-golden hover:shadow-golden-glow text-black font-medium py-3 transition-all duration-300"
            >
              {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-golden-300 hover:text-golden-200 text-sm transition-colors duration-200"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;