
import { Play, Info, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InfoCard from "./InfoCard";

interface UpcomingCardProps {
  id?: number;
  title: string;
  description?: string;
  genre: string;
  rating: string;
  releaseDate: string;
  year?: string;
  image?: string;
  status?: string;
  type?: "movie" | "tv";
  thumbnailUrl?: string;
  trailerUrl?: string;
}

const UpcomingCard = ({ 
  id,
  title, 
  description,
  genre, 
  rating, 
  releaseDate,
  year,
  image,
  status = "Coming Soon",
  type,
  thumbnailUrl,
  trailerUrl
}: UpcomingCardProps) => {
  const navigate = useNavigate();
  const [showInfoCard, setShowInfoCard] = useState(false);

  const handlePlay = () => {
    navigate('/player', { 
      state: { 
        title, 
        description: description || `Get ready for ${title}. This upcoming ${genre.toLowerCase()} promises to deliver exceptional entertainment.`,
        duration: "2h 30m",
        videoUrl: trailerUrl
      } 
    });
  };

  const handleMoreInfo = () => {
    setShowInfoCard(true);
  };

  return (
    <>
      <div className="group relative min-w-[280px] h-[157px] bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/30 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:scale-110 hover:z-30 hover:shadow-2xl hover:shadow-primary/20">
        {/* Base content always visible */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/95 via-background/60 to-transparent">
          <h3 className="text-sm font-medium text-foreground truncate">{title}</h3>
          <p className="text-xs text-muted-foreground truncate">{genre}</p>
          <div className="flex items-center gap-1 text-xs text-primary mt-1">
            <Calendar className="h-3 w-3" />
            <span>{releaseDate}</span>
          </div>
        </div>
        
        {/* Status badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3 bg-primary/90 text-primary-foreground opacity-80 group-hover:opacity-100"
        >
          {status}
        </Badge>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 border border-primary/20">
          {/* Top section */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-1 line-clamp-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{genre}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <span className="bg-accent/80 px-2 py-1 rounded text-xs">{rating}</span>
              <span>{year || new Date(releaseDate).getFullYear()}</span>
              <span className="text-primary font-semibold">★ {(8.1 + Math.random() * 1.8).toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-primary mb-3">
              <Calendar className="h-3 w-3" />
              <span>{releaseDate}</span>
            </div>
          </div>
          
          {/* Bottom section with controls */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Button 
                size="sm" 
                onClick={handlePlay}
                className="bg-primary hover:bg-primary/90 px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200 hover:scale-105"
              >
                <Play className="mr-1 h-3 w-3" />
                Preview
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleMoreInfo}
                className="hover:bg-accent p-1.5 rounded-md transition-all duration-200 hover:scale-110"
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Premium glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-shimmer"></div>
        </div>
      </div>

      {showInfoCard && (
        <InfoCard
          isOpen={showInfoCard}
          onClose={() => setShowInfoCard(false)}
          content={{
            id,
            title,
            genre,
            rating,
            year: year || new Date(releaseDate).getFullYear().toString(),
            description: description || `Get ready for ${title}. This upcoming ${genre.toLowerCase()} promises to deliver exceptional entertainment and unforgettable moments.`,
            duration: "2h 30m",
            videoUrl: trailerUrl
          }}
        />
      )}
    </>
  );
};

export default UpcomingCard;
