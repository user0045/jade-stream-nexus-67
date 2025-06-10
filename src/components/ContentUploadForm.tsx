
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Save, Image, Link } from "lucide-react";
import { toast } from "sonner";

const ContentUploadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    year: "",
    rating: "",
    duration: "",
    director: "",
    cast: "",
    thumbnailUrl: "",
    videoUrl: "",
    type: "movie"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.videoUrl || !formData.thumbnailUrl) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Content data:", formData);
    toast.success("Content uploaded successfully!");
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      genre: "",
      year: "",
      rating: "",
      duration: "",
      director: "",
      cast: "",
      thumbnailUrl: "",
      videoUrl: "",
      type: "movie"
    });
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload New Content
        </CardTitle>
        <CardDescription>Add movies and TV shows to your platform</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Type */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Content Type *</Label>
            <select 
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="movie">Movie</option>
              <option value="tv-show">TV Show</option>
            </select>
          </div>

          {/* Title and Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Content title"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Year</Label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                placeholder="2024"
              />
            </div>
          </div>

          {/* Genre and Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Genre</Label>
              <select 
                value={formData.genre}
                onChange={(e) => handleInputChange("genre", e.target.value)}
                className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Genre</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Documentary">Documentary</option>
              </select>
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Rating</Label>
              <select 
                value={formData.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
                className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Rating</option>
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
                <option value="TV-14">TV-14</option>
                <option value="TV-MA">TV-MA</option>
              </select>
            </div>
          </div>

          {/* Duration and Director */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Duration</Label>
              <Input
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="120 min or 8 episodes"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Director</Label>
              <Input
                value={formData.director}
                onChange={(e) => handleInputChange("director", e.target.value)}
                placeholder="Director name"
              />
            </div>
          </div>

          {/* Cast */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Cast</Label>
            <Input
              value={formData.cast}
              onChange={(e) => handleInputChange("cast", e.target.value)}
              placeholder="Actor 1, Actor 2, Actor 3..."
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
              <Image className="h-4 w-4" />
              Thumbnail URL *
            </Label>
            <Input
              type="url"
              value={formData.thumbnailUrl}
              onChange={(e) => handleInputChange("thumbnailUrl", e.target.value)}
              placeholder="https://example.com/thumbnail.jpg"
              required
            />
          </div>

          {/* Video URL */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
              <Link className="h-4 w-4" />
              Video URL *
            </Label>
            <Input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => handleInputChange("videoUrl", e.target.value)}
              placeholder="https://example.com/video.mp4"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Content description..."
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full gap-2">
            <Save className="h-4 w-4" />
            Save Content
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContentUploadForm;
