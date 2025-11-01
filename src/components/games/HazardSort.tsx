import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface Hazard {
  id: string;
  name: string;
  icon: string;
  type: 'natural' | 'man-made';
}

interface HazardSortProps {
  onBack: () => void;
}

const HazardSort = ({ onBack }: HazardSortProps) => {
  const allHazards: Hazard[] = [
    { id: '1', name: 'Earthquake', icon: '🏚️', type: 'natural' },
    { id: '2', name: 'Fire', icon: '🔥', type: 'man-made' },
    { id: '3', name: 'Flood', icon: '🌊', type: 'natural' },
    { id: '4', name: 'Chemical Spill', icon: '☣️', type: 'man-made' },
    { id: '5', name: 'Tornado', icon: '🌪️', type: 'natural' },
    { id: '6', name: 'Gas Leak', icon: '💨', type: 'man-made' },
    { id: '7', name: 'Lightning', icon: '⚡', type: 'natural' },
    { id: '8', name: 'Electrical Fire', icon: '🔌', type: 'man-made' },
    { id: '9', name: 'Landslide', icon: '🏔️', type: 'natural' },
    { id: '10', name: 'Building Collapse', icon: '🏢', type: 'man-made' },
    { id: '11', name: 'Hailstorm', icon: '🧊', type: 'natural' },
    { id: '12', name: 'Explosion', icon: '💥', type: 'man-made' },
  ];

  const [availableHazards, setAvailableHazards] = useState<Hazard[]>(allHazards);
  const [naturalHazards, setNaturalHazards] = useState<Hazard[]>([]);
  const [manMadeHazards, setManMadeHazards] = useState<Hazard[]>([]);
  const [draggedHazard, setDraggedHazard] = useState<Hazard | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleDragStart = (e: React.DragEvent, hazard: Hazard) => {
    setDraggedHazard(hazard);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnNatural = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedHazard) {
      setNaturalHazards([...naturalHazards, draggedHazard]);
      setAvailableHazards(availableHazards.filter(h => h.id !== draggedHazard.id));
      setDraggedHazard(null);
    }
  };

  const handleDropOnManMade = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedHazard) {
      setManMadeHazards([...manMadeHazards, draggedHazard]);
      setAvailableHazards(availableHazards.filter(h => h.id !== draggedHazard.id));
      setDraggedHazard(null);
    }
  };

  const handleDropOnAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedHazard && !availableHazards.find(h => h.id === draggedHazard.id)) {
      setAvailableHazards([...availableHazards, draggedHazard]);
      setNaturalHazards(naturalHazards.filter(h => h.id !== draggedHazard.id));
      setManMadeHazards(manMadeHazards.filter(h => h.id !== draggedHazard.id));
      setDraggedHazard(null);
    }
  };

  const calculateScore = () => {
    let points = 0;
    
    naturalHazards.forEach(hazard => {
      if (hazard.type === 'natural') points += 10;
      else points -= 5;
    });
    
    manMadeHazards.forEach(hazard => {
      if (hazard.type === 'man-made') points += 10;
      else points -= 5;
    });
    
    setScore(Math.max(0, points));
    setGameCompleted(true);
  };

  const resetGame = () => {
    setAvailableHazards(allHazards);
    setNaturalHazards([]);
    setManMadeHazards([]);
    setGameCompleted(false);
    setScore(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / 120) * 100;
    if (percentage === 100) return "Perfect! You understand all hazard types! 🎓";
    if (percentage >= 80) return "Excellent hazard knowledge! 🌟";
    if (percentage >= 60) return "Good understanding! Keep learning! 👍";
    return "Practice more to identify hazard types! 🎯";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">⚠️</span>
            Hazard Sort
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
            Sort hazards into Natural or Man-Made categories!
          </p>
        </div>

        <div 
          className="mb-6 min-h-[100px] border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 bg-muted/10"
          onDragOver={handleDragOver}
          onDrop={handleDropOnAvailable}
        >
          <h3 className="font-semibold text-center mb-3">Hazards to Sort</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {availableHazards.map(hazard => (
              <div
                key={hazard.id}
                draggable
                onDragStart={(e) => handleDragStart(e, hazard)}
                className="flex flex-col items-center p-3 bg-card border-2 border-primary/20 rounded-lg cursor-move hover:border-primary hover:scale-105 transition-all"
              >
                <span className="text-2xl mb-1">{hazard.icon}</span>
                <span className="text-xs text-center">{hazard.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div 
            className="min-h-[250px] border-2 border-dashed border-bright-green/50 rounded-lg p-4 bg-bright-green/5"
            onDragOver={handleDragOver}
            onDrop={handleDropOnNatural}
          >
            <h3 className="font-semibold text-center mb-3 text-bright-green">🌍 Natural Hazards</h3>
            <div className="grid grid-cols-2 gap-3">
              {naturalHazards.map(hazard => (
                <div
                  key={hazard.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, hazard)}
                  className="flex flex-col items-center p-3 bg-card border-2 border-bright-green/40 rounded-lg cursor-move hover:scale-105 transition-all"
                >
                  <span className="text-2xl mb-1">{hazard.icon}</span>
                  <span className="text-xs text-center">{hazard.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div 
            className="min-h-[250px] border-2 border-dashed border-sunny-yellow/50 rounded-lg p-4 bg-sunny-yellow/5"
            onDragOver={handleDragOver}
            onDrop={handleDropOnManMade}
          >
            <h3 className="font-semibold text-center mb-3 text-sunny-yellow">🏭 Man-Made Hazards</h3>
            <div className="grid grid-cols-2 gap-3">
              {manMadeHazards.map(hazard => (
                <div
                  key={hazard.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, hazard)}
                  className="flex flex-col items-center p-3 bg-card border-2 border-sunny-yellow/40 rounded-lg cursor-move hover:scale-105 transition-all"
                >
                  <span className="text-2xl mb-1">{hazard.icon}</span>
                  <span className="text-xs text-center">{hazard.name}</span>
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
                disabled={availableHazards.length > 0}
                className="bg-primary hover:bg-primary/90"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Check Sorting!
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
                  Natural correct: {naturalHazards.filter(h => h.type === 'natural').length}/6<br/>
                  Man-made correct: {manMadeHazards.filter(h => h.type === 'man-made').length}/6
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

export default HazardSort;