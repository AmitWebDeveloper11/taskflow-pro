import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectSidebar = ({ sprints, epics, teamMembers, onSprintSelect, onEpicSelect, selectedSprint, selectedEpic }) => {
  const [activeSection, setActiveSection] = useState('sprints');

  const getSprintStatus = (sprint) => {
    const now = new Date();
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    
    if (now < startDate) return 'upcoming';
    if (now > endDate) return 'completed';
    return 'active';
  };

  const getSprintStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success';
      case 'upcoming':
        return 'bg-warning';
      case 'completed':
        return 'bg-muted-foreground';
      default:
        return 'bg-muted-foreground';
    }
  };

  const sections = [
    { id: 'sprints', label: 'Sprints', icon: 'Zap', count: sprints?.length },
    { id: 'epics', label: 'Epics', icon: 'BookOpen', count: epics?.length },
    { id: 'team', label: 'Team', icon: 'Users', count: teamMembers?.length }
  ];

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      {/* Section Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          {sections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeSection === section?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon name={section?.icon} size={16} />
                <span>{section?.label}</span>
                <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs">
                  {section?.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {activeSection === 'sprints' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Active Sprints</h3>
              <Button variant="ghost" size="sm">
                <Icon name="Plus" size={16} className="mr-1" />
                New
              </Button>
            </div>
            
            {sprints?.map((sprint) => {
              const status = getSprintStatus(sprint);
              const isSelected = selectedSprint?.id === sprint?.id;
              
              return (
                <div
                  key={sprint?.id}
                  onClick={() => onSprintSelect(sprint)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover-lift ${
                    isSelected 
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">{sprint?.name}</h4>
                    <div className={`w-2 h-2 rounded-full ${getSprintStatusColor(status)}`} />
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {sprint?.startDate} - {sprint?.endDate}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {sprint?.completedTasks}/{sprint?.totalTasks} tasks
                    </span>
                    <span className="text-muted-foreground">{sprint?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1 mt-2">
                    <div 
                      className="bg-primary h-1 rounded-full" 
                      style={{ width: `${sprint?.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeSection === 'epics' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Project Epics</h3>
              <Button variant="ghost" size="sm">
                <Icon name="Plus" size={16} className="mr-1" />
                New
              </Button>
            </div>
            
            {epics?.map((epic) => {
              const isSelected = selectedEpic?.id === epic?.id;
              
              return (
                <div
                  key={epic?.id}
                  onClick={() => onEpicSelect(epic)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover-lift ${
                    isSelected 
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${epic?.color}`} />
                    <h4 className="font-medium text-foreground text-sm flex-1">{epic?.name}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {epic?.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {epic?.completedStories}/{epic?.totalStories} stories
                    </span>
                    <span className="text-muted-foreground">{epic?.progress}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeSection === 'team' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Team Members</h3>
              <Button variant="ghost" size="sm">
                <Icon name="UserPlus" size={16} className="mr-1" />
                Invite
              </Button>
            </div>
            
            {teamMembers?.map((member) => (
              <div
                key={member?.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="relative">
                  <img
                    src={member?.avatar}
                    alt={member?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                    member?.isOnline ? 'bg-success' : 'bg-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{member?.name}</p>
                  <p className="text-xs text-muted-foreground">{member?.role}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {member?.activeTasks} tasks
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSidebar;