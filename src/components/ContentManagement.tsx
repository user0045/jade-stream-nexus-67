
import { useState, useEffect } from "react";
import { 
  Edit3, 
  Trash2, 
  Plus, 
  Search, 
  Filter,
  PlayCircle,
  Calendar,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

const ContentManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [allContent, setAllContent] = useState<Content[]>([]);

  useEffect(() => {
    // Load content from localStorage or use default data
    const storedContent = localStorage.getItem("contentLibrary");
    if (storedContent) {
      setAllContent(JSON.parse(storedContent));
    } else {
      // Generate 21 items of sample content
      const defaultContent: Content[] = [
        { id: 1, title: "The Dark Knight", type: "Movie", genre: "Action", duration: "152 min", rating: "9.0", status: "Published", views: "2.3M", uploadDate: "2024-01-15" },
        { id: 2, title: "Stranger Things", type: "TV Show", genre: "Sci-Fi", duration: "8 episodes", rating: "8.7", status: "Published", views: "4.1M", uploadDate: "2024-01-10" },
        { id: 3, title: "Avatar", type: "Movie", genre: "Adventure", duration: "162 min", rating: "7.8", status: "Draft", views: "0", uploadDate: "2024-01-20" },
        { id: 4, title: "Breaking Bad", type: "TV Show", genre: "Drama", duration: "62 episodes", rating: "9.5", status: "Published", views: "5.7M", uploadDate: "2024-01-05" },
        { id: 5, title: "Inception", type: "Movie", genre: "Sci-Fi", duration: "148 min", rating: "8.8", status: "Published", views: "3.2M", uploadDate: "2024-02-01" },
        { id: 6, title: "The Office", type: "TV Show", genre: "Comedy", duration: "201 episodes", rating: "9.0", status: "Published", views: "6.1M", uploadDate: "2024-02-05" },
        { id: 7, title: "Interstellar", type: "Movie", genre: "Sci-Fi", duration: "169 min", rating: "8.6", status: "Published", views: "2.8M", uploadDate: "2024-02-10" },
        { id: 8, title: "Game of Thrones", type: "TV Show", genre: "Fantasy", duration: "73 episodes", rating: "9.3", status: "Published", views: "7.2M", uploadDate: "2024-02-15" },
        { id: 9, title: "Pulp Fiction", type: "Movie", genre: "Crime", duration: "154 min", rating: "8.9", status: "Published", views: "1.9M", uploadDate: "2024-02-20" },
        { id: 10, title: "Friends", type: "TV Show", genre: "Comedy", duration: "236 episodes", rating: "8.9", status: "Published", views: "5.4M", uploadDate: "2024-02-25" },
        { id: 11, title: "The Matrix", type: "Movie", genre: "Sci-Fi", duration: "136 min", rating: "8.7", status: "Published", views: "2.1M", uploadDate: "2024-03-01" },
        { id: 12, title: "The Mandalorian", type: "TV Show", genre: "Sci-Fi", duration: "24 episodes", rating: "8.8", status: "Published", views: "4.7M", uploadDate: "2024-03-05" },
        { id: 13, title: "Forrest Gump", type: "Movie", genre: "Drama", duration: "142 min", rating: "8.8", status: "Published", views: "2.5M", uploadDate: "2024-03-10" },
        { id: 14, title: "The Crown", type: "TV Show", genre: "Drama", duration: "60 episodes", rating: "8.7", status: "Published", views: "3.8M", uploadDate: "2024-03-15" },
        { id: 15, title: "Fight Club", type: "Movie", genre: "Drama", duration: "139 min", rating: "8.8", status: "Published", views: "1.7M", uploadDate: "2024-03-20" },
        { id: 16, title: "Sherlock", type: "TV Show", genre: "Crime", duration: "15 episodes", rating: "9.1", status: "Published", views: "4.3M", uploadDate: "2024-03-25" },
        { id: 17, title: "The Godfather", type: "Movie", genre: "Crime", duration: "175 min", rating: "9.2", status: "Published", views: "2.0M", uploadDate: "2024-04-01" },
        { id: 18, title: "Westworld", type: "TV Show", genre: "Sci-Fi", duration: "36 episodes", rating: "8.6", status: "Published", views: "3.1M", uploadDate: "2024-04-05" },
        { id: 19, title: "Goodfellas", type: "Movie", genre: "Crime", duration: "146 min", rating: "8.7", status: "Draft", views: "0", uploadDate: "2024-04-10" },
        { id: 20, title: "The Witcher", type: "TV Show", genre: "Fantasy", duration: "24 episodes", rating: "8.2", status: "Published", views: "3.9M", uploadDate: "2024-04-15" },
        { id: 21, title: "Parasite", type: "Movie", genre: "Thriller", duration: "132 min", rating: "8.5", status: "Published", views: "1.4M", uploadDate: "2024-04-20" }
      ];
      setAllContent(defaultContent);
      localStorage.setItem("contentLibrary", JSON.stringify(defaultContent));
    }
  }, []);

  const filteredContent = allContent.filter(content =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: number) => {
    const content = allContent.find(c => c.id === id);
    toast({
      title: "Edit Content",
      description: `Editing "${content?.title}". Edit functionality would open a form here.`
    });
  };

  const handleDelete = (id: number) => {
    const content = allContent.find(c => c.id === id);
    const updatedContent = allContent.filter(c => c.id !== id);
    setAllContent(updatedContent);
    localStorage.setItem("contentLibrary", JSON.stringify(updatedContent));
    
    toast({
      title: "Content Deleted",
      description: `"${content?.title}" has been removed from the library.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add Content
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{allContent.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Movies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {allContent.filter(c => c.type === "Movie").length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">TV Shows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {allContent.filter(c => c.type === "TV Show").length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {allContent.filter(c => c.status === "Published").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Table */}
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="text-foreground">Content Library</CardTitle>
          <CardDescription>Manage your movies and TV shows ({filteredContent.length} of {allContent.length} items)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">Title</TableHead>
                <TableHead className="text-foreground">Type</TableHead>
                <TableHead className="text-foreground">Genre</TableHead>
                <TableHead className="text-foreground">Duration</TableHead>
                <TableHead className="text-foreground">Rating</TableHead>
                <TableHead className="text-foreground">Views</TableHead>
                <TableHead className="text-foreground">Status</TableHead>
                <TableHead className="text-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.map((content) => (
                <TableRow key={content.id}>
                  <TableCell className="font-medium text-foreground">{content.title}</TableCell>
                  <TableCell className="text-foreground">
                    <div className="flex items-center gap-2">
                      <PlayCircle className="h-4 w-4 text-primary" />
                      {content.type}
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{content.genre}</TableCell>
                  <TableCell className="text-foreground">{content.duration}</TableCell>
                  <TableCell className="text-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      {content.rating}
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{content.views}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      content.status === 'Published' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {content.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEdit(content.id)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(content.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
