import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface DisasterItem {
  id: string;
  name: string;
  icon: string;
  type: 'disaster' | 'cause';
  matchId: string;
}

interface DisasterCauseSorterProps {
  onBack: () => void;
}

const DisasterCauseSorter = ({ onBack }: DisasterCauseSorterProps) => {
  const allItems: DisasterItem[] = [
    { id: '1', name: 'Flood', icon: '🌊', type: 'disaster', matchId: 'rain' },
    { id: '2', name: 'Heavy Rain', icon: '🌧️', type: 'cause', matchId: 'rain' },
    { id: '3', name: 'Earthquake', icon: '🏚️', type: 'disaster', matchId: 'plates' },
    { id: '4', name: 'Tectonic Plates', icon: '🪨', type: 'cause', matchId: 'plates' },
    { id: '5', name: 'Wildfire', icon: '🔥', type: 'disaster', matchId: 'heat' },
    { id: '6', name: 'Extreme Heat', icon: '☀️', type: 'cause', matchId: 'heat' },
    { id: '7', name: 'Landslide', icon: '⛰️', type: 'disaster', matchId: 'erosion' },
    { id: '8', name: 'Soil Erosion', icon: '🏔️', type: 'cause', matchId: 'erosion' },
    { id: '9', name: 'Cyclone', icon: '🌀', type: 'disaster', matchId: 'pressure' },
    { id: '10', name: 'Low Pressure', icon: '💨', type: 'cause', matchId: 'pressure' },
    { id: '11', name: 'Drought', icon: '🏜️', type: 'disaster', matchId: 'norain' },
    { id: '12', name: 'No Rainfall', icon: '☁️', type: 'cause', matchId: 'norain' },
  ];

  const [availableItems, setAvailableItems] = useState<DisasterItem[]>(allItems);
  const [disasters, setDisasters] = useState<DisasterItem[]>([]);
  const [causes, setCauses] = useState<DisasterItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<DisasterItem | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);

  const handleDragStart = (e: React.DragEvent, item: DisasterItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnDisasters = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && draggedItem.type === 'disaster') {
      setDisasters([...disasters, draggedItem]);
      setAvailableItems(availableItems.filter(item => item.id !== draggedItem.id));
      checkMatches([...disasters, draggedItem], causes);
      setDraggedItem(null);
    }
  };

  const handleDropOnCauses = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && draggedItem.type === 'cause') {
      setCauses([...causes, draggedItem]);
      setAvailableItems(availableItems.filter(item => item.id !== draggedItem.id));
      checkMatches(disasters, [...causes, draggedItem]);
      setDraggedItem(null);
    }
  };

  const handleDropOnAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      setAvailableItems([...availableItems, draggedItem]);
      setDisasters(disasters.filter(item => item.id !== draggedItem.id));
      setCauses(causes.filter(item => item.id !== draggedItem.id));
      setDraggedItem(null);
    }
  };

  const checkMatches = (disastersList: DisasterItem[], causesList: DisasterItem[]) => {
    const newMatches: string[] = [];
    disastersList.forEach(disaster => {
      const matchingCause = causesList.find(cause => cause.matchId === disaster.matchId);
      if (matchingCause) {
        newMatches.push(disaster.matchId);
      }
    });
    setMatches(newMatches);
  };

  const calculateScore = () => {
    let points = 0;
    
    // Correct placements
    disasters.forEach(item => {
      if (item.type === 'disaster') points += 5;
      else points -= 5;
    });
    
    causes.forEach(item => {
      if (item.type === 'cause') points += 5;
      else points -= 5;
    });
    
    // Bonus for matches
    points += matches.length * 10;
    
    setScore(Math.max(0, points));
    setGameCompleted(true);
  };

  const resetGame = () => {
    setAvailableItems(allItems);
    setDisasters([]);
    setCauses([]);
    setGameCompleted(false);
    setScore(0);
    setMatches([]);
  };

  const getScoreMessage = () => {
    if (score >= 90) return "Perfect! You understand disasters and their causes! 🌟";
    if (score >= 60) return "Great job! You know most connections! 👏";
    if (score >= 30) return "Good try! Keep learning about disasters! 📚";
    return "Keep practicing! Understanding causes helps prevent disasters! 🎯";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🔍</span>
            Disaster-Cause Sorter
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
            Match disasters with their causes!
            <br />
            <span className="text-sm">Drag disasters to the left, causes to the right</span>
          </p>
          <div className="text-sm mt-2">
            Matches found: {matches.length}/6
          </div>
        </div>

        <div 
          className="mb-6"
          onDragOver={handleDragOver}
          onDrop={handleDropOnAvailable}
        >
          <h3 className="font-semibold text-center mb-3">Available Items</h3>
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

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-center mb-3 text-bright-pink">🌊 Disasters</h3>
            <div 
              className="min-h-[300px] border-2 border-dashed border-bright-pink/50 rounded-lg p-4 bg-bright-pink/5 relative"
              onDragOver={handleDragOver}
              onDrop={handleDropOnDisasters}
            >
              {disasters.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl opacity-20">🌊</span>
                    <p className="text-muted-foreground mt-2">Drop disasters here</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                {disasters.map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className={`flex flex-col items-center p-3 bg-card border-2 rounded-lg cursor-move hover:scale-105 transition-all
                      ${matches.includes(item.matchId) ? 'border-bright-green bg-bright-green/10' : 'border-bright-pink/40'}
                    `}
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="text-xs text-center">{item.name}</span>
                    {matches.includes(item.matchId) && (
                      <span className="text-xs text-bright-green">✓ Matched</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-center mb-3 text-sunny-yellow">⚡ Causes</h3>
            <div 
              className="min-h-[300px] border-2 border-dashed border-sunny-yellow/50 rounded-lg p-4 bg-sunny-yellow/5 relative"
              onDragOver={handleDragOver}
              onDrop={handleDropOnCauses}
            >
              {causes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl opacity-20">⚡</span>
                    <p className="text-muted-foreground mt-2">Drop causes here</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                {causes.map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className={`flex flex-col items-center p-3 bg-card border-2 rounded-lg cursor-move hover:scale-105 transition-all
                      ${matches.includes(item.matchId) ? 'border-bright-green bg-bright-green/10' : 'border-sunny-yellow/40'}
                    `}
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="text-xs text-center">{item.name}</span>
                    {matches.includes(item.matchId) && (
                      <span className="text-xs text-bright-green">✓ Matched</span>
                    )}
                  </div>
                ))}
              </div>
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
            <Card className="w-full max-w-md bg-gradient-to-r from-bright-pink/10 to-sunny-yellow/10 border-2 border-primary/30">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">
                  {score >= 90 ? '🏆' : score >= 60 ? '⭐' : score >= 30 ? '👍' : '🎯'}
                </div>
                <h3 className="text-2xl font-bold mb-2">Score: {score} points</h3>
                <p className="text-lg mb-4">{getScoreMessage()}</p>
                <div className="text-sm text-muted-foreground mb-4">
                  Correct matches: {matches.length}/6<br />
                  Items sorted correctly: {disasters.filter(d => d.type === 'disaster').length + causes.filter(c => c.type === 'cause').length}/12
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

export default DisasterCauseSorter;