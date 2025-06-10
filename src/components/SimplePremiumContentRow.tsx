
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SimpleMovieCard from "./SimpleMovieCard";

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: string;
  year: string;
}

interface SimplePremiumContentRowProps {
  title: string;
  movies: Movie[];
  onMoviePlay?: (id: number) => void;
  onMovieMoreInfo?: (id: number) => void;
}

const SimplePremiumContentRow = ({ 
  title, 
  movies, 
  onMoviePlay, 
  onMovieMoreInfo 
}: SimplePremiumContentRowProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScroll = Math.max(0, (movies.length * 290) - 1200);

  const scroll = (direction: 'left' | 'right') => {
    const scrollAmount = 580;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(maxScroll, scrollPosition + scrollAmount);
    
    setScrollPosition(newPosition);
  };

  return (
    <div className="mb-12 px-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            disabled={scrollPosition === 0}
            className="hover:bg-primary/20 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            disabled={scrollPosition >= maxScroll}
            className="hover:bg-primary/20 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex gap-4 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {movies.map((movie) => (
            <SimpleMovieCard
              key={movie.id}
              title={movie.title}
              genre={movie.genre}
              rating={movie.rating}
              year={movie.year}
              onPlay={() => onMoviePlay?.(movie.id)}
              onMoreInfo={() => onMovieMoreInfo?.(movie.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimplePremiumContentRow;
