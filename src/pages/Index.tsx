
import PremiumNavbar from "@/components/PremiumNavbar";
import HeroSlider from "@/components/HeroSlider";
import SimplePremiumContentRow from "@/components/SimplePremiumContentRow";

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: string;
  year: string;
  type: "movie" | "tv";
}

const Index = () => {
  // All content combined for the home page (both movies and TV shows)
  const allContent: Movie[] = [
    // Movies
    { id: 13, title: "Indiana Jones 5", genre: "Action • Adventure", rating: "PG-13", year: "2023", type: "movie" },
    { id: 14, title: "Transformers: Rise of the Beasts", genre: "Action • Sci-Fi", rating: "PG-13", year: "2023", type: "movie" },
    { id: 15, title: "The Flash", genre: "Action • Adventure", rating: "PG-13", year: "2023", type: "movie" },
    { id: 16, title: "Elemental", genre: "Animation • Family", rating: "PG", year: "2023", type: "movie" },
    { id: 17, title: "Spider-Man: No Way Home", genre: "Action • Adventure", rating: "PG-13", year: "2021", type: "movie" },
    { id: 18, title: "Top Gun: Maverick", genre: "Action • Drama", rating: "PG-13", year: "2022", type: "movie" },
    { id: 1, title: "Oppenheimer", genre: "Biography • Drama", rating: "R", year: "2023", type: "movie" },
    { id: 2, title: "Barbie", genre: "Comedy • Adventure", rating: "PG-13", year: "2023", type: "movie" },
    { id: 3, title: "Spider-Man: Across the Spider-Verse", genre: "Animation • Action", rating: "PG", year: "2023", type: "movie" },
    { id: 4, title: "Guardians of the Galaxy Vol. 3", genre: "Action • Adventure", rating: "PG-13", year: "2023", type: "movie" },
    { id: 5, title: "Fast X", genre: "Action • Crime", rating: "PG-13", year: "2023", type: "movie" },
    { id: 6, title: "The Little Mermaid", genre: "Family • Musical", rating: "PG", year: "2023", type: "movie" },
    // TV Shows
    { id: 19, title: "The Bear Season 3", genre: "Comedy • Drama", rating: "TV-MA", year: "2023", type: "tv" },
    { id: 20, title: "House of the Dragon S2", genre: "Fantasy • Drama", rating: "TV-MA", year: "2024", type: "tv" },
    { id: 21, title: "Wednesday Season 2", genre: "Comedy • Horror", rating: "TV-14", year: "2024", type: "tv" },
    { id: 22, title: "Stranger Things S5", genre: "Sci-Fi • Horror", rating: "TV-14", year: "2024", type: "tv" },
    { id: 23, title: "The Last of Us S2", genre: "Drama • Horror", rating: "TV-MA", year: "2024", type: "tv" },
    { id: 7, title: "The Last of Us", genre: "Drama • Horror", rating: "TV-MA", year: "2023", type: "tv" },
    { id: 8, title: "Wednesday", genre: "Comedy • Horror", rating: "TV-14", year: "2022", type: "tv" },
    { id: 9, title: "House of the Dragon", genre: "Fantasy • Drama", rating: "TV-MA", year: "2022", type: "tv" },
    { id: 10, title: "Stranger Things", genre: "Sci-Fi • Horror", rating: "TV-14", year: "2022", type: "tv" },
    { id: 11, title: "The Bear", genre: "Comedy • Drama", rating: "TV-MA", year: "2022", type: "tv" },
    // Additional content for categories
    { id: 24, title: "John Wick 4", genre: "Action • Thriller", rating: "R", year: "2023", type: "movie" },
    { id: 25, title: "Mission Impossible 7", genre: "Action • Adventure", rating: "PG-13", year: "2023", type: "movie" },
    { id: 26, title: "The Batman", genre: "Action • Crime", rating: "PG-13", year: "2022", type: "movie" },
    { id: 27, title: "Dune", genre: "Sci-Fi • Adventure", rating: "PG-13", year: "2021", type: "movie" },
    { id: 28, title: "Everything Everywhere All at Once", genre: "Sci-Fi • Comedy", rating: "R", year: "2022", type: "movie" },
    { id: 29, title: "Knives Out", genre: "Comedy • Mystery", rating: "PG-13", year: "2019", type: "movie" },
    { id: 30, title: "The Power of the Dog", genre: "Drama", rating: "R", year: "2021", type: "movie" },
    { id: 31, title: "Scream VI", genre: "Horror • Thriller", rating: "R", year: "2023", type: "movie" },
    { id: 32, title: "Gone Girl", genre: "Mystery • Thriller", rating: "R", year: "2014", type: "movie" },
    { id: 33, title: "Zodiac", genre: "Crime • Mystery", rating: "R", year: "2007", type: "movie" },
    { id: 34, title: "Heat", genre: "Crime • Drama", rating: "R", year: "1995", type: "movie" },
    { id: 35, title: "The Departed", genre: "Crime • Thriller", rating: "R", year: "2006", type: "movie" },
    { id: 36, title: "Ted Lasso", genre: "Comedy • Sport", rating: "TV-MA", year: "2023", type: "tv" },
    { id: 37, title: "Abbott Elementary", genre: "Comedy", rating: "TV-14", year: "2023", type: "tv" },
    { id: 38, title: "Breaking Bad", genre: "Crime • Drama", rating: "TV-MA", year: "2013", type: "tv" },
    { id: 39, title: "True Detective", genre: "Crime • Mystery", rating: "TV-MA", year: "2023", type: "tv" },
    { id: 40, title: "The Haunting of Hill House", genre: "Horror • Drama", rating: "TV-MA", year: "2022", type: "tv" },
  ];

  // Get latest 11 items for each category
  const getLatest11 = (filterFn: (item: Movie) => boolean): Movie[] => {
    return allContent
      .filter(filterFn)
      .sort((a, b) => parseInt(b.year) - parseInt(a.year))
      .slice(0, 11);
  };

  const newReleases = getLatest11(() => true);
  const popular = getLatest11(() => true);
  const actionAdventure = getLatest11(item => 
    item.genre.toLowerCase().includes('action') || 
    item.genre.toLowerCase().includes('adventure')
  );
  const comedy = getLatest11(item => 
    item.genre.toLowerCase().includes('comedy')
  );
  const crime = getLatest11(item => 
    item.genre.toLowerCase().includes('crime')
  );
  const drama = getLatest11(item => 
    item.genre.toLowerCase().includes('drama')
  );
  const horror = getLatest11(item => 
    item.genre.toLowerCase().includes('horror')
  );
  const mysteryThriller = getLatest11(item => 
    item.genre.toLowerCase().includes('mystery') || 
    item.genre.toLowerCase().includes('thriller')
  );
  const sciFi = getLatest11(item => 
    item.genre.toLowerCase().includes('sci-fi')
  );

  const handleContentAction = (contentId: number, action: string) => {
    console.log(`${action} content with ID: ${contentId}`);
  };

  const handleSeeMore = (sectionTitle: string) => {
    console.log(`See more for section: ${sectionTitle}`);
    // TODO: Navigate to grid view page for this section
  };

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-20">
        <HeroSlider />
        
        <div className="container mx-auto pb-12">
          <SimplePremiumContentRow 
            title="New Releases" 
            movies={newReleases}
            contentType="all"
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
            onSeeMore={() => handleSeeMore("New Releases")}
          />
          
          <SimplePremiumContentRow 
            title="Popular" 
            movies={popular}
            contentType="all"
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
            onSeeMore={() => handleSeeMore("Popular")}
          />
          
          <SimplePremiumContentRow 
            title="Action & Adventure" 
            movies={actionAdventure}
            contentType="all"
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
            onSeeMore={() => handleSeeMore("Action & Adventure")}
          />
          
          <SimplePremiumContentRow 
            title="Comedy" 
            movies={comedy}
            contentType="all"
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
            onSeeMore={() => handleSeeMore("Comedy")}
          />
          
          <SimplePremiumContentRow 
            title="Crime" 
            movies={crime}
            contentType="all"
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
            onSeeMore={() => handleSeeMore("Crime")}
          />
          
          <SimplePremiumContentRow 
            title="Drama" 
            movies={drama}
            contentType="all"
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
            onSeeMore={() => handleSeeMore("Drama")}
          />
          
          <SimplePremiumContentRow 
            title="Horror" 
            movies={horror}
            contentType="all"
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
            onSeeMore={() => handleSeeMore("Horror")}
          />
          
          <SimplePremiumContentRow 
            title="Mystery & Thriller" 
            movies={mysteryThriller}
            contentType="all"
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
            onSeeMore={() => handleSeeMore("Mystery & Thriller")}
          />
          
          <SimplePremiumContentRow 
            title="Sci-Fi" 
            movies={sciFi}
            contentType="all"
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
            onSeeMore={() => handleSeeMore("Sci-Fi")}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
