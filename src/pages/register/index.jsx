import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import SocialLoginSection from './components/SocialLoginSection';
import TrustIndicators from './components/TrustIndicators';

const Register = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/dashboard" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="CheckSquare" size={24} color="white" />
            </div>
            <span className="text-2xl font-bold text-foreground">TaskFlow Pro</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">
            Join thousands of teams already using TaskFlow Pro to streamline their project workflows
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-card rounded-xl shadow-elevation-2 p-8 mb-6">
          <RegistrationForm />
        </div>

        {/* Social Login Section */}
        <div className="bg-card rounded-xl shadow-elevation-1 p-6 mb-6">
          <SocialLoginSection />
        </div>

        {/* Trust Indicators */}
        <TrustIndicators />

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-primary hover:underline font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Additional Links */}
        <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-smooth">
            Terms of Service
          </a>
          <a href="#" className="hover:text-foreground transition-smooth">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-foreground transition-smooth">
            Help Center
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} TaskFlow Pro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;