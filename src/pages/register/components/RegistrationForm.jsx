import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    role: '',
    teamSize: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    marketingEmails: false
  });

  const [errors, setErrors] = useState({});

  const roleOptions = [
    { value: 'project-manager', label: 'Project Manager' },
    { value: 'scrum-master', label: 'Scrum Master' },
    { value: 'developer', label: 'Developer' },
    { value: 'qa-tester', label: 'QA Tester' },
    { value: 'product-owner', label: 'Product Owner' },
    { value: 'team-lead', label: 'Team Lead' },
    { value: 'designer', label: 'Designer' },
    { value: 'other', label: 'Other' }
  ];

  const teamSizeOptions = [
    { value: '1-5', label: '1-5 members' },
    { value: '6-10', label: '6-10 members' },
    { value: '11-25', label: '11-25 members' },
    { value: '26-50', label: '26-50 members' },
    { value: '51-100', label: '51-100 members' },
    { value: '100+', label: '100+ members' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
      if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
      if (!formData?.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 2) {
      if (!formData?.companyName?.trim()) newErrors.companyName = 'Company name is required';
      if (!formData?.role) newErrors.role = 'Please select your role';
      if (!formData?.teamSize) newErrors.teamSize = 'Please select team size';
    }

    if (step === 3) {
      if (!formData?.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms of service';
      if (!formData?.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    if (password?.length >= 8) score++;
    if (/[a-z]/?.test(password)) score++;
    if (/[A-Z]/?.test(password)) score++;
    if (/[0-9]/?.test(password)) score++;
    if (/[^A-Za-z0-9]/?.test(password)) score++;

    if (score <= 2) return { strength: score * 20, label: 'Weak', color: 'bg-error' };
    if (score === 3) return { strength: 60, label: 'Fair', color: 'bg-warning' };
    if (score === 4) return { strength: 80, label: 'Good', color: 'bg-accent' };
    return { strength: 100, label: 'Strong', color: 'bg-success' };
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateStep(3)) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailVerificationSent(true);
    }, 2000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Simulate social login
    navigate('/dashboard');
  };

  const handleResendVerification = () => {
    console.log('Resending verification email');
  };

  const passwordStrength = getPasswordStrength(formData?.password);

  if (emailVerificationSent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Mail" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Check Your Email</h2>
        <p className="text-muted-foreground mb-6">
          We've sent a verification link to <strong>{formData?.email}</strong>
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Please check your email and click the verification link to activate your account.
        </p>
        <Button 
          variant="outline" 
          onClick={handleResendVerification}
          className="mb-4"
        >
          Resend Verification Email
        </Button>
        <p className="text-sm text-muted-foreground">
          Already verified?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Sign in to your account
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Step {currentStep} of 3</span>
          <span className="text-sm text-muted-foreground">
            {currentStep === 1 && 'Personal Information'}
            {currentStep === 2 && 'Company Details'}
            {currentStep === 3 && 'Final Steps'}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>
      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              value={formData?.firstName}
              onChange={(e) => handleInputChange('firstName', e?.target?.value)}
              error={errors?.firstName}
              required
            />
            <Input
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              value={formData?.lastName}
              onChange={(e) => handleInputChange('lastName', e?.target?.value)}
              error={errors?.lastName}
              required
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your work email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            description="We'll use this for account verification and notifications"
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>

          {formData?.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Password strength:</span>
                <span className={`font-medium ${
                  passwordStrength?.label === 'Weak' ? 'text-error' :
                  passwordStrength?.label === 'Fair' ? 'text-warning' :
                  passwordStrength?.label === 'Good' ? 'text-accent' : 'text-success'
                }`}>
                  {passwordStrength?.label}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.color}`}
                  style={{ width: `${passwordStrength?.strength}%` }}
                />
              </div>
            </div>
          )}

          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>
        </div>
      )}
      {/* Step 2: Company Details */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <Input
            label="Company Name"
            type="text"
            placeholder="Enter your company name"
            value={formData?.companyName}
            onChange={(e) => handleInputChange('companyName', e?.target?.value)}
            error={errors?.companyName}
            required
          />

          <Select
            label="Your Role"
            placeholder="Select your role"
            options={roleOptions}
            value={formData?.role}
            onChange={(value) => handleInputChange('role', value)}
            error={errors?.role}
            required
          />

          <Select
            label="Team Size"
            placeholder="Select your team size"
            options={teamSizeOptions}
            value={formData?.teamSize}
            onChange={(value) => handleInputChange('teamSize', value)}
            error={errors?.teamSize}
            description="How many people are in your team?"
            required
          />
        </div>
      )}
      {/* Step 3: Terms and Preferences */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="space-y-4">
            <Checkbox
              label="I agree to the Terms of Service"
              checked={formData?.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
              error={errors?.agreeToTerms}
              required
            />

            <Checkbox
              label="I agree to the Privacy Policy"
              checked={formData?.agreeToPrivacy}
              onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
              error={errors?.agreeToPrivacy}
              required
            />

            <Checkbox
              label="Send me product updates and marketing emails"
              description="You can unsubscribe at any time"
              checked={formData?.marketingEmails}
              onChange={(e) => handleInputChange('marketingEmails', e?.target?.checked)}
            />
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-success mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Enterprise Security</h4>
                <p className="text-sm text-muted-foreground">
                  Your data is protected with enterprise-grade security, including SSL encryption, 
                  SOC 2 compliance, and regular security audits.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6">
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
        ) : (
          <div />
        )}

        {currentStep < 3 ? (
          <Button
            type="button"
            onClick={handleNextStep}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            loading={isLoading}
            iconName="UserPlus"
            iconPosition="left"
          >
            Create Account
          </Button>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;