import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  icon: string;
  useful: boolean;
}

interface FirstAidKitBuilderProps {
  onBack: () => void;
}

const FirstAidKitBuilder = ({ onBack }: FirstAidKitBuilderProps) => {
  const allItems: Item[] = [
    { id: '1', name: 'Bandages', icon: '🩹', useful: true },
    { id: '2', name: 'Antiseptic', icon: '🧴', useful: true },
    { id: '3', name: 'Pain Medicine', icon: '💊', useful: true },
    { id: '4', name: 'Thermometer', icon: '🌡️', useful: true },
    { id: '5', name: 'Medical Tape', icon: '📏', useful: true },
    { id: '6', name: 'Gloves', icon: '🧤', useful: true },
    { id: '7', name: 'Flashlight', icon: '🔦', useful: true },
    { id: '8', name: 'Gauze', icon: '🏥', useful: true },
    { id: '9', name: 'Toy', icon: '🧸', useful: false },
    { id: '10', name: 'Candy', icon: '🍬', useful: false },
    { id: '11', name: 'Video Game', icon: '🎮', useful: false },
    { id: '12', name: 'Comic Book', icon: '📖', useful: false },
    { id: '13', name: 'Pencil', icon: '✏️', useful: false },
    { id: '14', name: 'Ball', icon: '⚽', useful: false },
    { id: '15', name: 'Playing Cards', icon: '🃏', useful: false },
    { id: '16', name: 'Toy Car', icon: '🚗', useful: false },
  ];

  const [availableItems, setAvailableItems] = useState<Item[]>(allItems);
  const [usefulBox, setUsefulBox] = useState<Item[]>([]);
  const [notUsefulBox, setNotUsefulBox] = useState<Item[]>([]);
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const handleDragStart = (e: React.DragEvent, item: Item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnUseful = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      setUsefulBox([...usefulBox, draggedItem]);
      setAvailableItems(availableItems.filter(item => item.id !== draggedItem.id));
      setNotUsefulBox(notUsefulBox.filter(item => item.id !== draggedItem.id));
      setDraggedItem(null);
    }
  };

  const handleDropOnNotUseful = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      setNotUsefulBox([...notUsefulBox, draggedItem]);
      setAvailableItems(availableItems.filter(item => item.id !== draggedItem.id));
      setUsefulBox(usefulBox.filter(item => item.id !== draggedItem.id));
      setDraggedItem(null);
    }
  };

  const handleDropOnAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      setAvailableItems([...availableItems, draggedItem]);
      setUsefulBox(usefulBox.filter(item => item.id !== draggedItem.id));
      setNotUsefulBox(notUsefulBox.filter(item => item.id !== draggedItem.id));
      setDraggedItem(null);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;
    
    usefulBox.forEach(item => {
      if (item.useful) correct++;
      else incorrect++;
    });
    
    notUsefulBox.forEach(item => {
      if (!item.useful) correct++;
      else incorrect++;
    });
    
    setCorrectCount(correct);
    setIncorrectCount(incorrect);
    setScore(Math.round((correct / allItems.length) * 100));
    setGameCompleted(true);
  };

  const resetGame = () => {
    setAvailableItems(allItems);
    setUsefulBox([]);
    setNotUsefulBox([]);
    setGameCompleted(false);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
  };

  const getScoreMessage = () => {
    if (score === 100) return "Perfect! You're a first-aid expert! 🌟";
    if (score >= 80) return "Excellent! You know your medical supplies! 👏";
    if (score >= 60) return "Good job! You understand the basics! 📚";
    if (score >= 40) return "Nice try! Keep learning about first-aid! 💪";
    return "Keep practicing! First-aid knowledge is important! 🎯";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🚑</span>
            First Aid Kit Builder - Sorting Game
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
            Sort items into USEFUL (medical) or NOT USEFUL boxes!
            <br />
            <span className="text-sm">Medical supplies go in the USEFUL box, everything else in NOT USEFUL</span>
          </p>
        </div>

        {/* Available Items */}
        <div 
          className="mb-6"
          onDragOver={handleDragOver}
          onDrop={handleDropOnAvailable}
        >
          <h3 className="font-semibold text-center mb-3">Items to Sort</h3>
          <div className="min-h-[120px] border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 bg-muted/10">
            <div className="flex flex-wrap gap-3 justify-center">
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

        {/* Sorting Boxes */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Useful Box */}
          <div className="space-y-4">
            <h3 className="font-semibold text-center mb-3 text-bright-green">✅ USEFUL (Medical)</h3>
            <div 
              className="min-h-[300px] border-2 border-dashed border-bright-green/50 rounded-lg p-4 bg-bright-green/5 relative"
              onDragOver={handleDragOver}
              onDrop={handleDropOnUseful}
            >
              {usefulBox.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl opacity-20">🏥</span>
                    <p className="text-muted-foreground mt-2">Drop medical items here</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-3">
                {usefulBox.map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="flex flex-col items-center p-3 bg-card border-2 border-bright-green/40 rounded-lg cursor-move hover:scale-105 transition-all"
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="text-xs text-center">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Not Useful Box */}
          <div className="space-y-4">
            <h3 className="font-semibold text-center mb-3 text-destructive">❌ NOT USEFUL</h3>
            <div 
              className="min-h-[300px] border-2 border-dashed border-destructive/50 rounded-lg p-4 bg-destructive/5 relative"
              onDragOver={handleDragOver}
              onDrop={handleDropOnNotUseful}
            >
              {notUsefulBox.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl opacity-20">🚫</span>
                    <p className="text-muted-foreground mt-2">Drop non-medical items here</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-3">
                {notUsefulBox.map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="flex flex-col items-center p-3 bg-card border-2 border-destructive/40 rounded-lg cursor-move hover:scale-105 transition-all"
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="text-xs text-center">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center gap-4">
          {!gameCompleted ? (
            <>
              <Button 
                onClick={calculateScore}
                disabled={availableItems.length > 0}
                className="bg-primary hover:bg-primary/90"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Check My Sorting!
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
            <Card className="w-full max-w-lg bg-gradient-to-r from-bright-green/10 to-primary/10 border-2 border-primary/30">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">
                  {score === 100 ? '🏆' : score >= 80 ? '⭐' : score >= 60 ? '👍' : score >= 40 ? '💪' : '🎯'}
                </div>
                <h3 className="text-2xl font-bold mb-2">Score: {score}%</h3>
                <p className="text-lg mb-4">{getScoreMessage()}</p>
                
                {/* Scoreboard */}
                <div className="bg-card rounded-lg p-4 mb-4 text-left">
                  <h4 className="font-semibold mb-2 text-center">📊 Scoreboard</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-bright-green">✅ Correctly Sorted:</span>
                      <span className="font-bold">{correctCount} items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-destructive">❌ Incorrectly Sorted:</span>
                      <span className="font-bold">{incorrectCount} items</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between">
                        <span>Total Items:</span>
                        <span className="font-bold">{allItems.length}</span>
                      </div>
                    </div>
                  </div>
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

export default FirstAidKitBuilder;