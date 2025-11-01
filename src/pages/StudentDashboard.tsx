import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen, Play, Trophy, Flame, Map, Phone,
    Shield, MapPin, CheckCircle
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import BackToLoginButton from '@/components/BackToLoginButton';
import FloatingMascot from '@/components/FloatingMascot';
import GamesHub from '@/components/GamesHub';
import EarthquakeSafety from '@/components/modules/EarthquakeSafety';
import SchoolMap from '@/components/SchoolMap';


const StudentDashboard = () => {
    const [selectedModule, setSelectedModule] = useState<string | null>(null);
    const learningModules = [
        { title: "Earthquake Safety", progress: 85, status: "In Progress", lessons: "4/5 lessons completed" },
        { title: "Fire Response", progress: 100, status: "Completed", lessons: "6/6 lessons completed" },
        { title: "Flood Preparedness", progress: 45, status: "In Progress", lessons: "2/4 lessons completed" },
        { title: "First Aid", progress: 0, status: "Not Started", lessons: "0/5 lessons completed" },
        { title: "Chemical Safety", progress: 0, status: "Not Started", lessons: "0/5 lessons completed" },
        { title: "Heatwaves", progress: 0, status: "Not Started", lessons: "0/3 lessons completed" },
        { title: "Droughts", progress: 0, status: "Not Started", lessons: "0/3 lessons completed" },
        { title: "Cold Waves", progress: 0, status: "Not Started", lessons: "0/3 lessons completed" },
        { title: "Cyclones", progress: 0, status: "Not Started", lessons: "0/4 lessons completed" },
        { title: "Landslides", progress: 0, status: "Not Started", lessons: "0/4 lessons completed" }
    ];


    const leaderboard = [
        { rank: 1, name: "Alex Chen", points: 2450, streak: 15 },
        { rank: 2, name: "Maya Patel", points: 2380, streak: 12 },
        { rank: 3, name: "Jordan Kim", points: 2290, streak: 8 },
        { rank: 4, name: "You", points: 2180, streak: 7 },
        { rank: 5, name: "Sam Wilson", points: 2050, streak: 5 },
        { rank: 6, name: "Sophia Martinez", points: 1980, streak: 4 },
        { rank: 7, name: "Liam Johnson", points: 1875, streak: 6 },
        { rank: 8, name: "Emma Davis", points: 1790, streak: 3 },
        { rank: 9, name: "Noah Brown", points: 1650, streak: 2 },
        { rank: 10, name: "Olivia Taylor", points: 1520, streak: 1 }
    ];


    const emergencyContacts = [
        { name: "Emergency Services", number: "911", type: "emergency" },
        { name: "School Office", number: "(555) 123-4567", type: "school" },
        { name: "Principal", number: "(555) 123-4568", type: "school" },
        { name: "Nurse", number: "(555) 123-4569", type: "medical" }
    ];

    const assemblyPoints = [
        { name: "Main Playground", equipment: "First Aid Kit, Megaphone" },
        { name: "Basketball Court", equipment: "Emergency Radio, Flashlights" },
        { name: "Library Courtyard", equipment: "Blankets, Water Supplies" }
    ];

    const mascotTips = [
        "Complete your modules to earn more points!",
        "Check your 7-day streak progress!",
        "Review the evacuation map regularly!",
        "Practice emergency contacts with friends!"
    ];

    const handleModuleClick = (moduleTitle: string) => {
        if (moduleTitle === "Earthquake Safety") {
            setSelectedModule('earthquake');
        }
        // Add other modules as needed
    };

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar role="student" />

            <div className="flex-1 p-6 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    {selectedModule === 'earthquake' ? (
                        <EarthquakeSafety
                            onBack={() => setSelectedModule(null)}
                            onBackToStudents={() => setSelectedModule(null)}
                        />
                    ) : (
                        <>
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold mb-2">Welcome back, Student!</h1>
                                <p className="text-muted-foreground">Continue your disaster preparedness journey</p>
                            </div>

                            {/* Main Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* Learning Modules - Spans 2 columns */}
                                <div className="lg:col-span-2">
                                    <Card className="shadow-glow border-2 border-bright-green/30 hover:border-bright-green transition-bounce">
                                        <CardHeader className="bg-secondary text-secondary-foreground">
                                            <CardTitle className="flex items-center">
                                                <BookOpen className="w-6 h-6 mr-2 text-secondary-foreground icon-bounce" />
                                                Learning Modules
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {learningModules.map((module, index) => (
                                                    <Card key={index} className="border-2 border-bright-pink/30 hover:border-bright-pink transition-bounce shadow-hover">
                                                        <CardContent className="p-4">
                                                            <div className="flex justify-between items-start mb-3">
                                                                <h3 className="font-semibold">{module.title}</h3>
                                                                <Badge className={`${module.status === 'Completed' ? 'bg-bright-green text-white' :
                                                                        module.status === 'In Progress' ? 'bg-bright-orange text-white' :
                                                                            'bg-bright-pink text-white'
                                                                    } transition-bounce`}>
                                                                    {module.status}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground mb-3">{module.lessons}</p>
                                                            <Progress value={module.progress} className="mb-3" />
                                                            <Button
                                                                size="sm"
                                                                className="w-full bg-primary text-primary-foreground hover:shadow-glow transition-bounce"
                                                                onClick={() => handleModuleClick(module.title)}
                                                            >
                                                                <Play className="w-4 h-4 mr-2 icon-wiggle" />
                                                                {module.status === 'Not Started' ? 'Start Module' : 'Continue'}
                                                            </Button>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Leaderboard */}
                                <Card className="shadow-glow border-2 border-bright-purple/30 hover:border-bright-purple transition-bounce">
                                    <CardHeader className="bg-primary text-primary-foreground">
                                        <CardTitle className="flex items-center">
                                            <Trophy className="w-6 h-6 mr-2 text-primary-foreground icon-pulse" />
                                            Leaderboard
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {leaderboard.map((user) => (
                                                <div
                                                    key={user.rank}
                                                    className={`flex items-center justify-between p-2 rounded transition-bounce ${user.name === 'You'
                                                            ? 'bg-sunny-yellow/20 border-2 border-sunny-yellow shadow-glow'
                                                            : 'bg-muted/20 hover:bg-muted/40'
                                                        }`}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <span className={`font-bold ${user.rank === 1
                                                                ? 'text-sunny-yellow icon-bounce'
                                                                : user.rank === 2
                                                                    ? 'text-muted-foreground'
                                                                    : user.rank === 3
                                                                        ? 'text-bright-orange'
                                                                        : 'text-muted-foreground'
                                                            }`}>
                                                            #{user.rank}
                                                        </span>
                                                        <span className={`${user.name === 'You' ? 'font-semibold text-coral-red' : 'text-foreground'}`}>
                                                            {user.name}
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-medium">{user.points}</div>
                                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                            <Flame className={`w-3 h-3 ${user.name === 'You' ? 'text-coral-red icon-wiggle' : 'text-muted-foreground'}`} />
                                                            {user.streak} day streak
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                                {/* Games Section */}
                                <Card className="shadow-glow border-2 border-sky-blue/30 hover:border-sky-blue transition-bounce">
                                    <CardHeader className="bg-accent text-accent-foreground">
                                        <CardTitle className="flex items-center">
                                            <Play className="w-6 h-6 mr-2 text-accent-foreground icon-wiggle" />
                                            Educational Games
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <Button className="w-full justify-start bg-sky-blue hover:bg-sky-blue/80 text-white border-2 border-white/20 hover:border-white transition-bounce">
                                            <Shield className="w-4 h-4 mr-2 icon-pulse" />
                                            Emergency Quiz Challenge
                                        </Button>
                                        <Button className="w-full justify-start bg-bright-pink hover:bg-bright-pink/80 text-white border-2 border-white/20 hover:border-white transition-bounce">
                                            <Map className="w-4 h-4 mr-2 icon-float" />
                                            Evacuation Route Runner
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Streak Tracker */}
                                <Card className="shadow-glow border-2 border-sunny-yellow/30 hover:border-sunny-yellow transition-bounce">
                                    <CardHeader className="bg-primary text-primary-foreground">
                                        <CardTitle className="flex items-center">
                                            <Flame className="w-6 h-6 mr-2 text-primary-foreground icon-wiggle" />
                                            Learning Streak
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <div className="text-4xl font-bold text-coral-red mb-2 icon-pulse">7</div>
                                        <p className="text-muted-foreground mb-4">Days in a row!</p>
                                        <div className="flex justify-center space-x-1 mb-4">
                                            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                                                <div
                                                    key={day}
                                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-bounce ${day <= 7 ? 'bg-bright-green text-white shadow-glow' : 'bg-muted'
                                                        }`}
                                                >
                                                    {day <= 7 ? <CheckCircle className="w-3 h-3 icon-pulse" /> : day}
                                                </div>
                                            ))}
                                        </div>
                                        <Button size="sm" className="bg-sunny-yellow hover:bg-sunny-yellow/80 text-black font-semibold transition-bounce">
                                            <Trophy className="w-4 h-4 mr-2 icon-bounce" />
                                            Keep it up!
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Games Hub - Full width */}
                                <div className="lg:col-span-3">
                                    <GamesHub />
                                </div>

                                {/* Virtual Drills Section */}
                                <div className="lg:col-span-3">
                                    <Card className="shadow-glow border-2 border-coral-red/30 hover:border-coral-red transition-bounce">
                                        <CardHeader className="bg-primary text-primary-foreground">
                                            <CardTitle className="flex items-center">
                                                <Play className="w-6 h-6 mr-2 text-primary-foreground icon-wiggle" />
                                                Virtual Drills
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <p className="text-muted-foreground">
                                                Practice disaster preparedness through interactive virtual drills. Watch and learn
                                                step-by-step evacuation and response procedures.
                                            </p>
                                            <div className="rounded-lg overflow-hidden shadow-lg">
                                                <video
                                                    controls
                                                    className="w-full rounded-lg"
                                                >
                                                    <source src="/videos/Firesafety_drill.mp4" type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>


                                {/* Find Help Section - Spans 2 columns */}
                                <div className="lg:col-span-2">
                                    <Card className="shadow-elegant">
                                        <CardHeader>
                                            <CardTitle className="flex items-center">
                                                <Map className="w-6 h-6 mr-2 text-primary" />
                                                Find Help
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                                {/* Evacuation Map */}
                                                <div>
                                                    <h3 className="font-semibold mb-3 flex items-center">
                                                        <MapPin className="w-4 h-4 mr-2" />
                                                        Evacuation Map
                                                    </h3>
                                                    <div className="rounded-lg overflow-hidden shadow-lg">
                                                        <SchoolMap />
                                                    </div>
                                                </div>


                                                {/* Emergency Contacts */}
                                                <div>
                                                    <h3 className="font-semibold mb-3 flex items-center">
                                                        <Phone className="w-4 h-4 mr-2" />
                                                        Emergency Contacts
                                                    </h3>
                                                    <div className="space-y-2">
                                                        {emergencyContacts.map((contact, index) => (
                                                            <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                                                                <span className="font-medium">{contact.name}</span>
                                                                <span className="text-primary font-mono">{contact.number}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Assembly Points */}
                                            <div className="mt-6">
                                                <h3 className="font-semibold mb-3">Assembly Points & Equipment</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                    {assemblyPoints.map((point, index) => (
                                                        <Card key={index}>
                                                            <CardContent className="p-3">
                                                                <h4 className="font-medium mb-1">{point.name}</h4>
                                                                <p className="text-xs text-muted-foreground">{point.equipment}</p>
                                                            </CardContent>
                                                        </Card>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <FloatingMascot tips={mascotTips} />
            <BackToLoginButton />
        </div>
    );
};

export default StudentDashboard;