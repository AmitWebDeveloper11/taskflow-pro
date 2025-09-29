import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectsHeader = ({ projectCount, onCreateProject }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Title and Stats */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Projects
        </h1>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="FolderOpen" size={16} />
            <span>{projectCount} total projects</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} />
            <span>12 team members</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} />
            <span>Updated today</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
        >
          Export
        </Button>
        
        <Button
          variant="outline"
          iconName="Upload"
          iconPosition="left"
        >
          Import
        </Button>
        
        <Button
          variant="default"
          onClick={onCreateProject}
          iconName="Plus"
          iconPosition="left"
        >
          Create Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectsHeader;