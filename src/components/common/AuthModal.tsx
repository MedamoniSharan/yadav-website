import React, { useState } from 'react';
import { Lock, Mail, MapPin, User, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GoldenCowEmblem, OrnamentalLotusDivider } from './KrishnaDecorations';

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
  initialMode?: 'login' | 'register' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { loginUser, registerUser, resetPassword, showToast } = useApp();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('Hyderabad, Telangana');
  const [email, setEmail] = useState('sharan.medamoni@yadavcommunity.org');
  const [password, setPassword] = useState('krishna123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfoMsg('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await loginUser({ email, password });
        onClose?.();
      } else if (mode === 'register') {
        await registerUser({ email, password, fullName, location });
        onClose?.();
      } else {
        const msg = await resetPassword(email);
        setInfoMsg(msg);
        showToast(msg);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#061B46]/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Member Authentication"
    >
      <div className="w-full max-w-md bg-[#FFF8ED] rounded-3xl overflow-hidden border border-[#E9A526]/50 shadow-2xl">
        <div className="bg-krishna-header text-white px-6 py-5 relative overflow-hidden">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close authentication dialog"
              className="absolute top-3 right-3 z-20 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full text-white/80 hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="relative z-10 flex flex-col items-center text-center">
            <GoldenCowEmblem className="w-10 h-8 mb-1.5" />
            <h2 className="font-display text-2xl font-semibold text-[#F5D58B]">
              {mode === 'login' && 'Welcome Back'}
              {mode === 'register' && 'Join Yadav Community'}
              {mode === 'forgot' && 'Reset Password'}
            </h2>
            <p className="text-xs text-white/80 mt-0.5">
              Connect • Promote • Grow Together
            </p>
            <OrnamentalLotusDivider className="w-44 h-5 mt-2 opacity-90" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {error}
            </div>
          )}
          {infoMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
              {infoMsg}
            </div>
          )}

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#061B46] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#667085] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Sharan Medamoni"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#EADBC2] rounded-xl text-sm text-[#061B46] focus:outline-none focus:border-[#0B347A]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#061B46] mb-1">
                  City / Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#667085] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Hyderabad, Telangana"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#EADBC2] rounded-xl text-sm text-[#061B46] focus:outline-none focus:border-[#0B347A]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#061B46] mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#667085] absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="member@yadavcommunity.org"
                className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#EADBC2] rounded-xl text-sm text-[#061B46] focus:outline-none focus:border-[#0B347A]"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="block text-xs font-semibold text-[#061B46] mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#667085] absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 4 characters"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#EADBC2] rounded-xl text-sm text-[#061B46] focus:outline-none focus:border-[#0B347A]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-royal-pill text-white font-semibold text-sm shadow-md hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
          >
            {loading
              ? 'Please wait...'
              : mode === 'login'
                ? 'Sign In to Community'
                : mode === 'register'
                  ? 'Create Member Account'
                  : 'Send Reset Link'}
          </button>

          <div className="flex items-center justify-between text-xs pt-1 text-[#0B347A] font-medium">
            {mode === 'login' ? (
              <>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="hover:underline cursor-pointer"
                >
                  New member? Register
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="mx-auto hover:underline cursor-pointer"
              >
                Already a member? Sign In
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
