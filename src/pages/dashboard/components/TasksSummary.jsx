import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TasksSummary = () => {
  const tasks = [
    {
      id: 1,
      title: "Implement user authentication",
      project: "TaskFlow Mobile App",
      priority: "high",
      status: "in_progress",
      assignee: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      dueDate: "Today",
      progress: 75
    },
    {
      id: 2,
      title: "Design landing page mockups",
      project: "Website Redesign",
      priority: "medium",
      status: "todo",
      assignee: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      dueDate: "Tomorrow",
      progress: 0
    },
    {
      id: 3,
      title: "API endpoint testing",
      project: "TaskFlow Mobile App",
      priority: "high",
      status: "review",
      assignee: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      dueDate: "Dec 28",
      progress: 90
    },
    {
      id: 4,
      title: "Database optimization",
      project: "API Integration",
      priority: "low",
      status: "todo",
      assignee: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      dueDate: "Dec 30",
      progress: 25
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error text-error-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return 'text-muted-foreground';
      case 'in_progress':
        return 'text-primary';
      case 'review':
        return 'text-warning';
      case 'done':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'todo':
        return 'Circle';
      case 'in_progress':
        return 'Clock';
      case 'review':
        return 'Eye';
      case 'done':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">My Tasks</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">4 active</span>
            <Icon name="CheckSquare" size={20} className="text-muted-foreground" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {tasks?.map((task) => (
            <div key={task?.id} className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm mb-1 truncate">
                    {task?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {task?.project}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 ml-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task?.priority)}`}>
                    {task?.priority}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getStatusIcon(task?.status)} 
                    size={16} 
                    className={getStatusColor(task?.status)} 
                  />
                  <span className={`text-sm capitalize ${getStatusColor(task?.status)}`}>
                    {task?.status?.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Image
                    src={task?.assignee?.avatar}
                    alt={task?.assignee?.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs text-muted-foreground">
                    {task?.dueDate}
                  </span>
                </div>
              </div>
              
              {task?.progress > 0 && (
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium text-foreground">{task?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${task?.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
            View All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksSummary;