
import { useState } from "react";
import { 
  Upload, 
  Edit3, 
  Trash2, 
  Eye, 
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

const ContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const contentData = [
    {
      id: 1,
      title: "The Dark Knight",
      type: "Movie",
      genre: "Action",
      duration: "152 min",
      rating: "9.0",
      status: "Published",
      views: "2.3M",
      uploadDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Stranger Things",
      type: "TV Show",
      genre: "Sci-Fi",
      duration: "8 episodes",
      rating: "8.7",
      status: "Published",
      views: "4.1M",
      uploadDate: "2024-01-10"
    },
    {
      id: 3,
      title: "Avatar",
      type: "Movie",
      genre: "Adventure",
      duration: "162 min",
      rating: "7.8",
      status: "Draft",
      views: "0",
      uploadDate: "2024-01-20"
    },
    {
      id: 4,
      title: "Breaking Bad",
      type: "TV Show",
      genre: "Drama",
      duration: "62 episodes",
      rating: "9.5",
      status: "Published",
      views: "5.7M",
      uploadDate: "2024-01-05"
    }
  ];

  const filteredContent = contentData.filter(content =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <div className="text-2xl font-bold text-foreground">1,234</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Movies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">856</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">TV Shows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">378</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12.1M</div>
          </CardContent>
        </Card>
      </div>

      {/* Content Table */}
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
        <CardHeader>
          <CardTitle className="text-foreground">Content Library</CardTitle>
          <CardDescription>Manage your movies and TV shows</CardDescription>
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
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
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
