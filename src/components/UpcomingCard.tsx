
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
  status = "Coming Soon"
}: UpcomingCardProps) => {
  const navigate = useNavigate();
  const [showInfoCard, setShowInfoCard] = useState(false);

  const handlePreview = () => {
    navigate('/player', { 
      state: { 
        title, 
        description: description || `Get ready for ${title}. This upcoming ${genre.toLowerCase()} promises to deliver exceptional entertainment.`,
        duration: "2h 30m"
      } 
    });
  };

  const handleMoreInfo = () => {
    setShowInfoCard(true);
  };

  return (
    <>
      <div className="group relative bg-card rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
        {/* Image placeholder */}
        <div className="aspect-[2/3] bg-gradient-to-br from-primary/20 via-accent to-secondary relative overflow-hidden">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/40" />
          )}
          
          {/* Status badge */}
          <Badge 
            variant="secondary" 
            className="absolute top-3 right-3 bg-primary/90 text-primary-foreground"
          >
            {status}
          </Badge>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center p-4">
            <div className="flex gap-2 mb-4">
              <Button 
                size="sm" 
                onClick={handlePreview}
                className="bg-primary hover:bg-primary/90"
              >
                <Play className="mr-1 h-3 w-3" />
                Preview
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleMoreInfo}
                className="hover:bg-accent"
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description || `Get ready for ${title}. This upcoming ${genre.toLowerCase()} promises exceptional entertainment.`}
          </p>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Badge variant="outline" className="text-xs">{rating}</Badge>
            <span>{genre}</span>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-primary">
            <Calendar className="h-3 w-3" />
            <span>{releaseDate}</span>
          </div>
        </div>
      </div>

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
          duration: "2h 30m"
        }}
      />
    </>
  );
};

export default UpcomingCard;
