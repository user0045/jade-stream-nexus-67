
import { useState } from "react";
import { Search, Menu, X, Home, Play, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PremiumNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Movies", path: "/movies", icon: Play },
    { name: "TV Shows", path: "/tv-shows", icon: Play },
    { name: "Upcoming", path: "/upcoming", icon: Calendar },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-10">
            <h1 
              className="text-3xl font-bold text-primary animate-glow cursor-pointer bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
              onClick={() => navigate("/")}
            >
              StreamFlix
            </h1>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-all duration-300 relative group px-3 py-2 rounded-lg hover:bg-primary/10"
                  >
                    <IconComponent className="h-4 w-4" />
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right side controls */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-primary/20 transition-all duration-300"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
              {isSearchOpen && (
                <div className="absolute right-0 top-12 w-80 p-4 bg-background/95 backdrop-blur-xl border border-primary/20 rounded-xl shadow-2xl animate-fade-in">
                  <input
                    type="text"
                    placeholder="Search movies, shows..."
                    className="w-full px-4 py-3 bg-accent/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    autoFocus
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-primary/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-primary/20 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-all duration-300 py-3 px-2 rounded-lg hover:bg-primary/10"
                  >
                    <IconComponent className="h-5 w-5" />
                    {item.name}
                  </button>
                );
              })}
              
              <div className="flex items-center space-x-4 pt-4 border-t border-primary/20">
                <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PremiumNavbar;
