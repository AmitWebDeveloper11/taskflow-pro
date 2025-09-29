import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import TaskHeader from './components/TaskHeader';
import TaskDescription from './components/TaskDescription';
import AcceptanceCriteria from './components/AcceptanceCriteria';
import TaskSidebar from './components/TaskSidebar';
import SubtaskSection from './components/SubtaskSection';
import ActivityTimeline from './components/ActivityTimeline';
import FileAttachments from './components/FileAttachments';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TaskDetail = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [task, setTask] = useState({
    id: 'TSK-001',
    title: 'Implement User Authentication API',
    description: `Develop a comprehensive user authentication system that supports multiple authentication methods including email/password, social login (Google, GitHub), and two-factor authentication.\n\nThe API should include the following endpoints:\n• POST /auth/register - User registration\n• POST /auth/login - User login\n• POST /auth/logout - User logout\n• POST /auth/refresh - Token refresh\n• POST /auth/forgot-password - Password reset\n• POST /auth/verify-email - Email verification\n\nSecurity requirements:\n• JWT token implementation\n• Password hashing with bcrypt\n• Rate limiting for authentication attempts\n• Input validation and sanitization\n• CORS configuration\n• Secure cookie handling`,
    status: 'in-progress',
    priority: 'high',
    assignee: 'John Doe',
    reporter: 'Jane Smith',
    dueDate: '2025-09-15',
    storyPoints: 8,
    timeLogged: '12h 30m',
    timeEstimated: '20h',
    labels: ['backend', 'security', 'api'],
    createdAt: '2025-08-20T10:00:00Z',
    updatedAt: '2025-08-26T09:01:39Z',
    acceptanceCriteria: [
      {
        id: 1,
        text: 'User can register with email and password',
        completed: true
      },
      {
        id: 2,
        text: 'User can login with valid credentials',
        completed: true
      },
      {
        id: 3,
        text: 'JWT tokens are properly generated and validated',
        completed: false
      },
      {
        id: 4,
        text: 'Password reset functionality works correctly',
        completed: false
      },
      {
        id: 5,
        text: 'Two-factor authentication is implemented',
        completed: false
      }
    ],
    subtasks: [
      {
        id: 1,
        title: 'Set up database schema for users',
        completed: true,
        createdAt: '2025-08-21T09:00:00Z'
      },
      {
        id: 2,
        title: 'Implement password hashing',
        completed: true,
        createdAt: '2025-08-22T10:30:00Z'
      },
      {
        id: 3,
        title: 'Create JWT token service',
        completed: false,
        createdAt: '2025-08-23T14:15:00Z'
      },
      {
        id: 4,
        title: 'Add rate limiting middleware',
        completed: false,
        createdAt: '2025-08-24T11:45:00Z'
      }
    ],
    attachments: [
      {
        id: 1,
        name: 'API_Documentation.pdf',
        size: '2.4 MB',
        type: 'pdf',
        uploadedBy: 'John Doe',
        uploadedAt: new Date(Date.now() - 86400000),
        url: '#'
      },
      {
        id: 2,
        name: 'auth_flow_diagram.png',
        size: '856 KB',
        type: 'image',
        uploadedBy: 'Sarah Wilson',
        uploadedAt: new Date(Date.now() - 172800000),
        url: '#'
      }
    ]
  });

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTask(updatedTask);
    // In a real app, this would make an API call to update the task
    console.log('Task updated:', updatedTask);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Projects', path: '/projects-list' },
    { label: 'TaskFlow Mobile App', path: '/project-detail' },
    { label: 'Tasks', path: '/project-detail' },
    { label: task?.title, path: '/task-detail' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} isSidebarCollapsed={isSidebarCollapsed} />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <main className={`
        pt-16 transition-all duration-300 ease-smooth
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}
      `}>
        <div className="p-6">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Task Header */}
          <TaskHeader task={task} onTaskUpdate={handleTaskUpdate} />

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* Left Column - Main Content */}
            <div className="flex-1 space-y-6">
              {/* Task Description */}
              <TaskDescription task={task} onTaskUpdate={handleTaskUpdate} />

              {/* Acceptance Criteria */}
              <AcceptanceCriteria task={task} onTaskUpdate={handleTaskUpdate} />

              {/* Subtasks */}
              <SubtaskSection task={task} onTaskUpdate={handleTaskUpdate} />

              {/* File Attachments */}
              <FileAttachments task={task} onTaskUpdate={handleTaskUpdate} />

              {/* Activity Timeline */}
              <ActivityTimeline task={task} />
            </div>

            {/* Right Column - Sidebar */}
            <TaskSidebar task={task} onTaskUpdate={handleTaskUpdate} />
          </div>

          {/* Action Buttons */}
          <div className="fixed bottom-6 right-6 flex items-center space-x-3 lg:hidden">
            <Button variant="outline" size="icon">
              <Icon name="Share" size={20} />
            </Button>
            <Button variant="outline" size="icon">
              <Icon name="Star" size={20} />
            </Button>
            <Button variant="default">
              <Icon name="Edit" size={16} className="mr-2" />
              Edit Task
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskDetail;