import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface Step {
  id: string;
  action: string;
  order: number;
}

interface ResponseSequenceBuilderProps {
  onBack: () => void;
}

const ResponseSequenceBuilder = ({ onBack }: ResponseSequenceBuilderProps) => {
  const scenarios = [
    {
      name: 'Earthquake Response',
      icon: '🏚️',
      steps: [
        { id: '1', action: 'DROP to hands and knees', order: 1 },
        { id: '2', action: 'Take COVER under desk/table', order: 2 },
        { id: '3', action: 'HOLD ON until shaking stops', order: 3 },
        { id: '4', action: 'Check for injuries', order: 4 },
        { id: '5', action: 'Exit building if safe', order: 5 },
        { id: '6', action: 'Go to assembly point', order: 6 },
      ]
    },
    {
      name: 'Fire Evacuation',
      icon: '🔥',
      steps: [
        { id: '1', action: 'Sound the alarm', order: 1 },
        { id: '2', action: 'Feel door for heat', order: 2 },
        { id: '3', action: 'Stay low if smoke present', order: 3 },
        { id: '4', action: 'Use nearest safe exit', order: 4 },
        { id: '5', action: 'Close doors behind you', order: 5 },
        { id: '6', action: 'Meet at assembly point', order: 6 },
      ]
    },
    {
      name: 'Flood Warning',
      icon: '🌊',
      steps: [
        { id: '1', action: 'Listen to announcements', order: 1 },
        { id: '2', action: 'Move to higher ground', order: 2 },
        { id: '3', action: 'Turn off electricity', order: 3 },
        { id: '4', action: 'Avoid flood water', order: 4 },
        { id: '5', action: 'Take emergency kit', order: 5 },
        { id: '6', action: 'Follow evacuation route', order: 6 },
      ]
    }
  ];

  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [arrangedSteps, setArrangedSteps] = useState<Step[]>([]);
  const [availableSteps, setAvailableSteps] = useState<Step[]>(() => 
    [...scenarios[0].steps].sort(() => Math.random() - 0.5)
  );
  const [draggedStep, setDraggedStep] = useState<Step | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<{scenario: string, correct: boolean, score: number}[]>([]);

  const currentScenario = scenarios[currentScenarioIndex];

  const handleDragStart = (e: React.DragEvent, step: Step, from: 'available' | 'arranged') => {
    setDraggedStep(step);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnArranged = (e: React.DragEvent, insertIndex?: number) => {
    e.preventDefault();
    if (!draggedStep) return;

    const newArranged = arrangedSteps.filter(s => s.id !== draggedStep.id);
    const newAvailable = availableSteps.filter(s => s.id !== draggedStep.id);

    if (insertIndex !== undefined) {
      newArranged.splice(insertIndex, 0, draggedStep);
    } else {
      newArranged.push(draggedStep);
    }

    setArrangedSteps(newArranged);
    setAvailableSteps(newAvailable);
    setDraggedStep(null);
  };

  const handleDropOnAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedStep) return;

    const newArranged = arrangedSteps.filter(s => s.id !== draggedStep.id);
    const newAvailable = [...availableSteps.filter(s => s.id !== draggedStep.id), draggedStep];

    setArrangedSteps(newArranged);
    setAvailableSteps(newAvailable);
    setDraggedStep(null);
  };

  const checkSequence = () => {
    let correct = true;
    let roundScore = 0;

    arrangedSteps.forEach((step, index) => {
      if (step.order === index + 1) {
        roundScore += 5;
      } else {
        correct = false;
      }
    });

    setScore(score + roundScore);
    setResults([...results, {
      scenario: currentScenario.name,
      correct: correct,
      score: roundScore
    }]);

    if (currentScenarioIndex < scenarios.length - 1) {
      // Move to next scenario
      const nextIndex = currentScenarioIndex + 1;
      setCurrentScenarioIndex(nextIndex);
      setArrangedSteps([]);
      setAvailableSteps([...scenarios[nextIndex].steps].sort(() => Math.random() - 0.5));
    } else {
      setGameCompleted(true);
    }
  };

  const resetGame = () => {
    setCurrentScenarioIndex(0);
    setArrangedSteps([]);
    setAvailableSteps([...scenarios[0].steps].sort(() => Math.random() - 0.5));
    setGameCompleted(false);
    setScore(0);
    setResults([]);
  };

  const getScoreMessage = () => {
    const maxScore = scenarios.length * 30;
    const percentage = (score / maxScore) * 100;
    if (percentage === 100) return "Perfect! You know all emergency procedures! 📋";
    if (percentage >= 80) return "Excellent sequence knowledge! 🌟";
    if (percentage >= 60) return "Good understanding of procedures! 👍";
    return "Keep practicing emergency sequences! 🎯";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">⏳</span>
            Response Sequence Builder
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
              <div className="text-3xl mb-2">{currentScenario.icon}</div>
              <h3 className="text-xl font-bold">{currentScenario.name}</h3>
              <p className="text-muted-foreground">
                Arrange the steps in the correct order!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Scenario {currentScenarioIndex + 1} of {scenarios.length}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-center mb-3">Available Steps</h3>
                <div 
                  className="min-h-[350px] border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 bg-muted/10"
                  onDragOver={handleDragOver}
                  onDrop={handleDropOnAvailable}
                >
                  <div className="space-y-2">
                    {availableSteps.map(step => (
                      <div
                        key={step.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, step, 'available')}
                        className="p-3 bg-card border-2 border-primary/20 rounded-lg cursor-move hover:border-primary hover:scale-105 transition-all"
                      >
                        {step.action}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-center mb-3">Correct Sequence</h3>
                <div 
                  className="min-h-[350px] border-2 border-dashed border-bright-green/50 rounded-lg p-4 bg-bright-green/5"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropOnArranged(e)}
                >
                  {arrangedSteps.length === 0 && (
                    <div className="text-center text-muted-foreground">
                      Drop steps here in order...
                    </div>
                  )}
                  <div className="space-y-2">
                    {arrangedSteps.map((step, index) => (
                      <div
                        key={step.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, step, 'arranged')}
                        onDragOver={handleDragOver}
                        onDrop={(e) => {
                          e.stopPropagation();
                          handleDropOnArranged(e, index);
                        }}
                        className="p-3 bg-card border-2 border-bright-green/40 rounded-lg cursor-move hover:scale-105 transition-all flex items-center"
                      >
                        <span className="mr-3 font-bold text-bright-green">
                          {index + 1}.
                        </span>
                        {step.action}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button 
                onClick={checkSequence}
                disabled={arrangedSteps.length !== currentScenario.steps.length}
                className="bg-primary hover:bg-primary/90"
              >
                Check Sequence
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
                {score >= 85 ? '🏆' : score >= 65 ? '⭐' : score >= 45 ? '👍' : '🎯'}
              </div>
              <h3 className="text-2xl font-bold mb-2">Total Score: {score}/90</h3>
              <p className="text-lg mb-4">{getScoreMessage()}</p>
              
              <div className="text-left mb-4">
                <h4 className="font-semibold mb-2">Results:</h4>
                {results.map((result, index) => (
                  <div key={index} className="text-sm mb-1">
                    {result.correct ? '✅' : '❌'} {result.scenario}: {result.score}/30
                  </div>
                ))}
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

export default ResponseSequenceBuilder;