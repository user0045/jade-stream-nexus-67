
import PremiumNavbar from "@/components/PremiumNavbar";
import { Button } from "@/components/ui/button";
import { User, Settings, Download, CreditCard, HelpCircle, LogOut } from "lucide-react";

const Profile = () => {
  const userStats = {
    moviesWatched: 142,
    showsWatched: 28,
    hoursWatched: 1250,
    favoritesCount: 35
  };

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto max-w-4xl px-6">
          {/* Profile Header */}
          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">John Doe</h1>
                <p className="text-muted-foreground">Premium Member since 2022</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm border border-primary/30">
                    Premium Plan
                  </span>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userStats.moviesWatched}</div>
                <div className="text-sm text-muted-foreground">Movies Watched</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userStats.showsWatched}</div>
                <div className="text-sm text-muted-foreground">Shows Watched</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userStats.hoursWatched}</div>
                <div className="text-sm text-muted-foreground">Hours Watched</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userStats.favoritesCount}</div>
                <div className="text-sm text-muted-foreground">Favorites</div>
              </div>
            </div>
          </div>

          {/* Settings Menu */}
          <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Account Settings</h2>
            
            <div className="space-y-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start h-auto p-4 hover:bg-primary/10 rounded-xl"
              >
                <Settings className="h-5 w-5 mr-4" />
                <div className="text-left">
                  <div className="font-semibold">Account Settings</div>
                  <div className="text-sm text-muted-foreground">Manage your account preferences</div>
                </div>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start h-auto p-4 hover:bg-primary/10 rounded-xl"
              >
                <Download className="h-5 w-5 mr-4" />
                <div className="text-left">
                  <div className="font-semibold">Download Settings</div>
                  <div className="text-sm text-muted-foreground">Manage offline downloads</div>
                </div>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start h-auto p-4 hover:bg-primary/10 rounded-xl"
              >
                <CreditCard className="h-5 w-5 mr-4" />
                <div className="text-left">
                  <div className="font-semibold">Billing & Payments</div>
                  <div className="text-sm text-muted-foreground">Manage your subscription</div>
                </div>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start h-auto p-4 hover:bg-primary/10 rounded-xl"
              >
                <HelpCircle className="h-5 w-5 mr-4" />
                <div className="text-left">
                  <div className="font-semibold">Help & Support</div>
                  <div className="text-sm text-muted-foreground">Get help and contact support</div>
                </div>
              </Button>
              
              <div className="border-t border-primary/20 pt-4 mt-6">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-auto p-4 hover:bg-destructive/10 text-destructive rounded-xl"
                >
                  <LogOut className="h-5 w-5 mr-4" />
                  <div className="text-left">
                    <div className="font-semibold">Sign Out</div>
                    <div className="text-sm opacity-70">Sign out of your account</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
