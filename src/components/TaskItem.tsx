import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2, Edit3, X, Flag } from 'lucide-react';
import { Task, Priority } from '@/types/task';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onPriorityChange: (id: string, priority: Priority) => void;
}

/**
 * Individual task item component with edit, delete, and complete functionality
 * Features smooth animations and priority indicators
 */
export function TaskItem({ task, onToggle, onDelete, onEdit, onPriorityChange }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  // Handle saving edited task title
  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(task.id, editValue.trim());
      setIsEditing(false);
    }
  };

  // Handle key press in edit mode
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(task.title);
      setIsEditing(false);
    }
  };

  // Priority color mapping
  const priorityColors: Record<Priority, string> = {
    high: 'bg-priority-high',
    medium: 'bg-priority-medium',
    low: 'bg-priority-low',
  };

  const priorityLabels: Record<Priority, string> = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      className={cn(
        "group relative flex items-center gap-3 p-4 bg-card rounded-lg task-shadow",
        "transition-all duration-200 hover:task-shadow-hover",
        task.completed && "opacity-60"
      )}
    >
      {/* Priority indicator bar */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-l-lg", priorityColors[task.priority])} />

      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center",
          "transition-all duration-200",
          task.completed
            ? "bg-primary border-primary"
            : "border-muted-foreground/30 hover:border-primary"
        )}
      >
        <AnimatePresence>
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Task content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            autoFocus
            className="w-full bg-transparent border-b-2 border-primary outline-none py-1 text-foreground"
          />
        ) : (
          <span
            className={cn(
              "block truncate transition-all duration-200",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </span>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Priority button */}
        <div className="relative">
          <button
            onClick={() => setShowPriorityMenu(!showPriorityMenu)}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            title="Set priority"
          >
            <Flag className={cn("w-4 h-4", `text-priority-${task.priority}`)} />
          </button>
          
          <AnimatePresence>
            {showPriorityMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-full mt-1 bg-card rounded-lg task-shadow-lg border border-border p-1 z-10"
              >
                {(['high', 'medium', 'low'] as Priority[]).map((priority) => (
                  <button
                    key={priority}
                    onClick={() => {
                      onPriorityChange(task.id, priority);
                      setShowPriorityMenu(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm",
                      task.priority === priority && "bg-muted"
                    )}
                  >
                    <div className={cn("w-2 h-2 rounded-full", priorityColors[priority])} />
                    {priorityLabels[priority]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Edit button */}
        {isEditing ? (
          <button
            onClick={() => {
              setEditValue(task.title);
              setIsEditing(false);
            }}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            title="Cancel"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            title="Edit task"
          >
            <Edit3 className="w-4 h-4 text-muted-foreground" />
          </button>
        )}

        {/* Delete button */}
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 rounded-md hover:bg-destructive/10 transition-colors"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </button>
      </div>
    </motion.div>
  );
}
