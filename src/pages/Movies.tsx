import PremiumNavbar from "@/components/PremiumNavbar";
import PremiumContentRow from "@/components/PremiumContentRow";
import MovieHero from "@/components/MovieHero";

const Movies = () => {
  const actionMovies = [
    { id: 1, title: "John Wick 4", genre: "Action • Thriller", rating: "R", year: "2023" },
    { id: 2, title: "Top Gun: Maverick", genre: "Action • Drama", rating: "PG-13", year: "2022" },
    { id: 3, title: "Mission Impossible 7", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 4, title: "The Batman", genre: "Action • Crime", rating: "PG-13", year: "2022" },
    { id: 5, title: "Dune", genre: "Sci-Fi • Adventure", rating: "PG-13", year: "2021" },
    { id: 6, title: "No Time to Die", genre: "Action • Thriller", rating: "PG-13", year: "2021" },
  ];

  const dramaMovies = [
    { id: 7, title: "The Power of the Dog", genre: "Drama • Western", rating: "R", year: "2021" },
    { id: 8, title: "Nomadland", genre: "Drama", rating: "R", year: "2020" },
    { id: 9, title: "Minari", genre: "Drama • Family", rating: "PG-13", year: "2020" },
    { id: 10, title: "Sound of Metal", genre: "Drama • Music", rating: "R", year: "2020" },
    { id: 11, title: "The Father", genre: "Drama • Mystery", rating: "PG-13", year: "2020" },
    { id: 12, title: "Promising Young Woman", genre: "Drama • Thriller", rating: "R", year: "2020" },
  ];

  const sciFiMovies = [
    { id: 13, title: "Everything Everywhere All at Once", genre: "Sci-Fi • Comedy", rating: "R", year: "2022" },
    { id: 14, title: "Blade Runner 2049", genre: "Sci-Fi • Thriller", rating: "R", year: "2017" },
    { id: 15, title: "Arrival", genre: "Sci-Fi • Drama", rating: "PG-13", year: "2016" },
    { id: 16, title: "Interstellar", genre: "Sci-Fi • Drama", rating: "PG-13", year: "2014" },
    { id: 17, title: "Ex Machina", genre: "Sci-Fi • Thriller", rating: "R", year: "2014" },
    { id: 18, title: "The Martian", genre: "Sci-Fi • Adventure", rating: "PG-13", year: "2015" },
  ];

  const handleMovieAction = (movieId: number, action: string) => {
    console.log(`${action} movie with ID: ${movieId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      
      <div className="pt-20">
        <MovieHero
          title="Dune: Part Two"
          description="Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family."
          genre="Sci-Fi • Adventure • Drama"
          rating="PG-13"
          year="2024"
          duration="2h 46m"
          background="from-orange-900/40 via-amber-800/20 to-background"
        />
        
        <div className="container mx-auto pb-12">
          <PremiumContentRow 
            title="Action & Adventure" 
            movies={actionMovies}
            onMoviePlay={(id) => handleMovieAction(id, "Play")}
            onMovieAddToList={(id) => handleMovieAction(id, "Add to list")}
            onMovieLike={(id) => handleMovieAction(id, "Like")}
            onMovieMoreInfo={(id) => handleMovieAction(id, "More info")}
          />
          
          <PremiumContentRow 
            title="Award-Winning Dramas" 
            movies={dramaMovies}
            onMoviePlay={(id) => handleMovieAction(id, "Play")}
            onMovieAddToList={(id) => handleMovieAction(id, "Add to list")}
            onMovieLike={(id) => handleMovieAction(id, "Like")}
            onMovieMoreInfo={(id) => handleMovieAction(id, "More info")}
          />
          
          <PremiumContentRow 
            title="Sci-Fi Masterpieces" 
            movies={sciFiMovies}
            onMoviePlay={(id) => handleMovieAction(id, "Play")}
            onMovieAddToList={(id) => handleMovieAction(id, "Add to list")}
            onMovieLike={(id) => handleMovieAction(id, "Like")}
            onMovieMoreInfo={(id) => handleMovieAction(id, "More info")}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
