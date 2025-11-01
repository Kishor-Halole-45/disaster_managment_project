import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackToLoginButton = () => {
  return (
    <Button
      onClick={() => window.location.href = '/'}
      className="fixed bottom-4 right-4 z-50 bg-card border border-border shadow-lg hover:bg-accent hover:text-accent-foreground"
      size="sm"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Back to Login
    </Button>
  );
};

export default BackToLoginButton;