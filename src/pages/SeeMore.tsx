
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
}

const SeeMore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { title, movies } = location.state || { title: "", movies: [] };

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
            <h1 className="text-4xl font-bold text-foreground">{title}</h1>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie: Movie) => (
              <SimpleMovieCard
                key={movie.id}
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
