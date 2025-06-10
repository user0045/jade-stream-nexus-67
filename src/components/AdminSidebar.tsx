
import { 
  LayoutDashboard, 
  PlayCircle, 
  Users, 
  BarChart3, 
  Settings, 
  Shield,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "content", label: "Content", icon: PlayCircle },
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-card/50 backdrop-blur-xl border-r border-primary/20 p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary">StreamFlix</h2>
        <p className="text-sm text-muted-foreground">Admin Panel</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                activeTab === item.id 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-accent"
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <IconComponent className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
      
      <Separator className="my-6 bg-border" />
      
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3 text-foreground hover:bg-accent">
          <Shield className="h-4 w-4" />
          Security
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
