import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileAttachments = ({ task, onTaskUpdate }) => {
  const [attachments, setAttachments] = useState(task?.attachments || [
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
      name: 'wireframe_mockup.fig',
      size: '1.8 MB',
      type: 'figma',
      uploadedBy: 'Sarah Wilson',
      uploadedAt: new Date(Date.now() - 172800000),
      url: '#'
    },
    {
      id: 3,
      name: 'database_schema.png',
      size: '456 KB',
      type: 'image',
      uploadedBy: 'Mike Johnson',
      uploadedAt: new Date(Date.now() - 259200000),
      url: '#'
    }
  ]);

  const [isDragOver, setIsDragOver] = useState(false);

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return 'FileText';
      case 'image':
        return 'Image';
      case 'figma':
        return 'Figma';
      case 'doc':
        return 'FileText';
      case 'zip':
        return 'Archive';
      default:
        return 'File';
    }
  };

  const getFileColor = (type) => {
    switch (type) {
      case 'pdf':
        return 'text-error';
      case 'image':
        return 'text-success';
      case 'figma':
        return 'text-accent';
      case 'doc':
        return 'text-primary';
      case 'zip':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    const newAttachments = files?.map((file, index) => ({
      id: Date.now() + index,
      name: file?.name,
      size: formatFileSize(file?.size),
      type: getFileType(file?.name),
      uploadedBy: 'You',
      uploadedAt: new Date(),
      url: URL.createObjectURL(file)
    }));

    const updatedAttachments = [...attachments, ...newAttachments];
    setAttachments(updatedAttachments);
    onTaskUpdate({ ...task, attachments: updatedAttachments });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileType = (filename) => {
    const extension = filename?.split('.')?.pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg']?.includes(extension)) return 'image';
    if (['pdf']?.includes(extension)) return 'pdf';
    if (['fig']?.includes(extension)) return 'figma';
    if (['doc', 'docx']?.includes(extension)) return 'doc';
    if (['zip', 'rar']?.includes(extension)) return 'zip';
    return 'file';
  };

  const removeAttachment = (id) => {
    const updatedAttachments = attachments?.filter(att => att?.id !== id);
    setAttachments(updatedAttachments);
    onTaskUpdate({ ...task, attachments: updatedAttachments });
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const days = Math.floor(diff / 86400000);
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return timestamp?.toLocaleDateString();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Paperclip" size={20} />
          <span>Attachments</span>
          <span className="text-sm text-muted-foreground">({attachments?.length})</span>
        </h3>
      </div>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Icon name="Upload" size={32} className="mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-foreground mb-1">
          Drag and drop files here, or click to browse
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          Supports: PDF, Images, Documents, Archives (Max 10MB each)
        </p>
        <Button variant="outline" size="sm">
          <Icon name="Plus" size={14} className="mr-2" />
          Choose Files
        </Button>
      </div>
      {/* Attachments List */}
      {attachments?.length > 0 && (
        <div className="mt-6 space-y-3">
          {attachments?.map((attachment) => (
            <div
              key={attachment?.id}
              className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth group"
            >
              <Icon
                name={getFileIcon(attachment?.type)}
                size={20}
                className={getFileColor(attachment?.type)}
              />
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {attachment?.name}
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{attachment?.size}</span>
                  <span>•</span>
                  <span>by {attachment?.uploadedBy}</span>
                  <span>•</span>
                  <span>{formatTimestamp(attachment?.uploadedAt)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon">
                  <Icon name="Download" size={14} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="ExternalLink" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAttachment(attachment?.id)}
                  className="text-error hover:text-error"
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {attachments?.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          <p className="text-sm">No attachments yet</p>
        </div>
      )}
    </div>
  );
};

export default FileAttachments;