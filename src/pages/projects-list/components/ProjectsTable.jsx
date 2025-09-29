import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProjectsTable = ({ 
  projects, 
  selectedProjects, 
  onSelectProject, 
  onSelectAll, 
  sortConfig, 
  onSort,
  onBulkAction 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'planning':
        return 'bg-warning text-warning-foreground';
      case 'on hold':
        return 'bg-secondary text-secondary-foreground';
      case 'completed':
        return 'bg-accent text-accent-foreground';
      case 'cancelled':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
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

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-foreground" />
      : <Icon name="ArrowDown" size={14} className="text-foreground" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isAllSelected = selectedProjects?.length === projects?.length;
  const isIndeterminate = selectedProjects?.length > 0 && selectedProjects?.length < projects?.length;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={onSelectAll}
                />
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Project Name</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Status</span>
                  {getSortIcon('status')}
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => onSort('progress')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Progress</span>
                  {getSortIcon('progress')}
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <span className="text-sm font-medium text-foreground">Team</span>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => onSort('dueDate')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Due Date</span>
                  {getSortIcon('dueDate')}
                </button>
              </th>
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => onSort('priority')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Priority</span>
                  {getSortIcon('priority')}
                </button>
              </th>
              <th className="w-16 px-4 py-3">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => (
              <tr
                key={project?.id}
                className="border-b border-border hover:bg-muted/30 transition-smooth"
                onMouseEnter={() => setHoveredRow(project?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-4">
                  <Checkbox
                    checked={selectedProjects?.includes(project?.id)}
                    onChange={() => onSelectProject(project?.id)}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="FolderOpen" size={16} className="text-primary" />
                    </div>
                    <div>
                      <Link
                        to="/project-detail"
                        className="font-medium text-foreground hover:text-primary transition-smooth"
                      >
                        {project?.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {project?.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
                    {project?.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project?.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-foreground min-w-[3rem] text-right">
                      {project?.progress}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex -space-x-2">
                    {project?.team?.slice(0, 4)?.map((member, index) => (
                      <div
                        key={member?.id}
                        className="w-8 h-8 rounded-full border-2 border-card overflow-hidden"
                        title={member?.name}
                      >
                        <Image
                          src={member?.avatar}
                          alt={member?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {project?.team?.length > 4 && (
                      <div className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          +{project?.team?.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {formatDate(project?.dueDate)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(project?.priority)?.replace('text-', 'bg-')}`} />
                    <span className={`text-sm font-medium ${getPriorityColor(project?.priority)}`}>
                      {project?.priority}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-1">
                    {hoveredRow === project?.id && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          title="Edit Project"
                        >
                          <Icon name="Edit" size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          title="Duplicate Project"
                        >
                          <Icon name="Copy" size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 text-error hover:text-error"
                          title="Archive Project"
                        >
                          <Icon name="Archive" size={14} />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;