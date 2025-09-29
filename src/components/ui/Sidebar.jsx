import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      badge: null
    },
    {
      label: 'Projects',
      path: '/projects-list',
      icon: 'FolderOpen',
      badge: '12',
      children: [
        { label: 'TaskFlow Mobile App', path: '/project-detail', status: 'active' },
        { label: 'Website Redesign', path: '/project-detail', status: 'planning' },
        { label: 'API Integration', path: '/project-detail', status: 'review' },
      ]
    }
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location?.pathname === path;
    }
    return location?.pathname?.startsWith(path);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success';
      case 'planning':
        return 'bg-warning';
      case 'review':
        return 'bg-accent';
      default:
        return 'bg-muted-foreground';
    }
  };

  const handleProjectsToggle = () => {
    if (!isCollapsed) {
      setIsProjectsExpanded(!isProjectsExpanded);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-999 lg:hidden"
          onClick={onToggle}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] bg-card border-r border-border z-999
        transition-all duration-300 ease-smooth
        ${isCollapsed ? 'w-16' : 'w-72'}
        ${isCollapsed ? 'lg:w-16' : 'lg:w-72'}
        ${!isCollapsed ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Navigation
                </h2>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="hidden lg:flex"
              >
                <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
              </Button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems?.map((item) => (
              <div key={item?.path}>
                {/* Main Navigation Item */}
                <div className="relative">
                  <Link
                    to={item?.path}
                    className={`
                      flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium
                      transition-smooth hover-lift group
                      ${isActive(item?.path) 
                        ? 'bg-primary text-primary-foreground shadow-elevation-1' 
                        : 'text-foreground hover:bg-muted'
                      }
                    `}
                    title={isCollapsed ? item?.label : ''}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      className={`flex-shrink-0 ${
                        isActive(item?.path) ? 'text-primary-foreground' : 'text-muted-foreground'
                      }`}
                    />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item?.label}</span>
                        <div className="flex items-center space-x-2">
                          {item?.badge && (
                            <span className={`
                              px-2 py-0.5 text-xs rounded-full
                              ${isActive(item?.path) 
                                ? 'bg-primary-foreground/20 text-primary-foreground' 
                                : 'bg-muted text-muted-foreground'
                              }
                            `}>
                              {item?.badge}
                            </span>
                          )}
                          {item?.children && (
                            <Icon 
                              name={isProjectsExpanded ? "ChevronDown" : "ChevronRight"} 
                              size={16}
                              className={`transition-transform duration-200 ${
                                isActive(item?.path) ? 'text-primary-foreground' : 'text-muted-foreground'
                              }`}
                            />
                          )}
                        </div>
                      </>
                    )}
                  </Link>

                  {/* Expand/Collapse Button for Projects */}
                  {item?.children && !isCollapsed && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleProjectsToggle}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 w-6 h-6"
                    >
                      <Icon 
                        name={isProjectsExpanded ? "ChevronDown" : "ChevronRight"} 
                        size={12}
                      />
                    </Button>
                  )}
                </div>

                {/* Sub-navigation Items */}
                {item?.children && !isCollapsed && isProjectsExpanded && (
                  <div className="ml-6 mt-2 space-y-1 border-l border-border pl-4">
                    {item?.children?.map((child, index) => (
                      <Link
                        key={index}
                        to={child?.path}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm
                                 text-muted-foreground hover:text-foreground hover:bg-muted
                                 transition-smooth group"
                      >
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(child?.status)}`} />
                        <span className="flex-1 truncate">{child?.label}</span>
                      </Link>
                    ))}
                    
                    {/* Add New Project Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-muted-foreground hover:text-foreground mt-2"
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      New Project
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Zap" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">Pro Plan</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  5 of 10 projects used
                </p>
                <div className="w-full bg-background rounded-full h-2 mb-3">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '50%' }} />
                </div>
                <Button variant="outline" size="sm" fullWidth>
                  Upgrade Plan
                </Button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;