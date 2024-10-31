export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'completed';
  createdAt: any;
  updatedAt: any;
}