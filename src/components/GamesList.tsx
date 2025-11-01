import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

type GradeGroup = '4-5' | '6-7' | '8-9' | '10-12';

interface GamesListProps {
  grade: GradeGroup;
  onGameSelect?: (gameId: string) => void;
}

const GamesList = ({ grade, onGameSelect }: GamesListProps) => {
  const gamesData = {
    '4-5': {
      title: 'Intro & Fun Visual Games',
      subtitle: 'Ages 9-11 • Basic Safety Concepts',
      games: [
        { id: 'pack-your-bag', icon: '👜', name: 'Pack Your Bag', description: 'Drag essentials into a backpack', color: 'bg-sunny-yellow' },
        { id: 'first-aid-kit', icon: '🚑', name: 'First Aid Kit Builder', description: 'Sort useful vs non-useful items', color: 'bg-coral-red' },
        { id: 'safe-unsafe', icon: '🏫', name: 'Safe vs Unsafe Places', description: 'Drag classroom objects to Safe/Unsafe', color: 'bg-bright-green' },
        { id: 'disaster-match', icon: '🌪', name: 'Match Disaster with Picture', description: 'Pair floods, earthquakes, fires with icons', color: 'bg-sky-blue' },
        { id: 'emergency-contact', icon: '☎', name: 'Emergency Contact Sort', description: 'Match correct numbers to emergencies', color: 'bg-bright-purple' },
        { id: 'pet-safety', icon: '🐾', name: 'Pet Safety Rescue', description: 'Drag pets to safe zones during emergencies', color: 'bg-bright-pink' },
        { id: 'coloring-challenge', icon: '🎨', name: 'Disaster Coloring Challenge', description: 'Color disaster scenes and safety actions correctly', color: 'bg-bright-orange' }
      ]
    },
    '6-7': {
      title: 'Concept & Skills Games',
      subtitle: 'Ages 11-13 • Disaster Causes & Safety Skills',
      games: [
        { id: 'disaster-cause', icon: '🔍', name: 'Disaster–Cause Sorter', description: 'Match "Flood" with "Heavy Rain", etc.', color: 'bg-bright-green' },
        { id: 'dos-donts', icon: '📝', name: 'Do\'s & Don\'ts Board', description: 'Drag correct safety actions', color: 'bg-sky-blue' },
        { id: 'escape-route', icon: '🗺', name: 'Escape Route Planner', description: 'Draw safe paths to assembly points', color: 'bg-coral-red' },
        { id: 'emergency-timer', icon: '⏱', name: 'Emergency Bag Timer', description: 'Pack essentials in 20 seconds', color: 'bg-sunny-yellow' },
        { id: 'tool-match', icon: '🔧', name: 'Match Tool with Use', description: 'Extinguisher → fire, Rope → rescue', color: 'bg-bright-purple' },
        { id: 'hazard-sort', icon: '⚠', name: 'Hazard Sort', description: 'Natural vs man-made hazards', color: 'bg-bright-orange' },
        { icon: '🎯', name: 'Quick Alert Quiz', description: 'Identify safest action in 5-second scenarios', color: 'bg-bright-pink' },
        { icon: '🏃‍♂️', name: 'Evacuation Relay', description: 'Drag students quickly to safety while avoiding obstacles', color: 'bg-purple-500' }
      ]
    },
    '8-9': {
      title: 'Scenarios & Planning Games',
      subtitle: 'Ages 13-15 • Emergency Response & Strategy',
      games: [
        { id: 'response-sequence', icon: '⏳', name: 'Response Sequence Builder', description: 'Arrange steps: Drop → Cover → Hold On', color: 'bg-sky-blue' },
        { id: 'role-assignment', icon: '🎭', name: 'Role Assignment Game', description: 'Match leadership & emergency roles', color: 'bg-bright-green' },
        { icon: '🌊', name: 'Disaster Matching Challenge', description: 'Pair disaster type with drills', color: 'bg-coral-red' },
        { id: 'house-safety', icon: '🏠', name: 'House Safety Check', description: 'Drag unsafe items into "Fix It" bin', color: 'bg-sunny-yellow' },
        { id: 'emergency-zone', icon: '🏕', name: 'Emergency Zone Setup', description: 'Place assembly point, medical tent, extinguisher', color: 'bg-bright-purple' },
        { id: 'aid-priority', icon: '💊', name: 'Aid Kit Priority', description: 'Sort items by urgency', color: 'bg-bright-pink' },
        { icon: '🧩', name: 'Scenario Puzzle', description: 'Solve a school-wide emergency by placing items and students', color: 'bg-bright-orange' },
        { icon: '🕵️‍♀️', name: 'Safety Detective', description: 'Spot hazards in classrooms, playgrounds, and dorms', color: 'bg-purple-500' }
      ]
    },
    '10-12': {
      title: 'Strategy & Advanced Safety Games',
      subtitle: 'Ages 15-18 • Crisis Management & Leadership',
      games: [
        { icon: '🌐', name: 'Disaster Drill Simulator', description: 'Run a full-school drill in real-time', color: 'bg-bright-purple' },
        { icon: '📊', name: 'Risk Assessment Challenge', description: 'Identify areas at highest risk in a school map', color: 'bg-sky-blue' },
        { icon: '⏳', name: 'Advanced Response Sequence', description: 'Arrange multi-step evacuation with multiple hazards', color: 'bg-coral-red' },
        { icon: '🎯', name: 'Crisis Decision Game', description: 'Make strategic choices for student safety under time pressure', color: 'bg-bright-green' },
        { icon: '🏗', name: 'Infrastructure Safety Check', description: 'Identify unsafe structures, blocked exits, and potential hazards', color: 'bg-sunny-yellow' },
        { icon: '💡', name: 'Emergency Planning Workshop', description: 'Plan a complete safety strategy including assembly points', color: 'bg-bright-pink' }
      ]
    }
  };

  const currentGames = gamesData[grade];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-1">{currentGames.title}</h3>
        <p className="text-muted-foreground">{currentGames.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentGames.games.map((game, index) => (
          <Card 
            key={index}
            className="border-2 border-muted/30 hover:border-primary/50 hover:scale-105 transition-all cursor-pointer shadow-hover"
          >
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 ${game.color} rounded-full flex items-center justify-center mx-auto mb-3 icon-bounce`}>
                <span className="text-xl">{game.icon}</span>
              </div>
              <h4 className="font-semibold mb-2 text-sm">{game.name}</h4>
              <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                {game.description}
              </p>
              <Button 
                size="sm" 
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground transition-bounce"
                onClick={() => onGameSelect?.((game as any).id || game.name)}
              >
                <Play className="w-3 h-3 mr-1 icon-wiggle" />
                Play
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievement Badge */}
      <Card className="bg-gradient-to-r from-sunny-yellow/10 to-bright-orange/10 border-2 border-sunny-yellow/30 mt-6">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-2xl icon-pulse">🏆</span>
            <span className="font-semibold">Complete games to unlock badges!</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Finish all games in this grade level to earn a special certificate!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamesList;