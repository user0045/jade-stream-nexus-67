
import PremiumNavbar from "@/components/PremiumNavbar";
import UpcomingCard from "@/components/UpcomingCard";

interface UpcomingContent {
  id: number;
  title: string;
  genre: string;
  rating: string;
  releaseDate: string;
  description: string;
  type: "movie" | "tv";
}

const Upcoming = () => {
  const upcomingContent: UpcomingContent[] = [
    {
      id: 1,
      title: "Avatar: The Way of Water Extended",
      genre: "Sci-Fi • Adventure",
      rating: "PG-13",
      releaseDate: "2024-07-15",
      description: "Return to Pandora with Jake Sully and his family in this extended director's cut featuring never-before-seen footage.",
      type: "movie"
    },
    {
      id: 2,
      title: "House of the Dragon Season 3",
      genre: "Fantasy • Drama",
      rating: "TV-MA",
      releaseDate: "2024-08-20",
      description: "The Targaryen civil war intensifies as new alliances form and dragons clash in the skies above Westeros.",
      type: "tv"
    },
    {
      id: 3,
      title: "Dune: Part Three",
      genre: "Sci-Fi • Adventure",
      rating: "PG-13",
      releaseDate: "2024-11-08",
      description: "Paul Atreides continues his legendary journey as he unites the desert tribes against the Empire.",
      type: "movie"
    },
    {
      id: 4,
      title: "The Witcher Season 4",
      genre: "Fantasy • Adventure",
      rating: "TV-MA",
      releaseDate: "2024-09-12",
      description: "Geralt faces new monsters and ancient prophecies in the latest season of the hit fantasy series.",
      type: "tv"
    },
    {
      id: 5,
      title: "Spider-Man: Beyond the Spider-Verse",
      genre: "Animation • Action",
      rating: "PG",
      releaseDate: "2024-12-14",
      description: "Miles Morales embarks on his most dangerous adventure yet across the multiverse.",
      type: "movie"
    },
    {
      id: 6,
      title: "Stranger Things Season 5",
      genre: "Sci-Fi • Horror",
      rating: "TV-14",
      releaseDate: "2024-10-31",
      description: "The final season brings the Upside Down saga to its epic conclusion.",
      type: "tv"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-foreground mb-12">Coming Soon</h1>
          
          <div className="space-y-6">
            {upcomingContent.map((content) => (
              <UpcomingCard
                key={content.id}
                title={content.title}
                genre={content.genre}
                rating={content.rating}
                releaseDate={content.releaseDate}
                description={content.description}
                type={content.type}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
