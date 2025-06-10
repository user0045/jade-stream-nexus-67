
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface UpcomingContent {
  id: number;
  title: string;
  genre: string;
  releaseDate: string;
  description: string;
  type: "movie" | "tv";
  thumbnailUrl: string;
  trailerUrl: string;
  sectionOrder: number;
}

interface UpcomingEditFormProps {
  contentId: number;
  onCancel: () => void;
  onSave: () => void;
}

const UpcomingEditForm = ({ contentId, onCancel, onSave }: UpcomingEditFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<UpcomingContent | null>(null);

  useEffect(() => {
    const storedContent = JSON.parse(localStorage.getItem("upcomingContent") || "[]");
    const content = storedContent.find((item: UpcomingContent) => item.id === contentId);
    if (content) {
      setFormData(content);
    }
  }, [contentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const storedContent = JSON.parse(localStorage.getItem("upcomingContent") || "[]");
    const updatedContent = storedContent.map((item: UpcomingContent) =>
      item.id === contentId ? formData : item
    );

    localStorage.setItem("upcomingContent", JSON.stringify(updatedContent));
    
    toast({
      title: "Success",
      description: "Upcoming content updated successfully!"
    });
    
    onSave();
  };

  const handleInputChange = (field: keyof UpcomingContent, value: string | number) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Edit Upcoming Content</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="movie">Movie</SelectItem>
                  <SelectItem value="tv">TV Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => handleInputChange("genre", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="releaseDate">Release Date</Label>
              <Input
                id="releaseDate"
                type="date"
                value={formData.releaseDate}
                onChange={(e) => handleInputChange("releaseDate", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sectionOrder">Section Order</Label>
              <Input
                id="sectionOrder"
                type="number"
                min="1"
                max="20"
                value={formData.sectionOrder}
                onChange={(e) => handleInputChange("sectionOrder", parseInt(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
              <Input
                id="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={(e) => handleInputChange("thumbnailUrl", e.target.value)}
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trailerUrl">Trailer URL</Label>
            <Input
              id="trailerUrl"
              value={formData.trailerUrl}
              onChange={(e) => handleInputChange("trailerUrl", e.target.value)}
              placeholder="https://example.com/trailer.mp4"
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpcomingEditForm;
