
import { X, Play, Calendar, Star, User, Clapperboard, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ContentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    title: string;
    genre: string;
    rating: string;
    year: string;
    description?: string;
    duration?: string;
    thumbnailUrl?: string;
    director?: string;
    writer?: string;
    cast?: string[];
    videoUrl?: string;
  };
}

const ContentDetailModal = ({ isOpen, onClose, content }: ContentDetailModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const randomRating = (8.1 + Math.random() * 1.8).toFixed(1);
  const randomDescription = content.description || `Experience the thrilling journey of ${content.title}. This ${content.genre.toLowerCase()} masterpiece delivers exceptional storytelling and unforgettable moments that will keep you on the edge of your seat.`;
  const randomDirector = content.director || "Christopher Nolan";
  const randomWriter = content.writer || "Jonathan Nolan";
  const randomCast = content.cast || ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"];

  const handlePlay = () => {
    if (content.videoUrl) {
      navigate('/player', { state: { videoUrl: content.videoUrl, title: content.title } });
    } else {
      navigate('/player');
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-background/98 backdrop-blur-md rounded-xl border border-primary/20 overflow-hidden animate-scale-in shadow-2xl">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 hover:bg-background/80 rounded-full bg-background/60 backdrop-blur-sm"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Scrollable content */}
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            {/* Header with thumbnail and basic info */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Thumbnail - smaller size */}
              <div className="w-full md:w-64 h-48 bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/40 flex items-center justify-center relative overflow-hidden rounded-lg flex-shrink-0">
                {content.thumbnailUrl ? (
                  <img 
                    src={content.thumbnailUrl} 
                    alt={content.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-center justify-center ${content.thumbnailUrl ? 'hidden' : ''}`}>
                  <div className="text-primary">
                    <Play className="h-16 w-16" />
                  </div>
                </div>
              </div>

              {/* Basic info */}
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">{content.title}</h2>
                
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <Badge variant="secondary" className="bg-accent/80 text-foreground">
                    {content.rating}
                  </Badge>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {content.year}
                  </span>
                  {content.duration && (
                    <span className="text-muted-foreground">{content.duration}</span>
                  )}
                  <span className="text-primary font-semibold flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current" />
                    {randomRating}
                  </span>
                </div>

                <p className="text-primary/80 text-lg mb-6 font-medium">{content.genre}</p>

                {/* Action buttons */}
                <div className="flex gap-4">
                  <Button 
                    size="lg"
                    onClick={handlePlay}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Play Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-foreground/30 hover:border-primary hover:bg-primary/10 px-8 py-3 rounded-lg transition-all duration-300"
                  >
                    Add to List
                  </Button>
                </div>
              </div>
            </div>

            {/* Detailed information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Overview</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {randomDescription}
                </p>
              </div>

              {/* Director */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clapperboard className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">Director</h4>
                </div>
                <p className="text-muted-foreground ml-6">{randomDirector}</p>
              </div>

              {/* Writer */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">Writer</h4>
                </div>
                <p className="text-muted-foreground ml-6">{randomWriter}</p>
              </div>

              {/* Cast */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">Cast</h4>
                </div>
                <div className="ml-6 flex flex-wrap gap-2">
                  {randomCast.map((actor, index) => (
                    <Badge key={index} variant="outline" className="bg-secondary/50">
                      {actor}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetailModal;
