'use client';

import { Task } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { Pencil, Trash2, CheckCircle, Clock, ListTodo } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in-progress';
  const isTodo = task.status === 'todo';

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (isInProgress) return <Clock className="h-5 w-5 text-blue-500" />;
    return <ListTodo className="h-5 w-5 text-gray-500" />;
  };

  const getNextStatus = (): Task['status'] => {
    if (isTodo) return 'in-progress';
    if (isInProgress) return 'completed';
    return 'todo';
  };

  const getStatusColor = () => {
    if (isCompleted) return 'bg-green-50';
    if (isInProgress) return 'bg-blue-50';
    return 'bg-gray-50';
  };

  return (
    <Card className={cn(
      'transition-all duration-300 hover:shadow-lg',
      isCompleted && 'opacity-80 bg-gray-50'
    )}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <h3 className={cn(
            "font-semibold leading-none tracking-tight",
            isCompleted && 'line-through text-gray-500'
          )}>
            {task.title}
          </h3>
          <PriorityBadge priority={task.priority} />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onStatusChange(task.id, getNextStatus())}
          className={cn(
            "transition-all duration-300 hover:scale-110",
            getStatusColor()
          )}
        >
          {getStatusIcon()}
        </Button>
      </CardHeader>
      <CardContent>
        <p className={cn(
          "text-sm text-muted-foreground",
          isCompleted && "text-gray-400"
        )}>
          {task.description}
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(task)}
          className="hover:bg-gray-100"
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}