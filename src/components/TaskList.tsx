import { AnimatePresence, motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';
import { Task, Priority } from '@/types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onPriorityChange: (id: string, priority: Priority) => void;
}

/**
 * Task list container component
 * Handles empty state and animates task items
 */
export function TaskList({ tasks, onToggle, onDelete, onEdit, onPriorityChange }: TaskListProps) {
  // Empty state
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <ClipboardList className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">No tasks yet</h3>
        <p className="text-muted-foreground text-sm">
          Add your first task to get started
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onPriorityChange={onPriorityChange}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
