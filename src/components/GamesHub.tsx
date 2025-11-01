import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import GradeSelection from './GradeSelection';
import GamesList from './GamesList';
import PackYourBagGame from './PackYourBagGame';
import FirstAidKitBuilder from './games/FirstAidKitBuilder';
import SafeVsUnsafePlaces from './games/SafeVsUnsafePlaces';
import DisasterMatcher from './games/DisasterMatcher';
import EmergencyContactSort from './games/EmergencyContactSort';
import DisasterCauseSorter from './games/DisasterCauseSorter';
import DosAndDontsBoard from './games/DosAndDontsBoard';
import EscapeRoutePlanner from './games/EscapeRoutePlanner';
import EmergencyBagTimer from './games/EmergencyBagTimer';
import ToolMatcher from './games/ToolMatcher';
import HazardSort from './games/HazardSort';
import ResponseSequenceBuilder from './games/ResponseSequenceBuilder';
import RoleAssignmentGame from './games/RoleAssignmentGame';
import HouseSafetyCheck from './games/HouseSafetyCheck';
import EmergencyZoneSetup from './games/EmergencyZoneSetup';
import AidKitPriority from './games/AidKitPriority';
import PetSafetyRescue from './games/PetSafetyRescue';
import DisasterColoringChallenge from './games/DisasterColoringChallenge';

type View = 'main' | 'grades' | 'games' | 'playing';
type GradeGroup = '4-5' | '6-7' | '8-9' | '10-12';

const GamesHub = () => {
  const [currentView, setCurrentView] = useState<View>('main');
  const [selectedGrade, setSelectedGrade] = useState<GradeGroup | null>(null);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleGradeSelect = (grade: GradeGroup) => {
    setSelectedGrade(grade);
    setCurrentView('games');
  };

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
    setCurrentView('playing');
  };

  const handleBackToGames = () => {
    setCurrentView('games');
    setSelectedGame(null);
  };

  const handleBackToGrades = () => {
    setCurrentView('grades');
    setSelectedGrade(null);
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedGrade(null);
  };

  const renderBreadcrumbs = () => {
    if (currentView === 'main') return null;
    
    return (
      <div className="flex items-center space-x-2 mb-4 text-sm text-muted-foreground">
        <button 
          onClick={handleBackToMain}
          className="hover:text-primary transition-colors"
        >
          Games Hub
        </button>
        {currentView === 'games' && (
          <>
            <span>›</span>
            <button 
              onClick={handleBackToGrades}
              className="hover:text-primary transition-colors"
            >
              Grade Selection
            </button>
            <span>›</span>
            <span className="text-foreground">Grades {selectedGrade}</span>
          </>
        )}
      </div>
    );
  };

  return (
    <Card className="shadow-glow border-2 border-bright-pink/30 hover:border-bright-pink transition-bounce">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Gamepad2 className="w-6 h-6 mr-2 text-accent-foreground icon-bounce" />
            🎮 Disaster Prep Games Hub – Grades 4–12
          </div>
          {currentView !== 'main' && currentView !== 'playing' && (
            <Button
              variant="outline"
              size="sm"
              onClick={currentView === 'games' ? handleBackToGrades : handleBackToMain}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {renderBreadcrumbs()}
        
        {currentView === 'main' && (
          <div className="text-center space-y-4">
            <div className="text-6xl icon-bounce">🎮</div>
            <h3 className="text-xl font-semibold">Play & Learn: Disaster Games</h3>
            <p className="text-muted-foreground mb-6">
              Click to explore fun, interactive games tailored to your grade!
            </p>
            <Button 
              size="lg"
              onClick={() => setCurrentView('grades')}
              className="bg-bright-pink hover:bg-bright-pink/80 text-white transition-bounce text-lg px-8 py-6"
            >
              <Gamepad2 className="w-5 h-5 mr-2 icon-wiggle" />
              Start Playing!
            </Button>
          </div>
        )}

        {currentView === 'grades' && (
          <GradeSelection onGradeSelect={handleGradeSelect} />
        )}

        {currentView === 'games' && selectedGrade && (
          <GamesList grade={selectedGrade} onGameSelect={handleGameSelect} />
        )}

        {currentView === 'playing' && selectedGame === 'pack-your-bag' && (
          <PackYourBagGame onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'first-aid-kit' && (
          <FirstAidKitBuilder onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'safe-unsafe' && (
          <SafeVsUnsafePlaces onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'disaster-match' && (
          <DisasterMatcher onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'emergency-contact' && (
          <EmergencyContactSort onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'disaster-cause' && (
          <DisasterCauseSorter onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'dos-donts' && (
          <DosAndDontsBoard onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'escape-route' && (
          <EscapeRoutePlanner onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'emergency-timer' && (
          <EmergencyBagTimer onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'tool-match' && (
          <ToolMatcher onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'hazard-sort' && (
          <HazardSort onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'response-sequence' && (
          <ResponseSequenceBuilder onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'role-assignment' && (
          <RoleAssignmentGame onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'house-safety' && (
          <HouseSafetyCheck onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'emergency-zone' && (
          <EmergencyZoneSetup onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'aid-priority' && (
          <AidKitPriority onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'pet-safety' && (
          <PetSafetyRescue onBack={handleBackToGames} />
        )}
        
        {currentView === 'playing' && selectedGame === 'coloring-challenge' && (
          <DisasterColoringChallenge onBack={handleBackToGames} />
        )}
      </CardContent>
    </Card>
  );
};

export default GamesHub;