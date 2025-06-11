
import { useState } from "react";
import { Upload, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContentUploadFormProps {
  onSuccess?: () => void;
}

const ContentUploadForm = ({ onSuccess }: ContentUploadFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    genre: "",
    duration: "",
    rating: "",
    status: "Published",
    views: "0",
    description: "",
    thumbnail_url: "",
    video_url: "",
    trailer_url: "",
    release_year: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('content')
      .insert({
        title: formData.title,
        type: formData.type as "Movie" | "TV Show",
        genre: formData.genre,
        duration: formData.duration,
        rating: formData.rating,
        status: formData.status as "Published" | "Draft",
        views: formData.views,
        description: formData.description || null,
        thumbnail_url: formData.thumbnail_url || null,
        video_url: formData.video_url || null,
        trailer_url: formData.trailer_url || null,
        release_year: formData.release_year ? parseInt(formData.release_year) : null
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add content",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Content added successfully!"
    });

    // Reset form
    setFormData({
      title: "",
      type: "",
      genre: "",
      duration: "",
      rating: "",
      status: "Published",
      views: "0",
      description: "",
      thumbnail_url: "",
      video_url: "",
      trailer_url: "",
      release_year: ""
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
          <Upload className="h-5 w-5 text-primary" />
          Add New Content
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Add new movies and TV shows to your content library
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
                  <SelectItem value="Movie">Movie</SelectItem>
                  <SelectItem value="TV Show">TV Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Label htmlFor="duration" className="text-foreground">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="e.g., 120 min or 8 episodes"
                className="bg-input border-border text-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating" className="text-foreground">Rating</Label>
              <Input
                id="rating"
                value={formData.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
                placeholder="e.g., 8.5"
                className="bg-input border-border text-foreground"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-foreground">Status</Label>
              <Select 
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="views" className="text-foreground">Views</Label>
              <Input
                id="views"
                value={formData.views}
                onChange={(e) => handleInputChange("views", e.target.value)}
                placeholder="e.g., 1.2M"
                className="bg-input border-border text-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="release_year" className="text-foreground">Release Year</Label>
              <Input
                id="release_year"
                type="number"
                value={formData.release_year}
                onChange={(e) => handleInputChange("release_year", e.target.value)}
                placeholder="e.g., 2024"
                className="bg-input border-border text-foreground"
                min="1900"
                max="2030"
              />
            </div>
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
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="thumbnail_url" className="text-foreground">Thumbnail URL</Label>
              <Input
                id="thumbnail_url"
                type="url"
                value={formData.thumbnail_url}
                onChange={(e) => handleInputChange("thumbnail_url", e.target.value)}
                placeholder="https://example.com/thumbnail.jpg"
                className="bg-input border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="video_url" className="text-foreground">Video URL</Label>
              <Input
                id="video_url"
                type="url"
                value={formData.video_url}
                onChange={(e) => handleInputChange("video_url", e.target.value)}
                placeholder="https://example.com/video.mp4"
                className="bg-input border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trailer_url" className="text-foreground">Trailer URL</Label>
              <Input
                id="trailer_url"
                type="url"
                value={formData.trailer_url}
                onChange={(e) => handleInputChange("trailer_url", e.target.value)}
                placeholder="https://example.com/trailer.mp4"
                className="bg-input border-border text-foreground"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Content
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContentUploadForm;
