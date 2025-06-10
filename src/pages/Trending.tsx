
import PremiumNavbar from "@/components/PremiumNavbar";
import SimplePremiumContentRow from "@/components/SimplePremiumContentRow";

const Trending = () => {
  const todayTrending = [
    { id: 1, title: "Oppenheimer", genre: "Biography • Drama", rating: "R", year: "2023" },
    { id: 2, title: "Barbie", genre: "Comedy • Adventure", rating: "PG-13", year: "2023" },
    { id: 3, title: "Guardians of the Galaxy Vol. 3", genre: "Action • Sci-Fi", rating: "PG-13", year: "2023" },
    { id: 4, title: "Spider-Man: Across the Spider-Verse", genre: "Animation • Action", rating: "PG", year: "2023" },
    { id: 5, title: "Fast X", genre: "Action • Crime", rating: "PG-13", year: "2023" },
    { id: 6, title: "Indiana Jones 5", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
  ];

  const weekTrending = [
    { id: 7, title: "The Summer I Turned Pretty", genre: "Romance • Drama", rating: "TV-14", year: "2023" },
    { id: 8, title: "Secret Invasion", genre: "Action • Sci-Fi", rating: "TV-14", year: "2023" },
    { id: 9, title: "The Idol", genre: "Drama • Music", rating: "TV-MA", year: "2023" },
    { id: 10, title: "Black Mirror", genre: "Sci-Fi • Thriller", rating: "TV-MA", year: "2023" },
    { id: 11, title: "The Flash", genre: "Action • Sci-Fi", rating: "PG-13", year: "2023" },
    { id: 12, title: "Transformers: Rise of the Beasts", genre: "Action • Sci-Fi", rating: "PG-13", year: "2023" },
  ];

  const allTimeTrending = [
    { id: 13, title: "Breaking Bad", genre: "Crime • Drama", rating: "TV-MA", year: "2013" },
    { id: 14, title: "The Dark Knight", genre: "Action • Crime", rating: "PG-13", year: "2008" },
    { id: 15, title: "Game of Thrones", genre: "Fantasy • Drama", rating: "TV-MA", year: "2019" },
    { id: 16, title: "The Godfather", genre: "Crime • Drama", rating: "R", year: "1972" },
    { id: 17, title: "Pulp Fiction", genre: "Crime • Drama", rating: "R", year: "1994" },
    { id: 18, title: "The Shawshank Redemption", genre: "Drama", rating: "R", year: "1994" },
  ];

  const handleContentAction = (contentId: number, action: string) => {
    console.log(`${action} content with ID: ${contentId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-12 px-6">Trending</h1>
          
          <SimplePremiumContentRow 
            title="Trending Today" 
            movies={todayTrending}
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Trending This Week" 
            movies={weekTrending}
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="All-Time Favorites" 
            movies={allTimeTrending}
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
          />
        </div>
      </div>
    </div>
  );
};

export default Trending;
