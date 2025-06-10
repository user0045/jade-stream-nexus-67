
import { useState } from "react";
import { Play, Plus, ThumbsUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EnhancedMovieCardProps {
  title: string;
  genre: string;
  rating: string;
  year: string;
  image?: string;
  onPlay?: () => void;
  onAddToList?: () => void;
  onLike?: () => void;
  onMoreInfo?: () => void;
}

const EnhancedMovieCard = ({ 
  title, 
  genre, 
  rating, 
  year, 
  onPlay, 
  onAddToList, 
  onLike, 
  onMoreInfo 
}: EnhancedMovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isInList, setIsInList] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  const handleAddToList = () => {
    setIsInList(!isInList);
    onAddToList?.();
  };

  return (
    <div 
      className="group relative min-w-[320px] h-[180px] bg-card rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-110 hover:z-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background with premium gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30"></div>
      
      {/* Premium overlay pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      
      {/* Hover overlay with enhanced animations */}
      <div className={`absolute inset-0 bg-background/95 backdrop-blur-md transition-all duration-500 ${
        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } flex flex-col justify-between p-6 border border-primary/20`}>
        
        {/* Top section */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{genre}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30">{rating}</span>
            <span className="text-foreground/80">{year}</span>
            <div className="text-primary font-semibold flex items-center gap-1">
              ★ {(7.5 + Math.random() * 2).toFixed(1)}
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="space-y-3">
          <Button 
            onClick={onPlay}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            <Play className="mr-2 h-4 w-4" />
            Play Now
          </Button>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddToList}
              className={`flex-1 transition-all duration-300 ${
                isInList 
                  ? 'bg-primary/20 border-primary text-primary' 
                  : 'hover:bg-accent border-border'
              }`}
            >
              <Plus className="mr-1 h-4 w-4" />
              {isInList ? 'Added' : 'My List'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLike}
              className={`transition-all duration-300 ${
                isLiked 
                  ? 'bg-primary/20 border-primary text-primary' 
                  : 'hover:bg-accent border-border'
              }`}
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onMoreInfo}
              className="hover:bg-accent border-border transition-all duration-300"
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Default content visible when not hovering */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 via-background/60 to-transparent transition-all duration-500 ${
        isHovered ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{year}</p>
      </div>
      
      {/* Premium glow effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 rounded-xl shadow-2xl shadow-primary/20 pointer-events-none"></div>
      )}
    </div>
  );
};

export default EnhancedMovieCard;
