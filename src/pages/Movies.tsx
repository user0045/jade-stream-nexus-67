
import PremiumNavbar from "@/components/PremiumNavbar";
import SimplePremiumContentRow from "@/components/SimplePremiumContentRow";
import MovieHero from "@/components/MovieHero";

const Movies = () => {
  const newReleaseMovies = [
    { id: 13, title: "Indiana Jones 5", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 14, title: "Transformers: Rise of the Beasts", genre: "Action • Sci-Fi", rating: "PG-13", year: "2023" },
    { id: 15, title: "The Flash", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 16, title: "Elemental", genre: "Animation • Family", rating: "PG", year: "2023" },
    { id: 17, title: "Spider-Man: No Way Home", genre: "Action • Adventure", rating: "PG-13", year: "2021" },
    { id: 18, title: "Top Gun: Maverick", genre: "Action • Drama", rating: "PG-13", year: "2022" },
    { id: 68, title: "Cocaine Bear", genre: "Comedy • Thriller", rating: "R", year: "2023" },
    { id: 69, title: "Scream VI", genre: "Horror • Thriller", rating: "R", year: "2023" },
    { id: 70, title: "Creed III", genre: "Drama • Sport", rating: "PG-13", year: "2023" },
    { id: 71, title: "John Wick 4", genre: "Action • Thriller", rating: "R", year: "2023" },
    { id: 72, title: "Avatar: The Way of Water", genre: "Sci-Fi • Adventure", rating: "PG-13", year: "2022" },
  ];

  const popularMovies = [
    { id: 1, title: "Oppenheimer", genre: "Biography • Drama", rating: "R", year: "2023" },
    { id: 2, title: "Barbie", genre: "Comedy • Adventure", rating: "PG-13", year: "2023" },
    { id: 3, title: "Spider-Man: Across the Spider-Verse", genre: "Animation • Action", rating: "PG", year: "2023" },
    { id: 4, title: "Guardians of the Galaxy Vol. 3", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 5, title: "Fast X", genre: "Action • Crime", rating: "PG-13", year: "2023" },
    { id: 6, title: "The Little Mermaid", genre: "Family • Musical", rating: "PG", year: "2023" },
    { id: 73, title: "Everything Everywhere All at Once", genre: "Sci-Fi • Comedy", rating: "R", year: "2022" },
    { id: 74, title: "The Batman", genre: "Action • Crime", rating: "PG-13", year: "2022" },
    { id: 75, title: "Dune", genre: "Sci-Fi • Adventure", rating: "PG-13", year: "2021" },
    { id: 76, title: "No Time to Die", genre: "Action • Thriller", rating: "PG-13", year: "2021" },
    { id: 77, title: "The Power of the Dog", genre: "Drama", rating: "R", year: "2021" },
  ];

  const actionMovies = [
    { id: 1, title: "John Wick 4", genre: "Action • Thriller", rating: "R", year: "2023" },
    { id: 2, title: "Top Gun: Maverick", genre: "Action • Drama", rating: "PG-13", year: "2022" },
    { id: 3, title: "Mission Impossible 7", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 4, title: "The Batman", genre: "Action • Crime", rating: "PG-13", year: "2022" },
    { id: 5, title: "Dune", genre: "Sci-Fi • Adventure", rating: "PG-13", year: "2021" },
    { id: 6, title: "No Time to Die", genre: "Action • Thriller", rating: "PG-13", year: "2021" },
    { id: 78, title: "Fast X", genre: "Action • Crime", rating: "PG-13", year: "2023" },
    { id: 79, title: "Guardians of the Galaxy Vol. 3", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 80, title: "Spider-Man: No Way Home", genre: "Action • Adventure", rating: "PG-13", year: "2021" },
    { id: 81, title: "The Flash", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 82, title: "Transformers: Rise of the Beasts", genre: "Action • Sci-Fi", rating: "PG-13", year: "2023" },
  ];

  const dramaMovies = [
    { id: 7, title: "The Power of the Dog", genre: "Drama • Romance", rating: "R", year: "2021" },
    { id: 8, title: "Nomadland", genre: "Drama", rating: "R", year: "2020" },
    { id: 9, title: "Minari", genre: "Drama • Family", rating: "PG-13", year: "2020" },
    { id: 10, title: "Sound of Metal", genre: "Drama • Music", rating: "R", year: "2020" },
    { id: 11, title: "The Father", genre: "Drama • Mystery", rating: "PG-13", year: "2020" },
    { id: 12, title: "Promising Young Woman", genre: "Drama • Thriller", rating: "R", year: "2020" },
    { id: 83, title: "Oppenheimer", genre: "Biography • Drama", rating: "R", year: "2023" },
    { id: 84, title: "The Fabelmans", genre: "Drama • Comedy", rating: "PG-13", year: "2022" },
    { id: 85, title: "Women Talking", genre: "Drama", rating: "PG-13", year: "2022" },
    { id: 86, title: "The Banshees of Inisherin", genre: "Drama • Comedy", rating: "R", year: "2022" },
    { id: 87, title: "Tar", genre: "Drama • Music", rating: "R", year: "2022" },
  ];

  const sciFiMovies = [
    { id: 13, title: "Everything Everywhere All at Once", genre: "Sci-Fi • Comedy", rating: "R", year: "2022" },
    { id: 14, title: "Blade Runner 2049", genre: "Sci-Fi • Thriller", rating: "R", year: "2017" },
    { id: 15, title: "Arrival", genre: "Sci-Fi • Drama", rating: "PG-13", year: "2016" },
    { id: 16, title: "Interstellar", genre: "Sci-Fi • Drama", rating: "PG-13", year: "2014" },
    { id: 17, title: "Ex Machina", genre: "Sci-Fi • Thriller", rating: "R", year: "2014" },
    { id: 18, title: "The Martian", genre: "Sci-Fi • Adventure", rating: "PG-13", year: "2015" },
    { id: 88, title: "Dune", genre: "Sci-Fi • Adventure", rating: "PG-13", year: "2021" },
    { id: 89, title: "Avatar: The Way of Water", genre: "Sci-Fi • Adventure", rating: "PG-13", year: "2022" },
    { id: 90, title: "Nope", genre: "Sci-Fi • Horror", rating: "R", year: "2022" },
    { id: 91, title: "The Adam Project", genre: "Sci-Fi • Comedy", rating: "PG-13", year: "2022" },
    { id: 92, title: "Turning Red", genre: "Animation • Fantasy", rating: "PG", year: "2022" },
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
          <SimplePremiumContentRow 
            title="New Releases" 
            movies={newReleaseMovies}
            onMoviePlay={(id) => handleMovieAction(id, "Play")}
            onMovieMoreInfo={(id) => handleMovieAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Popular" 
            movies={popularMovies}
            onMoviePlay={(id) => handleMovieAction(id, "Play")}
            onMovieMoreInfo={(id) => handleMovieAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Action & Adventure" 
            movies={actionMovies}
            onMoviePlay={(id) => handleMovieAction(id, "Play")}
            onMovieMoreInfo={(id) => handleMovieAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Award-Winning Dramas" 
            movies={dramaMovies}
            onMoviePlay={(id) => handleMovieAction(id, "Play")}
            onMovieMoreInfo={(id) => handleMovieAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Sci-Fi Masterpieces" 
            movies={sciFiMovies}
            onMoviePlay={(id) => handleMovieAction(id, "Play")}
            onMovieMoreInfo={(id) => handleMovieAction(id, "More info")}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
