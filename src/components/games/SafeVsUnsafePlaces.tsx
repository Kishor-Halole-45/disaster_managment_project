import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy, AlertCircle, CheckCircle } from 'lucide-react';

interface Place {
  id: string;
  name: string;
  icon: string;
  safe: boolean;
  scenario: string;
  explanation: string;
}

interface SafeVsUnsafePlacesProps {
  onBack: () => void;
}

const SafeVsUnsafePlaces = ({ onBack }: SafeVsUnsafePlacesProps) => {
  const allPlaces: Place[] = [
    { id: '1', name: 'Under Desk', icon: '🪑', safe: true, scenario: 'Earthquake', explanation: 'Sturdy desks protect from falling debris' },
    { id: '2', name: 'Open Ground', icon: '🏞️', safe: true, scenario: 'Building Fire', explanation: 'Away from smoke and collapsing structures' },
    { id: '3', name: 'Doorway', icon: '🚪', safe: true, scenario: 'Earthquake', explanation: 'Strong frame provides protection' },
    { id: '4', name: 'High Ground', icon: '⛰️', safe: true, scenario: 'Flood', explanation: 'Above water level keeps you safe' },
    { id: '5', name: 'Assembly Point', icon: '📍', safe: true, scenario: 'Any Emergency', explanation: 'Designated safe gathering area' },
    { id: '6', name: 'Away from Windows', icon: '🪟', safe: true, scenario: 'Storm', explanation: 'Avoids broken glass injuries' },
    { id: '7', name: 'Near Windows', icon: '🪟', safe: false, scenario: 'Earthquake', explanation: 'Glass can shatter and cause injuries' },
    { id: '8', name: 'Elevator', icon: '🛗', safe: false, scenario: 'Fire', explanation: 'Can trap you if power fails' },
    { id: '9', name: 'Under Trees', icon: '🌳', safe: false, scenario: 'Lightning', explanation: 'Trees attract lightning strikes' },
    { id: '10', name: 'Low Areas', icon: '🕳️', safe: false, scenario: 'Flood', explanation: 'Water collects in low spots first' },
    { id: '11', name: 'Near Buildings', icon: '🏢', safe: false, scenario: 'Earthquake', explanation: 'Risk of falling debris and glass' },
    { id: '12', name: 'Crowded Stairs', icon: '🪜', safe: false, scenario: 'Panic', explanation: 'Risk of stampede and injuries' },
  ];

  const [availablePlaces, setAvailablePlaces] = useState<Place[]>(allPlaces);
  const [safeZone, setSafeZone] = useState<Place[]>([]);
  const [unsafeZone, setUnsafeZone] = useState<Place[]>([]);
  const [draggedPlace, setDraggedPlace] = useState<Place | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<Place[]>([]);

  const handleDragStart = (e: React.DragEvent, place: Place) => {
    setDraggedPlace(place);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnSafe = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedPlace) {
      setSafeZone([...safeZone, draggedPlace]);
      setAvailablePlaces(availablePlaces.filter(p => p.id !== draggedPlace.id));
      setUnsafeZone(unsafeZone.filter(p => p.id !== draggedPlace.id));
      setDraggedPlace(null);
    }
  };

  const handleDropOnUnsafe = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedPlace) {
      setUnsafeZone([...unsafeZone, draggedPlace]);
      setAvailablePlaces(availablePlaces.filter(p => p.id !== draggedPlace.id));
      setSafeZone(safeZone.filter(p => p.id !== draggedPlace.id));
      setDraggedPlace(null);
    }
  };

  const handleDropOnAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedPlace) {
      setAvailablePlaces([...availablePlaces, draggedPlace]);
      setSafeZone(safeZone.filter(p => p.id !== draggedPlace.id));
      setUnsafeZone(unsafeZone.filter(p => p.id !== draggedPlace.id));
      setDraggedPlace(null);
    }
  };

  const calculateScore = () => {
    let points = 0;
    const mistakesList: Place[] = [];
    
    safeZone.forEach(place => {
      if (place.safe) {
        points += 10;
      } else {
        mistakesList.push(place);
      }
    });
    
    unsafeZone.forEach(place => {
      if (!place.safe) {
        points += 10;
      } else {
        mistakesList.push(place);
      }
    });
    
    setScore(Math.max(0, points));
    setMistakes(mistakesList);
    setGameCompleted(true);
  };

  const resetGame = () => {
    setAvailablePlaces(allPlaces);
    setSafeZone([]);
    setUnsafeZone([]);
    setGameCompleted(false);
    setScore(0);
    setMistakes([]);
  };

  const getScoreMessage = () => {
    if (score >= 110) return "Perfect! You're a safety expert! 🌟";
    if (score >= 80) return "Great job! You know your safe places! 👏";
    if (score >= 50) return "Good try! Review the explanations below! 📚";
    return "Keep practicing! Safety knowledge saves lives! 🎯";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🏫</span>
            Safe vs Unsafe Places - Classification Game
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
            Sort classroom and outdoor objects into SAFE ZONE or UNSAFE ZONE!
            <br />
            <span className="text-sm">Consider the scenario for each place</span>
          </p>
        </div>

        {/* Available Places */}
        <div 
          className="mb-6"
          onDragOver={handleDragOver}
          onDrop={handleDropOnAvailable}
        >
          <h3 className="font-semibold text-center mb-3">Places to Sort</h3>
          <div className="min-h-[120px] border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 bg-muted/10">
            <div className="flex flex-wrap gap-3 justify-center">
              {availablePlaces.map(place => (
                <div
                  key={place.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, place)}
                  className="flex flex-col items-center p-3 bg-card border-2 border-primary/20 rounded-lg cursor-move hover:border-primary hover:scale-105 transition-all"
                >
                  <span className="text-2xl mb-1">{place.icon}</span>
                  <span className="text-xs text-center font-semibold">{place.name}</span>
                  <span className="text-xs text-muted-foreground">({place.scenario})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sorting Zones */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Safe Zone */}
          <div className="space-y-4">
            <h3 className="font-semibold text-center mb-3 text-bright-green">✅ SAFE ZONE</h3>
            <div 
              className="min-h-[300px] border-2 border-dashed border-bright-green/50 rounded-lg p-4 bg-bright-green/5 relative"
              onDragOver={handleDragOver}
              onDrop={handleDropOnSafe}
            >
              {safeZone.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl opacity-20">🛡️</span>
                    <p className="text-muted-foreground mt-2">Drop safe places here</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                {safeZone.map(place => (
                  <div
                    key={place.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, place)}
                    className={`flex flex-col items-center p-3 bg-card border-2 ${gameCompleted && !place.safe ? 'border-destructive' : 'border-bright-green/40'} rounded-lg cursor-move hover:scale-105 transition-all`}
                  >
                    <span className="text-2xl mb-1">{place.icon}</span>
                    <span className="text-xs text-center font-semibold">{place.name}</span>
                    <span className="text-xs text-muted-foreground">({place.scenario})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Unsafe Zone */}
          <div className="space-y-4">
            <h3 className="font-semibold text-center mb-3 text-destructive">❌ UNSAFE ZONE</h3>
            <div 
              className="min-h-[300px] border-2 border-dashed border-destructive/50 rounded-lg p-4 bg-destructive/5 relative"
              onDragOver={handleDragOver}
              onDrop={handleDropOnUnsafe}
            >
              {unsafeZone.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl opacity-20">⚠️</span>
                    <p className="text-muted-foreground mt-2">Drop unsafe places here</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                {unsafeZone.map(place => (
                  <div
                    key={place.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, place)}
                    className={`flex flex-col items-center p-3 bg-card border-2 ${gameCompleted && place.safe ? 'border-bright-green' : 'border-destructive/40'} rounded-lg cursor-move hover:scale-105 transition-all`}
                  >
                    <span className="text-2xl mb-1">{place.icon}</span>
                    <span className="text-xs text-center font-semibold">{place.name}</span>
                    <span className="text-xs text-muted-foreground">({place.scenario})</span>
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
                disabled={availablePlaces.length > 0}
                className="bg-primary hover:bg-primary/90"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Check My Answers!
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
            <Card className="w-full max-w-2xl bg-gradient-to-r from-bright-green/10 to-primary/10 border-2 border-primary/30">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">
                    {score >= 110 ? '🏆' : score >= 80 ? '⭐' : score >= 50 ? '👍' : '🎯'}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Score: {score} points</h3>
                  <p className="text-lg mb-4">{getScoreMessage()}</p>
                </div>
                
                {/* Results with Explanations */}
                <div className="space-y-4 mb-4">
                  <div className="bg-card rounded-lg p-4">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-bright-green" />
                      Correct Placements: {allPlaces.length - mistakes.length}
                    </h4>
                  </div>
                  
                  {mistakes.length > 0 && (
                    <div className="bg-destructive/5 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 flex items-center text-destructive">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        Mistakes Explained:
                      </h4>
                      <div className="space-y-2">
                        {mistakes.map(place => (
                          <div key={place.id} className="bg-card rounded p-3">
                            <div className="flex items-start">
                              <span className="text-2xl mr-3">{place.icon}</span>
                              <div className="flex-1">
                                <p className="font-semibold">
                                  {place.name} ({place.scenario})
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Should be in: {place.safe ? '✅ SAFE ZONE' : '❌ UNSAFE ZONE'}
                                </p>
                                <p className="text-sm mt-1">
                                  <span className="font-medium">Why:</span> {place.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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

export default SafeVsUnsafePlaces;