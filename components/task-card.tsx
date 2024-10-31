'use client';

import { Task } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const [status, setStatus] = useState(task.status);

  const getStatusColor = () => {
    if (status === 'completed') return 'bg-green-50';
    if (status === 'in-progress') return 'bg-blue-50';
    return 'bg-gray-50';
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    setStatus(newStatus);
    onStatusChange(task.id, newStatus);
  };

  return (
    <Card className={cn(
      'transition-all duration-300 hover:shadow-lg',
      status === 'completed' && 'opacity-80 bg-gray-50'
    )}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <h3 className={cn(
            "font-semibold leading-none tracking-tight",
            status === 'completed' && 'line-through text-gray-500'
          )}>
            {task.title}
          </h3>
          <PriorityBadge priority={task.priority} />
        </div>
        
        {/* Status Dropdown */}
        <div className="relative">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
            className={cn(
              "text-sm font-semibold rounded-md",
              "p-1 focus:outline-none focus:ring-2 focus:ring-offset-2",
              getStatusColor()
            )}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className={cn(
          "text-sm text-muted-foreground",
          status === 'completed' && "text-gray-400"
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
