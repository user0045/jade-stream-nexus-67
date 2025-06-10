import PremiumNavbar from "@/components/PremiumNavbar";
import PremiumContentRow from "@/components/PremiumContentRow";
import MovieHero from "@/components/MovieHero";

const TVShows = () => {
  const trendingShows = [
    { id: 1, title: "House of the Dragon", genre: "Fantasy • Drama", rating: "TV-MA", year: "2022" },
    { id: 2, title: "The Bear", genre: "Comedy • Drama", rating: "TV-MA", year: "2023" },
    { id: 3, title: "Wednesday", genre: "Comedy • Horror", rating: "TV-14", year: "2022" },
    { id: 4, title: "The Last of Us", genre: "Drama • Horror", rating: "TV-MA", year: "2023" },
    { id: 5, title: "Abbott Elementary", genre: "Comedy", rating: "TV-14", year: "2023" },
    { id: 6, title: "Euphoria", genre: "Drama", rating: "TV-MA", year: "2022" },
  ];

  const crimeShows = [
    { id: 7, title: "Better Call Saul", genre: "Crime • Drama", rating: "TV-MA", year: "2022" },
    { id: 8, title: "Ozark", genre: "Crime • Drama", rating: "TV-MA", year: "2022" },
    { id: 9, title: "Narcos: Mexico", genre: "Crime • Biography", rating: "TV-MA", year: "2021" },
    { id: 10, title: "Peaky Blinders", genre: "Crime • Drama", rating: "TV-MA", year: "2022" },
    { id: 11, title: "True Detective", genre: "Crime • Mystery", rating: "TV-MA", year: "2019" },
    { id: 12, title: "Mindhunter", genre: "Crime • Thriller", rating: "TV-MA", year: "2019" },
  ];

  const comedyShows = [
    { id: 13, title: "Ted Lasso", genre: "Comedy • Sport", rating: "TV-MA", year: "2023" },
    { id: 14, title: "The Marvelous Mrs. Maisel", genre: "Comedy • Drama", rating: "TV-14", year: "2023" },
    { id: 15, title: "Schitt's Creek", genre: "Comedy", rating: "TV-14", year: "2020" },
    { id: 16, title: "Brooklyn Nine-Nine", genre: "Comedy • Crime", rating: "TV-14", year: "2021" },
    { id: 17, title: "The Good Place", genre: "Comedy • Fantasy", rating: "TV-14", year: "2020" },
    { id: 18, title: "What We Do in the Shadows", genre: "Comedy • Horror", rating: "TV-MA", year: "2023" },
  ];

  const handleShowAction = (showId: number, action: string) => {
    console.log(`${action} TV show with ID: ${showId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-20">
        <MovieHero
          title="The Last of Us"
          description="Twenty years after modern civilization has been destroyed, Joel must smuggle Ellie out of an oppressive quarantine zone."
          genre="Drama • Horror • Thriller"
          rating="TV-MA"
          year="2023"
          duration="Season 1"
          background="from-red-900/40 via-orange-800/20 to-background"
        />
        
        <div className="container mx-auto pb-12">
          <PremiumContentRow 
            title="Trending Now" 
            movies={trendingShows}
            onMoviePlay={(id) => handleShowAction(id, "Play")}
            onMovieAddToList={(id) => handleShowAction(id, "Add to list")}
            onMovieLike={(id) => handleShowAction(id, "Like")}
            onMovieMoreInfo={(id) => handleShowAction(id, "More info")}
          />
          
          <PremiumContentRow 
            title="Crime & Thriller" 
            movies={crimeShows}
            onMoviePlay={(id) => handleShowAction(id, "Play")}
            onMovieAddToList={(id) => handleShowAction(id, "Add to list")}
            onMovieLike={(id) => handleShowAction(id, "Like")}
            onMovieMoreInfo={(id) => handleShowAction(id, "More info")}
          />
          
          <PremiumContentRow 
            title="Comedy Series" 
            movies={comedyShows}
            onMoviePlay={(id) => handleShowAction(id, "Play")}
            onMovieAddToList={(id) => handleShowAction(id, "Add to list")}
            onMovieLike={(id) => handleShowAction(id, "Like")}
            onMovieMoreInfo={(id) => handleShowAction(id, "More info")}
          />
        </div>
      </div>
    </div>
  );
};

export default TVShows;
