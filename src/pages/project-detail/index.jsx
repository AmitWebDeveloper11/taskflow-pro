import React, { useState, useCallback } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProjectHeader from './components/ProjectHeader';
import ProjectSidebar from './components/ProjectSidebar';
import ProjectTabs from './components/ProjectTabs';
import KanbanBoard from './components/KanbanBoard';
import BoardFilters from './components/BoardFilters';
import ProjectOverview from './components/ProjectOverview';

const ProjectDetail = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('board');
  const [currentView, setCurrentView] = useState('kanban');
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [selectedEpic, setSelectedEpic] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    priority: '',
    assignee: '',
    type: '',
    label: '',
    assignedToMe: false,
    overdue: false
  });

  // Mock project data
  const project = {
    id: 1,
    name: "TaskFlow Mobile App",
    description: "A comprehensive mobile application for task management and team collaboration with real-time synchronization and offline capabilities.",
    status: "active",
    priority: "high",
    dueDate: "March 15, 2025",
    teamSize: 8,
    completedTasks: 23,
    totalTasks: 48,
    progress: 48
  };

  // Mock sprints data
  const sprints = [
    {
      id: 1,
      name: "Sprint 5 - Mobile UI Polish",
      startDate: "Feb 12, 2025",
      endDate: "Feb 26, 2025",
      completedTasks: 8,
      totalTasks: 12,
      progress: 67
    },
    {
      id: 2,
      name: "Sprint 4 - API Integration",
      startDate: "Jan 29, 2025",
      endDate: "Feb 11, 2025",
      completedTasks: 10,
      totalTasks: 10,
      progress: 100
    },
    {
      id: 3,
      name: "Sprint 6 - Testing & QA",
      startDate: "Feb 27, 2025",
      endDate: "Mar 12, 2025",
      completedTasks: 0,
      totalTasks: 15,
      progress: 0
    }
  ];

  // Mock epics data
  const epics = [
    {
      id: 1,
      name: "User Authentication System",
      description: "Complete user authentication with social login, 2FA, and password recovery",
      color: "bg-primary",
      completedStories: 8,
      totalStories: 12,
      progress: 67
    },
    {
      id: 2,
      name: "Task Management Core",
      description: "Core task creation, editing, assignment, and tracking functionality",
      color: "bg-accent",
      completedStories: 15,
      totalStories: 20,
      progress: 75
    },
    {
      id: 3,
      name: "Real-time Collaboration",
      description: "Live updates, comments, notifications, and team collaboration features",
      color: "bg-warning",
      completedStories: 5,
      totalStories: 16,
      progress: 31
    }
  ];

  // Mock team members data
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Manager",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      isOnline: true,
      activeTasks: 3
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Lead Developer",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      isOnline: true,
      activeTasks: 5
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "UI/UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      isOnline: false,
      activeTasks: 2
    },
    {
      id: 4,
      name: "David Kim",
      role: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      isOnline: true,
      activeTasks: 4
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "QA Engineer",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      isOnline: true,
      activeTasks: 2
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Backend Developer",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      isOnline: false,
      activeTasks: 3
    },
    {
      id: 7,
      name: "Anna Martinez",
      role: "DevOps Engineer",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      isOnline: true,
      activeTasks: 1
    },
    {
      id: 8,
      name: "Robert Taylor",
      role: "Scrum Master",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      isOnline: true,
      activeTasks: 0
    }
  ];

  // Mock tasks data
  const tasks = [
    {
      id: 1,
      key: "TF-101",
      title: "Implement user authentication with OAuth 2.0",
      type: "story",
      status: "todo",
      priority: "high",
      assignee: teamMembers?.[1],
      storyPoints: 8,
      dueDate: "2025-02-28",
      labels: ["backend", "security"],
      commentsCount: 3,
      attachmentsCount: 1,
      subtasks: { completed: 2, total: 5 }
    },
    {
      id: 2,
      key: "TF-102",
      title: "Design mobile app onboarding flow",
      type: "story",
      status: "in-progress",
      priority: "medium",
      assignee: teamMembers?.[2],
      storyPoints: 5,
      dueDate: "2025-02-25",
      labels: ["ui-ux", "mobile"],
      commentsCount: 7,
      attachmentsCount: 3,
      subtasks: { completed: 3, total: 4 }
    },
    {
      id: 3,
      key: "TF-103",
      title: "Fix critical bug in task synchronization",
      type: "bug",
      status: "review",
      priority: "critical",
      assignee: teamMembers?.[3],
      storyPoints: 3,
      dueDate: "2025-02-22",
      labels: ["backend", "critical"],
      commentsCount: 12,
      attachmentsCount: 0,
      subtasks: { completed: 1, total: 1 }
    },
    {
      id: 4,
      key: "TF-104",
      title: "Implement push notifications system",
      type: "story",
      status: "done",
      priority: "medium",
      assignee: teamMembers?.[5],
      storyPoints: 13,
      dueDate: "2025-02-20",
      labels: ["backend", "mobile"],
      commentsCount: 5,
      attachmentsCount: 2,
      subtasks: { completed: 8, total: 8 }
    },
    {
      id: 5,
      key: "TF-105",
      title: "Create responsive dashboard layout",
      type: "task",
      status: "in-progress",
      priority: "medium",
      assignee: teamMembers?.[3],
      storyPoints: 5,
      dueDate: "2025-03-01",
      labels: ["frontend", "ui-ux"],
      commentsCount: 2,
      attachmentsCount: 1,
      subtasks: { completed: 1, total: 3 }
    },
    {
      id: 6,
      key: "TF-106",
      title: "Set up automated testing pipeline",
      type: "task",
      status: "todo",
      priority: "low",
      assignee: teamMembers?.[6],
      storyPoints: 8,
      dueDate: "2025-03-05",
      labels: ["testing", "devops"],
      commentsCount: 1,
      attachmentsCount: 0,
      subtasks: { completed: 0, total: 6 }
    },
    {
      id: 7,
      key: "TF-107",
      title: "Optimize database queries for better performance",
      type: "task",
      status: "review",
      priority: "high",
      assignee: teamMembers?.[1],
      storyPoints: 5,
      dueDate: "2025-02-27",
      labels: ["backend", "performance"],
      commentsCount: 4,
      attachmentsCount: 1,
      subtasks: { completed: 2, total: 3 }
    },
    {
      id: 8,
      key: "TF-108",
      title: "Update user documentation",
      type: "task",
      status: "done",
      priority: "low",
      assignee: teamMembers?.[4],
      storyPoints: 2,
      dueDate: "2025-02-18",
      labels: ["documentation"],
      commentsCount: 0,
      attachmentsCount: 2,
      subtasks: { completed: 1, total: 1 }
    }
  ];

  // Mock metrics data
  const metrics = {
    totalTasks: 48,
    completedTasks: 23,
    velocity: 32,
    daysRemaining: 18
  };

  // Mock recent activity data
  const recentActivity = [
    {
      type: "task_completed",
      user: "Michael Rodriguez",
      action: "completed task",
      target: "TF-104: Implement push notifications system",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      type: "comment_added",
      user: "Sarah Chen",
      action: "commented on",
      target: "TF-103: Fix critical bug in task synchronization",
      timestamp: new Date(Date.now() - 900000)
    },
    {
      type: "task_created",
      user: "Emily Johnson",
      action: "created new task",
      target: "TF-109: Design settings page mockups",
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      type: "task_updated",
      user: "David Kim",
      action: "updated priority for",
      target: "TF-105: Create responsive dashboard layout",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      type: "file_uploaded",
      user: "Lisa Wang",
      action: "uploaded attachment to",
      target: "TF-107: Optimize database queries",
      timestamp: new Date(Date.now() - 7200000)
    }
  ];

  const taskCounts = {
    total: tasks?.length,
    backlog: tasks?.filter(t => t?.status === 'todo')?.length,
    inProgress: tasks?.filter(t => t?.status === 'in-progress')?.length,
    review: tasks?.filter(t => t?.status === 'review')?.length,
    done: tasks?.filter(t => t?.status === 'done')?.length
  };

  const handleSidebarToggle = useCallback(() => {
    setSidebarCollapsed(!sidebarCollapsed);
  }, [sidebarCollapsed]);

  const handleTaskMove = useCallback((taskId, newStatus) => {
    console.log(`Moving task ${taskId} to ${newStatus}`);
    // In a real app, this would update the task status
  }, []);

  const handleTaskClick = useCallback((task) => {
    console.log('Task clicked:', task);
    // In a real app, this would navigate to task detail or open modal
  }, []);

  const handleAddTask = useCallback((columnId) => {
    console.log('Add task to column:', columnId);
    // In a real app, this would open task creation modal
  }, []);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      search: '',
      priority: '',
      assignee: '',
      type: '',
      label: '',
      assignedToMe: false,
      overdue: false
    });
  }, []);

  const handleSprintSelect = useCallback((sprint) => {
    setSelectedSprint(sprint);
  }, []);

  const handleEpicSelect = useCallback((epic) => {
    setSelectedEpic(epic);
  }, []);

  const handleEditProject = useCallback(() => {
    console.log('Edit project');
  }, []);

  const handleShareProject = useCallback(() => {
    console.log('Share project');
  }, []);

  const handleArchiveProject = useCallback(() => {
    console.log('Archive project');
  }, []);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Projects', path: '/projects-list' },
    { label: project?.name, path: '/project-detail' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onSidebarToggle={handleSidebarToggle} isSidebarCollapsed={sidebarCollapsed} />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Project Sidebar */}
          <ProjectSidebar
            sprints={sprints}
            epics={epics}
            teamMembers={teamMembers}
            onSprintSelect={handleSprintSelect}
            onEpicSelect={handleEpicSelect}
            selectedSprint={selectedSprint}
            selectedEpic={selectedEpic}
          />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Project Header */}
            <ProjectHeader
              project={project}
              onEditProject={handleEditProject}
              onShareProject={handleShareProject}
              onArchiveProject={handleArchiveProject}
            />
            
            {/* Breadcrumb */}
            <div className="px-6 py-4 bg-background border-b border-border">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            
            {/* Project Tabs */}
            <ProjectTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              taskCounts={taskCounts}
            />
            
            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
              {activeTab === 'overview' && (
                <ProjectOverview
                  project={project}
                  metrics={metrics}
                  recentActivity={recentActivity}
                />
              )}
              
              {activeTab === 'board' && (
                <div className="h-full flex flex-col">
                  <BoardFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    teamMembers={teamMembers}
                    onViewChange={setCurrentView}
                    currentView={currentView}
                    onClearFilters={handleClearFilters}
                  />
                  
                  {currentView === 'kanban' && (
                    <KanbanBoard
                      tasks={tasks}
                      onTaskMove={handleTaskMove}
                      onTaskClick={handleTaskClick}
                      onAddTask={handleAddTask}
                    />
                  )}
                  
                  {currentView === 'list' && (
                    <div className="flex-1 p-6 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-lg text-muted-foreground mb-2">List View</p>
                        <p className="text-sm text-muted-foreground">
                          List view implementation would go here
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'backlog' && (
                <div className="flex-1 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg text-muted-foreground mb-2">Backlog Management</p>
                    <p className="text-sm text-muted-foreground">
                      Backlog view with prioritized user stories would go here
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'reports' && (
                <div className="flex-1 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg text-muted-foreground mb-2">Reports & Analytics</p>
                    <p className="text-sm text-muted-foreground">
                      Burndown charts, velocity tracking, and team analytics would go here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;