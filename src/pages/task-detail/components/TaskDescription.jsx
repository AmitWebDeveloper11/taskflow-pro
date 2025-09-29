import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskDescription = ({ task, onTaskUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task?.description);

  const handleSave = () => {
    onTaskUpdate({ ...task, description });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDescription(task?.description);
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="FileText" size={20} />
          <span>Description</span>
        </h3>
        {!isEditing && (
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <Icon name="Edit2" size={16} className="mr-2" />
            Edit
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e?.target?.value)}
            className="w-full h-40 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Add a description..."
            autoFocus
          />
          <div className="flex items-center space-x-2">
            <Button variant="default" size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="prose prose-sm max-w-none">
          {task?.description ? (
            <div className="text-foreground whitespace-pre-wrap">
              {task?.description}
            </div>
          ) : (
            <div className="text-muted-foreground italic">
              No description provided. Click Edit to add one.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDescription;