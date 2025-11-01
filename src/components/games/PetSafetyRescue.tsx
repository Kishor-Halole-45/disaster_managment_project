import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy, Timer, Heart } from 'lucide-react';

interface Pet {
  id: string;
  type: string;
  icon: string;
  rescued: boolean;
}

interface Hazard {
  id: string;
  type: string;
  icon: string;
  position: { x: number; y: number };
}

interface PetSafetyRescueProps {
  onBack: () => void;
}

const PetSafetyRescue = ({ onBack }: PetSafetyRescueProps) => {
  const allPets: Pet[] = [
    { id: 'p1', type: 'Dog', icon: '🐕', rescued: false },
    { id: 'p2', type: 'Cat', icon: '🐈', rescued: false },
    { id: 'p3', type: 'Bird', icon: '🦜', rescued: false },
    { id: 'p4', type: 'Rabbit', icon: '🐰', rescued: false },
    { id: 'p5', type: 'Hamster', icon: '🐹', rescued: false },
    { id: 'p6', type: 'Fish', icon: '🐠', rescued: false },
  ];

  const hazards: Hazard[] = [
    { id: 'h1', type: 'Flood', icon: '🌊', position: { x: 25, y: 40 } },
    { id: 'h2', type: 'Fire', icon: '🔥', position: { x: 60, y: 30 } },
    { id: 'h3', type: 'Debris', icon: '🪨', position: { x: 40, y: 60 } },
    { id: 'h4', type: 'Smoke', icon: '💨', position: { x: 70, y: 70 } },
  ];

  const [pets, setPets] = useState<Pet[]>(allPets);
  const [rescuedPets, setRescuedPets] = useState<Pet[]>([]);
  const [draggedPet, setDraggedPet] = useState<Pet | null>(null);
  const [timer, setTimer] = useState(30);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [touchedHazard, setTouchedHazard] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive && timer > 0 && !gameCompleted) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setGameCompleted(true);
            setIsGameActive(false);
            calculateFinalScore();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, timer, gameCompleted]);

  useEffect(() => {
    if (rescuedPets.length === allPets.length) {
      setGameCompleted(true);
      setIsGameActive(false);
      calculateFinalScore();
    }
  }, [rescuedPets]);

  const calculateFinalScore = () => {
    const petPoints = rescuedPets.length * 20;
    const timeBonus = timer * 2;
    const lifeBonus = lives * 10;
    setScore(petPoints + timeBonus + lifeBonus);
  };

  const handleDragStart = (e: React.DragEvent, pet: Pet) => {
    if (!isGameActive) setIsGameActive(true);
    setDraggedPet(pet);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnSafeZone = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedPet && !touchedHazard) {
      setRescuedPets([...rescuedPets, draggedPet]);
      setPets(pets.filter(p => p.id !== draggedPet.id));
      setDraggedPet(null);
    } else if (touchedHazard) {
      setLives(prev => Math.max(0, prev - 1));
      if (lives <= 1) {
        setGameCompleted(true);
        setIsGameActive(false);
        calculateFinalScore();
      }
    }
    setTouchedHazard(false);
    setDraggedPet(null);
  };

  const handleDragOverHazard = () => {
    setTouchedHazard(true);
  };

  const startGame = () => {
    setIsGameActive(true);
  };

  const resetGame = () => {
    setPets(allPets);
    setRescuedPets([]);
    setTimer(30);
    setIsGameActive(false);
    setGameCompleted(false);
    setScore(0);
    setLives(3);
    setTouchedHazard(false);
  };

  const getScoreMessage = () => {
    if (score >= 200) return "Perfect rescue! All pets saved quickly! 🌟";
    if (score >= 150) return "Amazing! You're a hero rescuer! 🦸";
    if (score >= 100) return "Great job! Most pets are safe! 👏";
    if (score >= 50) return "Good effort! Some pets were rescued! 💪";
    return "Keep practicing rescue skills! 🎯";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🐾</span>
            Pet Safety Rescue
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
            Rescue pets by dragging them to the Safe Zone!
            <br />
            <span className="text-sm">Avoid hazards: flood water 🌊, fire 🔥, debris 🪨</span>
          </p>
          <div className="mt-3 flex justify-center gap-6 text-sm">
            <div className="flex items-center">
              <Timer className="w-4 h-4 mr-1" />
              <span className="font-semibold">{timer}s</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1 text-destructive" />
              <span className="font-semibold">{lives}</span>
            </div>
            <div>
              Rescued: <span className="font-semibold">{rescuedPets.length}/{allPets.length}</span>
            </div>
          </div>
        </div>

        {!isGameActive && !gameCompleted && (
          <div className="text-center mb-6">
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Start Rescue Mission!
            </Button>
          </div>
        )}

        {(isGameActive || gameCompleted) && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Danger Zone */}
            <div className="space-y-4">
              <h3 className="font-semibold text-center text-destructive">⚠️ DANGER ZONE</h3>
              <div className="relative min-h-[400px] border-2 border-destructive/50 rounded-lg bg-gradient-to-br from-destructive/10 to-orange-500/10 p-4">
                {/* Hazards */}
                {hazards.map(hazard => (
                  <div
                    key={hazard.id}
                    className="absolute text-4xl animate-pulse"
                    style={{ 
                      left: `${hazard.position.x}%`, 
                      top: `${hazard.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onDragOver={handleDragOverHazard}
                  >
                    {hazard.icon}
                  </div>
                ))}
                
                {/* Pets to rescue */}
                <div className="grid grid-cols-3 gap-3">
                  {pets.map(pet => (
                    <div
                      key={pet.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, pet)}
                      className="flex flex-col items-center p-3 bg-card/80 border-2 border-primary/20 rounded-lg cursor-move hover:border-primary hover:scale-105 transition-all z-10 relative"
                    >
                      <span className="text-3xl mb-1">{pet.icon}</span>
                      <span className="text-xs">{pet.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Safe Zone */}
            <div className="space-y-4">
              <h3 className="font-semibold text-center text-bright-green">✅ SAFE ZONE</h3>
              <div 
                className="min-h-[400px] border-2 border-bright-green/50 rounded-lg bg-gradient-to-br from-bright-green/10 to-sky-blue/10 p-4"
                onDragOver={handleDragOver}
                onDrop={handleDropOnSafeZone}
              >
                {rescuedPets.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <span className="text-6xl opacity-20">🏠</span>
                      <p className="text-muted-foreground mt-2">Drop rescued pets here</p>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-3">
                  {rescuedPets.map(pet => (
                    <div
                      key={pet.id}
                      className="flex flex-col items-center p-3 bg-card border-2 border-bright-green/40 rounded-lg"
                    >
                      <span className="text-3xl mb-1">{pet.icon}</span>
                      <span className="text-xs">Safe!</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game Over */}
        {gameCompleted && (
          <Card className="mt-6 w-full max-w-lg mx-auto bg-gradient-to-r from-sunny-yellow/10 to-bright-green/10 border-2 border-primary/30">
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-3">
                {score >= 200 ? '🏆' : score >= 150 ? '⭐' : score >= 100 ? '👍' : score >= 50 ? '💪' : '🎯'}
              </div>
              <h3 className="text-3xl font-bold mb-2">Score: {score} points</h3>
              <p className="text-lg mb-4">{getScoreMessage()}</p>
              
              <div className="bg-card rounded-lg p-4 mb-4 text-left">
                <h4 className="font-semibold mb-2 text-center">📊 Rescue Report</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Pets Rescued:</span>
                    <span className="font-bold">{rescuedPets.length} × 20 = {rescuedPets.length * 20} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Bonus:</span>
                    <span className="font-bold">{timer} × 2 = {timer * 2} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lives Bonus:</span>
                    <span className="font-bold">{lives} × 10 = {lives * 10} pts</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold">{score} points</span>
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
      </CardContent>
    </Card>
  );
};

export default PetSafetyRescue;