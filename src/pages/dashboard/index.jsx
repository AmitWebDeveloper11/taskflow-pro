import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import MetricsCard from './components/MetricsCard';
import ActivityFeed from './components/ActivityFeed';
import TasksSummary from './components/TasksSummary';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import BurndownChart from './components/BurndownChart';
import VelocityChart from './components/VelocityChart';
import QuickActions from './components/QuickActions';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('7days');
  const [selectedProject, setSelectedProject] = useState('all');
  const navigate = useNavigate();

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      console.log('Refreshing dashboard data...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const metricsData = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: "FolderOpen",
      color: "primary"
    },
    {
      title: "Overdue Tasks",
      value: "3",
      change: "-5",
      changeType: "positive",
      icon: "AlertTriangle",
      color: "error"
    },
    {
      title: "Team Workload",
      value: "87%",
      change: "+12%",
      changeType: "positive",
      icon: "Users",
      color: "warning"
    },
    {
      title: "Sprint Progress",
      value: "92%",
      change: "+8%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "success"
    }
  ];

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  const projectOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'taskflow', label: 'TaskFlow Mobile App' },
    { value: 'website', label: 'Website Redesign' },
    { value: 'api', label: 'API Integration' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} isSidebarCollapsed={isSidebarCollapsed} />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
      {/* Sidebar के Collapsed होने पर main कंटेंट की जगह एडजस्ट करें */}
      <main className={`
        pt-16 transition-all duration-300 ease-smooth
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}
      `}>
        {/* मोबाइल के लिए कम पैडिंग (p-4), बड़ी स्क्रीन के लिए ज़्यादा (lg:p-6) */}
        <div className="p-4 lg:p-6">
          {/* Breadcrumb - इसे मोबाइल पर फुल-विड्थ स्पेसिंग मिलेगी */}
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8">
            <div>
              {/* मोबाइल पर h1 टेक्स्ट को थोड़ा छोटा करें */}
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">Dashboard</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Welcome back! Here's what's happening with your projects today.
              </p>
            </div>
            
            {/* Filter Controls */}
            {/* मोबाइल पर कंट्रोल्स को flex-wrap और gap-3 के साथ मल्टीपल लाइन में रखें */}
            <div className="flex flex-wrap items-center gap-3 mt-4 lg:mt-0 lg:space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e?.target?.value)}
                  className="bg-card border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {dateRangeOptions?.map((option) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={16} className="text-muted-foreground" />
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e?.target?.value)}
                  className="bg-card border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {projectOptions?.map((option) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location?.reload()}
                className="w-full sm:w-auto" // मोबाइल पर फुल-विड्थ बटन
              >
                <Icon name="RefreshCw" size={16} className="mr-2" />
                Refresh
              </Button>
            </div>
          </div>
          
          {/* Metrics Cards */}
          {/* मोबाइल पर 1 कॉलम, sm पर 2, lg पर 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>
          
          {/* Main Content Grid (Activity Feed, Tasks, Deadlines) */}
          {/* मोबाइल पर सभी 1 कॉलम में, lg पर 3 कॉलम में */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 sm:mb-8">
            {/* Activity Feed */}
            <div className="lg:col-span-1">
              <ActivityFeed />
            </div>
            
            {/* Tasks Summary */}
            <div className="lg:col-span-1">
              <TasksSummary />
            </div>
            
            {/* Upcoming Deadlines */}
            <div className="lg:col-span-1">
              <UpcomingDeadlines />
            </div>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6 sm:mb-8">
            <BurndownChart />
            <VelocityChart />
          </div>
          
          {/* Quick Actions & Team Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuickActions />
            
            {/* Team Status */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-4 sm:p-6 border-b border-border"> {/* मोबाइल पर p-4 करें */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Team Status</h3>
                  <Icon name="Users" size={20} className="text-muted-foreground" />
                </div>
              </div>
              
              <div className="p-4 sm:p-6"> {/* मोबाइल पर p-4 करें */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-sm font-medium text-foreground">5 members online</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </div>
                  
                  {/* मोबाइल पर 1 कॉलम, sm पर 2 कॉलम में stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg"> {/* स्टाइलिंग जोड़ी गई */}
                      <p className="text-2xl font-bold text-foreground">24</p>
                      <p className="text-xs text-muted-foreground">Tasks in Progress</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg"> {/* स्टाइलिंग जोड़ी गई */}
                      <p className="text-2xl font-bold text-success">18</p>
                      <p className="text-xs text-muted-foreground">Completed Today</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <Button fullWidth onClick={() => navigate('/projects-list')}> {/* fullWidth prop जोड़ा गया */}
                      <Icon name="Users" size={16} className="mr-2" />
                      Manage Team
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;