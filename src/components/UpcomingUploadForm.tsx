import { useState } from "react";
import { Calendar, Upload, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface UpcomingUploadFormProps {
  onSuccess?: () => void;
}

const UpcomingUploadForm = ({ onSuccess }: UpcomingUploadFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    genre: "",
    releaseDate: "",
    description: "",
    thumbnailUrl: "",
    trailerUrl: "",
    sectionOrder: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const adjustOrdersForNewContent = (newOrder: number, existingContent: any[]) => {
    // Move all content with order >= newOrder by +1
    return existingContent.map(item => ({
      ...item,
      sectionOrder: item.sectionOrder >= newOrder ? item.sectionOrder + 1 : item.sectionOrder
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const existingUpcomingContent = JSON.parse(localStorage.getItem("upcomingContent") || "[]");
    const newOrder = parseInt(formData.sectionOrder);
    
    // Check if there are already 20 upcoming content items
    if (existingUpcomingContent.length >= 20) {
      toast({
        title: "Error",
        description: "Maximum of 20 upcoming content items allowed. Please delete some items first.",
        variant: "destructive"
      });
      return;
    }

    console.log("Upcoming content data:", formData);
    
    // Adjust existing orders if the chosen order is taken
    const orderTaken = existingUpcomingContent.some((item: any) => item.sectionOrder === newOrder);
    let updatedExistingContent = existingUpcomingContent;
    
    if (orderTaken) {
      updatedExistingContent = adjustOrdersForNewContent(newOrder, existingUpcomingContent);
    }
    
    // Save to localStorage
    const newContent = {
      ...formData,
      id: Date.now(),
      sectionOrder: newOrder
    };
    
    const updatedContent = [...updatedExistingContent, newContent];
    localStorage.setItem("upcomingContent", JSON.stringify(updatedContent));
    
    toast({
      title: "Success",
      description: orderTaken 
        ? `Upcoming content added successfully! Orders adjusted automatically.`
        : "Upcoming content added successfully!"
    });

    // Reset form
    setFormData({
      title: "",
      type: "",
      genre: "",
      releaseDate: "",
      description: "",
      thumbnailUrl: "",
      trailerUrl: "",
      sectionOrder: ""
    });

    // Close form if callback provided
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calendar className="h-5 w-5 text-primary" />
          Add Upcoming Content
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Upload information about upcoming movies and TV shows
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter content title"
                className="bg-input border-border text-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-foreground">Content Type</Label>
              <Select onValueChange={(value) => handleInputChange("type", value)} required>
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="movie">Movie</SelectItem>
                  <SelectItem value="tv">TV Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre" className="text-foreground">Genre</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => handleInputChange("genre", e.target.value)}
                placeholder="e.g., Action • Adventure"
                className="bg-input border-border text-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sectionOrder" className="text-foreground">Section Order (1-20)</Label>
              <Select onValueChange={(value) => handleInputChange("sectionOrder", value)} required>
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue placeholder="Select order position" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="releaseDate" className="text-foreground">Release Date</Label>
            <Input
              id="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={(e) => handleInputChange("releaseDate", e.target.value)}
              className="bg-input border-border text-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter content description..."
              rows={4}
              className="bg-input border-border text-foreground resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl" className="text-foreground">Thumbnail URL</Label>
              <Input
                id="thumbnailUrl"
                type="url"
                value={formData.thumbnailUrl}
                onChange={(e) => handleInputChange("thumbnailUrl", e.target.value)}
                placeholder="https://example.com/thumbnail.jpg"
                className="bg-input border-border text-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trailerUrl" className="text-foreground">Trailer URL</Label>
              <Input
                id="trailerUrl"
                type="url"
                value={formData.trailerUrl}
                onChange={(e) => handleInputChange("trailerUrl", e.target.value)}
                placeholder="https://example.com/trailer.mp4"
                className="bg-input border-border text-foreground"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Upcoming Content
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpcomingUploadForm;
