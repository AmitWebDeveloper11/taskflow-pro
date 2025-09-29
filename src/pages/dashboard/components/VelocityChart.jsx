import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const VelocityChart = () => {
  const velocityData = [
    { sprint: 'Sprint 1', planned: 45, completed: 42, committed: 45 },
    { sprint: 'Sprint 2', planned: 50, completed: 48, committed: 50 },
    { sprint: 'Sprint 3', planned: 55, completed: 52, committed: 55 },
    { sprint: 'Sprint 4', planned: 48, completed: 46, committed: 48 },
    { sprint: 'Sprint 5', planned: 52, completed: 55, committed: 52 },
    { sprint: 'Sprint 6', planned: 58, completed: 54, committed: 58 }
  ];

  const averageVelocity = Math.round(
    velocityData?.reduce((sum, sprint) => sum + sprint?.completed, 0) / velocityData?.length
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-1">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value} points
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Team Velocity</h3>
            <p className="text-sm text-muted-foreground">Last 6 sprints performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-xs text-muted-foreground">Planned</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <Icon name="BarChart3" size={20} className="text-muted-foreground" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="w-full h-64" aria-label="Team Velocity Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={velocityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="sprint" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{ value: 'Story Points', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="planned" 
                fill="var(--color-primary)" 
                radius={[4, 4, 0, 0]}
                name="Planned"
                opacity={0.7}
              />
              <Bar 
                dataKey="completed" 
                fill="var(--color-success)" 
                radius={[4, 4, 0, 0]}
                name="Completed"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{averageVelocity}</p>
            <p className="text-xs text-muted-foreground">Avg Velocity</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">96%</p>
            <p className="text-xs text-muted-foreground">Delivery Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">+8%</p>
            <p className="text-xs text-muted-foreground">Improvement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VelocityChart;