import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectsStats = ({ projects }) => {
  const stats = {
    total: projects?.length,
    active: projects?.filter(p => p?.status?.toLowerCase() === 'active')?.length,
    planning: projects?.filter(p => p?.status?.toLowerCase() === 'planning')?.length,
    completed: projects?.filter(p => p?.status?.toLowerCase() === 'completed')?.length,
    onHold: projects?.filter(p => p?.status?.toLowerCase() === 'on hold')?.length
  };

  const avgProgress = projects?.length > 0 
    ? Math.round(projects?.reduce((sum, p) => sum + p?.progress, 0) / projects?.length)
    : 0;

  const statCards = [
    {
      label: 'Total Projects',
      value: stats?.total,
      icon: 'FolderOpen',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Active',
      value: stats?.active,
      icon: 'Play',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Planning',
      value: stats?.planning,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Completed',
      value: stats?.completed,
      icon: 'CheckCircle',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Avg Progress',
      value: `${avgProgress}%`,
      icon: 'TrendingUp',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover-lift"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">
                {stat?.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat?.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsStats;