import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AcceptanceCriteria = ({ task, onTaskUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [criteria, setCriteria] = useState(task?.acceptanceCriteria || []);
  const [newCriterion, setNewCriterion] = useState('');

  const handleSave = () => {
    onTaskUpdate({ ...task, acceptanceCriteria: criteria });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCriteria(task?.acceptanceCriteria || []);
    setIsEditing(false);
  };

  const addCriterion = () => {
    if (newCriterion?.trim()) {
      setCriteria([...criteria, { id: Date.now(), text: newCriterion?.trim(), completed: false }]);
      setNewCriterion('');
    }
  };

  const removeCriterion = (id) => {
    setCriteria(criteria?.filter(c => c?.id !== id));
  };

  const updateCriterion = (id, text) => {
    setCriteria(criteria?.map(c => c?.id === id ? { ...c, text } : c));
  };

  const toggleCriterion = (id) => {
    const updatedCriteria = criteria?.map(c => 
      c?.id === id ? { ...c, completed: !c?.completed } : c
    );
    setCriteria(updatedCriteria);
    onTaskUpdate({ ...task, acceptanceCriteria: updatedCriteria });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="CheckSquare" size={20} />
          <span>Acceptance Criteria</span>
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
          {criteria?.map((criterion, index) => (
            <div key={criterion?.id} className="flex items-center space-x-2">
              <input
                type="text"
                value={criterion?.text}
                onChange={(e) => updateCriterion(criterion?.id, e?.target?.value)}
                className="flex-1 p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter acceptance criterion..."
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCriterion(criterion?.id)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          ))}
          
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newCriterion}
              onChange={(e) => setNewCriterion(e?.target?.value)}
              className="flex-1 p-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Add new criterion..."
              onKeyDown={(e) => e?.key === 'Enter' && addCriterion()}
            />
            <Button variant="outline" size="sm" onClick={addCriterion}>
              <Icon name="Plus" size={16} />
            </Button>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Button variant="default" size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {criteria?.length > 0 ? (
            criteria?.map((criterion) => (
              <div key={criterion?.id} className="flex items-start space-x-3">
                <Checkbox
                  checked={criterion?.completed}
                  onChange={() => toggleCriterion(criterion?.id)}
                  className="mt-0.5"
                />
                <span className={`text-sm ${criterion?.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {criterion?.text}
                </span>
              </div>
            ))
          ) : (
            <div className="text-muted-foreground italic">
              No acceptance criteria defined. Click Edit to add some.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AcceptanceCriteria;