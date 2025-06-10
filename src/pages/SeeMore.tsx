
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PremiumNavbar from "@/components/PremiumNavbar";
import SimpleMovieCard from "@/components/SimpleMovieCard";

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: string;
  year: string;
  type?: "movie" | "tv";
}

const SeeMore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { title, movies, contentType } = location.state || { title: "", movies: [], contentType: "all" };

  // Filter movies based on content type
  const filteredMovies = contentType === "all" 
    ? movies 
    : movies.filter((movie: Movie) => {
        // If movie doesn't have type property, determine by ID ranges or other logic
        if (!movie.type) {
          // Movies have IDs 1-6, 13-18, 24-45
          // TV Shows have IDs 7-12, 19-23, 36-54
          const isMovie = (movie.id >= 1 && movie.id <= 6) || 
                          (movie.id >= 13 && movie.id <= 18) || 
                          (movie.id >= 24 && movie.id <= 35) ||
                          (movie.id >= 36 && movie.id <= 45);
          return contentType === "movie" ? isMovie : !isMovie;
        }
        return movie.type === contentType;
      });

  const handleMovieAction = (movieId: number, action: string) => {
    console.log(`${action} movie with ID: ${movieId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-primary/20"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-4xl font-bold text-foreground">
              {title} {contentType === "movie" ? "- Movies" : contentType === "tv" ? "- TV Shows" : ""}
            </h1>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie: Movie) => (
              <SimpleMovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                genre={movie.genre}
                rating={movie.rating}
                year={movie.year}
                onPlay={() => handleMovieAction(movie.id, "Play")}
                onMoreInfo={() => handleMovieAction(movie.id, "More info")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeMore;
