import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface ToolMatcherProps {
  onBack: () => void;
}

const ToolMatcher = ({ onBack }: ToolMatcherProps) => {
  const tools = [
    { id: '1', name: 'Fire Extinguisher', icon: '🧯', use: 'Put out small fires' },
    { id: '2', name: 'Rope', icon: '🪢', use: 'Rescue from height' },
    { id: '3', name: 'First Aid Kit', icon: '🏥', use: 'Treat injuries' },
    { id: '4', name: 'Flashlight', icon: '🔦', use: 'Light in darkness' },
    { id: '5', name: 'Whistle', icon: '📯', use: 'Signal for help' },
    { id: '6', name: 'Radio', icon: '📻', use: 'Get emergency updates' },
  ];

  const uses = [
    { id: 'u1', text: 'Put out small fires', toolId: '1' },
    { id: 'u2', text: 'Rescue from height', toolId: '2' },
    { id: 'u3', text: 'Treat injuries', toolId: '3' },
    { id: 'u4', text: 'Light in darkness', toolId: '4' },
    { id: 'u5', text: 'Signal for help', toolId: '5' },
    { id: 'u6', text: 'Get emergency updates', toolId: '6' },
  ];

  const [shuffledUses] = useState(() => [...uses].sort(() => Math.random() - 0.5));
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedUse, setSelectedUse] = useState<string | null>(null);
  const [matches, setMatches] = useState<{[key: string]: string}>({});
  const [gameCompleted, setGameCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleToolClick = (toolId: string) => {
    if (matches[toolId] || gameCompleted) return;
    setSelectedTool(toolId);
    
    if (selectedUse) {
      checkMatch(toolId, selectedUse);
    }
  };

  const handleUseClick = (useId: string) => {
    if (Object.values(matches).includes(useId) || gameCompleted) return;
    setSelectedUse(useId);
    
    if (selectedTool) {
      checkMatch(selectedTool, useId);
    }
  };

  const checkMatch = (toolId: string, useId: string) => {
    setAttempts(attempts + 1);
    const use = shuffledUses.find(u => u.id === useId);
    
    if (use && use.toolId === toolId) {
      setMatches({...matches, [toolId]: useId});
      setSelectedTool(null);
      setSelectedUse(null);
      
      if (Object.keys(matches).length === tools.length - 1) {
        setGameCompleted(true);
      }
    } else {
      // Wrong match - reset selections after a delay
      setTimeout(() => {
        setSelectedTool(null);
        setSelectedUse(null);
      }, 1000);
    }
  };

  const resetGame = () => {
    setSelectedTool(null);
    setSelectedUse(null);
    setMatches({});
    setGameCompleted(false);
    setAttempts(0);
  };

  const getScore = () => {
    const correctMatches = Object.keys(matches).length;
    const baseScore = correctMatches * 15;
    const accuracyBonus = attempts <= 6 ? 10 : attempts <= 10 ? 5 : 0;
    return baseScore + accuracyBonus;
  };

  const getScoreMessage = () => {
    const score = getScore();
    if (score >= 95) return "Perfect! You know all emergency tools! 🛠️";
    if (score >= 85) return "Excellent tool knowledge! 🌟";
    if (score >= 70) return "Good understanding of safety tools! 👍";
    return "Keep learning about emergency tools! 🎯";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🔧</span>
            Match Tool with Use
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
                Match each emergency tool with its correct use!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Matches: {Object.keys(matches).length}/{tools.length}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-center mb-3">Emergency Tools</h3>
                <div className="space-y-3">
                  {tools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => handleToolClick(tool.id)}
                      disabled={!!matches[tool.id]}
                      className={`
                        w-full p-4 rounded-lg border-2 transition-all flex items-center
                        ${matches[tool.id]
                          ? 'bg-bright-green/20 border-bright-green cursor-not-allowed'
                          : selectedTool === tool.id
                          ? 'bg-primary/20 border-primary scale-105'
                          : 'bg-card border-primary/20 hover:border-primary hover:scale-105 cursor-pointer'
                        }
                      `}
                    >
                      <span className="text-3xl mr-3">{tool.icon}</span>
                      <span className="font-medium">{tool.name}</span>
                      {matches[tool.id] && <span className="ml-auto text-bright-green">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-center mb-3">Tool Uses</h3>
                <div className="space-y-3">
                  {shuffledUses.map(use => (
                    <button
                      key={use.id}
                      onClick={() => handleUseClick(use.id)}
                      disabled={Object.values(matches).includes(use.id)}
                      className={`
                        w-full p-4 rounded-lg border-2 transition-all
                        ${Object.values(matches).includes(use.id)
                          ? 'bg-bright-green/20 border-bright-green cursor-not-allowed'
                          : selectedUse === use.id
                          ? 'bg-primary/20 border-primary scale-105'
                          : 'bg-card border-primary/20 hover:border-primary hover:scale-105 cursor-pointer'
                        }
                      `}
                    >
                      {use.text}
                      {Object.values(matches).includes(use.id) && 
                        <span className="ml-2 text-bright-green">✓</span>
                      }
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button 
                onClick={resetGame}
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </>
        ) : (
          <Card className="w-full max-w-md mx-auto bg-gradient-to-r from-sunny-yellow/10 to-bright-green/10 border-2 border-primary/30">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">
                {getScore() >= 95 ? '🏆' : getScore() >= 85 ? '⭐' : getScore() >= 70 ? '👍' : '🎯'}
              </div>
              <h3 className="text-2xl font-bold mb-2">Score: {getScore()}/100</h3>
              <p className="text-lg mb-2">{getScoreMessage()}</p>
              <p className="text-sm text-muted-foreground mb-4">
                Completed in {attempts} attempts
              </p>
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

export default ToolMatcher;