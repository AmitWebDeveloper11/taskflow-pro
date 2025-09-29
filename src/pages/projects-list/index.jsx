import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProjectsHeader from './components/ProjectsHeader';
import ProjectsStats from './components/ProjectsStats';
import FilterToolbar from './components/FilterToolbar';
import ProjectsTable from './components/ProjectsTable';
import BulkActionsBar from './components/BulkActionsBar';
import ProjectsPagination from './components/ProjectsPagination';

const ProjectsList = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    teamMember: '',
    dueDateFrom: '',
    dueDateTo: ''
  });

  // Mock projects data
  const mockProjects = [
    {
      id: 1,
      name: "TaskFlow Mobile App",
      description: "Native mobile application for task management with offline sync capabilities",
      status: "Active",
      progress: 75,
      priority: "High",
      dueDate: "2025-09-15",
      team: [
        { id: 1, name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
        { id: 2, name: "Sarah Wilson", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
        { id: 3, name: "Mike Johnson", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
        { id: 4, name: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/4.jpg" }
      ]
    },
    {
      id: 2,
      name: "Website Redesign",
      description: "Complete overhaul of company website with modern design and improved UX",
      status: "Planning",
      progress: 25,
      priority: "Medium",
      dueDate: "2025-10-30",
      team: [
        { id: 5, name: "Alex Brown", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
        { id: 6, name: "Lisa Chen", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
        { id: 7, name: "David Miller", avatar: "https://randomuser.me/api/portraits/men/7.jpg" }
      ]
    },
    {
      id: 3,
      name: "API Integration",
      description: "Integration with third-party APIs for enhanced functionality and data sync",
      status: "Active",
      progress: 60,
      priority: "Critical",
      dueDate: "2025-09-01",
      team: [
        { id: 8, name: "Rachel Green", avatar: "https://randomuser.me/api/portraits/women/8.jpg" },
        { id: 9, name: "Tom Wilson", avatar: "https://randomuser.me/api/portraits/men/9.jpg" }
      ]
    },
    {
      id: 4,
      name: "Database Migration",
      description: "Migration from legacy database to modern cloud-based solution",
      status: "On Hold",
      progress: 40,
      priority: "High",
      dueDate: "2025-11-15",
      team: [
        { id: 10, name: "Kevin Lee", avatar: "https://randomuser.me/api/portraits/men/10.jpg" },
        { id: 11, name: "Anna Taylor", avatar: "https://randomuser.me/api/portraits/women/11.jpg" },
        { id: 12, name: "Chris Evans", avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
        { id: 13, name: "Maria Garcia", avatar: "https://randomuser.me/api/portraits/women/13.jpg" },
        { id: 14, name: "James Bond", avatar: "https://randomuser.me/api/portraits/men/14.jpg" }
      ]
    },
    {
      id: 5,
      name: "Security Audit",
      description: "Comprehensive security assessment and vulnerability testing",
      status: "Completed",
      progress: 100,
      priority: "Critical",
      dueDate: "2025-08-20",
      team: [
        { id: 15, name: "Security Team", avatar: "https://randomuser.me/api/portraits/men/15.jpg" }
      ]
    },
    {
      id: 6,
      name: "Performance Optimization",
      description: "System performance improvements and load testing",
      status: "Active",
      progress: 85,
      priority: "Medium",
      dueDate: "2025-09-10",
      team: [
        { id: 16, name: "Performance Team", avatar: "https://randomuser.me/api/portraits/women/16.jpg" },
        { id: 17, name: "DevOps Team", avatar: "https://randomuser.me/api/portraits/men/17.jpg" }
      ]
    },
    {
      id: 7,
      name: "User Training Program",
      description: "Comprehensive training program for end users and administrators",
      status: "Planning",
      progress: 15,
      priority: "Low",
      dueDate: "2025-12-01",
      team: [
        { id: 18, name: "Training Team", avatar: "https://randomuser.me/api/portraits/women/18.jpg" }
      ]
    },
    {
      id: 8,
      name: "Analytics Dashboard",
      description: "Real-time analytics dashboard with custom reporting capabilities",
      status: "Active",
      progress: 50,
      priority: "High",
      dueDate: "2025-10-15",
      team: [
        { id: 19, name: "Analytics Team", avatar: "https://randomuser.me/api/portraits/men/19.jpg" },
        { id: 20, name: "UI/UX Team", avatar: "https://randomuser.me/api/portraits/women/20.jpg" }
      ]
    }
  ];

  // Filter and search projects (Logic remains the same)
  const filteredProjects = useMemo(() => {
    let filtered = mockProjects;

    if (searchQuery) {
      filtered = filtered?.filter(project =>
        project?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    if (filters?.status) {
      filtered = filtered?.filter(project =>
        project?.status?.toLowerCase() === filters?.status?.toLowerCase()
      );
    }

    if (filters?.priority) {
      filtered = filtered?.filter(project =>
        project?.priority?.toLowerCase() === filters?.priority?.toLowerCase()
      );
    }

    if (filters?.teamMember) {
      filtered = filtered?.filter(project =>
        project?.team?.some(member =>
          member?.name?.toLowerCase()?.includes(filters?.teamMember?.toLowerCase())
        )
      );
    }

    if (filters?.dueDateFrom) {
      filtered = filtered?.filter(project =>
        new Date(project.dueDate) >= new Date(filters.dueDateFrom)
      );
    }

    if (filters?.dueDateTo) {
      filtered = filtered?.filter(project =>
        new Date(project.dueDate) <= new Date(filters.dueDateTo)
      );
    }

    return filtered;
  }, [searchQuery, filters]);

  // Sort projects (Logic remains the same)
  const sortedProjects = useMemo(() => {
    const sorted = [...filteredProjects];
    
    sorted?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'dueDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [filteredProjects, sortConfig]);

  // Paginate projects (Logic remains the same)
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProjects?.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProjects, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedProjects?.length / itemsPerPage);

  // Event handlers (Logic remains the same)
  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjects(prev =>
      prev?.includes(projectId)
        ? prev?.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProjects?.length === paginatedProjects?.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(paginatedProjects?.map(p => p?.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Applying ${action} to projects:`, selectedProjects);
    // Handle bulk actions here
    setSelectedProjects([]);
  };

  const handleClearSelection = () => {
    setSelectedProjects([]);
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      teamMember: '',
      dueDateFrom: '',
      dueDateTo: ''
    });
    setSearchQuery('');
  };

  const handleCreateProject = () => {
    console.log('Create new project');
    // Handle project creation
  };

  const activeFiltersCount = Object.values(filters)?.filter(value => value !== '')?.length + (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSidebarToggle={handleSidebarToggle}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
      />
      {/* Sidebar Collapsed state के आधार पर Main Content की padding और margin को नियंत्रित करें */}
      <main className={`
        pt-16 transition-all duration-300 ease-smooth
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}
      `}>
        {/* मोबाइल के लिए कम पैडिंग (p-4), बड़ी स्क्रीन के लिए ज़्यादा (sm:p-6) */}
        <div className="p-4 sm:p-6"> 
          <Breadcrumb />
          
          <ProjectsHeader 
            projectCount={mockProjects?.length}
            onCreateProject={handleCreateProject}
          />
          
          {/* ProjectsStats को मोबाइल पर 1 कॉलम, sm पर 2, और md पर 4 कॉलम में रखें (ProjectsStats कॉम्पोनेंट के अंदर ग्रिड एडजस्ट हो सकता है) */}
          <ProjectsStats projects={mockProjects} />
          
          <FilterToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearFilters}
            activeFiltersCount={activeFiltersCount}
          />
          
          {/* मुख्य Responsive सुधार: Table के लिए Horizontal Scrolling */}
          <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm mb-6">
            <div className="min-w-[700px]"> {/* Table को छोटी स्क्रीन पर स्क्रॉल करने के लिए मिनिमम विड्थ दें */}
              <ProjectsTable
                projects={paginatedProjects}
                selectedProjects={selectedProjects}
                onSelectProject={handleSelectProject}
                onSelectAll={handleSelectAll}
                sortConfig={sortConfig}
                onSort={handleSort}
                onBulkAction={handleBulkAction}
              />
            </div>
          </div>
          
          <ProjectsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={sortedProjects?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </main>
      <BulkActionsBar
        selectedCount={selectedProjects?.length}
        onBulkAction={handleBulkAction}
        onClearSelection={handleClearSelection}
      />
    </div>
  );
};

export default ProjectsList;