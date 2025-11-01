import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface Zone {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
}

interface EmergencyZoneSetupProps {
  onBack: () => void;
}

const EmergencyZoneSetup = ({ onBack }: EmergencyZoneSetupProps) => {
  const requiredZones = [
    { id: 'assembly', name: 'Assembly Point', icon: '🏁', correctX: 300, correctY: 50 },
    { id: 'medical', name: 'Medical Tent', icon: '🏥', correctX: 50, correctY: 200 },
    { id: 'extinguisher', name: 'Fire Extinguisher', icon: '🧯', correctX: 200, correctY: 150 },
    { id: 'supplies', name: 'Supply Station', icon: '📦', correctX: 350, correctY: 200 },
    { id: 'command', name: 'Command Center', icon: '📢', correctX: 150, correctY: 50 },
  ];

  const [placedZones, setPlacedZones] = useState<Zone[]>([]);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleZoneSelect = (zoneId: string) => {
    if (placedZones.find(z => z.id === zoneId)) return;
    setSelectedZone(zoneId);
  };

  const handleMapClick = (e: React.MouseEvent<SVGElement>) => {
    if (!selectedZone) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const zone = requiredZones.find(z => z.id === selectedZone);
    if (zone) {
      setPlacedZones([...placedZones.filter(z => z.id !== selectedZone), {
        ...zone,
        x: Math.round(x),
        y: Math.round(y)
      }]);
      setSelectedZone(null);
    }
  };

  const removeZone = (zoneId: string) => {
    setPlacedZones(placedZones.filter(z => z.id !== zoneId));
  };

  const checkSetup = () => {
    let points = 0;
    
    placedZones.forEach(zone => {
      const required = requiredZones.find(r => r.id === zone.id);
      if (required) {
        const distance = Math.sqrt(
          Math.pow(zone.x - required.correctX, 2) + 
          Math.pow(zone.y - required.correctY, 2)
        );
        
        if (distance < 50) points += 20;
        else if (distance < 100) points += 10;
        else if (distance < 150) points += 5;
      }
    });
    
    setScore(points);
    setGameCompleted(true);
  };

  const resetGame = () => {
    setPlacedZones([]);
    setSelectedZone(null);
    setGameCompleted(false);
    setScore(0);
  };

  const getScoreMessage = () => {
    if (score >= 90) return "Perfect emergency zone setup! 🗺️";
    if (score >= 60) return "Good zone placement! 📍";
    if (score >= 30) return "Decent setup, but could be better! 👍";
    return "Keep practicing zone placement! 🎯";
  };

  return (
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🏕️</span>
            Emergency Zone Setup
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
                Place emergency zones in the optimal locations on the school map!
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-center mb-3">Zones to Place</h3>
              <div className="flex justify-center gap-3 flex-wrap">
                {requiredZones.map(zone => {
                  const isPlaced = placedZones.find(z => z.id === zone.id);
                  return (
                    <button
                      key={zone.id}
                      onClick={() => handleZoneSelect(zone.id)}
                      disabled={isPlaced !== undefined}
                      className={`
                        px-4 py-2 rounded-lg border-2 transition-all flex items-center
                        ${isPlaced
                          ? 'bg-bright-green/20 border-bright-green cursor-not-allowed'
                          : selectedZone === zone.id
                          ? 'bg-primary/20 border-primary scale-105'
                          : 'bg-card border-primary/20 hover:border-primary hover:scale-105 cursor-pointer'
                        }
                      `}
                    >
                      <span className="text-2xl mr-2">{zone.icon}</span>
                      <span className="text-sm">{zone.name}</span>
                      {isPlaced && <span className="ml-2 text-bright-green">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative bg-muted/10 border-2 border-primary/20 rounded-lg p-4" style={{ height: '400px' }}>
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 450 300"
                onClick={handleMapClick}
                className="cursor-crosshair"
              >
                {/* School building */}
                <rect x="100" y="80" width="250" height="140" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
                <text x="225" y="155" textAnchor="middle" className="fill-foreground text-lg font-bold">School Building</text>
                
                {/* Playground */}
                <rect x="20" y="30" width="60" height="100" fill="hsl(var(--bright-green) / 0.2)" stroke="hsl(var(--bright-green))" strokeWidth="2" />
                <text x="50" y="85" textAnchor="middle" className="fill-foreground text-xs">Playground</text>
                
                {/* Parking */}
                <rect x="370" y="150" width="60" height="100" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />
                <text x="400" y="205" textAnchor="middle" className="fill-foreground text-xs">Parking</text>
                
                {/* Gates */}
                <rect x="215" y="240" width="40" height="10" fill="hsl(var(--sunny-yellow))" />
                <text x="235" y="265" textAnchor="middle" className="fill-foreground text-xs">Main Gate</text>
                
                {/* Placed zones */}
                {placedZones.map(zone => (
                  <g key={zone.id}>
                    <circle
                      cx={zone.x}
                      cy={zone.y}
                      r="20"
                      fill="hsl(var(--primary) / 0.3)"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      className="cursor-pointer hover:fill-primary/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeZone(zone.id);
                      }}
                    />
                    <text x={zone.x} y={zone.y + 5} textAnchor="middle" className="text-xl pointer-events-none">
                      {zone.icon}
                    </text>
                  </g>
                ))}
                
                {/* Hint indicators (shown in practice mode) */}
                {!gameCompleted && placedZones.length === 0 && (
                  <>
                    {requiredZones.map(zone => (
                      <circle
                        key={`hint-${zone.id}`}
                        cx={zone.correctX}
                        cy={zone.correctY}
                        r="15"
                        fill="none"
                        stroke="hsl(var(--muted-foreground) / 0.3)"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                      />
                    ))}
                  </>
                )}
              </svg>
            </div>

            <div className="text-center text-sm text-muted-foreground mt-2">
              {selectedZone ? 'Click on the map to place the zone' : 'Select a zone to place'}
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <Button 
                onClick={checkSetup}
                disabled={placedZones.length !== requiredZones.length}
                className="bg-primary hover:bg-primary/90"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Check Setup!
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
                {score >= 90 ? '🏆' : score >= 60 ? '⭐' : score >= 30 ? '👍' : '🎯'}
              </div>
              <h3 className="text-2xl font-bold mb-2">Score: {score}/100</h3>
              <p className="text-lg mb-4">{getScoreMessage()}</p>
              <div className="text-sm text-muted-foreground mb-4">
                Zones placed: {placedZones.length}/{requiredZones.length}
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

export default EmergencyZoneSetup;