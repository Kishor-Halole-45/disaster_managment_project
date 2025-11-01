import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, BookOpen, BarChart3, Award, GraduationCap, User, Mail, Calendar } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import BackToLoginButton from '@/components/BackToLoginButton';
import FloatingMascot from '@/components/FloatingMascot';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";


const TeacherDashboard = () => {
  const teacherInfo = {
    name: "Ms. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    class: "Grade 7-A",
    students: 28,
    joinDate: "September 2020"
  };

  const students = [
    { name: "Alex Chen", progress: 85, modules: 3, streak: 15, status: "Active" },
    { name: "Maya Patel", progress: 92, modules: 4, streak: 12, status: "Active" },
    { name: "Jordan Kim", progress: 78, modules: 2, streak: 8, status: "Active" },
    { name: "Sam Wilson", progress: 65, modules: 2, streak: 5, status: "Needs Help" },
    { name: "Emma Davis", progress: 95, modules: 4, streak: 20, status: "Excellent" },
    { name: "Ryan Brown", progress: 42, modules: 1, streak: 2, status: "Needs Help" },
    { name: "Zoe Taylor", progress: 88, modules: 3, streak: 11, status: "Active" }
  ];

  const availableModules = [
    "Earthquake Safety Basics",
    "Fire Emergency Response",
    "Flood Preparedness",
    "First Aid Training",
    "Severe Weather Safety",
    "Chemical Safety"
  ];

  const performanceData = {
    averageProgress: 78,
    completedModules: 156,
    activeStudents: 25,
    strugglingStudents: 3
  };

  const mascotTips = [
    "Review students who need extra help!",
    "Assign new modules to keep learning fresh!",
    "Check the analytics for class insights!",
    "Encourage students with low streaks!"
  ];

  const teacherModules = [
    {
      title: "Disaster Management (NDMA Guidelines)",
      file: "/modules/disaster-management.pdf",
    },
    { title: "Earthquake Preparedness", file: "/modules/earthquake.pdf" },
    { title: "Fire Safety Protocols", file: "/modules/fire-safety.pdf" },
    { title: "Flood Response Training", file: "/modules/flood-response.pdf" },
    { title: "First Aid Basics", file: "/modules/first-aid.pdf" },
  ];

  //  Dummy analytics data
  const analyticsData = [
    { module: "Earthquake Safety", completion: 85, avgScore: 78 },
    { module: "Fire Response", completion: 72, avgScore: 81 },
    { module: "Flood Preparedness", completion: 65, avgScore: 74 },
    { module: "First Aid", completion: 90, avgScore: 88 },
    { module: "Chemical Safety", completion: 55, avgScore: 69 },
  ];

  // Module Viewer State
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Excellent':
        return <Badge variant="default">Excellent</Badge>;
      case 'Active':
        return <Badge variant="secondary">Active</Badge>;
      case 'Needs Help':
        return <Badge variant="destructive">Needs Help</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="teacher" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Teacher Portal</h1>
            <p className="text-muted-foreground">Manage your students and track their progress</p>
          </div>

          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Profile */}
            <Card className="lg:col-span-2 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-6 h-6 mr-2 text-primary icon-float" />
                  Teacher Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{teacherInfo.name}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center"><Mail className="w-4 h-4 mr-2" />{teacherInfo.email}</div>
                      <div className="flex items-center"><Users className="w-4 h-4 mr-2" />{teacherInfo.class} • {teacherInfo.students} students</div>
                      <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />Since {teacherInfo.joinDate}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-elegant">
              <CardHeader><CardTitle>Class Average</CardTitle></CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{performanceData.averageProgress}%</div>
                <Progress value={performanceData.averageProgress} className="mb-2" />
                <p className="text-sm text-muted-foreground">Overall Progress</p>
              </CardContent>
            </Card>
            <Card className="shadow-elegant">
              <CardHeader><CardTitle>Active Students</CardTitle></CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">{performanceData.activeStudents}</div>
                <p className="text-sm text-muted-foreground">{performanceData.strugglingStudents} need help</p>
              </CardContent>
            </Card>
          </div>

          {/* Module Assignment & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Module Assignment */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-primary icon-dance" />
                  Assign Module
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select onValueChange={(val) => setSelectedModule(val)}>
                  <SelectTrigger><SelectValue placeholder="Select a module" /></SelectTrigger>
                  <SelectContent>
                    {availableModules.map((module, index) => (
                      <SelectItem key={index} value={module.toLowerCase().replace(/\s+/g, '-')}>
                        {module}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Assign to..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="struggling">Students Needing Help</SelectItem>
                    <SelectItem value="advanced">Advanced Students</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full">Assign Module</Button>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card className="lg:col-span-2 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-secondary icon-zoom" />
                  Student Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="module" angle={-15} textAnchor="end" interval={0} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completion" fill="#3b82f6" name="Completion %" />
                      <Bar dataKey="avgScore" fill="#10b981" name="Average Score %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Students Table */}
          <Card className="shadow-elegant mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-6 h-6 mr-2 text-accent icon-bounce" />
                Student Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Modules Completed</TableHead>
                    <TableHead>Learning Streak</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={student.progress} className="w-20" />
                          <span className="text-sm">{student.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.modules}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-1 text-orange-500" />
                          {student.streak} days
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Teacher Training Modules Section */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Teacher Training Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-6">
                {teacherModules.map((module, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    onClick={() => setSelectedModule(module.file)}
                  >
                    {module.title}
                  </Button>
                ))}
              </div>

              {selectedModule && (
                <div className="w-full h-[600px] border rounded-lg overflow-hidden">
                  <iframe
                    src={selectedModule}
                    className="w-full h-full"
                    title="Training Module"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BackToLoginButton />
      <FloatingMascot tips={mascotTips} />
    </div>
  );
};

export default TeacherDashboard;
