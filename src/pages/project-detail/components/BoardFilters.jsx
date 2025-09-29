import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BoardFilters = ({ 
  filters, 
  onFiltersChange, 
  teamMembers, 
  onViewChange, 
  currentView,
  onClearFilters 
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const assigneeOptions = [
    { value: '', label: 'All Assignees' },
    { value: 'unassigned', label: 'Unassigned' },
    ...teamMembers?.map(member => ({
      value: member?.id,
      label: member?.name
    }))
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'story', label: 'Story' },
    { value: 'bug', label: 'Bug' },
    { value: 'task', label: 'Task' },
    { value: 'epic', label: 'Epic' }
  ];

  const labelOptions = [
    { value: '', label: 'All Labels' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'ui-ux', label: 'UI/UX' },
    { value: 'testing', label: 'Testing' },
    { value: 'documentation', label: 'Documentation' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value && value !== '');

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="px-6 py-4">
        {/* Top Row - Search and View Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={filters?.search || ''}
                onChange={(e) => handleFilterChange('search', e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center space-x-2">
              <Button
                variant={filters?.assignedToMe ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('assignedToMe', !filters?.assignedToMe)}
              >
                <Icon name="User" size={14} className="mr-1" />
                My Tasks
              </Button>
              
              <Button
                variant={filters?.overdue ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('overdue', !filters?.overdue)}
              >
                <Icon name="Clock" size={14} className="mr-1" />
                Overdue
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={currentView === 'kanban' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange('kanban')}
                className="px-3"
              >
                <Icon name="Kanban" size={14} className="mr-1" />
                Kanban
              </Button>
              <Button
                variant={currentView === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange('list')}
                className="px-3"
              >
                <Icon name="List" size={14} className="mr-1" />
                List
              </Button>
            </div>

            {/* Advanced Filters Toggle */}
            <Button
              variant={isFiltersExpanded ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            >
              <Icon name="Filter" size={14} className="mr-1" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 w-2 h-2 bg-primary rounded-full" />
              )}
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {isFiltersExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
            <Select
              label="Priority"
              options={priorityOptions}
              value={filters?.priority || ''}
              onChange={(value) => handleFilterChange('priority', value)}
              className="w-full"
            />

            <Select
              label="Assignee"
              options={assigneeOptions}
              value={filters?.assignee || ''}
              onChange={(value) => handleFilterChange('assignee', value)}
              className="w-full"
            />

            <Select
              label="Type"
              options={typeOptions}
              value={filters?.type || ''}
              onChange={(value) => handleFilterChange('type', value)}
              className="w-full"
            />

            <Select
              label="Label"
              options={labelOptions}
              value={filters?.label || ''}
              onChange={(value) => handleFilterChange('label', value)}
              className="w-full"
            />

            {hasActiveFilters && (
              <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                >
                  <Icon name="X" size={14} className="mr-1" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardFilters;