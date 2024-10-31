import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low';
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-xs",
        priority === 'high' && "bg-red-100 text-red-800 hover:bg-red-100",
        priority === 'medium' && "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        priority === 'low' && "bg-green-100 text-green-800 hover:bg-green-100"
      )}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
    </Badge>
  );
}