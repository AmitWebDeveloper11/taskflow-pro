import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({ 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFilterChange, 
  onClearFilters,
  activeFiltersCount 
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'planning', label: 'Planning' },
    { value: 'on hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const teamMemberOptions = [
    { value: '', label: 'All Team Members' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'emily-davis', label: 'Emily Davis' },
    { value: 'alex-brown', label: 'Alex Brown' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const getActiveFilterChips = () => {
    const chips = [];
    
    if (filters?.status) {
      const statusLabel = statusOptions?.find(opt => opt?.value === filters?.status)?.label;
      chips?.push({ key: 'status', label: `Status: ${statusLabel}`, value: filters?.status });
    }
    
    if (filters?.priority) {
      const priorityLabel = priorityOptions?.find(opt => opt?.value === filters?.priority)?.label;
      chips?.push({ key: 'priority', label: `Priority: ${priorityLabel}`, value: filters?.priority });
    }
    
    if (filters?.teamMember) {
      const memberLabel = teamMemberOptions?.find(opt => opt?.value === filters?.teamMember)?.label;
      chips?.push({ key: 'teamMember', label: `Member: ${memberLabel}`, value: filters?.teamMember });
    }
    
    if (filters?.dateRange) {
      chips?.push({ key: 'dateRange', label: `Due: ${filters?.dateRange}`, value: filters?.dateRange });
    }
    
    return chips;
  };

  const removeFilter = (key) => {
    handleFilterChange(key, '');
  };

  const activeChips = getActiveFilterChips();

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Main Filter Row */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search projects by name or description..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Select
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
            placeholder="Status"
            className="w-32"
          />
          
          <Select
            options={priorityOptions}
            value={filters?.priority}
            onChange={(value) => handleFilterChange('priority', value)}
            placeholder="Priority"
            className="w-32"
          />

          <Button
            variant="outline"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            iconName={isAdvancedOpen ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Advanced
          </Button>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Clear ({activeFiltersCount})
            </Button>
          )}
        </div>
      </div>
      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Team Member"
              options={teamMemberOptions}
              value={filters?.teamMember}
              onChange={(value) => handleFilterChange('teamMember', value)}
              placeholder="Select member"
            />
            
            <Input
              label="Due Date From"
              type="date"
              value={filters?.dueDateFrom}
              onChange={(e) => handleFilterChange('dueDateFrom', e?.target?.value)}
            />
            
            <Input
              label="Due Date To"
              type="date"
              value={filters?.dueDateTo}
              onChange={(e) => handleFilterChange('dueDateTo', e?.target?.value)}
            />
            
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  handleFilterChange('dueDateFrom', '');
                  handleFilterChange('dueDateTo', '');
                }}
                className="w-full"
              >
                Clear Dates
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Active Filter Chips */}
      {activeChips?.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeChips?.map((chip) => (
            <div
              key={chip?.key}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              <span>{chip?.label}</span>
              <button
                onClick={() => removeFilter(chip?.key)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-smooth"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;