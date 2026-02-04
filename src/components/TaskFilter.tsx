import { motion } from 'framer-motion';
import { FilterStatus } from '@/types/task';
import { cn } from '@/lib/utils';

interface TaskFilterProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  counts: {
    all: number;
    completed: number;
    pending: number;
  };
}

/**
 * Filter component for switching between task views
 * Shows count badges for each filter option
 */
export function TaskFilter({ currentFilter, onFilterChange, counts }: TaskFilterProps) {
  const filters: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
            currentFilter === filter.value
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {/* Active indicator background */}
          {currentFilter === filter.value && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-card rounded-md task-shadow"
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            />
          )}
          
          <span className="relative z-10">{filter.label}</span>
          
          {/* Count badge */}
          <span
            className={cn(
              "relative z-10 min-w-[1.25rem] h-5 flex items-center justify-center px-1.5 rounded-full text-xs",
              currentFilter === filter.value
                ? "bg-primary/10 text-primary"
                : "bg-muted-foreground/10 text-muted-foreground"
            )}
          >
            {counts[filter.value]}
          </span>
        </button>
      ))}
    </div>
  );
}
