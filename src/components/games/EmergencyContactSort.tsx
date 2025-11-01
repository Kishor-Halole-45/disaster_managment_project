import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface Contact {
  id: string;
  number: string;
  service: string;
  icon: string;
  emergency: string;
}

interface EmergencyContactSortProps {
  onBack: () => void;
}

const EmergencyContactSort = ({ onBack }: EmergencyContactSortProps) => {
  const allContacts: Contact[] = [
    { id: '1', number: '100', service: 'Police', icon: '👮', emergency: 'Crime/Danger' },
    { id: '2', number: '101', service: 'Fire Brigade', icon: '🚒', emergency: 'Fire' },
    { id: '3', number: '108', service: 'Ambulance', icon: '🚑', emergency: 'Medical' },
    { id: '4', number: '1098', service: 'Child Helpline', icon: '👶', emergency: 'Child Safety' },
    { id: '5', number: '112', service: 'Emergency', icon: '🆘', emergency: 'Any Emergency' },
    { id: '6', number: '1078', service: 'Disaster Help', icon: '🌊', emergency: 'Natural Disaster' },
  ];

  const emergencies = [
    { id: 'e1', name: 'House Fire', correctContact: '101' },
    { id: 'e2', name: 'Someone is Hurt', correctContact: '108' },
    { id: 'e3', name: 'Theft/Robbery', correctContact: '100' },
    { id: 'e4', name: 'Lost Child', correctContact: '1098' },
    { id: 'e5', name: 'Flood Warning', correctContact: '1078' },
    { id: 'e6', name: 'General Emergency', correctContact: '112' },
  ];

  const [currentEmergencyIndex, setCurrentEmergencyIndex] = useState(0);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{emergency: string, selected: string, correct: boolean}[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);

  const currentEmergency = emergencies[currentEmergencyIndex];

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleSubmit = () => {
    if (!selectedContact) return;

    const isCorrect = selectedContact.number === currentEmergency.correctContact;
    const newAnswers = [...answers, {
      emergency: currentEmergency.name,
      selected: selectedContact.number,
      correct: isCorrect
    }];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 10);
    }

    if (currentEmergencyIndex < emergencies.length - 1) {
      setCurrentEmergencyIndex(currentEmergencyIndex + 1);
      setSelectedContact(null);
    } else {
      setGameCompleted(true);
    }
  };

  const resetGame = () => {
    setCurrentEmergencyIndex(0);
    setSelectedContact(null);
    setScore(0);
    setAnswers([]);
    setGameCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / (emergencies.length * 10)) * 100;
    if (percentage === 100) return "Perfect! You know all emergency numbers! 📞";
    if (percentage >= 80) return "Excellent! You're well prepared! 🌟";
    if (percentage >= 60) return "Good job! Keep learning the numbers! 👍";
    return "Keep practicing! These numbers save lives! 🎯";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">☎️</span>
            Emergency Contact Sort
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
            <div className="mb-6 text-center">
              <p className="text-muted-foreground mb-2">
                Match the correct emergency number to each situation!
              </p>
              <div className="text-sm">
                Question {currentEmergencyIndex + 1} of {emergencies.length}
              </div>
            </div>

            <Card className="mb-6 bg-gradient-to-r from-bright-pink/10 to-primary/10 border-2 border-primary/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Emergency Situation:</h3>
                <p className="text-xl">{currentEmergency.name}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Which number should you call?
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {allContacts.map(contact => (
                <button
                  key={contact.id}
                  onClick={() => handleContactSelect(contact)}
                  className={`
                    p-4 rounded-lg border-2 transition-all
                    ${selectedContact?.id === contact.id
                      ? 'bg-primary/20 border-primary scale-105'
                      : 'bg-card border-primary/20 hover:border-primary hover:scale-105'
                    }
                  `}
                >
                  <div className="text-3xl mb-2">{contact.icon}</div>
                  <div className="font-bold text-lg">{contact.number}</div>
                  <div className="text-sm text-muted-foreground">{contact.service}</div>
                  <div className="text-xs text-muted-foreground mt-1">({contact.emergency})</div>
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Button 
                onClick={handleSubmit}
                disabled={!selectedContact}
                className="bg-primary hover:bg-primary/90"
              >
                Submit Answer
              </Button>
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
                {score === emergencies.length * 10 ? '🏆' : score >= emergencies.length * 8 ? '⭐' : score >= emergencies.length * 6 ? '👍' : '🎯'}
              </div>
              <h3 className="text-2xl font-bold mb-2">Score: {score}/{emergencies.length * 10}</h3>
              <p className="text-lg mb-4">{getScoreMessage()}</p>
              
              <div className="text-left mb-4 max-h-60 overflow-y-auto">
                <h4 className="font-semibold mb-2">Your Answers:</h4>
                {answers.map((answer, index) => (
                  <div key={index} className={`text-sm mb-1 ${answer.correct ? 'text-bright-green' : 'text-destructive'}`}>
                    {answer.correct ? '✅' : '❌'} {answer.emergency}: {answer.selected}
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

export default EmergencyContactSort;