
import PremiumNavbar from "@/components/PremiumNavbar";
import HeroSlider from "@/components/HeroSlider";
import SimplePremiumContentRow from "@/components/SimplePremiumContentRow";

const Index = () => {
  const trendingMovies = [
    { id: 1, title: "Oppenheimer", genre: "Biography • Drama", rating: "R", year: "2023" },
    { id: 2, title: "Barbie", genre: "Comedy • Adventure", rating: "PG-13", year: "2023" },
    { id: 3, title: "Spider-Man: Across the Spider-Verse", genre: "Animation • Action", rating: "PG", year: "2023" },
    { id: 4, title: "Guardians of the Galaxy Vol. 3", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 5, title: "Fast X", genre: "Action • Crime", rating: "PG-13", year: "2023" },
    { id: 6, title: "The Little Mermaid", genre: "Family • Musical", rating: "PG", year: "2023" },
  ];

  const popularShows = [
    { id: 7, title: "The Last of Us", genre: "Drama • Horror", rating: "TV-MA", year: "2023" },
    { id: 8, title: "Wednesday", genre: "Comedy • Horror", rating: "TV-14", year: "2022" },
    { id: 9, title: "House of the Dragon", genre: "Fantasy • Drama", rating: "TV-MA", year: "2022" },
    { id: 10, title: "Stranger Things", genre: "Sci-Fi • Horror", rating: "TV-14", year: "2022" },
    { id: 11, title: "The Bear", genre: "Comedy • Drama", rating: "TV-MA", year: "2022" },
    { id: 12, title: "Euphoria", genre: "Drama", rating: "TV-MA", year: "2022" },
  ];

  const newReleases = [
    { id: 13, title: "Indiana Jones 5", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 14, title: "Transformers: Rise of the Beasts", genre: "Action • Sci-Fi", rating: "PG-13", year: "2023" },
    { id: 15, title: "The Flash", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 16, title: "Elemental", genre: "Animation • Family", rating: "PG", year: "2023" },
    { id: 17, title: "Spider-Man: No Way Home", genre: "Action • Adventure", rating: "PG-13", year: "2021" },
    { id: 18, title: "Top Gun: Maverick", genre: "Action • Drama", rating: "PG-13", year: "2022" },
  ];

  const handleContentAction = (contentId: number, action: string) => {
    console.log(`${action} content with ID: ${contentId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-20">
        <HeroSlider />
        
        <div className="container mx-auto pb-12">
          <SimplePremiumContentRow 
            title="Trending Now" 
            movies={trendingMovies}
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Popular TV Shows" 
            movies={popularShows}
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="New Releases" 
            movies={newReleases}
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
