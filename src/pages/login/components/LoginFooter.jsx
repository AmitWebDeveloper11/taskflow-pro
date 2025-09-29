import React from 'react';
import { Link } from 'react-router-dom';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="mt-8 space-y-4">
      {/* Register Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            Create one now
          </Link>
        </p>
      </div>

      {/* Demo Credentials Info */}
      <div className="p-4 bg-muted/50 rounded-lg border border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Demo Accounts:</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Admin:</span>
            <span className="font-mono">admin@taskflow.com / Admin@123</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Manager:</span>
            <span className="font-mono">manager@taskflow.com / Manager@123</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Developer:</span>
            <span className="font-mono">dev@taskflow.com / Dev@123</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Admin account requires 2FA verification (code: 123456)
        </p>
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {currentYear} TaskFlow Pro. All rights reserved.
        </p>
        <div className="flex items-center justify-center space-x-4 mt-2">
          <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
            Privacy Policy
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
            Terms of Service
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link to="#" className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
            Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginFooter;