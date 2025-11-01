import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy, Timer } from 'lucide-react';

interface DisasterCard {
  id: string;
  type: 'disaster' | 'icon';
  name: string;
  display: string;
  matchId: string;
}

interface DisasterMatcherProps {
  onBack: () => void;
}

const DisasterMatcher = ({ onBack }: DisasterMatcherProps) => {
  const disasters: DisasterCard[] = [
    { id: 'd1', type: 'disaster', name: 'Earthquake', display: 'Earthquake', matchId: 'm1' },
    { id: 'i1', type: 'icon', name: 'Earthquake', display: '🏚️', matchId: 'm1' },
    { id: 'd2', type: 'disaster', name: 'Flood', display: 'Flood', matchId: 'm2' },
    { id: 'i2', type: 'icon', name: 'Flood', display: '🌊', matchId: 'm2' },
    { id: 'd3', type: 'disaster', name: 'Fire', display: 'Fire', matchId: 'm3' },
    { id: 'i3', type: 'icon', name: 'Fire', display: '🔥', matchId: 'm3' },
    { id: 'd4', type: 'disaster', name: 'Cyclone', display: 'Cyclone', matchId: 'm4' },
    { id: 'i4', type: 'icon', name: 'Cyclone', display: '🌀', matchId: 'm4' },
    { id: 'd5', type: 'disaster', name: 'Storm', display: 'Storm', matchId: 'm5' },
    { id: 'i5', type: 'icon', name: 'Storm', display: '⛈️', matchId: 'm5' },
    { id: 'd6', type: 'disaster', name: 'Volcano', display: 'Volcano', matchId: 'm6' },
    { id: 'i6', type: 'icon', name: 'Volcano', display: '🌋', matchId: 'm6' },
    { id: 'd7', type: 'disaster', name: 'Drought', display: 'Drought', matchId: 'm7' },
    { id: 'i7', type: 'icon', name: 'Drought', display: '☀️', matchId: 'm7' },
    { id: 'd8', type: 'disaster', name: 'Tsunami', display: 'Tsunami', matchId: 'm8' },
    { id: 'i8', type: 'icon', name: 'Tsunami', display: '🌊', matchId: 'm8' },
  ];

  const [cards, setCards] = useState<DisasterCard[]>(() => 
    [...disasters].sort(() => Math.random() - 0.5)
  );
  const [selectedCards, setSelectedCards] = useState<DisasterCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive && !gameCompleted) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, gameCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    const baseScore = 100;
    const timePenalty = Math.min(50, Math.floor(timer / 2));
    const attemptPenalty = Math.min(30, attempts * 2);
    const score = Math.max(0, baseScore - timePenalty - attemptPenalty);
    
    // Bonus for quick completion
    let bonus = 0;
    if (timer < 30) bonus = 50;
    else if (timer < 60) bonus = 30;
    else if (timer < 90) bonus = 10;
    
    return Math.min(150, score + bonus);
  };

  const handleCardClick = (card: DisasterCard) => {
    if (!isGameActive) setIsGameActive(true);
    if (selectedCards.length === 2) return;
    if (matchedPairs.includes(card.matchId)) return;
    if (selectedCards.find(c => c.id === card.id)) return;

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setAttempts(attempts + 1);
      
      if (newSelected[0].matchId === newSelected[1].matchId) {
        setTimeout(() => {
          setMatchedPairs([...matchedPairs, card.matchId]);
          setSelectedCards([]);
          
          if (matchedPairs.length + 1 === disasters.length / 2) {
            const score = calculateScore();
            setFinalScore(score);
            setGameCompleted(true);
            setIsGameActive(false);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards([...disasters].sort(() => Math.random() - 0.5));
    setSelectedCards([]);
    setMatchedPairs([]);
    setGameCompleted(false);
    setAttempts(0);
    setTimer(0);
    setIsGameActive(false);
    setFinalScore(0);
  };

  const getScoreMessage = () => {
    if (finalScore >= 130) return "Outstanding! Lightning-fast matching! ⚡";
    if (finalScore >= 100) return "Excellent! Great speed and accuracy! 🌟";
    if (finalScore >= 70) return "Good job! You matched them all! 👏";
    if (finalScore >= 40) return "Well done! Practice for better speed! 📚";
    return "Completed! Try to be faster next time! 🎯";
  };

  const isCardSelected = (card: DisasterCard) => 
    selectedCards.find(c => c.id === card.id) || matchedPairs.includes(card.matchId);

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🎯</span>
            Match Disaster with Picture
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
            Connect disasters (flood, earthquake, fire, cyclone) with their pictures!
            <br />
            <span className="text-sm">Be quick for bonus points!</span>
          </p>
          <div className="mt-3 flex justify-center gap-6 text-sm">
            <div className="flex items-center">
              <Timer className="w-4 h-4 mr-1" />
              <span className="font-semibold">{formatTime(timer)}</span>
            </div>
            <div>
              Attempts: <span className="font-semibold">{attempts}</span>
            </div>
            <div>
              Matches: <span className="font-semibold">{matchedPairs.length}/{disasters.length / 2}</span>
            </div>
          </div>
        </div>

        {!gameCompleted ? (
          <div className="grid grid-cols-4 gap-3 max-w-3xl mx-auto">
            {cards.map(card => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                disabled={matchedPairs.includes(card.matchId)}
                className={`
                  aspect-square flex items-center justify-center p-4 rounded-lg transition-all
                  ${isCardSelected(card) 
                    ? matchedPairs.includes(card.matchId)
                      ? 'bg-bright-green/20 border-2 border-bright-green'
                      : 'bg-primary/20 border-2 border-primary scale-105'
                    : 'bg-card border-2 border-primary/20 hover:border-primary hover:scale-105 cursor-pointer'
                  }
                  ${matchedPairs.includes(card.matchId) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {card.type === 'icon' ? (
                  <span className="text-4xl">{card.display}</span>
                ) : (
                  <span className="text-sm font-semibold">{card.display}</span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <Card className="w-full max-w-lg mx-auto bg-gradient-to-r from-sunny-yellow/10 to-bright-green/10 border-2 border-primary/30">
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-3">
                {finalScore >= 130 ? '🏆' : finalScore >= 100 ? '⭐' : finalScore >= 70 ? '👍' : finalScore >= 40 ? '💪' : '✅'}
              </div>
              <h3 className="text-3xl font-bold mb-2">Score: {finalScore}</h3>
              <p className="text-lg mb-4">{getScoreMessage()}</p>
              
              {/* Score Breakdown */}
              <div className="bg-card rounded-lg p-4 mb-4 text-left">
                <h4 className="font-semibold mb-2 text-center">📊 Score Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Score:</span>
                    <span className="font-bold">100 points</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time: {formatTime(timer)}</span>
                    <span className="font-bold text-destructive">-{Math.min(50, Math.floor(timer / 2))} points</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attempts: {attempts}</span>
                    <span className="font-bold text-destructive">-{Math.min(30, attempts * 2)} points</span>
                  </div>
                  {timer < 90 && (
                    <div className="flex justify-between text-bright-green">
                      <span>Speed Bonus:</span>
                      <span className="font-bold">+{timer < 30 ? 50 : timer < 60 ? 30 : 10} points</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Final Score:</span>
                      <span className="font-bold">{finalScore} points</span>
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

        {!gameCompleted && (
          <div className="flex justify-center mt-6">
            <Button 
              onClick={resetGame}
              variant="outline"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Game
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DisasterMatcher;