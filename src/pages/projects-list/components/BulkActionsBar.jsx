import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');

  const bulkActionOptions = [
    { value: '', label: 'Choose action...' },
    { value: 'archive', label: 'Archive Projects' },
    { value: 'duplicate', label: 'Duplicate Projects' },
    { value: 'change-status', label: 'Change Status' },
    { value: 'change-priority', label: 'Change Priority' },
    { value: 'assign-team', label: 'Assign Team Member' },
    { value: 'export', label: 'Export Selected' }
  ];

  const handleApplyAction = () => {
    if (selectedAction) {
      onBulkAction(selectedAction);
      setSelectedAction('');
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-4 min-w-96">
        <div className="flex items-center justify-between gap-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} color="white" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedCount} project{selectedCount !== 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-muted-foreground">
                Choose an action to apply to selected projects
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Select
              options={bulkActionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Choose action..."
              className="w-48"
            />
            
            <Button
              variant="default"
              onClick={handleApplyAction}
              disabled={!selectedAction}
              iconName="Play"
              iconPosition="left"
            >
              Apply
            </Button>
            
            <Button
              variant="ghost"
              onClick={onClearSelection}
              iconName="X"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Quick actions:</span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBulkAction('archive')}
            iconName="Archive"
            iconPosition="left"
            className="text-xs"
          >
            Archive
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBulkAction('duplicate')}
            iconName="Copy"
            iconPosition="left"
            className="text-xs"
          >
            Duplicate
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBulkAction('export')}
            iconName="Download"
            iconPosition="left"
            className="text-xs"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;