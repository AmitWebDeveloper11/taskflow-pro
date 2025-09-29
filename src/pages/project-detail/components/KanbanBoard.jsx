import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import TaskCard from './TaskCard';

const KanbanBoard = ({ tasks, onTaskMove, onTaskClick, onAddTask }) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'border-t-muted-foreground',
      wipLimit: 10
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'border-t-warning',
      wipLimit: 5
    },
    {
      id: 'review',
      title: 'Review',
      color: 'border-t-accent',
      wipLimit: 3
    },
    {
      id: 'done',
      title: 'Done',
      color: 'border-t-success',
      wipLimit: null
    }
  ];

  const getTasksByStatus = (status) => {
    return tasks?.filter(task => task?.status === status);
  };

  const handleDragStart = useCallback((e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e?.dataTransfer?.setData('text/html', e?.target?.outerHTML);
    e?.dataTransfer?.setDragImage(e?.target, 0, 0);
  }, []);

  const handleDragOver = useCallback((e, columnId) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  }, []);

  const handleDragLeave = useCallback((e) => {
    if (!e?.currentTarget?.contains(e?.relatedTarget)) {
      setDragOverColumn(null);
    }
  }, []);

  const handleDrop = useCallback((e, columnId) => {
    e?.preventDefault();
    setDragOverColumn(null);
    
    if (draggedTask && draggedTask?.status !== columnId) {
      onTaskMove(draggedTask?.id, columnId);
    }
    setDraggedTask(null);
  }, [draggedTask, onTaskMove]);

  const handleDragEnd = useCallback(() => {
    setDraggedTask(null);
    setDragOverColumn(null);
  }, []);

  return (
    <div className="flex-1 overflow-x-auto">
      <div className="flex space-x-6 p-6 min-w-max">
        {columns?.map((column) => {
          const columnTasks = getTasksByStatus(column?.id);
          const isOverWipLimit = column?.wipLimit && columnTasks?.length > column?.wipLimit;
          const isDragOver = dragOverColumn === column?.id;

          return (
            <div
              key={column?.id}
              className={`flex-shrink-0 w-80 bg-muted/30 rounded-lg border-t-4 ${column?.color} transition-all ${
                isDragOver ? 'bg-primary/10 border-primary/30' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, column?.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column?.id)}
            >
              {/* Column Header */}
              <div className="p-4 border-b border-border bg-card rounded-t-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-foreground">{column?.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isOverWipLimit 
                        ? 'bg-error text-error-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {columnTasks?.length}
                      {column?.wipLimit && `/${column?.wipLimit}`}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onAddTask(column?.id)}
                    className="w-6 h-6"
                  >
                    <Icon name="Plus" size={14} />
                  </Button>
                </div>

                {column?.wipLimit && isOverWipLimit && (
                  <div className="flex items-center space-x-1 text-xs text-error">
                    <Icon name="AlertTriangle" size={12} />
                    <span>WIP limit exceeded</span>
                  </div>
                )}
              </div>
              {/* Column Content */}
              <div className="p-4 space-y-3 min-h-96 max-h-[calc(100vh-300px)] overflow-y-auto">
                {columnTasks?.map((task) => (
                  <div
                    key={task?.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onDragEnd={handleDragEnd}
                  >
                    <TaskCard
                      task={task}
                      isDragging={draggedTask?.id === task?.id}
                      onTaskClick={onTaskClick}
                    />
                  </div>
                ))}

                {columnTasks?.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Icon name="Package" size={48} className="text-muted-foreground/50 mb-3" />
                    <p className="text-sm text-muted-foreground mb-2">No tasks in {column?.title?.toLowerCase()}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAddTask(column?.id)}
                      className="text-xs"
                    >
                      <Icon name="Plus" size={12} className="mr-1" />
                      Add task
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;