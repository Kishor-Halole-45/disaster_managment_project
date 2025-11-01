import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy, MapPin } from 'lucide-react';

interface EscapeRoutePlannerProps {
  onBack: () => void;
}

const EscapeRoutePlanner = ({ onBack }: EscapeRoutePlannerProps) => {
  const [selectedPath, setSelectedPath] = useState<number[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);

  const scenarios = [
    {
      title: 'Fire in Science Lab',
      correctPath: [5, 4, 3, 7, 11],
      blockedRooms: [1, 2, 6],
      assemblyPoint: 11
    },
    {
      title: 'Earthquake Alert',
      correctPath: [5, 9, 10, 11],
      blockedRooms: [3, 4, 7, 8],
      assemblyPoint: 11
    },
    {
      title: 'Flood Warning',
      correctPath: [5, 9, 13, 14, 15],
      blockedRooms: [1, 2, 3, 4, 6, 7, 8],
      assemblyPoint: 15
    }
  ];

  const rooms = [
    { id: 1, name: 'Library', x: 10, y: 10 },
    { id: 2, name: 'Computer Lab', x: 110, y: 10 },
    { id: 3, name: 'Science Lab', x: 210, y: 10 },
    { id: 4, name: 'Art Room', x: 310, y: 10 },
    { id: 5, name: 'Your Classroom', x: 10, y: 110, isStart: true },
    { id: 6, name: 'Math Room', x: 110, y: 110 },
    { id: 7, name: 'Cafeteria', x: 210, y: 110 },
    { id: 8, name: 'Gym', x: 310, y: 110 },
    { id: 9, name: 'Hallway A', x: 10, y: 210 },
    { id: 10, name: 'Hallway B', x: 110, y: 210 },
    { id: 11, name: 'Assembly Point 1', x: 210, y: 210, isAssembly: true },
    { id: 12, name: 'Office', x: 310, y: 210 },
    { id: 13, name: 'Exit A', x: 10, y: 310 },
    { id: 14, name: 'Exit B', x: 110, y: 310 },
    { id: 15, name: 'Assembly Point 2', x: 210, y: 310, isAssembly: true },
    { id: 16, name: 'Exit C', x: 310, y: 310 }
  ];

  const handleRoomClick = (roomId: number) => {
    if (gameCompleted) return;
    
    const scenario = scenarios[currentScenario];
    if (scenario.blockedRooms.includes(roomId)) return;

    if (selectedPath.length === 0 && roomId !== 5) return;
    
    if (selectedPath.includes(roomId)) {
      const index = selectedPath.indexOf(roomId);
      setSelectedPath(selectedPath.slice(0, index));
    } else {
      setSelectedPath([...selectedPath, roomId]);
    }
  };

  const checkRoute = () => {
    const scenario = scenarios[currentScenario];
    const isCorrect = JSON.stringify(selectedPath) === JSON.stringify(scenario.correctPath);
    
    if (isCorrect) {
      setScore(score + 30);
    } else {
      setScore(Math.max(0, score - 10));
    }
    
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedPath([]);
    } else {
      setGameCompleted(true);
    }
  };

  const resetGame = () => {
    setSelectedPath([]);
    setGameCompleted(false);
    setScore(0);
    setCurrentScenario(0);
  };

  const getScoreMessage = () => {
    if (score >= 90) return "Perfect! You're an escape route expert! 🗺️";
    if (score >= 60) return "Great navigation skills! 🧭";
    if (score >= 30) return "Good effort! Practice more routes! 📍";
    return "Keep learning the escape routes! 🎯";
  };

  const scenario = scenarios[currentScenario];

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🗺️</span>
            Escape Route Planner
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
              <h3 className="text-xl font-bold mb-2">Scenario: {scenario.title}</h3>
              <p className="text-muted-foreground">
                Click rooms to plan your escape route from classroom to assembly point!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Scenario {currentScenario + 1} of {scenarios.length}
              </p>
            </div>

            <div className="relative bg-muted/10 border-2 border-primary/20 rounded-lg p-4 mb-4" style={{ height: '400px' }}>
              <svg width="100%" height="100%" viewBox="0 0 400 400">
                {/* Draw connections between selected rooms */}
                {selectedPath.map((roomId, index) => {
                  if (index === 0) return null;
                  const prevRoom = rooms.find(r => r.id === selectedPath[index - 1]);
                  const currentRoom = rooms.find(r => r.id === roomId);
                  if (!prevRoom || !currentRoom) return null;
                  
                  return (
                    <line
                      key={`${prevRoom.id}-${currentRoom.id}`}
                      x1={prevRoom.x + 30}
                      y1={prevRoom.y + 20}
                      x2={currentRoom.x + 30}
                      y2={currentRoom.y + 20}
                      stroke="hsl(var(--bright-green))"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                    />
                  );
                })}

                {/* Draw rooms */}
                {rooms.map(room => {
                  const isBlocked = scenario.blockedRooms.includes(room.id);
                  const isSelected = selectedPath.includes(room.id);
                  const isAssemblyTarget = room.id === scenario.assemblyPoint;
                  
                  return (
                    <g key={room.id}>
                      <rect
                        x={room.x}
                        y={room.y}
                        width="60"
                        height="40"
                        rx="5"
                        className={`cursor-pointer transition-all ${
                          isBlocked ? 'fill-destructive/50' :
                          room.isStart ? 'fill-primary' :
                          isAssemblyTarget ? 'fill-bright-green' :
                          isSelected ? 'fill-primary/50' :
                          'fill-card hover:fill-primary/20'
                        } ${isBlocked ? '' : 'hover:scale-110'}`}
                        stroke={isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
                        strokeWidth="2"
                        onClick={() => handleRoomClick(room.id)}
                      />
                      <text
                        x={room.x + 30}
                        y={room.y + 25}
                        textAnchor="middle"
                        className="text-xs fill-foreground pointer-events-none"
                      >
                        {room.name}
                      </text>
                      {isBlocked && (
                        <text x={room.x + 30} y={room.y + 15} textAnchor="middle" className="text-lg">
                          ❌
                        </text>
                      )}
                      {room.isStart && (
                        <text x={room.x + 30} y={room.y + 15} textAnchor="middle" className="text-lg">
                          👤
                        </text>
                      )}
                      {isAssemblyTarget && (
                        <text x={room.x + 30} y={room.y + 15} textAnchor="middle" className="text-lg">
                          🏁
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span className="text-sm">Start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-bright-green rounded"></div>
                <span className="text-sm">Assembly Point</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-destructive/50 rounded"></div>
                <span className="text-sm">Blocked</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button 
                onClick={checkRoute}
                disabled={selectedPath.length === 0 || selectedPath[selectedPath.length - 1] !== scenario.assemblyPoint}
                className="bg-primary hover:bg-primary/90"
              >
                Check Route
              </Button>
              <Button 
                onClick={() => setSelectedPath([])}
                variant="outline"
              >
                Clear Path
              </Button>
              <Button 
                onClick={resetGame}
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Game
              </Button>
            </div>
          </>
        ) : (
          <Card className="w-full max-w-md mx-auto bg-gradient-to-r from-sunny-yellow/10 to-bright-green/10 border-2 border-primary/30">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">
                {score >= 90 ? '🏆' : score >= 60 ? '⭐' : score >= 30 ? '👍' : '🎯'}
              </div>
              <h3 className="text-2xl font-bold mb-2">Score: {score}/90</h3>
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
      </CardContent>
    </Card>
  );
};

export default EscapeRoutePlanner;