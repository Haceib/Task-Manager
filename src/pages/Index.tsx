import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare } from 'lucide-react';
import { Task, Priority, FilterStatus, generateId } from '@/types/task';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TaskInput } from '@/components/TaskInput';
import { TaskFilter } from '@/components/TaskFilter';
import { TaskList } from '@/components/TaskList';
import { TaskStats } from '@/components/TaskStats';

/**
 * Main Task Manager page component
 * Handles all task state management and filtering logic
 */
const Index = () => {
  // Persist tasks in localStorage
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useLocalStorage<FilterStatus>('taskFilter', 'all');

  // Add a new task
  const handleAddTask = (title: string, priority: Priority) => {
    const newTask: Task = {
      id: generateId(),
      title,
      completed: false,
      priority,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Toggle task completion status
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: Date.now() }
          : task
      )
    );
  };

  // Delete a task
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Edit task title
  const handleEditTask = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, updatedAt: Date.now() } : task
      )
    );
  };

  // Change task priority
  const handlePriorityChange = (id: string, priority: Priority) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, priority, updatedAt: Date.now() } : task
      )
    );
  };

  // Calculate task counts for filters
  const counts = useMemo(() => ({
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  }), [tasks]);

  // Filter tasks based on current filter
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((t) => t.completed);
      case 'pending':
        return tasks.filter((t) => !t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <div className="min-h-screen bg-background">
      {/* Container */}
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <CheckSquare className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Task Manager
          </h1>
          <p className="text-muted-foreground">
            Stay organized, get things done
          </p>
        </motion.header>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <TaskStats
            total={counts.all}
            completed={counts.completed}
            pending={counts.pending}
          />
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <TaskInput onAdd={handleAddTask} />
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-6"
        >
          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
        </motion.div>

        {/* Task List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onPriorityChange={handlePriorityChange}
          />
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-sm text-muted-foreground"
        >
          <p>Tasks are saved locally in your browser</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
