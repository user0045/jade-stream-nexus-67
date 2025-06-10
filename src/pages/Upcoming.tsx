
import { useState, useEffect } from "react";
import PremiumNavbar from "@/components/PremiumNavbar";
import UpcomingCard from "@/components/UpcomingCard";

interface UpcomingContent {
  id: number;
  title: string;
  genre: string;
  releaseDate: string;
  description: string;
  type: "movie" | "tv";
  thumbnailUrl: string;
  trailerUrl: string;
  sectionOrder: number;
}

const Upcoming = () => {
  const [upcomingContent, setUpcomingContent] = useState<UpcomingContent[]>([]);

  useEffect(() => {
    // Load content from localStorage and filter out expired content
    const storedContent = JSON.parse(localStorage.getItem("upcomingContent") || "[]");
    const today = new Date();
    
    // Filter out content that has passed its release date
    const validContent = storedContent.filter((content: UpcomingContent) => {
      const releaseDate = new Date(content.releaseDate);
      return releaseDate >= today;
    });
    
    // Update localStorage if any content was removed
    if (validContent.length !== storedContent.length) {
      localStorage.setItem("upcomingContent", JSON.stringify(validContent));
    }
    
    // Sort by section order and limit to 20 items
    const sortedContent = validContent
      .sort((a: UpcomingContent, b: UpcomingContent) => a.sectionOrder - b.sectionOrder)
      .slice(0, 20);
    
    setUpcomingContent(sortedContent);
  }, []);

  // Fallback content if no stored content exists
  const fallbackContent: UpcomingContent[] = [
    {
      id: 1,
      title: "Avatar: The Way of Water Extended",
      genre: "Sci-Fi • Adventure",
      releaseDate: "2024-07-15",
      description: "Return to Pandora with Jake Sully and his family in this extended director's cut featuring never-before-seen footage.",
      type: "movie",
      thumbnailUrl: "",
      trailerUrl: "",
      sectionOrder: 1
    },
    {
      id: 2,
      title: "House of the Dragon Season 3",
      genre: "Fantasy • Drama",
      releaseDate: "2024-08-20",
      description: "The Targaryen civil war intensifies as new alliances form and dragons clash in the skies above Westeros.",
      type: "tv",
      thumbnailUrl: "",
      trailerUrl: "",
      sectionOrder: 2
    },
    {
      id: 3,
      title: "Dune: Part Three",
      genre: "Sci-Fi • Adventure",
      releaseDate: "2024-11-08",
      description: "Paul Atreides continues his legendary journey as he unites the desert tribes against the Empire.",
      type: "movie",
      thumbnailUrl: "",
      trailerUrl: "",
      sectionOrder: 3
    },
    {
      id: 4,
      title: "The Witcher Season 4",
      genre: "Fantasy • Adventure",
      releaseDate: "2024-09-12",
      description: "Geralt faces new monsters and ancient prophecies in the latest season of the hit fantasy series.",
      type: "tv",
      thumbnailUrl: "",
      trailerUrl: "",
      sectionOrder: 4
    },
    {
      id: 5,
      title: "Spider-Man: Beyond the Spider-Verse",
      genre: "Animation • Action",
      releaseDate: "2024-12-14",
      description: "Miles Morales embarks on his most dangerous adventure yet across the multiverse.",
      type: "movie",
      thumbnailUrl: "",
      trailerUrl: "",
      sectionOrder: 5
    },
    {
      id: 6,
      title: "Stranger Things Season 5",
      genre: "Sci-Fi • Horror",
      releaseDate: "2024-10-31",
      description: "The final season brings the Upside Down saga to its epic conclusion.",
      type: "tv",
      thumbnailUrl: "",
      trailerUrl: "",
      sectionOrder: 6
    }
  ];

  const displayContent = upcomingContent.length > 0 ? upcomingContent : fallbackContent.slice(0, 20);

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-thin uppercase tracking-wider text-foreground mb-12 font-mono">Coming Soon</h1>
          
          <div className="space-y-6">
            {displayContent.map((content) => (
              <UpcomingCard
                key={content.id}
                title={content.title}
                genre={content.genre}
                releaseDate={content.releaseDate}
                description={content.description}
                type={content.type}
                thumbnailUrl={content.thumbnailUrl}
                trailerUrl={content.trailerUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
