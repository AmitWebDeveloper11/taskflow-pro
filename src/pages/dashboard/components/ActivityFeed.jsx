import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      action: "completed task",
      target: "API Integration",
      project: "TaskFlow Mobile App",
      timestamp: "2 minutes ago",
      type: "task_completed",
      icon: "CheckCircle",
      color: "success"
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      action: "created new task",
      target: "Database Migration",
      project: "Website Redesign",
      timestamp: "15 minutes ago",
      type: "task_created",
      icon: "Plus",
      color: "primary"
    },
    {
      id: 3,
      user: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      action: "commented on",
      target: "User Authentication Bug",
      project: "TaskFlow Mobile App",
      timestamp: "1 hour ago",
      type: "comment",
      icon: "MessageCircle",
      color: "accent"
    },
    {
      id: 4,
      user: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      action: "moved task to",
      target: "Code Review",
      project: "API Integration",
      timestamp: "2 hours ago",
      type: "task_moved",
      icon: "ArrowRight",
      color: "warning"
    },
    {
      id: 5,
      user: {
        name: "Lisa Wang",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
      },
      action: "assigned task",
      target: "UI Testing",
      project: "Website Redesign",
      timestamp: "3 hours ago",
      type: "task_assigned",
      icon: "UserPlus",
      color: "primary"
    }
  ];

  const getIconColor = (color) => {
    switch (color) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      case 'accent':
        return 'text-accent';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <Icon name="Activity" size={20} className="text-muted-foreground" />
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 group">
              <div className="relative flex-shrink-0">
                <Image
                  src={activity?.user?.avatar}
                  alt={activity?.user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 bg-card border-2 border-card rounded-full flex items-center justify-center ${getIconColor(activity?.color)}`}>
                  <Icon name={activity?.icon} size={12} />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-foreground text-sm">
                    {activity?.user?.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {activity?.action}
                  </span>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium text-foreground">{activity?.target}</span>
                  <span className="text-muted-foreground"> in </span>
                  <span className="text-primary">{activity?.project}</span>
                </div>
                
                <p className="text-xs text-muted-foreground mt-1">
                  {activity?.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;