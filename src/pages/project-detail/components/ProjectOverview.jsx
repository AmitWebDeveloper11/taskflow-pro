import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ProjectOverview = ({ project, metrics, recentActivity }) => {
  const velocityData = [
    { sprint: 'Sprint 1', planned: 25, completed: 23 },
    { sprint: 'Sprint 2', planned: 30, completed: 28 },
    { sprint: 'Sprint 3', planned: 28, completed: 30 },
    { sprint: 'Sprint 4', planned: 32, completed: 29 },
    { sprint: 'Sprint 5', planned: 35, completed: 33 }
  ];

  const taskDistribution = [
    { name: 'To Do', value: 12, color: '#64748B' },
    { name: 'In Progress', value: 8, color: '#D97706' },
    { name: 'Review', value: 5, color: '#10B981' },
    { name: 'Done', value: 23, color: '#059669' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'task_created':
        return 'Plus';
      case 'task_completed':
        return 'CheckCircle';
      case 'task_updated':
        return 'Edit';
      case 'comment_added':
        return 'MessageCircle';
      case 'file_uploaded':
        return 'Upload';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'task_created':
        return 'text-primary';
      case 'task_completed':
        return 'text-success';
      case 'task_updated':
        return 'text-warning';
      case 'comment_added':
        return 'text-accent';
      case 'file_uploaded':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
              <p className="text-2xl font-bold text-foreground">{metrics?.totalTasks}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckSquare" size={24} className="text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Icon name="TrendingUp" size={16} className="text-success mr-1" />
            <span className="text-success">+12%</span>
            <span className="text-muted-foreground ml-1">from last sprint</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-foreground">{metrics?.completedTasks}</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Icon name="TrendingUp" size={16} className="text-success mr-1" />
            <span className="text-success">+8%</span>
            <span className="text-muted-foreground ml-1">completion rate</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Team Velocity</p>
              <p className="text-2xl font-bold text-foreground">{metrics?.velocity}</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-accent" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Icon name="TrendingUp" size={16} className="text-success mr-1" />
            <span className="text-success">+5%</span>
            <span className="text-muted-foreground ml-1">story points/sprint</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Days Remaining</p>
              <p className="text-2xl font-bold text-foreground">{metrics?.daysRemaining}</p>
            </div>
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={24} className="text-warning" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Icon name="Clock" size={16} className="text-muted-foreground mr-1" />
            <span className="text-muted-foreground">Until project deadline</span>
          </div>
        </div>
      </div>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Velocity Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Sprint Velocity</h3>
            <Icon name="BarChart3" size={20} className="text-muted-foreground" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="sprint" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="planned" fill="var(--color-muted)" name="Planned" />
                <Bar dataKey="completed" fill="var(--color-primary)" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Task Distribution</h3>
            <Icon name="PieChart" size={20} className="text-muted-foreground" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {taskDistribution?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-sm text-muted-foreground">{item?.name}</span>
                <span className="text-sm font-medium text-foreground">{item?.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <Icon name="Activity" size={20} className="text-muted-foreground" />
        </div>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0`}>
                <Icon 
                  name={getActivityIcon(activity?.type)} 
                  size={16} 
                  className={getActivityColor(activity?.type)} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity?.user}</span> {activity?.action}
                  {activity?.target && (
                    <span className="font-medium text-primary"> {activity?.target}</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTimeAgo(activity?.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;