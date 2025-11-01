import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface Role {
  id: string;
  title: string;
  icon: string;
  responsibility: string;
}

interface RoleAssignmentGameProps {
  onBack: () => void;
}

const RoleAssignmentGame = ({ onBack }: RoleAssignmentGameProps) => {
  const roles: Role[] = [
    { id: '1', title: 'Safety Captain', icon: '👮', responsibility: 'Lead evacuation and count students' },
    { id: '2', title: 'First Aid Helper', icon: '🏥', responsibility: 'Assist with medical emergencies' },
    { id: '3', title: 'Door Monitor', icon: '🚪', responsibility: 'Check exits and hold doors open' },
    { id: '4', title: 'Communication Lead', icon: '📢', responsibility: 'Relay messages and updates' },
    { id: '5', title: 'Buddy Helper', icon: '🤝', responsibility: 'Help younger/disabled students' },
    { id: '6', title: 'Supply Manager', icon: '🎒', responsibility: 'Carry emergency kit and supplies' },
  ];

  const responsibilities = roles.map(r => ({
    id: `r${r.id}`,
    text: r.responsibility,
    roleId: r.id
  }));

  const [shuffledResponsibilities] = useState(() => 
    [...responsibilities].sort(() => Math.random() - 0.5)
  );
  const [assignments, setAssignments] = useState<{[key: string]: string}>({});
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedResponsibility, setSelectedResponsibility] = useState<string | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleRoleClick = (roleId: string) => {
    if (assignments[roleId] || gameCompleted) return;
    setSelectedRole(roleId);
    
    if (selectedResponsibility) {
      checkAssignment(roleId, selectedResponsibility);
    }
  };

  const handleResponsibilityClick = (respId: string) => {
    if (Object.values(assignments).includes(respId) || gameCompleted) return;
    setSelectedResponsibility(respId);
    
    if (selectedRole) {
      checkAssignment(selectedRole, respId);
    }
  };

  const checkAssignment = (roleId: string, respId: string) => {
    setAttempts(attempts + 1);
    const responsibility = shuffledResponsibilities.find(r => r.id === respId);
    
    if (responsibility && responsibility.roleId === roleId) {
      setAssignments({...assignments, [roleId]: respId});
      setSelectedRole(null);
      setSelectedResponsibility(null);
      
      if (Object.keys(assignments).length === roles.length - 1) {
        setGameCompleted(true);
      }
    } else {
      setTimeout(() => {
        setSelectedRole(null);
        setSelectedResponsibility(null);
      }, 1000);
    }
  };

  const resetGame = () => {
    setAssignments({});
    setSelectedRole(null);
    setSelectedResponsibility(null);
    setGameCompleted(false);
    setAttempts(0);
  };

  const getScore = () => {
    const correctAssignments = Object.keys(assignments).length;
    const baseScore = correctAssignments * 15;
    const accuracyBonus = attempts <= 6 ? 10 : attempts <= 10 ? 5 : 0;
    return baseScore + accuracyBonus;
  };

  const getScoreMessage = () => {
    const score = getScore();
    if (score >= 95) return "Perfect! You understand all emergency roles! 👏";
    if (score >= 85) return "Excellent leadership skills! 🌟";
    if (score >= 70) return "Good role understanding! 👍";
    return "Keep learning about emergency roles! 🎯";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🎭</span>
            Role Assignment Game
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
                Match each emergency role with its responsibility!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Matches: {Object.keys(assignments).length}/{roles.length}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-center mb-3">Emergency Roles</h3>
                <div className="space-y-3">
                  {roles.map(role => (
                    <button
                      key={role.id}
                      onClick={() => handleRoleClick(role.id)}
                      disabled={!!assignments[role.id]}
                      className={`
                        w-full p-4 rounded-lg border-2 transition-all flex items-center
                        ${assignments[role.id]
                          ? 'bg-bright-green/20 border-bright-green cursor-not-allowed'
                          : selectedRole === role.id
                          ? 'bg-primary/20 border-primary scale-105'
                          : 'bg-card border-primary/20 hover:border-primary hover:scale-105 cursor-pointer'
                        }
                      `}
                    >
                      <span className="text-3xl mr-3">{role.icon}</span>
                      <span className="font-medium">{role.title}</span>
                      {assignments[role.id] && <span className="ml-auto text-bright-green">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-center mb-3">Responsibilities</h3>
                <div className="space-y-3">
                  {shuffledResponsibilities.map(resp => (
                    <button
                      key={resp.id}
                      onClick={() => handleResponsibilityClick(resp.id)}
                      disabled={Object.values(assignments).includes(resp.id)}
                      className={`
                        w-full p-4 rounded-lg border-2 transition-all text-left
                        ${Object.values(assignments).includes(resp.id)
                          ? 'bg-bright-green/20 border-bright-green cursor-not-allowed'
                          : selectedResponsibility === resp.id
                          ? 'bg-primary/20 border-primary scale-105'
                          : 'bg-card border-primary/20 hover:border-primary hover:scale-105 cursor-pointer'
                        }
                      `}
                    >
                      {resp.text}
                      {Object.values(assignments).includes(resp.id) && 
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

export default RoleAssignmentGame;