import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, BarChart3, FileText, AlertTriangle, 
  Download, Filter, TrendingUp, Shield
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import BackToLoginButton from '@/components/BackToLoginButton';
import FloatingMascot from '@/components/FloatingMascot';
import SchoolMap from '@/components/SchoolMap';


const NDMADashboard = () => {
  const [selectedDisaster, setSelectedDisaster] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const nationalStats = {
    totalSchools: 15420,
    preparedSchools: 12336,
    schoolsNeedingHelp: 3084,
    averagePreparedness: 80
  };

  const regionData = [
    { region: "North", schools: 3850, prepared: 85, needHelp: 15 },
    { region: "South", schools: 4200, prepared: 78, needHelp: 22 },
    { region: "East", schools: 3920, prepared: 82, needHelp: 18 },
    { region: "West", schools: 3450, prepared: 76, needHelp: 24 }
  ];

  const disasterTypes = [
    { type: "Earthquake", schools: 8920, prepared: 75 },
    { type: "Flood", schools: 6540, prepared: 82 },
    { type: "Fire", schools: 15420, prepared: 89 },
    { type: "Cyclone", schools: 4280, prepared: 71 }
  ];

  const recentAlerts = [
    {
      date: "2024-01-10",
      region: "Eastern Region",
      type: "Earthquake",
      severity: "High",
      schoolsAffected: 245,
      status: "Active"
    },
    {
      date: "2024-01-08",
      region: "Southern Region", 
      type: "Flood Warning",
      severity: "Medium",
      schoolsAffected: 156,
      status: "Monitoring"
    },
    {
      date: "2024-01-05",
      region: "Northern Region",
      type: "Severe Weather",
      severity: "Low",
      schoolsAffected: 89,
      status: "Resolved"
    }
  ];

  const reports = [
    { name: "Monthly Preparedness Report - December 2023", date: "2024-01-01", type: "PDF" },
    { name: "Regional Analysis - Q4 2023", date: "2023-12-28", type: "Excel" },
    { name: "Drill Effectiveness Study", date: "2023-12-20", type: "PDF" },
    { name: "School Infrastructure Assessment", date: "2023-12-15", type: "PDF" }
  ];

  const mascotTips = [
    "Monitor regional preparedness levels!",
    "Export reports for stakeholder meetings!",
    "Filter by disaster type for targeted insights!",
    "Keep track of schools needing assistance!"
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High':
        return <Badge variant="destructive">High</Badge>;
      case 'Medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'Low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="destructive">Active</Badge>;
      case 'Monitoring':
        return <Badge variant="secondary">Monitoring</Badge>;
      case 'Resolved':
        return <Badge variant="default">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="ndma" />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">NDMA National Dashboard</h1>
            <p className="text-muted-foreground">National disaster management authority overview</p>
          </div>

          {/* National Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="shadow-elegant">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2 icon-glow" />
                <div className="text-2xl font-bold">{nationalStats.totalSchools.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Total Schools</p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 text-secondary mx-auto mb-2 icon-bounce" />
                <div className="text-2xl font-bold">{nationalStats.preparedSchools.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Well Prepared</p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2 icon-shake" />
                <div className="text-2xl font-bold">{nationalStats.schoolsNeedingHelp.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Need Assistance</p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2 icon-dance" />
                <div className="text-2xl font-bold">{nationalStats.averagePreparedness}%</div>
                <p className="text-sm text-muted-foreground">National Average</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="shadow-elegant mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-6 h-6 mr-2 text-primary icon-wiggle" />
                Filters & Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Disaster Type</label>
                  <Select value={selectedDisaster} onValueChange={setSelectedDisaster}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Disasters</SelectItem>
                      <SelectItem value="earthquake">Earthquake</SelectItem>
                      <SelectItem value="flood">Flood</SelectItem>
                      <SelectItem value="fire">Fire</SelectItem>
                      <SelectItem value="cyclone">Cyclone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Region</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="north">North</SelectItem>
                      <SelectItem value="south">South</SelectItem>
                      <SelectItem value="east">East</SelectItem>
                      <SelectItem value="west">West</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            {/* National Map */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-primary icon-pulse" />
                  National Preparedness Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
                  <img
                    src="/Disaster_Map.png"
                    alt="India Preparedness Map"
                    className="w-full h-full object-contain rounded-lg shadow-md"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Analytics Charts */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-secondary icon-zoom" />
                  Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Regional Performance */}
                  <div>
                    <h4 className="font-semibold mb-3">Regional Performance</h4>
                    <div className="space-y-2">
                      {regionData.map((region) => (
                        <div key={region.region} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="font-medium">{region.region}</span>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm">{region.schools} schools</span>
                            <span className="text-sm font-medium text-secondary">{region.prepared}% ready</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Disaster Type Preparedness */}
                  <div>
                    <h4 className="font-semibold mb-3">Disaster Type Preparedness</h4>
                    <div className="space-y-2">
                      {disasterTypes.map((disaster) => (
                        <div key={disaster.type} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="font-medium">{disaster.type}</span>
                          <span className="text-sm font-medium text-primary">{disaster.prepared}% prepared</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts and Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Recent Alerts */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-destructive icon-shake" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{alert.type}</h4>
                        <div className="flex space-x-2">
                          {getSeverityBadge(alert.severity)}
                          {getStatusBadge(alert.status)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.region} • {alert.date}
                      </p>
                      <p className="text-sm">
                        <strong>{alert.schoolsAffected}</strong> schools affected
                      </p>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>

            {/* Reports Section */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-primary icon-flip" />
                  Reports & Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h4 className="font-medium text-sm">{report.name}</h4>
                        <p className="text-xs text-muted-foreground">{report.date} • {report.type}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-1" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <FloatingMascot tips={mascotTips} />
      <BackToLoginButton />
    </div>
  );
};

export default NDMADashboard;