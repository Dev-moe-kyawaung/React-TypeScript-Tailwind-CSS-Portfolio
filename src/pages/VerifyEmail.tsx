import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, Loader, Mail, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {
  const location = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [contactData, setContactData] = useState<any>(null);

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    
    if (!token) {
      setStatus('error');
      setErrorMessage('No verification token found in the link.');
      return;
    }

    // Verify token (mock)
    setTimeout(() => {
      const storedData = localStorage.getItem('pendingContact');
      
      if (!storedData) {
        setStatus('error');
        setErrorMessage('No pending contact data found.');
        return;
      }

      setContactData(JSON.parse(storedData));
      setStatus('success');
      
      // Clear stored data
      localStorage.removeItem('pendingContact');
      localStorage.removeItem('verificationToken');
    }, 1500);
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 neon-shadow max-w-lg w-full"
      >
        {status === 'loading' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-4 border-neon-cyan/30 border-t-neon-cyan animate-spin mx-auto mb-6" />
            <h1 className="text-2xl font-poppins font-bold mb-4">Verifying Email</h1>
            <p className="text-text-muted">Please wait while we verify your email address...</p>
          </div>
        )}

        {status === 'success' && contactData && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-neon-green/20 border-2 border-neon-green flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-neon-green" />
            </div>
            
            <h1 className="text-3xl font-poppins font-bold mb-4">Email Verified!</h1>
            <p className="text-neon-green font-semibold mb-6">Your email has been successfully verified.</p>
            <p className="text-text-muted mb-6">Thank you for verifying. Your message will now be sent.</p>
            
            <div className="bg-neon-cyan/12 border border-neon-cyan rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <User size={18} className="text-neon-cyan" />
                <span className="font-semibold">{contactData.name}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Mail size={18} className="text-neon-cyan" />
                <span>{contactData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Tag size={18} className="text-neon-cyan" />
                <span>{contactData.subject}</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link
                to="/"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-bg-dark bg-gradient-to-r from-neon-cyan to-neon-pink"
              >
                Back to Home
              </Link>
              <Link
                to="/contact"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-text-primary bg-surface-2 border border-border-light/12"
              >
                Send Another
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center mx-auto mb-6">
              <XCircle size={40} className="text-red-500" />
            </div>
            
            <h1 className="text-3xl font-poppins font-bold mb-4">Verification Failed</h1>
            <p className="text-red-400 font-semibold mb-2">{errorMessage}</p>
            <p className="text-text-muted mb-6">The verification link is invalid, expired, or already used.</p>
            
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-bg-dark bg-gradient-to-r from-neon-cyan to-neon-pink"
            >
              <XCircle size={20} />
              Request New Verification
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
