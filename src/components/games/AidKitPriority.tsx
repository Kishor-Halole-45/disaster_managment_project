import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface AidItem {
  id: string;
  name: string;
  icon: string;
  priority: 'critical' | 'important' | 'useful';
}

interface AidKitPriorityProps {
  onBack: () => void;
}

const AidKitPriority = ({ onBack }: AidKitPriorityProps) => {
  const allItems: AidItem[] = [
    { id: '1', name: 'Bandages', icon: '🩹', priority: 'critical' },
    { id: '2', name: 'Antiseptic', icon: '🧴', priority: 'critical' },
    { id: '3', name: 'Emergency Phone', icon: '📱', priority: 'critical' },
    { id: '4', name: 'Water', icon: '💧', priority: 'critical' },
    { id: '5', name: 'Scissors', icon: '✂️', priority: 'important' },
    { id: '6', name: 'Gauze', icon: '🏥', priority: 'important' },
    { id: '7', name: 'Medical Tape', icon: '📏', priority: 'important' },
    { id: '8', name: 'Gloves', icon: '🧤', priority: 'important' },
    { id: '9', name: 'Thermometer', icon: '🌡️', priority: 'useful' },
    { id: '10', name: 'Tweezers', icon: '🔧', priority: 'useful' },
    { id: '11', name: 'Cold Pack', icon: '🧊', priority: 'useful' },
    { id: '12', name: 'Safety Pins', icon: '📌', priority: 'useful' },
  ];

  const [availableItems, setAvailableItems] = useState<AidItem[]>(allItems);
  const [criticalItems, setCriticalItems] = useState<AidItem[]>([]);
  const [importantItems, setImportantItems] = useState<AidItem[]>([]);
  const [usefulItems, setUsefulItems] = useState<AidItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<AidItem | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleDragStart = (e: React.DragEvent, item: AidItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnCritical = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      setCriticalItems([...criticalItems, draggedItem]);
      removeItemFromAllBins(draggedItem);
      setDraggedItem(null);
    }
  };

  const handleDropOnImportant = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      setImportantItems([...importantItems, draggedItem]);
      removeItemFromAllBins(draggedItem);
      setDraggedItem(null);
    }
  };

  const handleDropOnUseful = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      setUsefulItems([...usefulItems, draggedItem]);
      removeItemFromAllBins(draggedItem);
      setDraggedItem(null);
    }
  };

  const handleDropOnAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && !availableItems.find(item => item.id === draggedItem.id)) {
      setAvailableItems([...availableItems, draggedItem]);
      removeItemFromAllBins(draggedItem);
      setDraggedItem(null);
    }
  };

  const removeItemFromAllBins = (item: AidItem) => {
    setAvailableItems(availableItems.filter(i => i.id !== item.id));
    setCriticalItems(criticalItems.filter(i => i.id !== item.id));
    setImportantItems(importantItems.filter(i => i.id !== item.id));
    setUsefulItems(usefulItems.filter(i => i.id !== item.id));
  };

  const calculateScore = () => {
    let points = 0;
    
    criticalItems.forEach(item => {
      if (item.priority === 'critical') points += 10;
      else if (item.priority === 'important') points += 3;
      else points -= 5;
    });
    
    importantItems.forEach(item => {
      if (item.priority === 'important') points += 10;
      else if (item.priority === 'critical') points += 3;
      else if (item.priority === 'useful') points += 3;
    });
    
    usefulItems.forEach(item => {
      if (item.priority === 'useful') points += 10;
      else if (item.priority === 'important') points += 3;
      else points -= 5;
    });
    
    setScore(Math.max(0, points));
    setGameCompleted(true);
  };

  const resetGame = () => {
    setAvailableItems(allItems);
    setCriticalItems([]);
    setImportantItems([]);
    setUsefulItems([]);
    setGameCompleted(false);
    setScore(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / 120) * 100;
    if (percentage === 100) return "Perfect prioritization! You're a first aid expert! 🏥";
    if (percentage >= 80) return "Excellent understanding of medical priorities! 🌟";
    if (percentage >= 60) return "Good job! You know what's important! 👍";
    return "Keep learning about medical priorities! 🎯";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">💊</span>
            Aid Kit Priority
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Games
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 text-center">
          <p className="text-muted-foreground">
            Sort first aid items by urgency priority!
          </p>
        </div>

        <div 
          className="mb-4 min-h-[80px] border-2 border-dashed border-muted-foreground/30 rounded-lg p-3 bg-muted/10"
          onDragOver={handleDragOver}
          onDrop={handleDropOnAvailable}
        >
          <h3 className="font-semibold text-center mb-2 text-sm">Items to Sort</h3>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {availableItems.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className="flex flex-col items-center p-2 bg-card border-2 border-primary/20 rounded-lg cursor-move hover:border-primary hover:scale-105 transition-all"
              >
                <span className="text-xl mb-1">{item.icon}</span>
                <span className="text-xs text-center">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div 
            className="min-h-[200px] border-2 border-dashed border-destructive/50 rounded-lg p-3 bg-destructive/5"
            onDragOver={handleDragOver}
            onDrop={handleDropOnCritical}
          >
            <h3 className="font-semibold text-center mb-2 text-destructive text-sm">🚨 Critical (Use First)</h3>
            <div className="grid grid-cols-2 gap-2">
              {criticalItems.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="flex flex-col items-center p-2 bg-card border-2 border-destructive/40 rounded-lg cursor-move hover:scale-105 transition-all"
                >
                  <span className="text-xl mb-1">{item.icon}</span>
                  <span className="text-xs text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div 
            className="min-h-[200px] border-2 border-dashed border-sunny-yellow/50 rounded-lg p-3 bg-sunny-yellow/5"
            onDragOver={handleDragOver}
            onDrop={handleDropOnImportant}
          >
            <h3 className="font-semibold text-center mb-2 text-sunny-yellow text-sm">⚠️ Important</h3>
            <div className="grid grid-cols-2 gap-2">
              {importantItems.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="flex flex-col items-center p-2 bg-card border-2 border-sunny-yellow/40 rounded-lg cursor-move hover:scale-105 transition-all"
                >
                  <span className="text-xl mb-1">{item.icon}</span>
                  <span className="text-xs text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div 
            className="min-h-[200px] border-2 border-dashed border-bright-green/50 rounded-lg p-3 bg-bright-green/5"
            onDragOver={handleDragOver}
            onDrop={handleDropOnUseful}
          >
            <h3 className="font-semibold text-center mb-2 text-bright-green text-sm">✅ Useful</h3>
            <div className="grid grid-cols-2 gap-2">
              {usefulItems.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="flex flex-col items-center p-2 bg-card border-2 border-bright-green/40 rounded-lg cursor-move hover:scale-105 transition-all"
                >
                  <span className="text-xl mb-1">{item.icon}</span>
                  <span className="text-xs text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          {!gameCompleted ? (
            <>
              <Button 
                onClick={calculateScore}
                disabled={availableItems.length > 0}
                className="bg-primary hover:bg-primary/90"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Check Priority!
              </Button>
              <Button 
                onClick={resetGame}
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </>
          ) : (
            <Card className="w-full max-w-md bg-gradient-to-r from-sunny-yellow/10 to-bright-green/10 border-2 border-primary/30">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">
                  {score >= 108 ? '🏆' : score >= 84 ? '⭐' : score >= 60 ? '👍' : '🎯'}
                </div>
                <h3 className="text-2xl font-bold mb-2">Score: {score}/120</h3>
                <p className="text-lg mb-4">{getScoreMessage()}</p>
                <Button 
                  onClick={resetGame}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AidKitPriority;