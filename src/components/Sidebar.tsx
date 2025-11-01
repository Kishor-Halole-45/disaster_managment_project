import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BookOpen, Users, Shield, AlertTriangle, Home, 
  Map, Phone, Trophy, Target, FileText, Calendar,
  Upload, BarChart3, MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
  animation: string;
}

interface SidebarProps {
  role: 'student' | 'teacher' | 'admin' | 'ndma';
}

const sidebarItems = {
  student: [
    { name: 'Learning Modules', path: '/student-dashboard', icon: BookOpen, animation: 'icon-bounce' },
    { name: 'Games', path: '/student-games', icon: Target, animation: 'icon-wiggle' },
    { name: 'Leaderboard', path: '/student-leaderboard', icon: Trophy, animation: 'icon-pulse' },
    { name: 'Find Help', path: '/student-help', icon: Map, animation: 'icon-float' },
  ],
  teacher: [
    { name: 'Dashboard', path: '/teacher-dashboard', icon: Home, animation: 'icon-pulse' },
    { name: 'Students', path: '/teacher-students', icon: Users, animation: 'icon-float' },
    { name: 'Modules', path: '/teacher-modules', icon: BookOpen, animation: 'icon-bounce' },
    { name: 'Analytics', path: '/teacher-analytics', icon: BarChart3, animation: 'icon-rotate' },
  ],
  admin: [
    { name: 'Overview', path: '/admin-dashboard', icon: Home, animation: 'icon-pulse' },
    { name: 'Classes', path: '/admin-classes', icon: Users, animation: 'icon-float' },
    { name: 'Drill Scheduler', path: '/admin-drills', icon: Calendar, animation: 'icon-wiggle' },
    { name: 'Maps', path: '/admin-maps', icon: Upload, animation: 'icon-bounce' },
  ],
  ndma: [
    { name: 'National Overview', path: '/ndma-dashboard', icon: MapPin, animation: 'icon-pulse' },
    { name: 'Analytics', path: '/ndma-analytics', icon: BarChart3, animation: 'icon-rotate' },
    { name: 'Reports', path: '/ndma-reports', icon: FileText, animation: 'icon-float' },
    { name: 'Alerts', path: '/ndma-alerts', icon: AlertTriangle, animation: 'icon-wiggle' },
  ]
};

const Sidebar = ({ role }: SidebarProps) => {
  const items = sidebarItems[role] || [];
  
  const getRoleIcon = () => {
    switch (role) {
      case 'student': return BookOpen;
      case 'teacher': return Users;
      case 'admin': return Shield;
      case 'ndma': return AlertTriangle;
      default: return Home;
    }
  };

  const RoleIcon = getRoleIcon();

  return (
    <div className="w-64 bg-card border-r border-border min-h-screen">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <RoleIcon className="w-8 h-8 text-primary icon-pulse" />
          <div>
            <h2 className="text-lg font-semibold capitalize text-foreground">{role} Portal</h2>
            <p className="text-sm text-muted-foreground">SafeSchool Prep</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )
                }
              >
                <item.icon className={`w-5 h-5 ${item.animation}`} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;