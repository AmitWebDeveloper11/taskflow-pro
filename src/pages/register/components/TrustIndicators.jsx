import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustBadges = [
    {
      icon: 'Shield',
      title: 'SOC 2 Compliant',
      description: 'Enterprise security standards'
    },
    {
      icon: 'Lock',
      title: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'Award',
      title: 'ISO 27001',
      description: 'Information security certified'
    },
    {
      icon: 'Users',
      title: 'Trusted by 10,000+',
      description: 'Teams worldwide'
    }
  ];

  return (
    <div className="bg-muted/50 rounded-lg p-6 mt-8">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
        Trusted by Enterprise Teams
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {trustBadges?.map((badge, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name={badge?.icon} size={16} className="text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{badge?.title}</p>
              <p className="text-xs text-muted-foreground">{badge?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
          <span className="flex items-center space-x-1">
            <Icon name="Globe" size={12} />
            <span>Global Infrastructure</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>99.9% Uptime</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Headphones" size={12} />
            <span>24/7 Support</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;