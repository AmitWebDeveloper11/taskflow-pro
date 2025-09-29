import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectHeader = ({ project, onEditProject, onShareProject, onArchiveProject }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'planning':
        return 'bg-warning text-warning-foreground';
      case 'on-hold':
        return 'bg-secondary text-secondary-foreground';
      case 'completed':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-error';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-accent';
      case 'low':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-bold text-foreground">{project?.name}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project?.status)}`}>
              {project?.status?.charAt(0)?.toUpperCase() + project?.status?.slice(1)}
            </span>
            <div className="flex items-center space-x-1">
              <Icon name="Flag" size={16} className={getPriorityColor(project?.priority)} />
              <span className={`text-sm font-medium ${getPriorityColor(project?.priority)}`}>
                {project?.priority?.charAt(0)?.toUpperCase() + project?.priority?.slice(1)}
              </span>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4 max-w-2xl">{project?.description}</p>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} />
              <span>Due: {project?.dueDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>{project?.teamSize} members</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={16} />
              <span>{project?.completedTasks}/{project?.totalTasks} tasks</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} />
              <span>{project?.progress}% complete</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onShareProject}>
            <Icon name="Share2" size={16} className="mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={onEditProject}>
            <Icon name="Settings" size={16} className="mr-2" />
            Settings
          </Button>
          <Button variant="ghost" size="icon" onClick={onArchiveProject}>
            <Icon name="Archive" size={16} />
          </Button>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Project Progress</span>
          <span className="text-sm text-muted-foreground">{project?.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300" 
            style={{ width: `${project?.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;