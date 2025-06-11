import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UpcomingContent {
  id: string;
  title: string;
  genre: string;
  release_date: string;
  description: string;
  type: "movie" | "tv";
  thumbnail_url: string | null;
  trailer_url: string | null;
  section_order: number;
}

interface UpcomingEditFormProps {
  contentId: string;
  onCancel: () => void;
  onSave: () => void;
}

const UpcomingEditForm = ({ contentId, onCancel, onSave }: UpcomingEditFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<UpcomingContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('upcoming_content')
        .select('*')
        .eq('id', contentId)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load upcoming content",
          variant: "destructive"
        });
        return;
      }

      // Cast the type field to ensure it matches our UpcomingContent interface
      const typedData = {
        ...data,
        type: data.type as "movie" | "tv"
      };

      setFormData(typedData);
      setIsLoading(false);
    };

    fetchContent();
  }, [contentId, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const { error } = await supabase
      .from('upcoming_content')
      .update({
        title: formData.title,
        type: formData.type,
        genre: formData.genre,
        release_date: formData.release_date,
        description: formData.description,
        thumbnail_url: formData.thumbnail_url,
        trailer_url: formData.trailer_url,
        section_order: formData.section_order,
        updated_at: new Date().toISOString()
      })
      .eq('id', contentId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update upcoming content",
        variant: "destructive"
      });
      return;
    }
    
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!formData) {
    return <div>Content not found</div>;
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
                onValueChange={(value: "movie" | "tv") => handleInputChange("type", value)}
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
              <Label htmlFor="release_date">Release Date</Label>
              <Input
                id="release_date"
                type="date"
                value={formData.release_date}
                onChange={(e) => handleInputChange("release_date", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="section_order">Section Order</Label>
              <Input
                id="section_order"
                type="number"
                min="1"
                max="20"
                value={formData.section_order}
                onChange={(e) => handleInputChange("section_order", parseInt(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
              <Input
                id="thumbnail_url"
                value={formData.thumbnail_url || ""}
                onChange={(e) => handleInputChange("thumbnail_url", e.target.value)}
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
            <Label htmlFor="trailer_url">Trailer URL</Label>
            <Input
              id="trailer_url"
              value={formData.trailer_url || ""}
              onChange={(e) => handleInputChange("trailer_url", e.target.value)}
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
