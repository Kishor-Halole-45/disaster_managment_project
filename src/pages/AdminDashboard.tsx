import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Shield,
  Users,
  Calendar,
  Upload,
  PieChart as PieChartIcon,
  CheckCircle,
  AlertCircle,
  Clock,
  School,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SchoolMap from "@/components/SchoolMap";
import Sidebar from "@/components/Sidebar";
import BackToLoginButton from "@/components/BackToLoginButton";
import FloatingMascot from "@/components/FloatingMascot";

const AdminDashboard = () => {
  const [sosOpen, setSosOpen] = useState(false);

  const preparednessOverview = {
    excellent: 35,
    good: 45,
    needsImprovement: 20,
  };

  const preparednessData = [
    { name: "Excellent", value: preparednessOverview.excellent, fill: "#22c55e" },
    { name: "Good", value: preparednessOverview.good, fill: "#3b82f6" },
    { name: "Needs Improvement", value: preparednessOverview.needsImprovement, fill: "#ef4444" },
  ];

  const classPerformance = [
    { class: "Grade 6-A", teacher: "Ms. Smith", students: 25, avgProgress: 88, status: "Excellent" },
    { class: "Grade 6-B", teacher: "Mr. Johnson", students: 27, avgProgress: 82, status: "Good" },
    { class: "Grade 7-A", teacher: "Ms. Davis", students: 28, avgProgress: 91, status: "Excellent" },
    { class: "Grade 7-B", teacher: "Mr. Wilson", students: 26, avgProgress: 75, status: "Good" },
    { class: "Grade 8-A", teacher: "Ms. Brown", students: 24, avgProgress: 68, status: "Needs Help" },
    { class: "Grade 8-B", teacher: "Mr. Taylor", students: 25, avgProgress: 79, status: "Good" },
  ];

  const staffPerformance = [
    { name: "Ms. Smith", Module: "Earthquake Prepardness", Badges: 3, avgProgress: 90, status: "Excellent" },
    { name: "Mr. Johnson", Module: "Fire Safety Protocol", Badges: 4, avgProgress: 82, status: "Good" },
    { name: "Ms. Davis", Module: "First Aid Basics", Badges: 3, avgProgress: 88, status: "Excellent" },
    { name: "Mr. Wilson", Module: "Flood Response Training", Badges: 2, avgProgress: 76, status: "Good" },
    { name: "Ms. Brown", Module: "How to use Fire Extinguisher", Badges: 3, avgProgress: 67, status: "Needs Help" },
    { name: "Mr. Taylor", Module: "Mitigation Control", Badges: 2, avgProgress: 80, status: "Good" },
  ];

  const upcomingDrills = [
    { date: "2024-01-15", time: "10:30 AM", type: "Fire Drill", location: "Entire School", status: "Scheduled" },
    { date: "2024-01-22", time: "2:15 PM", type: "Earthquake Drill", location: "Building A", status: "Planned" },
    { date: "2024-02-05", time: "11:00 AM", type: "Lockdown Drill", location: "Entire School", status: "Planned" },
  ];

  const schoolStats = {
    totalStudents: 755,
    totalTeachers: 35,
    completedDrills: 12,
    preparednessScore: 84,
  };

  const mascotTips = [
    "Upload your evacuation map for better preparedness!",
    "Schedule regular safety drills!",
    "Review class performance regularly!",
    "Keep emergency plans updated!",
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Excellent":
        return <Badge variant="default">Excellent</Badge>;
      case "Good":
        return <Badge variant="secondary">Good</Badge>;
      case "Needs Help":
        return <Badge variant="destructive">Needs Help</Badge>;
      case "Scheduled":
        return <Badge variant="default">Scheduled</Badge>;
      case "Planned":
        return <Badge variant="outline">Planned</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Excellent":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Good":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case "Needs Help":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const handleSosConfirm = () => {
    setSosOpen(false);
    // 👉 Add your SOS trigger logic here (API call, notification, etc.)
    alert("🚨 SOS alert triggered!");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="admin" />

      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header with SOS button */}
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">School Administration Portal</h1>
              <p className="text-muted-foreground">Manage school-wide disaster preparedness</p>
            </div>
            <Button
              onClick={() => setSosOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 active:scale-95"
            >
              🚨 SOS
            </Button>
          </div>

          
          {/* Top Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="shadow-elegant">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2 icon-bounce" />
                <div className="text-2xl font-bold">{schoolStats.totalStudents}</div>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardContent className="p-6 text-center">
                <School className="w-8 h-8 text-secondary mx-auto mb-2 icon-wiggle" />
                <div className="text-2xl font-bold">{schoolStats.totalTeachers}</div>
                <p className="text-sm text-muted-foreground">Teachers</p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2 icon-pulse" />
                <div className="text-2xl font-bold">{schoolStats.completedDrills}</div>
                <p className="text-sm text-muted-foreground">Drills This Year</p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-secondary mx-auto mb-2 icon-glow" />
                <div className="text-2xl font-bold">{schoolStats.preparednessScore}%</div>
                <p className="text-sm text-muted-foreground">Preparedness Score</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Preparedness Overview with Pie Chart */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="w-6 h-6 mr-2 text-primary icon-spin" />
                  Preparedness Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Legend */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                        <span className="text-sm">Excellent</span>
                      </div>
                      <span className="font-semibold">{preparednessOverview.excellent}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                        <span className="text-sm">Good</span>
                      </div>
                      <span className="font-semibold">{preparednessOverview.good}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                        <span className="text-sm">Needs Improvement</span>
                      </div>
                      <span className="font-semibold">{preparednessOverview.needsImprovement}%</span>
                    </div>
                  </div>

                  {/* Interactive Pie Chart */}
                  <ResponsiveContainer width="100%" height={200}>
                    <RechartsPieChart>
                      <Pie
                        data={preparednessData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label
                      />
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Drill Scheduler */}
            <Card className="lg:col-span-2 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-secondary icon-flip" />
                  Drill Scheduler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDrills.map((drill, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(drill.status)}
                        <div>
                          <h4 className="font-semibold">{drill.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            {drill.date} at {drill.time} • {drill.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(drill.status)}
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button className="w-full">Schedule New Drill</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upload Section and Class Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* School Map */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-6 h-6 mr-2 text-primary icon-dance" />
                  School Campus Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SchoolMap />
                <div className="mt-4 space-y-2">
                  <Button className="w-full" variant="outline">Edit Map Layout</Button>
                  <Button className="w-full" variant="outline">Update Assembly Points</Button>
                </div>
              </CardContent>
            </Card>

            {/* Staff Performance Table */}
            <Card className="lg:col-span-2 shadow-elegant mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-6 h-6 mr-2 text-secondary icon-dance" />
                  Staff Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Teacher Name</TableHead>
                      <TableHead>Module Completed</TableHead>
                      <TableHead>Badges Earned</TableHead>
                      <TableHead>Avg Progress</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffPerformance.map((teacher, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{teacher.name}</TableCell>
                        <TableCell>{teacher.Module}</TableCell>
                        <TableCell>{teacher.Badges}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={teacher.avgProgress} className="w-16" />
                            <span className="text-sm">{teacher.avgProgress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(teacher.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* New row for Class Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Class Performance Table */}
            <Card className="lg:col-span-3 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <School className="w-6 h-6 mr-2 text-primary icon-bounce" />
                  Class Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Avg Progress</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classPerformance.map((classData, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{classData.class}</TableCell>
                        <TableCell>{classData.teacher}</TableCell>
                        <TableCell>{classData.students}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={classData.avgProgress} className="w-16" />
                            <span className="text-sm">{classData.avgProgress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(classData.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <FloatingMascot tips={mascotTips} />
      <BackToLoginButton />

      {/* Floating SOS button for mobile */}
      <Button
        onClick={() => setSosOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full w-16 h-16 flex items-center justify-center shadow-xl z-50 lg:hidden"
      >
        🚨
      </Button>

      {/* SOS Confirmation Modal */}
      <Dialog open={sosOpen} onOpenChange={setSosOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">🚨 Confirm SOS</DialogTitle>
            <DialogDescription>
              This will trigger an <strong>emergency alert</strong> to all staff and the rescue team.
              Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSosOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleSosConfirm}>
              Trigger SOS
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
