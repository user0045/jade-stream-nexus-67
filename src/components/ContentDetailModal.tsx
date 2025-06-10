
import { X, Play, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  };
}

const ContentDetailModal = ({ isOpen, onClose, content }: ContentDetailModalProps) => {
  if (!isOpen) return null;

  const randomRating = (8.1 + Math.random() * 1.8).toFixed(1);
  const randomDescription = content.description || `Experience the thrilling journey of ${content.title}. This ${content.genre.toLowerCase()} masterpiece delivers exceptional storytelling and unforgettable moments that will keep you on the edge of your seat.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl mx-4 bg-background/95 backdrop-blur-md rounded-xl border border-primary/20 overflow-hidden animate-scale-in">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 hover:bg-background/50 rounded-full"
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="flex flex-col lg:flex-row">
          {/* Left side - Thumbnail (1/3) */}
          <div className="lg:w-1/3 h-64 lg:h-96 bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/40 flex items-center justify-center relative overflow-hidden">
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

          {/* Right side - Details (2/3) */}
          <div className="lg:w-2/3 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">{content.title}</h2>
              
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

              <p className="text-primary/80 text-lg mb-4 font-medium">{content.genre}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Overview</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {randomDescription}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                size="lg"
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
      </div>
    </div>
  );
};

export default ContentDetailModal;
