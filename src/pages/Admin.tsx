
import { useState } from "react";
import { 
  Upload, 
  BarChart3, 
  PlayCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ContentManagement from "@/components/ContentManagement";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("upload");

  const renderContent = () => {
    switch (activeTab) {
      case "upload":
        return <ContentUpload />;
      case "manage":
        return <ContentManagement />;
      case "analytics":
        return <AnalyticsDashboard />;
      default:
        return <ContentUpload />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Content Admin</h1>
          <p className="text-muted-foreground">Upload, manage and analyze your content</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
              activeTab === "upload" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card/50 text-foreground hover:bg-accent"
            }`}
          >
            <Upload className="h-4 w-4" />
            Upload Content
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
              activeTab === "manage" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card/50 text-foreground hover:bg-accent"
            }`}
          >
            <PlayCircle className="h-4 w-4" />
            Manage Content
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
              activeTab === "analytics" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card/50 text-foreground hover:bg-accent"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

const ContentUpload = () => {
  return (
    <div className="space-y-8">
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="text-foreground">Upload New Content</CardTitle>
          <CardDescription>Add movies and TV shows to your platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Upload Video Files</h3>
            <p className="text-muted-foreground mb-4">Drag and drop your video files here or click to browse</p>
            <input type="file" accept="video/*" multiple className="hidden" id="video-upload" />
            <label htmlFor="video-upload" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg cursor-pointer inline-block transition-colors">
              Select Files
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
              <input className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Content title" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Genre</label>
              <select className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Action</option>
                <option>Comedy</option>
                <option>Drama</option>
                <option>Horror</option>
                <option>Sci-Fi</option>
                <option>Romance</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Year</label>
              <input type="number" className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="2024" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Rating</label>
              <select className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>G</option>
                <option>PG</option>
                <option>PG-13</option>
                <option>R</option>
                <option>TV-14</option>
                <option>TV-MA</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
            <textarea className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-24" placeholder="Content description..."></textarea>
          </div>
          
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors">
            Upload Content
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
