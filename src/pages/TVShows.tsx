
import PremiumNavbar from "@/components/PremiumNavbar";
import SimplePremiumContentRow from "@/components/SimplePremiumContentRow";
import MovieHero from "@/components/MovieHero";

const TVShows = () => {
  const newReleaseTVShows = [
    { id: 19, title: "The Bear Season 3", genre: "Comedy • Drama", rating: "TV-MA", year: "2023" },
    { id: 20, title: "House of the Dragon S2", genre: "Fantasy • Drama", rating: "TV-MA", year: "2024" },
    { id: 21, title: "Wednesday Season 2", genre: "Comedy • Horror", rating: "TV-14", year: "2024" },
    { id: 22, title: "Stranger Things S5", genre: "Sci-Fi • Horror", rating: "TV-14", year: "2024" },
    { id: 23, title: "The Last of Us S2", genre: "Drama • Horror", rating: "TV-MA", year: "2024" },
    { id: 93, title: "The White Lotus S3", genre: "Comedy • Drama", rating: "TV-MA", year: "2024" },
    { id: 94, title: "Euphoria S3", genre: "Drama", rating: "TV-MA", year: "2024" },
    { id: 95, title: "The Mandalorian S4", genre: "Sci-Fi • Adventure", rating: "TV-14", year: "2024" },
    { id: 96, title: "Succession Final Season", genre: "Drama • Comedy", rating: "TV-MA", year: "2023" },
    { id: 97, title: "Ted Lasso S3", genre: "Comedy • Sport", rating: "TV-MA", year: "2023" },
    { id: 98, title: "The Crown S6", genre: "Drama • Biography", rating: "TV-MA", year: "2023" },
  ];

  const popularTVShows = [
    { id: 7, title: "The Last of Us", genre: "Drama • Horror", rating: "TV-MA", year: "2023" },
    { id: 8, title: "Wednesday", genre: "Comedy • Horror", rating: "TV-14", year: "2022" },
    { id: 9, title: "House of the Dragon", genre: "Fantasy • Drama", rating: "TV-MA", year: "2022" },
    { id: 10, title: "Stranger Things", genre: "Sci-Fi • Horror", rating: "TV-14", year: "2022" },
    { id: 11, title: "The Bear", genre: "Comedy • Drama", rating: "TV-MA", year: "2022" },
    { id: 12, title: "Euphoria", genre: "Drama", rating: "TV-MA", year: "2022" },
    { id: 99, title: "Abbott Elementary", genre: "Comedy", rating: "TV-14", year: "2023" },
    { id: 100, title: "The White Lotus", genre: "Comedy • Drama", rating: "TV-MA", year: "2022" },
    { id: 101, title: "Succession", genre: "Drama • Comedy", rating: "TV-MA", year: "2023" },
    { id: 102, title: "Ted Lasso", genre: "Comedy • Sport", rating: "TV-MA", year: "2023" },
    { id: 103, title: "The Crown", genre: "Drama • Biography", rating: "TV-MA", year: "2023" },
  ];

  const actionTVShows = [
    { id: 104, title: "Jack Ryan", genre: "Action • Thriller", rating: "TV-MA", year: "2023" },
    { id: 105, title: "The Boys", genre: "Action • Comedy", rating: "TV-MA", year: "2022" },
    { id: 106, title: "Reacher", genre: "Action • Crime", rating: "TV-MA", year: "2022" },
    { id: 107, title: "The Mandalorian", genre: "Sci-Fi • Adventure", rating: "TV-14", year: "2023" },
    { id: 108, title: "Andor", genre: "Sci-Fi • Action", rating: "TV-14", year: "2022" },
    { id: 109, title: "The Terminal List", genre: "Action • Thriller", rating: "TV-MA", year: "2022" },
    { id: 110, title: "Obi-Wan Kenobi", genre: "Sci-Fi • Adventure", rating: "TV-14", year: "2022" },
    { id: 111, title: "The Witcher", genre: "Fantasy • Action", rating: "TV-MA", year: "2023" },
    { id: 112, title: "Peacemaker", genre: "Action • Comedy", rating: "TV-MA", year: "2022" },
    { id: 113, title: "Moon Knight", genre: "Action • Fantasy", rating: "TV-14", year: "2022" },
    { id: 114, title: "Hawkeye", genre: "Action • Adventure", rating: "TV-14", year: "2021" },
  ];

  const dramaTVShows = [
    { id: 7, title: "The Last of Us", genre: "Drama • Horror", rating: "TV-MA", year: "2023" },
    { id: 9, title: "House of the Dragon", genre: "Fantasy • Drama", rating: "TV-MA", year: "2022" },
    { id: 11, title: "The Bear", genre: "Comedy • Drama", rating: "TV-MA", year: "2022" },
    { id: 12, title: "Euphoria", genre: "Drama", rating: "TV-MA", year: "2022" },
    { id: 115, title: "Succession", genre: "Drama • Comedy", rating: "TV-MA", year: "2023" },
    { id: 116, title: "The Crown", genre: "Drama • Biography", rating: "TV-MA", year: "2023" },
    { id: 117, title: "This Is Us", genre: "Drama • Family", rating: "TV-14", year: "2022" },
    { id: 118, title: "Yellowstone", genre: "Drama", rating: "TV-MA", year: "2023" },
    { id: 119, title: "Better Call Saul", genre: "Crime • Drama", rating: "TV-MA", year: "2022" },
    { id: 120, title: "Ozark", genre: "Crime • Drama", rating: "TV-MA", year: "2022" },
    { id: 121, title: "The Handmaid's Tale", genre: "Drama • Thriller", rating: "TV-MA", year: "2022" },
  ];

  const comedyShows = [
    { id: 13, title: "Ted Lasso", genre: "Comedy • Sport", rating: "TV-MA", year: "2023" },
    { id: 14, title: "The Marvelous Mrs. Maisel", genre: "Comedy • Drama", rating: "TV-14", year: "2023" },
    { id: 15, title: "Schitt's Creek", genre: "Comedy", rating: "TV-14", year: "2020" },
    { id: 16, title: "Brooklyn Nine-Nine", genre: "Comedy • Crime", rating: "TV-14", year: "2021" },
    { id: 17, title: "The Good Place", genre: "Comedy • Fantasy", rating: "TV-14", year: "2020" },
    { id: 18, title: "What We Do in the Shadows", genre: "Comedy • Horror", rating: "TV-MA", year: "2023" },
    { id: 122, title: "Abbott Elementary", genre: "Comedy", rating: "TV-14", year: "2023" },
    { id: 123, title: "Wednesday", genre: "Comedy • Horror", rating: "TV-14", year: "2022" },
    { id: 124, title: "The Bear", genre: "Comedy • Drama", rating: "TV-MA", year: "2022" },
    { id: 125, title: "Only Murders in the Building", genre: "Comedy • Mystery", rating: "TV-14", year: "2023" },
    { id: 126, title: "Hacks", genre: "Comedy • Drama", rating: "TV-MA", year: "2023" },
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
          <SimplePremiumContentRow 
            title="New Releases" 
            movies={newReleaseTVShows}
            onMoviePlay={(id) => handleShowAction(id, "Play")}
            onMovieMoreInfo={(id) => handleShowAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Popular" 
            movies={popularTVShows}
            onMoviePlay={(id) => handleShowAction(id, "Play")}
            onMovieMoreInfo={(id) => handleShowAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Action & Adventure" 
            movies={actionTVShows}
            onMoviePlay={(id) => handleShowAction(id, "Play")}
            onMovieMoreInfo={(id) => handleShowAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Drama Series" 
            movies={dramaTVShows}
            onMoviePlay={(id) => handleShowAction(id, "Play")}
            onMovieMoreInfo={(id) => handleShowAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Comedy Series" 
            movies={comedyShows}
            onMoviePlay={(id) => handleShowAction(id, "Play")}
            onMovieMoreInfo={(id) => handleShowAction(id, "More info")}
          />
        </div>
      </div>
    </div>
  );
};

export default TVShows;
