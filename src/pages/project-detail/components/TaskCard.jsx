import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const TaskCard = ({ task, isDragging = false, onTaskClick }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'border-l-error bg-error/5';
      case 'high':
        return 'border-l-warning bg-warning/5';
      case 'medium':
        return 'border-l-accent bg-accent/5';
      case 'low':
        return 'border-l-muted-foreground bg-muted/5';
      default:
        return 'border-l-muted-foreground bg-muted/5';
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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'story':
        return 'BookOpen';
      case 'bug':
        return 'Bug';
      case 'task':
        return 'CheckSquare';
      case 'epic':
        return 'Zap';
      default:
        return 'CheckSquare';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'story':
        return 'text-accent';
      case 'bug':
        return 'text-error';
      case 'task':
        return 'text-primary';
      case 'epic':
        return 'text-warning';
      default:
        return 'text-primary';
    }
  };

  const isOverdue = task?.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div
      className={`bg-card border border-border rounded-lg p-3 cursor-pointer transition-all hover-lift border-l-4 ${
        getPriorityColor(task?.priority)
      } ${isDragging ? 'opacity-50 rotate-2 shadow-elevation-2' : ''}`}
      onClick={() => onTaskClick?.(task)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon 
            name={getTypeIcon(task?.type)} 
            size={14} 
            className={getTypeColor(task?.type)} 
          />
          <span className="text-xs text-muted-foreground font-medium">
            {task?.key}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon 
            name={getPriorityIcon(task?.priority)} 
            size={12} 
            className={`${
              task?.priority === 'critical' ? 'text-error' :
              task?.priority === 'high' ? 'text-warning' :
              task?.priority === 'medium'? 'text-accent' : 'text-muted-foreground'
            }`}
          />
        </div>
      </div>
      {/* Title */}
      <Link 
        to="/task-detail" 
        className="block mb-3 hover:text-primary transition-colors"
        onClick={(e) => e?.stopPropagation()}
      >
        <h4 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
          {task?.title}
        </h4>
      </Link>
      {/* Labels */}
      {task?.labels && task?.labels?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task?.labels?.slice(0, 3)?.map((label, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
            >
              {label}
            </span>
          ))}
          {task?.labels?.length > 3 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
              +{task?.labels?.length - 3}
            </span>
          )}
        </div>
      )}
      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Assignee */}
          {task?.assignee && (
            <div className="flex items-center space-x-1">
              <img
                src={task?.assignee?.avatar}
                alt={task?.assignee?.name}
                className="w-6 h-6 rounded-full object-cover"
                title={task?.assignee?.name}
              />
            </div>
          )}

          {/* Story Points */}
          {task?.storyPoints && (
            <div className="flex items-center space-x-1">
              <Icon name="Zap" size={12} className="text-accent" />
              <span className="text-xs text-muted-foreground">{task?.storyPoints}</span>
            </div>
          )}

          {/* Comments */}
          {task?.commentsCount > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{task?.commentsCount}</span>
            </div>
          )}

          {/* Attachments */}
          {task?.attachmentsCount > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="Paperclip" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{task?.attachmentsCount}</span>
            </div>
          )}
        </div>

        {/* Due Date */}
        {task?.dueDate && (
          <div className={`flex items-center space-x-1 ${
            isOverdue ? 'text-error' : 'text-muted-foreground'
          }`}>
            <Icon name="Calendar" size={12} />
            <span className="text-xs">
              {new Date(task.dueDate)?.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
        )}
      </div>
      {/* Subtasks Progress */}
      {task?.subtasks && task?.subtasks?.total > 0 && (
        <div className="mt-3 pt-2 border-t border-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Subtasks</span>
            <span className="text-xs text-muted-foreground">
              {task?.subtasks?.completed}/{task?.subtasks?.total}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-300" 
              style={{ width: `${(task?.subtasks?.completed / task?.subtasks?.total) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;