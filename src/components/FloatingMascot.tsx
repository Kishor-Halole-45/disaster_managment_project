import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import owlMascot from "@/assets/owl-mascot.png";

interface FloatingMascotProps {
  tips: string[];
}

const FloatingMascot = ({ tips }: FloatingMascotProps) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
      setShowTip(true);
      
      setTimeout(() => {
        setShowTip(false);
      }, 5000); // Show tip for 5 seconds
    }, 15000); // Change tip every 15 seconds

    return () => clearInterval(interval);
  }, [tips]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tip Bubble */}
      {showTip && (
        <div className="absolute bottom-20 right-0 bg-card border border-border rounded-lg p-4 shadow-elegant max-w-xs mb-2 animate-in slide-in-from-bottom-2">
          <div className="relative">
            <p className="text-sm text-card-foreground font-medium">
              {tips[currentTip]}
            </p>
            <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-card"></div>
          </div>
        </div>
      )}
      
      {/* Mascot */}
      <div className="relative">
        <button
          onClick={() => setShowTip(!showTip)}
          className="floating-mascot bg-card rounded-full p-2 shadow-elegant hover:shadow-hover transition-smooth border border-border"
        >
          <img 
            src={owlMascot} 
            alt="Helper Owl" 
            className="w-16 h-16"
          />
        </button>
        
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-muted rounded-full p-1 hover:bg-muted/80 transition-smooth"
        >
          <X className="w-3 h-3 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default FloatingMascot;