import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const TwoFactorModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Mock OTP for demonstration
  const mockOTP = '123456';

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!otpCode) {
      setError('Please enter the verification code');
      return;
    }

    if (otpCode?.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API verification
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (otpCode === mockOTP) {
      // Success - redirect to dashboard
      navigate('/dashboard');
    } else {
      setIsLoading(false);
      setError('Invalid verification code. Please try again.');
    }
  };

  const handleResendCode = async () => {
    setTimeLeft(300);
    setError('');
    // Simulate resend API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value?.replace(/\D/g, '')?.slice(0, 6);
    setOtpCode(value);
    if (error) setError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Two-Factor Authentication"
      size="sm"
      closeOnOverlayClick={false}
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} className="text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          We've sent a 6-digit verification code to your registered device. 
          Please enter it below to complete your login.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
              <p className="text-sm text-error">{error}</p>
            </div>
          </div>
        )}

        <Input
          label="Verification Code"
          type="text"
          placeholder="Enter 6-digit code"
          value={otpCode}
          onChange={handleInputChange}
          maxLength={6}
          className="text-center text-lg tracking-widest"
          disabled={isLoading}
          required
        />

        <div className="text-center text-sm text-muted-foreground">
          {timeLeft > 0 ? (
            <p>Code expires in {formatTime(timeLeft)}</p>
          ) : (
            <p className="text-error">Verification code has expired</p>
          )}
        </div>

        <div className="flex space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleResendCode}
            disabled={isLoading || timeLeft > 240}
            className="flex-1"
          >
            Resend Code
          </Button>
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            disabled={isLoading || !otpCode || timeLeft === 0}
            className="flex-1"
          >
            Verify
          </Button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Demo Credentials:</p>
            <p>Use verification code: <span className="font-mono font-medium">123456</span></p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TwoFactorModal;