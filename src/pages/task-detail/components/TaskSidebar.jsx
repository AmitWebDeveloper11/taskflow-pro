import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const TaskSidebar = ({ task, onTaskUpdate }) => {
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);

  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'review', label: 'In Review' },
    { value: 'done', label: 'Done' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const assigneeOptions = [
    { value: 'john.doe', label: 'John Doe' },
    { value: 'jane.smith', label: 'Jane Smith' },
    { value: 'mike.johnson', label: 'Mike Johnson' },
    { value: 'sarah.wilson', label: 'Sarah Wilson' }
  ];

  const handleStatusChange = (status) => {
    onTaskUpdate({ ...task, status });
  };

  const handlePriorityChange = (priority) => {
    onTaskUpdate({ ...task, priority });
  };

  const handleAssigneeChange = (assignee) => {
    onTaskUpdate({ ...task, assignee });
    setIsEditingAssignee(false);
  };

  const handleDueDateChange = (dueDate) => {
    onTaskUpdate({ ...task, dueDate });
    setIsEditingDueDate(false);
  };

  const handleStoryPointsChange = (storyPoints) => {
    onTaskUpdate({ ...task, storyPoints: parseInt(storyPoints) || 0 });
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

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Status */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Activity" size={16} />
          <span>Status</span>
        </h4>
        <Select
          options={statusOptions}
          value={task?.status}
          onChange={handleStatusChange}
          className="w-full"
        />
      </div>
      {/* Priority */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Flag" size={16} />
          <span>Priority</span>
        </h4>
        <Select
          options={priorityOptions}
          value={task?.priority}
          onChange={handlePriorityChange}
          className="w-full"
        />
      </div>
      {/* Assignee */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="User" size={16} />
          <span>Assignee</span>
        </h4>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{task?.assignee}</p>
            <p className="text-xs text-muted-foreground">Assigned</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditingAssignee(!isEditingAssignee)}
          >
            <Icon name="Edit2" size={14} />
          </Button>
        </div>
        {isEditingAssignee && (
          <div className="mt-3">
            <Select
              options={assigneeOptions}
              value={task?.assignee}
              onChange={handleAssigneeChange}
              placeholder="Select assignee..."
            />
          </div>
        )}
      </div>
      {/* Due Date */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Calendar" size={16} />
          <span>Due Date</span>
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">
            {task?.dueDate ? new Date(task.dueDate)?.toLocaleDateString() : 'Not set'}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditingDueDate(!isEditingDueDate)}
          >
            <Icon name="Edit2" size={14} />
          </Button>
        </div>
        {isEditingDueDate && (
          <div className="mt-3">
            <Input
              type="date"
              value={task?.dueDate ? new Date(task.dueDate)?.toISOString()?.split('T')?.[0] : ''}
              onChange={(e) => handleDueDateChange(e?.target?.value)}
            />
          </div>
        )}
      </div>
      {/* Story Points */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Target" size={16} />
          <span>Story Points</span>
        </h4>
        <Input
          type="number"
          value={task?.storyPoints || ''}
          onChange={(e) => handleStoryPointsChange(e?.target?.value)}
          placeholder="Enter points..."
          min="0"
          max="100"
        />
      </div>
      {/* Labels */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Tag" size={16} />
          <span>Labels</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {task?.labels?.map((label, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
            >
              {label}
            </span>
          ))}
          <Button variant="ghost" size="sm" className="text-xs">
            <Icon name="Plus" size={12} className="mr-1" />
            Add Label
          </Button>
        </div>
      </div>
      {/* Time Tracking */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Clock" size={16} />
          <span>Time Tracking</span>
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Logged:</span>
            <span className="text-foreground">{task?.timeLogged || '0h'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated:</span>
            <span className="text-foreground">{task?.timeEstimated || '0h'}</span>
          </div>
          <Button variant="outline" size="sm" fullWidth className="mt-2">
            <Icon name="Play" size={14} className="mr-2" />
            Start Timer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskSidebar;