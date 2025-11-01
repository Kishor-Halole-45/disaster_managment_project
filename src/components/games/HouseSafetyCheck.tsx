import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface SafetyItem {
  id: string;
  name: string;
  icon: string;
  unsafe: boolean;
  reason?: string;
}

interface HouseSafetyCheckProps {
  onBack: () => void;
}

const HouseSafetyCheck = ({ onBack }: HouseSafetyCheckProps) => {
  const allItems: SafetyItem[] = [
    { id: '1', name: 'Heavy bookshelf unsecured', icon: '📚', unsafe: true, reason: 'Can fall during earthquake' },
    { id: '2', name: 'Smoke detector installed', icon: '🚨', unsafe: false },
    { id: '3', name: 'Blocked emergency exit', icon: '🚪', unsafe: true, reason: 'Prevents quick escape' },
    { id: '4', name: 'First aid kit ready', icon: '🏥', unsafe: false },
    { id: '5', name: 'Loose electrical wires', icon: '⚡', unsafe: true, reason: 'Fire and shock hazard' },
    { id: '6', name: 'Fire extinguisher accessible', icon: '🧯', unsafe: false },
    { id: '7', name: 'Glass objects near bed', icon: '🪟', unsafe: true, reason: 'Can break and cause injury' },
    { id: '8', name: 'Emergency flashlight working', icon: '🔦', unsafe: false },
    { id: '9', name: 'Chemicals stored low', icon: '☣️', unsafe: true, reason: 'Children can reach them' },
    { id: '10', name: 'Emergency numbers posted', icon: '📞', unsafe: false },
    { id: '11', name: 'Overloaded power strip', icon: '🔌', unsafe: true, reason: 'Can cause electrical fire' },
    { id: '12', name: 'Clear evacuation path', icon: '🏃', unsafe: false },
  ];

  const [availableItems, setAvailableItems] = useState<SafetyItem[]>(allItems);
  const [fixItBin, setFixItBin] = useState<SafetyItem[]>([]);
  const [safeBin, setSafeBin] = useState<SafetyItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<SafetyItem | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleDragStart = (e: React.DragEvent, item: SafetyItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnFixIt = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      setFixItBin([...fixItBin, draggedItem]);
      removeItemFromSource(draggedItem);
      setDraggedItem(null);
    }
  };

  const handleDropOnSafe = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      setSafeBin([...safeBin, draggedItem]);
      removeItemFromSource(draggedItem);
      setDraggedItem(null);
    }
  };

  const handleDropOnAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && !availableItems.find(item => item.id === draggedItem.id)) {
      setAvailableItems([...availableItems, draggedItem]);
      removeItemFromSource(draggedItem);
      setDraggedItem(null);
    }
  };

  const removeItemFromSource = (item: SafetyItem) => {
    setAvailableItems(availableItems.filter(i => i.id !== item.id));
    setFixItBin(fixItBin.filter(i => i.id !== item.id));
    setSafeBin(safeBin.filter(i => i.id !== item.id));
  };

  const calculateScore = () => {
    let points = 0;
    
    fixItBin.forEach(item => {
      if (item.unsafe) points += 10;
      else points -= 5;
    });
    
    safeBin.forEach(item => {
      if (!item.unsafe) points += 10;
      else points -= 5;
    });
    
    setScore(Math.max(0, points));
    setGameCompleted(true);
  };

  const resetGame = () => {
    setAvailableItems(allItems);
    setFixItBin([]);
    setSafeBin([]);
    setGameCompleted(false);
    setScore(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / 120) * 100;
    if (percentage === 100) return "Perfect! Your home is completely safe! 🏠";
    if (percentage >= 80) return "Excellent safety awareness! 🌟";
    if (percentage >= 60) return "Good job identifying hazards! 👍";
    return "Keep learning about home safety! 🎯";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🏠</span>
            House Safety Check
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
            Sort home items: unsafe ones to "Fix It" bin, safe ones to "Safe" bin!
          </p>
        </div>

        <div 
          className="mb-6 min-h-[100px] border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 bg-muted/10"
          onDragOver={handleDragOver}
          onDrop={handleDropOnAvailable}
        >
          <h3 className="font-semibold text-center mb-3">Home Items to Check</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableItems.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className="p-3 bg-card border-2 border-primary/20 rounded-lg cursor-move hover:border-primary hover:scale-105 transition-all"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div 
            className="min-h-[250px] border-2 border-dashed border-destructive/50 rounded-lg p-4 bg-destructive/5"
            onDragOver={handleDragOver}
            onDrop={handleDropOnFixIt}
          >
            <h3 className="font-semibold text-center mb-3 text-destructive">🔧 Fix It Bin (Unsafe)</h3>
            <div className="space-y-2">
              {fixItBin.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="p-3 bg-card border-2 border-destructive/40 rounded-lg cursor-move hover:scale-105 transition-all"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{item.icon}</span>
                    <div>
                      <div className="text-sm font-medium">{item.name}</div>
                      {item.reason && (
                        <div className="text-xs text-muted-foreground">{item.reason}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div 
            className="min-h-[250px] border-2 border-dashed border-bright-green/50 rounded-lg p-4 bg-bright-green/5"
            onDragOver={handleDragOver}
            onDrop={handleDropOnSafe}
          >
            <h3 className="font-semibold text-center mb-3 text-bright-green">✅ Safe Bin</h3>
            <div className="space-y-2">
              {safeBin.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="p-3 bg-card border-2 border-bright-green/40 rounded-lg cursor-move hover:scale-105 transition-all"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </div>
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
                Check Safety!
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
                <div className="text-sm text-muted-foreground mb-4">
                  Unsafe items identified: {fixItBin.filter(i => i.unsafe).length}/6<br/>
                  Safe items identified: {safeBin.filter(i => !i.unsafe).length}/6
                </div>
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

export default HouseSafetyCheck;