import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityTimeline = ({ task }) => {
  const [newComment, setNewComment] = useState('');
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'comment',
      user: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: 'I\'ve started working on the API integration. The authentication flow is now complete.',
      timestamp: new Date(Date.now() - 3600000),
      edited: false
    },
    {
      id: 2,
      type: 'status_change',
      user: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: 'Status changed from To Do to In Progress',
      timestamp: new Date(Date.now() - 7200000),
      oldValue: 'To Do',
      newValue: 'In Progress'
    },
    {
      id: 3,
      type: 'assignment',
      user: 'Mike Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
      content: 'Assigned to John Doe',
      timestamp: new Date(Date.now() - 10800000),
      assignee: 'John Doe'
    },
    {
      id: 4,
      type: 'comment',
      user: 'Sarah Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      content: `The design mockups are ready for review. Please check the following:\n\n• Mobile responsive layout\n• Dark mode compatibility\n• Accessibility compliance\n\nLet me know if you need any adjustments.`,
      timestamp: new Date(Date.now() - 14400000),
      edited: true
    },
    {
      id: 5,
      type: 'priority_change',
      user: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: 'Priority changed from Medium to High',
      timestamp: new Date(Date.now() - 18000000),
      oldValue: 'Medium',
      newValue: 'High'
    }
  ]);

  const addComment = () => {
    if (newComment?.trim()) {
      const comment = {
        id: Date.now(),
        type: 'comment',
        user: 'You',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        content: newComment?.trim(),
        timestamp: new Date(),
        edited: false
      };
      setActivities([comment, ...activities]);
      setNewComment('');
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'comment':
        return 'MessageSquare';
      case 'status_change':
        return 'Activity';
      case 'assignment':
        return 'User';
      case 'priority_change':
        return 'Flag';
      case 'attachment':
        return 'Paperclip';
      default:
        return 'Circle';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'comment':
        return 'text-accent';
      case 'status_change':
        return 'text-warning';
      case 'assignment':
        return 'text-primary';
      case 'priority_change':
        return 'text-error';
      case 'attachment':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp?.toLocaleDateString();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center space-x-2">
        <Icon name="MessageSquare" size={20} />
        <span>Activity</span>
      </h3>
      {/* Add Comment */}
      <div className="mb-6 p-4 border border-border rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={16} color="white" />
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              rows="3"
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Paperclip" size={14} />
                <span>Attach files</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={addComment}
                  disabled={!newComment?.trim()}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Activity Timeline */}
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={activity?.id} className="flex items-start space-x-3">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={activity?.avatar}
                alt={activity?.user}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-foreground">
                  {activity?.user}
                </span>
                <Icon
                  name={getActivityIcon(activity?.type)}
                  size={14}
                  className={getActivityColor(activity?.type)}
                />
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(activity?.timestamp)}
                </span>
                {activity?.edited && (
                  <span className="text-xs text-muted-foreground">(edited)</span>
                )}
              </div>

              {activity?.type === 'comment' ? (
                <div className="bg-muted rounded-lg p-3 text-sm text-foreground whitespace-pre-wrap">
                  {activity?.content}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  {activity?.content}
                </div>
              )}
            </div>

            {/* Timeline Line */}
            {index < activities?.length - 1 && (
              <div className="absolute left-4 mt-8 w-px h-6 bg-border" />
            )}
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="MessageSquare" size={48} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No activity yet</p>
          <p className="text-xs">Be the first to comment on this task</p>
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;