import React from 'react';
import { MapPin, Shield, Flame, Users, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SchoolMap = () => {
  const mapElements = [
    { id: 'building-a', type: 'building', x: 20, y: 30, label: 'Building A', color: 'bg-bright-green' },
    { id: 'building-b', type: 'building', x: 60, y: 30, label: 'Building B', color: 'bg-bright-green' },
    { id: 'playground', type: 'area', x: 40, y: 70, label: 'Playground', color: 'bg-sunny-yellow' },
    { id: 'parking', type: 'area', x: 10, y: 10, label: 'Parking', color: 'bg-muted' },
    { id: 'assembly-1', type: 'assembly', x: 30, y: 80, label: 'Assembly Point 1', color: 'bg-coral-red' },
    { id: 'assembly-2', type: 'assembly', x: 70, y: 80, label: 'Assembly Point 2', color: 'bg-coral-red' },
    { id: 'exit-1', type: 'exit', x: 15, y: 50, label: 'Main Exit', color: 'bg-bright-orange' },
    { id: 'exit-2', type: 'exit', x: 85, y: 50, label: 'Side Exit', color: 'bg-bright-orange' },
    { id: 'nurse', type: 'facility', x: 25, y: 45, label: 'Nurse Office', color: 'bg-sky-blue' }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'assembly': return Shield;
      case 'exit': return MapPin;
      case 'facility': return Phone;
      default: return Users;
    }
  };

  return (
    <Card className="shadow-elegant">
      <CardContent className="p-0">
        <div className="relative bg-green-50 h-80 overflow-hidden rounded-lg">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200">
            {/* Grid lines for reference */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#10b981" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Map Elements */}
          {mapElements.map((element) => {
            const IconComponent = getIcon(element.type);
            return (
              <div
                key={element.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${element.color} rounded-lg shadow-hover transition-bounce hover:scale-110 cursor-pointer`}
                style={{ 
                  left: `${element.x}%`, 
                  top: `${element.y}%`,
                  minWidth: element.type === 'building' ? '60px' : '40px',
                  minHeight: element.type === 'building' ? '40px' : '30px'
                }}
              >
                <div className="flex items-center justify-center h-full p-2">
                  <IconComponent className="w-4 h-4 text-white icon-pulse" />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap bg-white px-2 py-1 rounded shadow">
                  {element.label}
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-elegant">
            <h4 className="font-semibold text-sm mb-2">Map Legend</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-bright-green rounded"></div>
                <span>Buildings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-coral-red rounded"></div>
                <span>Assembly Points</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-bright-orange rounded"></div>
                <span>Emergency Exits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-sky-blue rounded"></div>
                <span>Medical/Office</span>
              </div>
            </div>
          </div>

          {/* Compass */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 shadow-elegant">
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-coral-red">N</div>
              <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-coral-red transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolMap;