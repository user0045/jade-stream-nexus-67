
import { useState } from "react";
import { 
  Users, 
  PlayCircle, 
  BarChart3, 
  Settings, 
  Shield, 
  Upload, 
  Edit3, 
  Trash2, 
  Eye, 
  Plus,
  Search,
  Filter,
  Download,
  UserCheck,
  UserX,
  Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import AdminSidebar from "@/components/AdminSidebar";
import ContentManagement from "@/components/ContentManagement";
import UserManagement from "@/components/UserManagement";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "content":
        return <ContentManagement />;
      case "users":
        return <UserManagement />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "settings":
        return <AdminSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your streaming platform</p>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const DashboardOverview = () => {
  const stats = [
    { title: "Total Users", value: "12,543", change: "+12%", icon: Users },
    { title: "Active Content", value: "1,234", change: "+5%", icon: PlayCircle },
    { title: "Monthly Revenue", value: "$89,432", change: "+18%", icon: BarChart3 },
    { title: "Premium Users", value: "8,765", change: "+23%", icon: Crown },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <IconComponent className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-primary">{stat.change} from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Content Uploads</CardTitle>
            <CardDescription>Latest content added to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["The Dark Knight Returns", "Stranger Things S5", "Avatar: The Last Airbender", "Breaking Bad: El Camino"].map((title, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-foreground">{title}</span>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground">User Activity</CardTitle>
            <CardDescription>Recent user registrations and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["John Doe registered", "Premium subscription activated", "Sarah Johnson logged in", "New content watched"].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-foreground">{activity}</span>
                  <span className="text-xs text-muted-foreground">5 min ago</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AdminSettings = () => {
  return (
    <div className="space-y-8">
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="text-foreground">Platform Settings</CardTitle>
          <CardDescription>Configure your streaming platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Platform Name</label>
              <Input defaultValue="StreamFlix" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Support Email</label>
              <Input defaultValue="support@streamflix.com" className="mt-1" />
            </div>
          </div>
          <Separator className="bg-border" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground">Two-Factor Authentication</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">API Rate Limiting</span>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
