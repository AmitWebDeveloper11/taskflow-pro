import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onSidebarToggle, isSidebarCollapsed = false }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false);
  };

  const handleNotificationsToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logout clicked');
  };

  const notifications = [
    { id: 1, title: 'New task assigned', message: 'You have been assigned to "API Integration"', time: '5 min ago', unread: true },
    { id: 2, title: 'Project updated', message: 'TaskFlow Mobile App project has been updated', time: '1 hour ago', unread: true },
    { id: 3, title: 'Deadline reminder', message: 'UI Design task is due tomorrow', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo and Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSidebarToggle}
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>
          
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="CheckSquare" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">TaskFlow Pro</span>
          </Link>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search projects, tasks, or team members..."
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
            />
          </div>
        </div>

        {/* Right Section - Actions and Profile */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Search" size={20} />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationsToggle}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg shadow-elevation-2 z-1050 animate-slide-in">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">Notifications</h3>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Mark all read
                    </Button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div
                      key={notification?.id}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-muted transition-smooth cursor-pointer ${
                        notification?.unread ? 'bg-accent/5' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {notification?.unread && (
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {notification?.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification?.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification?.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" fullWidth>
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={handleProfileToggle}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-foreground">
                John Doe
              </span>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </Button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-12 w-56 bg-popover border border-border rounded-lg shadow-elevation-2 z-1050 animate-slide-in">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">Amit Pandey</p>
                  <p className="text-xs text-muted-foreground">john.doe@company.com</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-smooth flex items-center space-x-2">
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-smooth flex items-center space-x-2">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-smooth flex items-center space-x-2">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                </div>
                <div className="py-2 border-t border-border">
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-sm text-error hover:bg-muted transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;