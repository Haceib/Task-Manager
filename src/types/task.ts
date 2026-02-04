// Task type definitions for the Task Manager app

export type Priority = 'low' | 'medium' | 'high';
export type FilterStatus = 'all' | 'completed' | 'pending';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
  updatedAt: number;
}

// Helper to generate unique IDs
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
