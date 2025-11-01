import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy, Timer } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  icon: string;
  essential: boolean;
}

interface EmergencyBagTimerProps {
  onBack: () => void;
}

const EmergencyBagTimer = ({ onBack }: EmergencyBagTimerProps) => {
  const allItems: Item[] = [
    { id: '1', name: 'Water', icon: '💧', essential: true },
    { id: '2', name: 'Flashlight', icon: '🔦', essential: true },
    { id: '3', name: 'First Aid', icon: '🩹', essential: true },
    { id: '4', name: 'Food', icon: '🥫', essential: true },
    { id: '5', name: 'Whistle', icon: '📯', essential: true },
    { id: '6', name: 'Radio', icon: '📻', essential: true },
    { id: '7', name: 'TV', icon: '📺', essential: false },
    { id: '8', name: 'Gaming Console', icon: '🎮', essential: false },
    { id: '9', name: 'Jewelry', icon: '💍', essential: false },
    { id: '10', name: 'Decorations', icon: '🎨', essential: false },
    { id: '11', name: 'Magazines', icon: '📚', essential: false },
    { id: '12', name: 'Toys', icon: '🧸', essential: false },
  ];

  const [timeLeft, setTimeLeft] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isRunning) {
      endGame();
    }
  }, [timeLeft, isRunning]);

  const startGame = () => {
    setIsRunning(true);
    setTimeLeft(20);
    setSelectedItems(new Set());
    setGameCompleted(false);
    setScore(0);
  };

  const toggleItem = (itemId: string) => {
    if (!isRunning || gameCompleted) return;
    
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const endGame = () => {
    setIsRunning(false);
    
    let points = 0;
    allItems.forEach(item => {
      if (item.essential && selectedItems.has(item.id)) {
        points += 15;
      } else if (!item.essential && selectedItems.has(item.id)) {
        points -= 10;
      }
    });
    
    // Bonus points for speed
    if (timeLeft > 10) points += 20;
    else if (timeLeft > 5) points += 10;
    
    setScore(Math.max(0, points));
    setGameCompleted(true);
  };

  const resetGame = () => {
    setTimeLeft(20);
    setIsRunning(false);
    setSelectedItems(new Set());
    setGameCompleted(false);
    setScore(0);
  };

  const getScoreMessage = () => {
    if (score >= 100) return "Lightning fast! Perfect emergency packing! ⚡";
    if (score >= 70) return "Great speed! You're prepared! 🎒";
    if (score >= 40) return "Good effort! Practice makes perfect! 👍";
    return "Keep practicing! Speed is crucial in emergencies! 🎯";
  };

  const getTimeColor = () => {
    if (timeLeft > 10) return 'text-bright-green';
    if (timeLeft > 5) return 'text-sunny-yellow';
    return 'text-destructive';
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">⏱️</span>
            Emergency Bag Timer
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
        {!gameCompleted ? (
          <>
            <div className="mb-4 text-center">
              <p className="text-muted-foreground mb-2">
                Pack essential items in 20 seconds!
              </p>
              {isRunning && (
                <div className={`text-4xl font-bold ${getTimeColor()}`}>
                  <Timer className="inline w-8 h-8 mr-2" />
                  {timeLeft}s
                </div>
              )}
            </div>

            {!isRunning && !gameCompleted ? (
              <div className="text-center">
                <div className="text-6xl mb-4">🎒</div>
                <Button 
                  onClick={startGame}
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Timer className="w-5 h-5 mr-2" />
                  Start Timer!
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {allItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    disabled={!isRunning}
                    className={`
                      p-4 rounded-lg border-2 transition-all
                      ${selectedItems.has(item.id)
                        ? 'bg-primary/20 border-primary scale-95'
                        : 'bg-card border-primary/20 hover:border-primary hover:scale-105'
                      }
                      ${!isRunning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                    `}
                  >
                    <div className="text-3xl mb-1">{item.icon}</div>
                    <div className="text-xs">{item.name}</div>
                  </button>
                ))}
              </div>
            )}

            {isRunning && (
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={endGame}
                  className="bg-bright-green hover:bg-bright-green/90"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Done Packing!
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card className="w-full max-w-md mx-auto bg-gradient-to-r from-sunny-yellow/10 to-bright-green/10 border-2 border-primary/30">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">
                {score >= 100 ? '🏆' : score >= 70 ? '⭐' : score >= 40 ? '👍' : '🎯'}
              </div>
              <h3 className="text-2xl font-bold mb-2">Score: {score} points</h3>
              <p className="text-lg mb-2">{getScoreMessage()}</p>
              <div className="text-sm text-muted-foreground mb-4">
                Time remaining: {timeLeft} seconds<br/>
                Essential items packed: {[...selectedItems].filter(id => 
                  allItems.find(item => item.id === id)?.essential
                ).length}/6
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
      </CardContent>
    </Card>
  );
};

export default EmergencyBagTimer;