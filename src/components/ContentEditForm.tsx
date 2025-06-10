
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Content {
  id: number;
  title: string;
  type: "Movie" | "TV Show";
  genre: string;
  duration: string;
  rating: string;
  status: "Published" | "Draft";
  views: string;
  uploadDate: string;
}

interface ContentEditFormProps {
  contentId: number;
  onCancel: () => void;
  onSave: () => void;
}

const ContentEditForm = ({ contentId, onCancel, onSave }: ContentEditFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Content | null>(null);

  useEffect(() => {
    const storedContent = JSON.parse(localStorage.getItem("contentLibrary") || "[]");
    const content = storedContent.find((item: Content) => item.id === contentId);
    if (content) {
      setFormData(content);
    }
  }, [contentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const storedContent = JSON.parse(localStorage.getItem("contentLibrary") || "[]");
    const updatedContent = storedContent.map((item: Content) =>
      item.id === contentId ? formData : item
    );

    localStorage.setItem("contentLibrary", JSON.stringify(updatedContent));
    
    toast({
      title: "Success",
      description: "Content updated successfully!"
    });
    
    onSave();
  };

  const handleInputChange = (field: keyof Content, value: string) => {
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
        <CardTitle className="text-foreground">Edit Content</CardTitle>
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
                onValueChange={(value: "Movie" | "TV Show") => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Movie">Movie</SelectItem>
                  <SelectItem value="TV Show">TV Show</SelectItem>
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
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                value={formData.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "Published" | "Draft") => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="views">Views</Label>
            <Input
              id="views"
              value={formData.views}
              onChange={(e) => handleInputChange("views", e.target.value)}
              required
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

export default ContentEditForm;
