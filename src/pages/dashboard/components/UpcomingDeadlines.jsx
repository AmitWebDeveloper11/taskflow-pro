import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UpcomingDeadlines = () => {
  const deadlines = [
    {
      id: 1,
      title: "Sprint 3 Demo",
      project: "TaskFlow Mobile App",
      type: "milestone",
      dueDate: "Dec 26, 2024",
      daysLeft: 0,
      status: "critical",
      assignee: {
        name: "Project Team",
        avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: 2,
      title: "API Integration Testing",
      project: "TaskFlow Mobile App",
      type: "task",
      dueDate: "Dec 27, 2024",
      daysLeft: 1,
      status: "urgent",
      assignee: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: 3,
      title: "UI Design Review",
      project: "Website Redesign",
      type: "review",
      dueDate: "Dec 28, 2024",
      daysLeft: 2,
      status: "upcoming",
      assignee: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: 4,
      title: "Database Migration",
      project: "API Integration",
      type: "task",
      dueDate: "Dec 30, 2024",
      daysLeft: 4,
      status: "upcoming",
      assignee: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: 5,
      title: "Security Audit",
      project: "TaskFlow Mobile App",
      type: "milestone",
      dueDate: "Jan 2, 2025",
      daysLeft: 7,
      status: "scheduled",
      assignee: {
        name: "Security Team",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'urgent':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'upcoming':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'scheduled':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'milestone':
        return 'Flag';
      case 'task':
        return 'CheckSquare';
      case 'review':
        return 'Eye';
      default:
        return 'Calendar';
    }
  };

  const getDaysLeftText = (daysLeft) => {
    if (daysLeft === 0) return 'Today';
    if (daysLeft === 1) return 'Tomorrow';
    return `${daysLeft} days`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h3>
          <Icon name="Calendar" size={20} className="text-muted-foreground" />
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {deadlines?.map((deadline) => (
            <div key={deadline?.id} className="flex items-start space-x-3 group">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getStatusColor(deadline?.status)}`}>
                <Icon name={getTypeIcon(deadline?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-foreground text-sm truncate">
                    {deadline?.title}
                  </h4>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(deadline?.status)}`}>
                    {getDaysLeftText(deadline?.daysLeft)}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {deadline?.project}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={deadline?.assignee?.avatar}
                      alt={deadline?.assignee?.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-xs text-muted-foreground">
                      {deadline?.assignee?.name}
                    </span>
                  </div>
                  
                  <span className="text-xs text-muted-foreground">
                    {deadline?.dueDate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
            View Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDeadlines;