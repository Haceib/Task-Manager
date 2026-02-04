import { motion } from 'framer-motion';
import { CheckCircle2, Circle, TrendingUp } from 'lucide-react';

interface TaskStatsProps {
  total: number;
  completed: number;
  pending: number;
}

/**
 * Statistics display component showing task progress
 * Features animated progress bar and stat cards
 */
export function TaskStats({ total, completed, pending }: TaskStatsProps) {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {/* Total tasks */}
      <div className="bg-card rounded-xl p-4 task-shadow">
        <div className="flex items-center gap-2 mb-2">
          <Circle className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total</span>
        </div>
        <span className="text-2xl font-semibold text-foreground">{total}</span>
      </div>

      {/* Completed tasks */}
      <div className="bg-card rounded-xl p-4 task-shadow">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Done</span>
        </div>
        <span className="text-2xl font-semibold text-foreground">{completed}</span>
      </div>

      {/* Completion rate */}
      <div className="bg-card rounded-xl p-4 task-shadow">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-foreground">{completionRate}%</span>
        </div>
        {/* Progress bar */}
        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
