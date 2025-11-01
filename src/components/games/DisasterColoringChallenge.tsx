import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy, Palette } from 'lucide-react';

interface Scene {
  id: string;
  name: string;
  icon: string;
  correctColors: string[];
  description: string;
}

interface DisasterColoringChallengeProps {
  onBack: () => void;
}

const DisasterColoringChallenge = ({ onBack }: DisasterColoringChallengeProps) => {
  const scenes: Scene[] = [
    {
      id: 's1',
      name: 'Earthquake Drill',
      icon: '🏚️',
      correctColors: ['green', 'blue', 'yellow'],
      description: 'Drop, Cover, Hold - Use safety colors!'
    },
    {
      id: 's2',
      name: 'Fire Escape',
      icon: '🔥',
      correctColors: ['red', 'orange', 'green'],
      description: 'Exit signs and fire safety equipment'
    },
    {
      id: 's3',
      name: 'Flood Rescue',
      icon: '🌊',
      correctColors: ['blue', 'yellow', 'orange'],
      description: 'Life jackets and rescue boats'
    }
  ];

  const colors = [
    { name: 'red', hex: '#ef4444', emoji: '🔴' },
    { name: 'orange', hex: '#f97316', emoji: '🟠' },
    { name: 'yellow', hex: '#eab308', emoji: '🟡' },
    { name: 'green', hex: '#22c55e', emoji: '🟢' },
    { name: 'blue', hex: '#3b82f6', emoji: '🔵' },
    { name: 'purple', hex: '#a855f7', emoji: '🟣' },
  ];

  const [currentScene, setCurrentScene] = useState(0);
  const [selectedColors, setSelectedColors] = useState<{ [key: string]: string[] }>({
    s1: [],
    s2: [],
    s3: []
  });
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [gameCompleted, setGameCompleted] = useState(false);
  const [badges, setBadges] = useState<string[]>([]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSceneColor = (sceneId: string) => {
    if (selectedColor && !selectedColors[sceneId].includes(selectedColor)) {
      setSelectedColors({
        ...selectedColors,
        [sceneId]: [...selectedColors[sceneId], selectedColor]
      });
    }
  };

  const clearSceneColors = (sceneId: string) => {
    setSelectedColors({
      ...selectedColors,
      [sceneId]: []
    });
  };

  const checkCompletion = () => {
    const earnedBadges: string[] = [];
    let allCorrect = true;

    scenes.forEach(scene => {
      const userColors = selectedColors[scene.id];
      const correct = scene.correctColors.every(color => userColors.includes(color));
      
      if (correct && userColors.length === scene.correctColors.length) {
        earnedBadges.push(scene.name);
      } else {
        allCorrect = false;
      }
    });

    setBadges(earnedBadges);
    setGameCompleted(true);
  };

  const resetGame = () => {
    setSelectedColors({ s1: [], s2: [], s3: [] });
    setSelectedColor('');
    setCurrentScene(0);
    setGameCompleted(false);
    setBadges([]);
  };

  const getCompletionMessage = () => {
    if (badges.length === scenes.length) return "Perfect! You earned all badges! 🌟";
    if (badges.length >= 2) return "Great job! You know safety colors! 👏";
    if (badges.length >= 1) return "Good start! Try more scenes! 📚";
    return "Keep practicing safety colors! 🎯";
  };

  const scene = scenes[currentScene];

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🎨</span>
            Disaster Coloring Challenge
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
              <p className="text-muted-foreground">
                Color disaster scenes with the correct safety action colors!
                <br />
                <span className="text-sm">Choose colors that match safety equipment and signs</span>
              </p>
            </div>

            {/* Scene Selector */}
            <div className="flex justify-center gap-2 mb-6">
              {scenes.map((s, index) => (
                <Button
                  key={s.id}
                  variant={currentScene === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentScene(index)}
                  className="flex items-center"
                >
                  <span className="mr-1">{s.icon}</span>
                  {s.name}
                </Button>
              ))}
            </div>

            {/* Color Palette */}
            <div className="mb-6">
              <h3 className="font-semibold text-center mb-3">🎨 Color Palette</h3>
              <div className="flex justify-center gap-3">
                {colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => handleColorSelect(color.name)}
                    className={`w-16 h-16 rounded-lg border-4 transition-all hover:scale-110 ${
                      selectedColor === color.name 
                        ? 'border-primary ring-2 ring-primary ring-offset-2' 
                        : 'border-muted-foreground/30'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    <span className="text-2xl">{color.emoji}</span>
                  </button>
                ))}
              </div>
              {selectedColor && (
                <p className="text-center mt-2 text-sm">
                  Selected: <span className="font-semibold capitalize">{selectedColor}</span>
                </p>
              )}
            </div>

            {/* Scene Canvas */}
            <div className="mb-6">
              <Card className="border-2 border-primary/30">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <span className="text-6xl">{scene.icon}</span>
                    <h3 className="text-xl font-semibold mt-2">{scene.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{scene.description}</p>
                  </div>
                  
                  <div 
                    className="min-h-[200px] border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 bg-muted/10 cursor-pointer"
                    onClick={() => handleSceneColor(scene.id)}
                  >
                    <p className="text-center text-muted-foreground mb-4">
                      Click to apply selected color
                    </p>
                    
                    {/* Display colored elements */}
                    <div className="flex flex-wrap justify-center gap-3">
                      {selectedColors[scene.id].map((color, index) => {
                        const colorObj = colors.find(c => c.name === color);
                        return (
                          <div
                            key={index}
                            className="w-20 h-20 rounded-lg border-2 border-primary/20 flex items-center justify-center"
                            style={{ backgroundColor: colorObj?.hex }}
                          >
                            <span className="text-3xl">{colorObj?.emoji}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    {selectedColors[scene.id].length > 0 && (
                      <div className="mt-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          Colors used: {selectedColors[scene.id].length}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Hint: {scene.name} needs {scene.correctColors.length} specific colors
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => clearSceneColors(scene.id)}
                    >
                      <Palette className="w-4 h-4 mr-1" />
                      Clear Colors
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Check Completion */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={checkCompletion}
                className="bg-primary hover:bg-primary/90"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Check My Coloring!
              </Button>
              <Button
                onClick={resetGame}
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset All
              </Button>
            </div>
          </>
        ) : (
          <Card className="w-full max-w-lg mx-auto bg-gradient-to-r from-sunny-yellow/10 to-bright-pink/10 border-2 border-primary/30">
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-3">
                {badges.length === scenes.length ? '🏆' : badges.length >= 2 ? '⭐' : badges.length >= 1 ? '👍' : '🎯'}
              </div>
              <h3 className="text-2xl font-bold mb-2">Coloring Complete!</h3>
              <p className="text-lg mb-4">{getCompletionMessage()}</p>
              
              {/* Badges Earned */}
              <div className="bg-card rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-3">🏅 Badges Earned</h4>
                {badges.length > 0 ? (
                  <div className="space-y-2">
                    {badges.map((badge, index) => (
                      <div key={index} className="flex items-center justify-center gap-2">
                        <span className="text-2xl">✅</span>
                        <span className="font-medium">{badge} Badge</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No badges earned yet. Try using the correct safety colors!
                  </p>
                )}
                
                {badges.length < scenes.length && (
                  <div className="mt-3 text-sm text-muted-foreground">
                    <p>Hint: Think about safety equipment colors!</p>
                    <p>🔴 Red = Fire/Emergency</p>
                    <p>🟢 Green = Safety/Exit</p>
                    <p>🟡 Yellow = Caution/Warning</p>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={resetGame}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default DisasterColoringChallenge;