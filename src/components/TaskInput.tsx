import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Flag } from 'lucide-react';
import { Priority } from '@/types/task';
import { cn } from '@/lib/utils';

interface TaskInputProps {
  onAdd: (title: string, priority: Priority) => void;
}

/**
 * Task input component for adding new tasks
 * Includes priority selection dropdown
 */
export function TaskInput({ onAdd }: TaskInputProps) {
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim(), priority);
      setValue('');
      setPriority('medium');
    }
  };

  // Priority styling configuration
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
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center gap-2 bg-card rounded-xl p-2 task-shadow-md border border-border">
        {/* Priority selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPriorityMenu(!showPriorityMenu)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
            title="Set priority"
          >
            <Flag className={cn("w-4 h-4", `text-priority-${priority}`)} />
          </button>

          {showPriorityMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute left-0 top-full mt-1 bg-card rounded-lg task-shadow-lg border border-border p-1 z-10"
            >
              {(['high', 'medium', 'low'] as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setPriority(p);
                    setShowPriorityMenu(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm",
                    priority === p && "bg-muted"
                  )}
                >
                  <div className={cn("w-2 h-2 rounded-full", priorityColors[p])} />
                  {priorityLabels[p]}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Text input */}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground py-2"
        />

        {/* Submit button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!value.trim()}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200",
            value.trim()
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </motion.button>
      </div>
    </form>
  );
}
