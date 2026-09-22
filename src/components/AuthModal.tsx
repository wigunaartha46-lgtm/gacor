import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Gamepad2, ArrowRight } from 'lucide-react';
import { useGameHub } from '../context/GameHubContext';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    login, 
    register, 
    loginAsDemoUser, 
    loginAsAdmin 
  } = useGameHub();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      const ok = login(email, password);
      if (!ok) {
        setError('Invalid credentials. You can also use the Quick Demo buttons below.');
      }
    } else {
      if (!username.trim() || !email.trim() || !password.trim()) {
        setError('Please fill in all fields.');
        return;
      }
      register(username, email, password);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1b2838] border border-[#2a475e] rounded-2xl w-full max-w-md p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo & Headline */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 text-white font-black text-xl tracking-wider">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1b2838] to-[#66c0f4] flex items-center justify-center shadow-lg border border-[#66c0f4]/50">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span>GAC<span className="text-[#66c0f4]">OR</span></span>
          </div>
          <h2 className="text-lg font-bold text-white">
            {mode === 'login' ? 'Sign in to your Gacor account' : 'Create your free gamer account'}
          </h2>
          <p className="text-xs text-gray-400">
            Access your cloud library, game discounts, and community discussions.
          </p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs text-rose-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Gamer Handle / Username</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. CyberNinja99"
                  className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-[#66c0f4]"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gamemail.com"
                className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-[#66c0f4]"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#171a21] border border-[#2a475e] rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-[#66c0f4]"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#66c0f4] hover:bg-[#52aee2] text-gray-950 font-black text-xs rounded-xl shadow-lg transition-colors cursor-pointer flex items-center justify-center space-x-1"
          >
            <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch mode */}
        <div className="text-center text-xs text-gray-400">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-[#66c0f4] font-bold hover:underline cursor-pointer"
              >
                Join Gacor Free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-[#66c0f4] font-bold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

        {/* Quick Demo Logins for Testing */}
        <div className="pt-3 border-t border-[#2a475e]/60 space-y-2">
          <span className="text-[11px] text-gray-400 text-center block font-semibold">
            One-Click Instant Testing Profiles:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={loginAsDemoUser}
              className="py-2 px-3 bg-[#202b3b] hover:bg-[#2a475e] text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 border border-[#2a475e] cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#66c0f4]" />
              <span>Gamer (Demo)</span>
            </button>

            <button
              type="button"
              onClick={loginAsAdmin}
              className="py-2 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 border border-amber-500/40 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin (Demo)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
