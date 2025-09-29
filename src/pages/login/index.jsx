import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';
import SecurityBadges from './components/SecurityBadges';
import TwoFactorModal from './components/TwoFactorModal';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('taskflow_user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleTwoFactorRequired = () => {
    setShowTwoFactor(true);
  };

  const handleTwoFactorClose = () => {
    setShowTwoFactor(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-elevation-2 p-8">
          <LoginHeader />
          <LoginForm onTwoFactorRequired={handleTwoFactorRequired} />
          <SecurityBadges />
          <LoginFooter />
        </div>
      </div>

      {/* Two-Factor Authentication Modal */}
      <TwoFactorModal 
        isOpen={showTwoFactor} 
        onClose={handleTwoFactorClose}
      />

      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl" />
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-secondary/10 rounded-full blur-xl" />
    </div>
  );
};

export default LoginPage;