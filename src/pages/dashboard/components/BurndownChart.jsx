import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const BurndownChart = () => {
  const burndownData = [
    { day: 'Day 1', ideal: 100, actual: 100 },
    { day: 'Day 2', ideal: 90, actual: 95 },
    { day: 'Day 3', ideal: 80, actual: 88 },
    { day: 'Day 4', ideal: 70, actual: 82 },
    { day: 'Day 5', ideal: 60, actual: 75 },
    { day: 'Day 6', ideal: 50, actual: 68 },
    { day: 'Day 7', ideal: 40, actual: 58 },
    { day: 'Day 8', ideal: 30, actual: 45 },
    { day: 'Day 9', ideal: 20, actual: 35 },
    { day: 'Day 10', ideal: 10, actual: 22 },
    { day: 'Day 11', ideal: 0, actual: 12 },
    { day: 'Day 12', ideal: 0, actual: 8 },
    { day: 'Day 13', ideal: 0, actual: 3 },
    { day: 'Day 14', ideal: 0, actual: 0 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-1">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value} story points
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
            <h3 className="text-lg font-semibold text-foreground">Sprint Burndown</h3>
            <p className="text-sm text-muted-foreground">Sprint 3 - TaskFlow Mobile App</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-xs text-muted-foreground">Ideal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full" />
              <span className="text-xs text-muted-foreground">Actual</span>
            </div>
            <Icon name="TrendingDown" size={20} className="text-muted-foreground" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="w-full h-64" aria-label="Sprint Burndown Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={burndownData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="day" 
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
              <Line 
                type="monotone" 
                dataKey="ideal" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Ideal Burndown"
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="var(--color-warning)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-warning)', strokeWidth: 2 }}
                name="Actual Burndown"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">Days Remaining</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">8</p>
            <p className="text-xs text-muted-foreground">Story Points Left</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">92%</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurndownChart;