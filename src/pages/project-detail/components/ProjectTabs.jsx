import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectTabs = ({ activeTab, onTabChange, taskCounts }) => {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'BarChart3',
      description: 'Project metrics and activity'
    },
    {
      id: 'board',
      label: 'Board',
      icon: 'Kanban',
      description: 'Kanban and Scrum views',
      badge: taskCounts?.total || 0
    },
    {
      id: 'backlog',
      label: 'Backlog',
      icon: 'List',
      description: 'Prioritized user stories',
      badge: taskCounts?.backlog || 0
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'TrendingUp',
      description: 'Analytics and insights'
    }
  ];

  return (
    <div className="bg-card border-b border-border">
      <div className="flex items-center space-x-1 px-6">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-all hover-lift ${
              activeTab === tab?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
            {tab?.badge !== undefined && tab?.badge > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab?.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectTabs;