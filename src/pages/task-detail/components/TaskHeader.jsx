import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskHeader = ({ task, onTaskUpdate }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(task?.title);

  const handleTitleSave = () => {
    onTaskUpdate({ ...task, title });
    setIsEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setTitle(task?.title);
    setIsEditingTitle(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return 'bg-muted text-muted-foreground';
      case 'in-progress':
        return 'bg-warning text-warning-foreground';
      case 'review':
        return 'bg-accent text-accent-foreground';
      case 'done':
        return 'bg-success text-success-foreground';
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

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical':
        return 'AlertTriangle';
      case 'high':
        return 'ArrowUp';
      case 'medium':
        return 'Minus';
      case 'low':
        return 'ArrowDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 mr-4">
          {isEditingTitle ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e?.target?.value)}
                className="text-2xl font-bold bg-transparent border-b-2 border-primary focus:outline-none flex-1"
                autoFocus
                onKeyDown={(e) => {
                  if (e?.key === 'Enter') handleTitleSave();
                  if (e?.key === 'Escape') handleTitleCancel();
                }}
              />
              <Button variant="ghost" size="icon" onClick={handleTitleSave}>
                <Icon name="Check" size={16} />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleTitleCancel}>
                <Icon name="X" size={16} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 group">
              <h1 className="text-2xl font-bold text-foreground">{task?.title}</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditingTitle(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="Edit2" size={16} />
              </Button>
            </div>
          )}
          <p className="text-muted-foreground mt-1">Task ID: {task?.id}</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getPriorityIcon(task?.priority)} 
              size={16} 
              className={getPriorityColor(task?.priority)} 
            />
            <span className={`text-sm font-medium ${getPriorityColor(task?.priority)}`}>
              {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
            </span>
          </div>
          
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task?.status)}`}>
            {task?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="User" size={16} />
          <span>Created by {task?.reporter}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} />
          <span>Created {new Date(task.createdAt)?.toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} />
          <span>Updated {new Date(task.updatedAt)?.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;