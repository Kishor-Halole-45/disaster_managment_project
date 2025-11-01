import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, BookOpen, AlertTriangle } from "lucide-react";
import owlMascot from "@/assets/owl-mascot.png";

const Landing = () => {
  const handleLogin = (role: string) => {
    // This will redirect to respective dashboards
    // Note: Authentication will be handled by Supabase integration
    switch (role) {
      case 'student':
        window.location.href = '/student-dashboard';
        break;
      case 'teacher':
        window.location.href = '/teacher-dashboard';
        break;
      case 'admin':
        window.location.href = '/admin-dashboard';
        break;
      case 'ndma':
        window.location.href = '/ndma-dashboard';
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <img 
              src={owlMascot} 
              alt="Disaster Preparedness Mascot" 
              className="w-32 h-32 floating-mascot"
            />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-bright-purple to-sky-blue bg-clip-text text-transparent">
            SafeSchool Prep
          </h1>
          
          <p className="text-2xl md:text-3xl text-primary mb-8 font-medium">
            Disaster Preparedness for Schools & Communities
          </p>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Empowering students, teachers, and administrators with the knowledge and tools 
            needed for effective disaster preparedness and emergency response.
          </p>
        </div>

        {/* Login Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="shadow-elegant hover:shadow-hover transition-smooth hover:scale-105 cursor-pointer" 
                onClick={() => handleLogin('student')}>
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-6 icon-bounce" />
              <h3 className="text-xl font-semibold mb-4">Student Login</h3>
              <p className="text-muted-foreground mb-6">
                Learn through interactive modules and games
              </p>
              <Button className="w-full" variant="default">
                Enter as Student
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-hover transition-smooth hover:scale-105 cursor-pointer"
                onClick={() => handleLogin('teacher')}>
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-secondary mx-auto mb-6 icon-wiggle" />
              <h3 className="text-xl font-semibold mb-4">Teacher Login</h3>
              <p className="text-muted-foreground mb-6">
                Manage students and track learning progress
              </p>
              <Button className="w-full" variant="secondary">
                Enter as Teacher
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-hover transition-smooth hover:scale-105 cursor-pointer"
                onClick={() => handleLogin('admin')}>
            <CardContent className="p-8 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-6 icon-pulse" />
              <h3 className="text-xl font-semibold mb-4">Admin Login</h3>
              <p className="text-muted-foreground mb-6">
                School administration and preparedness oversight
              </p>
              <Button className="w-full" variant="default">
                Enter as Admin
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-hover transition-smooth hover:scale-105 cursor-pointer"
                onClick={() => handleLogin('ndma')}>
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-secondary mx-auto mb-6 icon-shake" />
              <h3 className="text-xl font-semibold mb-4">NDMA Login</h3>
              <p className="text-muted-foreground mb-6">
                National disaster management authority access
              </p>
              <Button className="w-full" variant="secondary">
                Enter as NDMA
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-12 text-primary">
            Comprehensive Disaster Preparedness Platform
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <BookOpen className="w-16 h-16 text-primary mx-auto mb-4 icon-flip" />
              <h3 className="text-xl font-semibold mb-3">Interactive Learning</h3>
              <p className="text-muted-foreground">
                Engaging modules and games that make disaster preparedness education effective and memorable.
              </p>
            </div>
            
            <div className="p-6">
              <Shield className="w-16 h-16 text-secondary mx-auto mb-4 icon-glow" />
              <h3 className="text-xl font-semibold mb-3">Emergency Planning</h3>
              <p className="text-muted-foreground">
                Comprehensive tools for creating and managing school emergency response plans.
              </p>
            </div>
            
            <div className="p-6">
              <AlertTriangle className="w-16 h-16 text-primary mx-auto mb-4 icon-dance" />
              <h3 className="text-xl font-semibold mb-3">Real-time Monitoring</h3>
              <p className="text-muted-foreground">
                Dashboard insights and analytics for tracking preparedness levels across institutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;