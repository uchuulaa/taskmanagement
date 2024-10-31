'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ClipboardList, LogOut } from 'lucide-react';
import { signOut } from '@/lib/auth';
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      router.push('/login');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <ClipboardList className="h-6 w-6 text-primary mr-2" />
            <span className="font-semibold text-xl">QuickTasks</span>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}