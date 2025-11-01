import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type GradeGroup = '4-5' | '6-7' | '8-9' | '10-12';

interface GradeSelectionProps {
  onGradeSelect: (grade: GradeGroup) => void;
}

const GradeSelection = ({ onGradeSelect }: GradeSelectionProps) => {
  const gradeGroups = [
    {
      grade: '4-5' as GradeGroup,
      ages: '9-11',
      title: 'Intro & Fun Visual',
      icon: '🌈',
      description: 'Basic safety concepts with colorful, interactive games',
      bgColor: 'bg-sunny-yellow/20 border-sunny-yellow',
      buttonColor: 'bg-sunny-yellow hover:bg-sunny-yellow/80'
    },
    {
      grade: '6-7' as GradeGroup,
      ages: '11-13',
      title: 'Concept & Skills',
      icon: '🧩',
      description: 'Learn disaster causes and develop safety skills',
      bgColor: 'bg-bright-green/20 border-bright-green',
      buttonColor: 'bg-bright-green hover:bg-bright-green/80'
    },
    {
      grade: '8-9' as GradeGroup,
      ages: '13-15',
      title: 'Scenarios & Planning',
      icon: '🎯',
      description: 'Practice emergency scenarios and response planning',
      bgColor: 'bg-sky-blue/20 border-sky-blue',
      buttonColor: 'bg-sky-blue hover:bg-sky-blue/80'
    },
    {
      grade: '10-12' as GradeGroup,
      ages: '15-18',
      title: 'Strategy & Advanced Safety',
      icon: '🏆',
      description: 'Advanced crisis management and leadership skills',
      bgColor: 'bg-bright-purple/20 border-bright-purple',
      buttonColor: 'bg-bright-purple hover:bg-bright-purple/80'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Choose Your Grade Level</h3>
        <p className="text-muted-foreground">Select the grade group that matches your current level</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gradeGroups.map((group) => (
          <Card 
            key={group.grade}
            className={`border-2 ${group.bgColor} hover:scale-105 transition-all cursor-pointer`}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3 icon-bounce">{group.icon}</div>
              <h4 className="text-lg font-semibold mb-1">
                Grades {group.grade} (Ages {group.ages})
              </h4>
              <h5 className="font-medium text-primary mb-2">{group.title}</h5>
              <p className="text-sm text-muted-foreground mb-4">
                {group.description}
              </p>
              <Button 
                onClick={() => onGradeSelect(group.grade)}
                className={`w-full ${group.buttonColor} text-white transition-bounce`}
              >
                Play Games
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GradeSelection;