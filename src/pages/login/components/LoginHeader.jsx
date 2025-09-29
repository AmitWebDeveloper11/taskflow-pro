import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/login" className="inline-flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-elevation-1">
          <Icon name="CheckSquare" size={28} color="white" />
        </div>
        <span className="text-2xl font-bold text-foreground">TaskFlow Pro</span>
      </Link>

      {/* Welcome Text */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome back
        </h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue managing your projects
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;