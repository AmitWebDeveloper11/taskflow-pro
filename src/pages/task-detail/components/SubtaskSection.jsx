import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SubtaskSection = ({ task, onTaskUpdate }) => {
  const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [newSubtask, setNewSubtask] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const addSubtask = () => {
    if (newSubtask?.trim()) {
      const updatedSubtasks = [
        ...subtasks,
        {
          id: Date.now(),
          title: newSubtask?.trim(),
          completed: false,
          createdAt: new Date()?.toISOString()
        }
      ];
      setSubtasks(updatedSubtasks);
      onTaskUpdate({ ...task, subtasks: updatedSubtasks });
      setNewSubtask('');
      setIsAdding(false);
    }
  };

  const toggleSubtask = (id) => {
    const updatedSubtasks = subtasks?.map(subtask =>
      subtask?.id === id ? { ...subtask, completed: !subtask?.completed } : subtask
    );
    setSubtasks(updatedSubtasks);
    onTaskUpdate({ ...task, subtasks: updatedSubtasks });
  };

  const deleteSubtask = (id) => {
    const updatedSubtasks = subtasks?.filter(subtask => subtask?.id !== id);
    setSubtasks(updatedSubtasks);
    onTaskUpdate({ ...task, subtasks: updatedSubtasks });
  };

  const completedCount = subtasks?.filter(s => s?.completed)?.length;
  const totalCount = subtasks?.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="List" size={20} />
          <h3 className="text-lg font-semibold text-foreground">Subtasks</h3>
          {totalCount > 0 && (
            <span className="text-sm text-muted-foreground">
              ({completedCount}/{totalCount})
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAdding(true)}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Add Subtask
        </Button>
      </div>
      {totalCount > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
      <div className="space-y-3">
        {subtasks?.map((subtask) => (
          <div
            key={subtask?.id}
            className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth"
          >
            <Checkbox
              checked={subtask?.completed}
              onChange={() => toggleSubtask(subtask?.id)}
            />
            <span
              className={`flex-1 text-sm ${
                subtask?.completed
                  ? 'line-through text-muted-foreground'
                  : 'text-foreground'
              }`}
            >
              {subtask?.title}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteSubtask(subtask?.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icon name="Trash2" size={14} />
            </Button>
          </div>
        ))}

        {isAdding && (
          <div className="flex items-center space-x-2 p-3 rounded-lg border border-border bg-muted/20">
            <input
              type="text"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e?.target?.value)}
              placeholder="Enter subtask title..."
              className="flex-1 bg-transparent border-none outline-none text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e?.key === 'Enter') addSubtask();
                if (e?.key === 'Escape') {
                  setIsAdding(false);
                  setNewSubtask('');
                }
              }}
            />
            <Button variant="ghost" size="icon" onClick={addSubtask}>
              <Icon name="Check" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsAdding(false);
                setNewSubtask('');
              }}
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
        )}

        {totalCount === 0 && !isAdding && (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="List" size={48} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No subtasks yet</p>
            <p className="text-xs">Break down this task into smaller pieces</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubtaskSection;