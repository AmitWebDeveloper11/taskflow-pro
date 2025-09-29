import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: "Create Task",
      description: "Add a new task to any project",
      icon: "Plus",
      color: "primary",
      action: () => console.log('Create task modal')
    },
    {
      id: 2,
      title: "New Project",
      description: "Start a new project workspace",
      icon: "FolderPlus",
      color: "success",
      action: () => navigate('/projects-list')
    },
    {
      id: 3,
      title: "Team Chat",
      description: "Communicate with team members",
      icon: "MessageSquare",
      color: "accent",
      action: () => console.log('Open team chat')
    },
    {
      id: 4,
      title: "Reports",
      description: "View project analytics",
      icon: "BarChart3",
      color: "warning",
      action: () => console.log('Open reports')
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success border-success/20 hover:bg-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20';
      case 'accent':
        return 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <Icon name="Zap" size={20} className="text-muted-foreground" />
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className={`
                p-4 rounded-lg border transition-smooth text-left group
                hover-lift ${getColorClasses(action?.color)}
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(action?.color)}`}>
                  <Icon name={action?.icon} size={16} />
                </div>
                <h4 className="font-medium text-foreground text-sm">
                  {action?.title}
                </h4>
              </div>
              <p className="text-xs text-muted-foreground">
                {action?.description}
              </p>
            </button>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Need help getting started?</p>
              <p className="text-xs text-muted-foreground">Check out our quick start guide</p>
            </div>
            <Button variant="outline" size="sm">
              <Icon name="HelpCircle" size={16} className="mr-2" />
              Help
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;