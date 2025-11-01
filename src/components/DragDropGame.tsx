import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, Backpack, RotateCcw } from 'lucide-react';

interface EmergencyItem {
  id: string;
  name: string;
  essential: boolean;
  icon: string;
  category: 'medical' | 'food' | 'tools' | 'safety' | 'distraction';
}

const DragDropGame = () => {
  const allItems: EmergencyItem[] = [
    { id: '1', name: 'First Aid Kit', essential: true, icon: '🩹', category: 'medical' },
    { id: '2', name: 'Water Bottles', essential: true, icon: '💧', category: 'food' },
    { id: '3', name: 'Flashlight', essential: true, icon: '🔦', category: 'tools' },
    { id: '4', name: 'Whistle', essential: true, icon: '📯', category: 'safety' },
    { id: '5', name: 'Emergency Blanket', essential: true, icon: '🧥', category: 'safety' },
    { id: '6', name: 'Protein Bars', essential: true, icon: '🍫', category: 'food' },
    { id: '7', name: 'Smartphone', essential: false, icon: '📱', category: 'tools' },
    { id: '8', name: 'Video Games', essential: false, icon: '🎮', category: 'distraction' },
    { id: '9', name: 'Toys', essential: false, icon: '🧸', category: 'distraction' },
    { id: '10', name: 'Candy', essential: false, icon: '🍭', category: 'food' },
    { id: '11', name: 'Radio', essential: true, icon: '📻', category: 'tools' },
    { id: '12', name: 'Matches', essential: false, icon: '🔥', category: 'tools' }
  ];

  const [availableItems, setAvailableItems] = useState<EmergencyItem[]>(allItems);
  const [bagItems, setBagItems] = useState<EmergencyItem[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, target: 'bag' | 'available') => {
    e.preventDefault();
    if (!draggedItem) return;

    const item = [...availableItems, ...bagItems].find(i => i.id === draggedItem);
    if (!item) return;

    if (target === 'bag' && availableItems.find(i => i.id === draggedItem)) {
      // Move from available to bag
      setAvailableItems(prev => prev.filter(i => i.id !== draggedItem));
      setBagItems(prev => [...prev, item]);
    } else if (target === 'available' && bagItems.find(i => i.id === draggedItem)) {
      // Move from bag to available
      setBagItems(prev => prev.filter(i => i.id !== draggedItem));
      setAvailableItems(prev => [...prev, item]);
    }

    setDraggedItem(null);
  };

  const calculateScore = () => {
    const essentialInBag = bagItems.filter(item => item.essential).length;
    const nonEssentialInBag = bagItems.filter(item => !item.essential).length;
    const totalEssential = allItems.filter(item => item.essential).length;
    
    const correctPoints = essentialInBag * 10;
    const incorrectPenalty = nonEssentialInBag * 5;
    const finalScore = Math.max(0, correctPoints - incorrectPenalty);
    
    setScore(finalScore);
    setGameCompleted(true);
  };

  const resetGame = () => {
    setAvailableItems(allItems);
    setBagItems([]);
    setGameCompleted(false);
    setScore(0);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medical': return 'bg-coral-red/20 border-coral-red';
      case 'food': return 'bg-bright-green/20 border-bright-green';
      case 'tools': return 'bg-sky-blue/20 border-sky-blue';
      case 'safety': return 'bg-bright-orange/20 border-bright-orange';
      case 'distraction': return 'bg-bright-pink/20 border-bright-pink';
      default: return 'bg-muted/20 border-muted';
    }
  };

  return (
    <Card className="shadow-glow border-2 border-bright-green/30 hover:border-bright-green transition-bounce">
      <CardHeader className="bg-secondary text-secondary-foreground">
        <CardTitle className="flex items-center">
          <Backpack className="w-6 h-6 mr-2 text-secondary-foreground icon-bounce" />
          Emergency Kit Builder
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Available Items */}
          <div>
            <h3 className="font-semibold mb-3 text-center">Available Items</h3>
            <div 
              className="min-h-48 p-4 border-2 border-dashed border-muted rounded-lg"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'available')}
            >
              <div className="grid grid-cols-2 gap-2">
                {availableItems.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    className={`p-3 rounded-lg border-2 cursor-move transition-bounce hover:scale-105 ${getCategoryColor(item.category)}`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1 icon-wiggle">{item.icon}</div>
                      <div className="text-xs font-medium">{item.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency Bag */}
          <div>
            <h3 className="font-semibold mb-3 text-center">Emergency Kit Bag</h3>
            <div 
              className="min-h-48 p-4 border-2 border-dashed border-bright-green rounded-lg bg-bright-green/10"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'bag')}
            >
              {bagItems.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Backpack className="w-12 h-12 mx-auto mb-2 icon-pulse" />
                    <p>Drag items here to build your emergency kit!</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {bagItems.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.id)}
                      className={`p-3 rounded-lg border-2 cursor-move transition-bounce hover:scale-105 ${getCategoryColor(item.category)}`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1 icon-wiggle">{item.icon}</div>
                        <div className="text-xs font-medium">{item.name}</div>
                        {item.essential ? (
                          <CheckCircle className="w-3 h-3 text-bright-green mx-auto mt-1 icon-pulse" />
                        ) : (
                          <X className="w-3 h-3 text-coral-red mx-auto mt-1 icon-shake" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="mt-6 flex justify-center space-x-4">
          <Button 
            onClick={calculateScore} 
            disabled={bagItems.length === 0}
            className="bg-bright-green hover:bg-bright-green/80 text-white transition-bounce"
          >
            Check My Kit!
          </Button>
          <Button 
            onClick={resetGame} 
            variant="outline"
            className="transition-bounce"
          >
            <RotateCcw className="w-4 h-4 mr-2 icon-spin" />
            Reset Game
          </Button>
        </div>

        {/* Results */}
        {gameCompleted && (
          <div className="mt-6 p-4 bg-secondary/20 rounded-lg text-center">
            <h4 className="font-semibold mb-2">Game Results!</h4>
            <div className="flex justify-center space-x-4 mb-3">
              <Badge variant="default">Score: {score} points</Badge>
              <Badge variant="secondary">
                Essential Items: {bagItems.filter(i => i.essential).length}/{allItems.filter(i => i.essential).length}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {score >= 50 ? 
                "Great job! You've built an excellent emergency kit!" : 
                "Good try! Review which items are essential for emergencies."
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DragDropGame;