import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface Action {
  id: string;
  text: string;
  correct: boolean;
}

interface DosAndDontsBoardProps {
  onBack: () => void;
}

const DosAndDontsBoard = ({ onBack }: DosAndDontsBoardProps) => {
  const allActions: Action[] = [
    { id: '1', text: 'Stay calm during earthquake', correct: true },
    { id: '2', text: 'Use elevator during fire', correct: false },
    { id: '3', text: 'Drop, Cover, Hold On', correct: true },
    { id: '4', text: 'Run outside during earthquake', correct: false },
    { id: '5', text: 'Know evacuation routes', correct: true },
    { id: '6', text: 'Hide under weak structures', correct: false },
    { id: '7', text: 'Keep emergency kit ready', correct: true },
    { id: '8', text: 'Ignore fire alarms', correct: false },
    { id: '9', text: 'Follow teacher instructions', correct: true },
    { id: '10', text: 'Panic and scream', correct: false },
    { id: '11', text: 'Help younger students', correct: true },
    { id: '12', text: 'Use phone during drills', correct: false },
  ];

  const [availableActions, setAvailableActions] = useState<Action[]>(allActions);
  const [dos, setDos] = useState<Action[]>([]);
  const [donts, setDonts] = useState<Action[]>([]);
  const [draggedAction, setDraggedAction] = useState<Action | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleDragStart = (e: React.DragEvent, action: Action) => {
    setDraggedAction(action);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnDos = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedAction) {
      setDos([...dos, draggedAction]);
      setAvailableActions(availableActions.filter(a => a.id !== draggedAction.id));
      setDraggedAction(null);
    }
  };

  const handleDropOnDonts = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedAction) {
      setDonts([...donts, draggedAction]);
      setAvailableActions(availableActions.filter(a => a.id !== draggedAction.id));
      setDraggedAction(null);
    }
  };

  const handleDropOnActions = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedAction && !availableActions.find(a => a.id === draggedAction.id)) {
      setAvailableActions([...availableActions, draggedAction]);
      setDos(dos.filter(a => a.id !== draggedAction.id));
      setDonts(donts.filter(a => a.id !== draggedAction.id));
      setDraggedAction(null);
    }
  };

  const calculateScore = () => {
    let points = 0;
    dos.forEach(action => {
      if (action.correct) points += 10;
      else points -= 5;
    });
    donts.forEach(action => {
      if (!action.correct) points += 10;
      else points -= 5;
    });
    setScore(Math.max(0, points));
    setGameCompleted(true);
  };

  const resetGame = () => {
    setAvailableActions(allActions);
    setDos([]);
    setDonts([]);
    setGameCompleted(false);
    setScore(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / 120) * 100;
    if (percentage === 100) return "Perfect! You know all safety rules! ✅";
    if (percentage >= 80) return "Great job! You're safety smart! 🌟";
    if (percentage >= 60) return "Good! Keep learning safety rules! 👍";
    return "Keep practicing! Safety first! 🎯";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">📝</span>
            Do's & Don'ts Board
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
            Sort safety actions into Do's and Don'ts!
          </p>
        </div>

        <div 
          className="mb-6 min-h-[150px] border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 bg-muted/10"
          onDragOver={handleDragOver}
          onDrop={handleDropOnActions}
        >
          <h3 className="font-semibold text-center mb-3">Safety Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableActions.map(action => (
              <div
                key={action.id}
                draggable
                onDragStart={(e) => handleDragStart(e, action)}
                className="p-3 bg-card border-2 border-primary/20 rounded-lg cursor-move hover:border-primary hover:scale-105 transition-all text-center"
              >
                {action.text}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div 
            className="min-h-[300px] border-2 border-dashed border-bright-green/50 rounded-lg p-4 bg-bright-green/5"
            onDragOver={handleDragOver}
            onDrop={handleDropOnDos}
          >
            <h3 className="font-semibold text-center mb-3 text-bright-green">✅ DO's</h3>
            <div className="space-y-2">
              {dos.map(action => (
                <div
                  key={action.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, action)}
                  className="p-3 bg-card border-2 border-bright-green/40 rounded-lg cursor-move hover:scale-105 transition-all"
                >
                  {action.text}
                </div>
              ))}
            </div>
          </div>

          <div 
            className="min-h-[300px] border-2 border-dashed border-destructive/50 rounded-lg p-4 bg-destructive/5"
            onDragOver={handleDragOver}
            onDrop={handleDropOnDonts}
          >
            <h3 className="font-semibold text-center mb-3 text-destructive">❌ DON'Ts</h3>
            <div className="space-y-2">
              {donts.map(action => (
                <div
                  key={action.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, action)}
                  className="p-3 bg-card border-2 border-destructive/40 rounded-lg cursor-move hover:scale-105 transition-all"
                >
                  {action.text}
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
                disabled={availableActions.length > 0}
                className="bg-primary hover:bg-primary/90"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Check Answers!
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
                  {score >= 96 ? '🏆' : score >= 72 ? '⭐' : score >= 48 ? '👍' : '🎯'}
                </div>
                <h3 className="text-2xl font-bold mb-2">Score: {score}/120</h3>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default DosAndDontsBoard;