
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Save, Image, Link, Film, Tv, Tag, Plus, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

interface Episode {
  episodeNumber: number;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
}

interface Season {
  seasonNumber: number;
  title: string;
  description: string;
  episodes: Episode[];
  thumbnailUrl: string;
  trailerUrl: string;
}

const ContentUploadForm = () => {
  const [contentType, setContentType] = useState("movie");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    year: "",
    rating: "",
    duration: "",
    directors: [""],
    cast: "",
    thumbnailUrl: "",
    videoUrl: "",
    trailerUrl: "",
    tags: "",
    // Movie specific
    writer: "",
    boxOffice: "",
    // TV Show specific
    totalSeasons: "",
    totalEpisodes: "",
    status: "ongoing",
    network: "",
    // Feature control
    featuredSections: [] as string[]
  });

  const [seasons, setSeasons] = useState<Season[]>([]);

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDirectorChange = (index: number, value: string) => {
    const newDirectors = [...formData.directors];
    newDirectors[index] = value;
    handleInputChange("directors", newDirectors);
  };

  const addDirector = () => {
    handleInputChange("directors", [...formData.directors, ""]);
  };

  const removeDirector = (index: number) => {
    if (formData.directors.length > 1) {
      const newDirectors = formData.directors.filter((_, i) => i !== index);
      handleInputChange("directors", newDirectors);
    }
  };

  const handleSectionToggle = (section: string) => {
    const currentSections = formData.featuredSections;
    const updatedSections = currentSections.includes(section)
      ? currentSections.filter(s => s !== section)
      : [...currentSections, section];
    handleInputChange("featuredSections", updatedSections);
  };

  const addSeason = () => {
    const newSeason: Season = {
      seasonNumber: seasons.length + 1,
      title: `Season ${seasons.length + 1}`,
      description: "",
      episodes: [],
      thumbnailUrl: "",
      trailerUrl: ""
    };
    setSeasons([...seasons, newSeason]);
  };

  const updateSeason = (seasonIndex: number, field: keyof Season, value: string) => {
    const newSeasons = [...seasons];
    if (field === 'episodes') return; // Episodes handled separately
    (newSeasons[seasonIndex] as any)[field] = value;
    setSeasons(newSeasons);
  };

  const removeSeason = (seasonIndex: number) => {
    setSeasons(seasons.filter((_, i) => i !== seasonIndex));
  };

  const addEpisode = (seasonIndex: number) => {
    const newSeasons = [...seasons];
    const newEpisode: Episode = {
      episodeNumber: newSeasons[seasonIndex].episodes.length + 1,
      title: "",
      description: "",
      duration: "",
      videoUrl: ""
    };
    newSeasons[seasonIndex].episodes.push(newEpisode);
    setSeasons(newSeasons);
  };

  const updateEpisode = (seasonIndex: number, episodeIndex: number, field: keyof Episode, value: string | number) => {
    const newSeasons = [...seasons];
    (newSeasons[seasonIndex].episodes[episodeIndex] as any)[field] = value;
    setSeasons(newSeasons);
  };

  const removeEpisode = (seasonIndex: number, episodeIndex: number) => {
    const newSeasons = [...seasons];
    newSeasons[seasonIndex].episodes = newSeasons[seasonIndex].episodes.filter((_, i) => i !== episodeIndex);
    setSeasons(newSeasons);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      genre: "",
      year: "",
      rating: "",
      duration: "",
      directors: [""],
      cast: "",
      thumbnailUrl: "",
      videoUrl: "",
      trailerUrl: "",
      tags: "",
      writer: "",
      boxOffice: "",
      totalSeasons: "",
      totalEpisodes: "",
      status: "ongoing",
      network: "",
      featuredSections: []
    });
    setSeasons([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.thumbnailUrl) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (contentType === "movie" && !formData.videoUrl) {
      toast.error("Please provide a video URL for the movie");
      return;
    }

    if (contentType === "tv-show" && seasons.length === 0) {
      toast.error("Please add at least one season for the TV show");
      return;
    }

    const contentData = {
      ...formData,
      type: contentType,
      directors: formData.directors.filter(d => d.trim() !== ""),
      ...(contentType === "tv-show" && { seasons })
    };

    console.log("Content data:", contentData);
    toast.success(`${contentType === "movie" ? "Movie" : "TV Show"} uploaded successfully!`);
    resetForm();
  };

  const getAvailableSections = () => {
    const commonSections = ["home-hero", "trending-now"];
    
    if (contentType === "movie") {
      return [...commonSections, "popular-movies", "action-adventure", "award-winning-dramas", "sci-fi-masterpieces"];
    } else {
      return [...commonSections, "popular-tv-shows", "trending-shows", "crime-thriller", "comedy-series"];
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload New Content
        </CardTitle>
        <CardDescription>Add movies and TV shows to your platform with detailed information</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Content Type Selection */}
        <div className="mb-6">
          <Label className="text-sm font-medium text-foreground mb-3 block">Content Type *</Label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setContentType("movie")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                contentType === "movie" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card border border-primary/20 text-foreground hover:bg-accent"
              }`}
            >
              <Film className="h-4 w-4" />
              Movie
            </button>
            <button
              type="button"
              onClick={() => setContentType("tv-show")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                contentType === "tv-show" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card border border-primary/20 text-foreground hover:bg-accent"
              }`}
            >
              <Tv className="h-4 w-4" />
              TV Show
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder={`${contentType === "movie" ? "Movie" : "TV Show"} title`}
                  required
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Year *</Label>
                <Input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  placeholder="2024"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder={`Brief description of the ${contentType}`}
                rows={3}
                required
              />
            </div>
          </div>

          {/* Genre, Rating and Classification */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Classification</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Genre *</Label>
                <select 
                  value={formData.genre}
                  onChange={(e) => handleInputChange("genre", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
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
                  <option value="Fantasy">Fantasy</option>
                  <option value="Crime">Crime</option>
                  <option value="Biography">Biography</option>
                  <option value="Animation">Animation</option>
                </select>
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Content Rating *</Label>
                <select 
                  value={formData.rating}
                  onChange={(e) => handleInputChange("rating", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
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
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  IMDb Rating
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.rating}
                  onChange={(e) => handleInputChange("rating", e.target.value)}
                  placeholder="9.3"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </Label>
              <Input
                value={formData.tags}
                onChange={(e) => handleInputChange("tags", e.target.value)}
                placeholder="action, superhero, blockbuster (comma separated)"
              />
            </div>
          </div>

          {/* Cast and Crew */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Cast & Crew</h3>
            
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Directors *</Label>
              {formData.directors.map((director, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={director}
                    onChange={(e) => handleDirectorChange(index, e.target.value)}
                    placeholder="Director name"
                    required={index === 0}
                  />
                  {formData.directors.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeDirector(index)}
                      className="px-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addDirector}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Director
              </Button>
            </div>

            {contentType === "movie" && (
              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block">Writer(s)</Label>
                <Input
                  value={formData.writer}
                  onChange={(e) => handleInputChange("writer", e.target.value)}
                  placeholder="Writer names (comma separated)"
                />
              </div>
            )}

            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">Main Cast *</Label>
              <Textarea
                value={formData.cast}
                onChange={(e) => handleInputChange("cast", e.target.value)}
                placeholder="Actor 1, Actor 2, Actor 3... (comma separated)"
                rows={2}
                required
              />
            </div>
          </div>

          {/* Content Specific Fields */}
          {contentType === "movie" ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Movie Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">Duration *</Label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    placeholder="120 min"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">Box Office</Label>
                  <Input
                    value={formData.boxOffice}
                    onChange={(e) => handleInputChange("boxOffice", e.target.value)}
                    placeholder="$100M worldwide"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  Movie Video URL *
                </Label>
                <Input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                  placeholder="https://example.com/movie.mp4"
                  required
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">TV Show Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Status</Label>
                    <select 
                      value={formData.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Network/Platform</Label>
                    <Input
                      value={formData.network}
                      onChange={(e) => handleInputChange("network", e.target.value)}
                      placeholder="Netflix, HBO, BBC, etc."
                    />
                  </div>
                </div>
              </div>

              {/* Seasons Management */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-foreground">Seasons & Episodes</h3>
                  <Button
                    type="button"
                    onClick={addSeason}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Season
                  </Button>
                </div>

                {seasons.map((season, seasonIndex) => (
                  <Card key={seasonIndex} className="border border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">Season {season.seasonNumber}</CardTitle>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeSeason(seasonIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-foreground mb-2 block">Season Title</Label>
                          <Input
                            value={season.title}
                            onChange={(e) => updateSeason(seasonIndex, "title", e.target.value)}
                            placeholder={`Season ${season.seasonNumber}`}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-foreground mb-2 block">Season Description</Label>
                          <Input
                            value={season.description}
                            onChange={(e) => updateSeason(seasonIndex, "description", e.target.value)}
                            placeholder="Season description"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-foreground mb-2 block">Season Thumbnail URL</Label>
                          <Input
                            type="url"
                            value={season.thumbnailUrl}
                            onChange={(e) => updateSeason(seasonIndex, "thumbnailUrl", e.target.value)}
                            placeholder="https://example.com/season-thumbnail.jpg"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-foreground mb-2 block">Season Trailer URL</Label>
                          <Input
                            type="url"
                            value={season.trailerUrl}
                            onChange={(e) => updateSeason(seasonIndex, "trailerUrl", e.target.value)}
                            placeholder="https://example.com/season-trailer.mp4"
                          />
                        </div>
                      </div>

                      {/* Episodes */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-foreground">Episodes</h4>
                          <Button
                            type="button"
                            onClick={() => addEpisode(seasonIndex)}
                            variant="outline"
                            size="sm"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Episode
                          </Button>
                        </div>

                        {season.episodes.map((episode, episodeIndex) => (
                          <Card key={episodeIndex} className="border border-muted">
                            <CardContent className="pt-4">
                              <div className="flex justify-between items-start mb-3">
                                <h5 className="font-medium text-sm">Episode {episode.episodeNumber}</h5>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeEpisode(seasonIndex, episodeIndex)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs font-medium text-foreground mb-1 block">Episode Title</Label>
                                  <Input
                                    value={episode.title}
                                    onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "title", e.target.value)}
                                    placeholder="Episode title"
                                    className="h-8 text-sm"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs font-medium text-foreground mb-1 block">Duration</Label>
                                  <Input
                                    value={episode.duration}
                                    onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "duration", e.target.value)}
                                    placeholder="45 min"
                                    className="h-8 text-sm"
                                  />
                                </div>
                              </div>
                              
                              <div className="mt-3">
                                <Label className="text-xs font-medium text-foreground mb-1 block">Episode Description</Label>
                                <Input
                                  value={episode.description}
                                  onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "description", e.target.value)}
                                  placeholder="Episode description"
                                  className="h-8 text-sm"
                                />
                              </div>
                              
                              <div className="mt-3">
                                <Label className="text-xs font-medium text-foreground mb-1 block">Video URL *</Label>
                                <Input
                                  type="url"
                                  value={episode.videoUrl}
                                  onChange={(e) => updateEpisode(seasonIndex, episodeIndex, "videoUrl", e.target.value)}
                                  placeholder="https://example.com/episode.mp4"
                                  className="h-8 text-sm"
                                  required
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Media URLs for both types */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Media Links</h3>
            
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                <Image className="h-4 w-4" />
                {contentType === "movie" ? "Movie" : "Show"} Thumbnail URL *
              </Label>
              <Input
                type="url"
                value={formData.thumbnailUrl}
                onChange={(e) => handleInputChange("thumbnailUrl", e.target.value)}
                placeholder="https://example.com/thumbnail.jpg"
                required
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                <Film className="h-4 w-4" />
                {contentType === "movie" ? "Movie" : "Show"} Trailer URL
              </Label>
              <Input
                type="url"
                value={formData.trailerUrl}
                onChange={(e) => handleInputChange("trailerUrl", e.target.value)}
                placeholder="https://example.com/trailer.mp4"
              />
            </div>
          </div>

          {/* Featured Sections */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Featured Sections</h3>
            <p className="text-sm text-muted-foreground">Select where this content should appear on the platform</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getAvailableSections().map((section) => {
                const sectionLabels: Record<string, string> = {
                  "home-hero": "Home Page Hero",
                  "trending-now": "Trending Now",
                  "popular-movies": "Popular Movies",
                  "popular-tv-shows": "Popular TV Shows",
                  "action-adventure": "Action & Adventure",
                  "award-winning-dramas": "Award-Winning Dramas",
                  "sci-fi-masterpieces": "Sci-Fi Masterpieces",
                  "trending-shows": "Trending Shows",
                  "crime-thriller": "Crime & Thriller",
                  "comedy-series": "Comedy Series"
                };

                return (
                  <label key={section} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featuredSections.includes(section)}
                      onChange={() => handleSectionToggle(section)}
                      className="w-4 h-4 text-primary bg-background border-primary/20 rounded focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">{sectionLabels[section]}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <Button type="submit" className="w-full gap-2">
            <Save className="h-4 w-4" />
            Save {contentType === "movie" ? "Movie" : "TV Show"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContentUploadForm;
