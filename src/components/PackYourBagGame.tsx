import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  icon: string;
  essential: boolean;
}

interface PackYourBagGameProps {
  onBack: () => void;
}

const PackYourBagGame = ({ onBack }: PackYourBagGameProps) => {
  const allItems: Item[] = [
    { id: '1', name: 'Torch/Flashlight', icon: '🔦', essential: true },
    { id: '2', name: 'Water Bottle', icon: '💧', essential: true },
    { id: '3', name: 'First-Aid Kit', icon: '🏥', essential: true },
    { id: '4', name: 'Food/Snacks', icon: '🍎', essential: true },
    { id: '5', name: 'Whistle', icon: '📯', essential: true },
    { id: '6', name: 'Emergency Blanket', icon: '🧥', essential: true },
    { id: '7', name: 'Video Game', icon: '🎮', essential: false },
    { id: '8', name: 'Toy Car', icon: '🚗', essential: false },
    { id: '9', name: 'Candy', icon: '🍭', essential: false },
    { id: '10', name: 'Comic Book', icon: '📚', essential: false },
    { id: '11', name: 'Ball', icon: '⚽', essential: false },
    { id: '12', name: 'Crayons', icon: '🖍️', essential: false },
  ];

  const [availableItems, setAvailableItems] = useState<Item[]>(allItems);
  const [backpackItems, setBackpackItems] = useState<Item[]>([]);
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleDragStart = (e: React.DragEvent, item: Item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnBackpack = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && backpackItems.length < 6) {
      setBackpackItems([...backpackItems, draggedItem]);
      setAvailableItems(availableItems.filter(item => item.id !== draggedItem.id));
      setDraggedItem(null);
    }
  };

  const handleDropOnItems = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && availableItems.find(item => item.id === draggedItem.id) === undefined) {
      setAvailableItems([...availableItems, draggedItem]);
      setBackpackItems(backpackItems.filter(item => item.id !== draggedItem.id));
      setDraggedItem(null);
    }
  };

  const calculateScore = () => {
    let points = 0;
    let correctItems = 0;
    let wrongItems = 0;

    backpackItems.forEach(item => {
      if (item.essential) {
        points += 10;
        correctItems++;
      } else {
        points -= 5;
        wrongItems++;
      }
    });

    setScore(Math.max(0, points));
    setGameCompleted(true);
    
    return { correctItems, wrongItems };
  };

  const resetGame = () => {
    setAvailableItems(allItems);
    setBackpackItems([]);
    setGameCompleted(false);
    setScore(0);
    setDraggedItem(null);
  };

  const getScoreMessage = () => {
    if (score >= 60) return "Perfect! You're fully prepared! 🌟";
    if (score >= 40) return "Good job! You have most essentials! 👍";
    if (score >= 20) return "Not bad, but you missed some important items! 💭";
    return "Try again! Focus on essential items only! 🎯";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">👜</span>
            Pack Your Emergency Bag
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
            Drag essential items into your emergency backpack! 
            <br />
            <span className="text-sm">Choose wisely - you can only fit 6 items!</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Available Items */}
          <div 
            className="space-y-4"
            onDragOver={handleDragOver}
            onDrop={handleDropOnItems}
          >
            <h3 className="font-semibold text-center mb-3">Available Items</h3>
            <div className="min-h-[400px] border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 bg-muted/10">
              <div className="grid grid-cols-3 gap-3">
                {availableItems.map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="flex flex-col items-center p-3 bg-card border-2 border-primary/20 rounded-lg cursor-move hover:border-primary hover:scale-105 transition-all"
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="text-xs text-center">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Backpack */}
          <div className="space-y-4">
            <h3 className="font-semibold text-center mb-3">Emergency Backpack</h3>
            <div 
              className="min-h-[400px] border-2 border-dashed border-primary/50 rounded-lg p-4 bg-primary/5 relative"
              onDragOver={handleDragOver}
              onDrop={handleDropOnBackpack}
            >
              {backpackItems.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl opacity-20">🎒</span>
                    <p className="text-muted-foreground mt-2">Drop items here</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-3">
                {backpackItems.map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="flex flex-col items-center p-3 bg-card border-2 border-primary/40 rounded-lg cursor-move hover:scale-105 transition-all"
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="text-xs text-center">{item.name}</span>
                  </div>
                ))}
              </div>
              {backpackItems.length > 0 && (
                <div className="mt-3 text-center text-sm text-muted-foreground">
                  {backpackItems.length}/6 items packed
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          {!gameCompleted ? (
            <>
              <Button 
                onClick={calculateScore}
                disabled={backpackItems.length === 0}
                className="bg-primary hover:bg-primary/90"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Check My Bag!
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
                  {score >= 60 ? '🏆' : score >= 40 ? '⭐' : score >= 20 ? '👍' : '🎯'}
                </div>
                <h3 className="text-2xl font-bold mb-2">Score: {score} points</h3>
                <p className="text-lg mb-4">{getScoreMessage()}</p>
                <div className="text-sm text-muted-foreground mb-4">
                  Essential items packed: {backpackItems.filter(i => i.essential).length}<br />
                  Non-essential items: {backpackItems.filter(i => !i.essential).length}
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

export default PackYourBagGame;