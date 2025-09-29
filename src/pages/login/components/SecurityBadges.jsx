import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted'
    },
    {
      icon: 'Lock',
      text: 'SOC 2 Compliant'
    },
    {
      icon: 'CheckCircle',
      text: 'GDPR Ready'
    }
  ];

  return (
    <div className="flex items-center justify-center space-x-6 mt-8">
      {securityFeatures?.map((feature, index) => (
        <div key={index} className="flex items-center space-x-2 text-muted-foreground">
          <Icon name={feature?.icon} size={16} className="text-success" />
          <span className="text-xs font-medium">{feature?.text}</span>
        </div>
      ))}
    </div>
  );
};

export default SecurityBadges;