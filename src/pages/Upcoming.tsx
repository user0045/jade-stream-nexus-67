
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PremiumNavbar from "@/components/PremiumNavbar";
import UpcomingCard from "@/components/UpcomingCard";

interface UpcomingContent {
  id: string;
  title: string;
  genre: string;
  release_date: string;
  description: string;
  type: "movie" | "tv";
  thumbnail_url: string | null;
  trailer_url: string | null;
  section_order: number;
}

const Upcoming = () => {
  const { data: upcomingContent = [] } = useQuery({
    queryKey: ['upcoming-content-display'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('upcoming_content')
        .select('*')
        .gte('release_date', new Date().toISOString().split('T')[0])
        .order('section_order', { ascending: true })
        .limit(20);
      
      if (error) {
        console.error('Error fetching upcoming content:', error);
        return [];
      }
      
      return data as UpcomingContent[];
    }
  });

  // Fallback content if no database content exists
  const fallbackContent: UpcomingContent[] = [
    {
      id: "1",
      title: "Avatar: The Way of Water Extended",
      genre: "Sci-Fi • Adventure",
      release_date: "2024-07-15",
      description: "Return to Pandora with Jake Sully and his family in this extended director's cut featuring never-before-seen footage.",
      type: "movie",
      thumbnail_url: "",
      trailer_url: "",
      section_order: 1
    },
    {
      id: "2",
      title: "House of the Dragon Season 3",
      genre: "Fantasy • Drama",
      release_date: "2024-08-20",
      description: "The Targaryen civil war intensifies as new alliances form and dragons clash in the skies above Westeros.",
      type: "tv",
      thumbnail_url: "",
      trailer_url: "",
      section_order: 2
    },
    {
      id: "3",
      title: "Dune: Part Three",
      genre: "Sci-Fi • Adventure",
      release_date: "2024-11-08",
      description: "Paul Atreides continues his legendary journey as he unites the desert tribes against the Empire.",
      type: "movie",
      thumbnail_url: "",
      trailer_url: "",
      section_order: 3
    },
    {
      id: "4",
      title: "The Witcher Season 4",
      genre: "Fantasy • Adventure",
      release_date: "2024-09-12",
      description: "Geralt faces new monsters and ancient prophecies in the latest season of the hit fantasy series.",
      type: "tv",
      thumbnail_url: "",
      trailer_url: "",
      section_order: 4
    },
    {
      id: "5",
      title: "Spider-Man: Beyond the Spider-Verse",
      genre: "Animation • Action",
      release_date: "2024-12-14",
      description: "Miles Morales embarks on his most dangerous adventure yet across the multiverse.",
      type: "movie",
      thumbnail_url: "",
      trailer_url: "",
      section_order: 5
    },
    {
      id: "6",
      title: "Stranger Things Season 5",
      genre: "Sci-Fi • Horror",
      release_date: "2024-10-31",
      description: "The final season brings the Upside Down saga to its epic conclusion.",
      type: "tv",
      thumbnail_url: "",
      trailer_url: "",
      section_order: 6
    }
  ];

  const displayContent = upcomingContent.length > 0 ? upcomingContent : fallbackContent.slice(0, 20);

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-2xl font-thin uppercase tracking-[0.3em] text-foreground mb-12 font-mono">Coming Soon</h1>
          
          <div className="space-y-6">
            {displayContent.map((content) => (
              <UpcomingCard
                key={content.id}
                title={content.title}
                genre={content.genre}
                releaseDate={content.release_date}
                description={content.description}
                type={content.type}
                thumbnailUrl={content.thumbnail_url || ""}
                trailerUrl={content.trailer_url || ""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
