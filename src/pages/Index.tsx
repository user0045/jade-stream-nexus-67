
import PremiumNavbar from "@/components/PremiumNavbar";
import HeroSlider from "@/components/HeroSlider";
import PremiumContentRow from "@/components/PremiumContentRow";

const Index = () => {
  const trendingMovies = [
    { id: 1, title: "Stranger Things", genre: "Sci-Fi • Drama", rating: "TV-14", year: "2022" },
    { id: 2, title: "The Witcher", genre: "Fantasy • Adventure", rating: "TV-MA", year: "2021" },
    { id: 3, title: "Bridgerton", genre: "Romance • Drama", rating: "TV-MA", year: "2022" },
    { id: 4, title: "Ozark", genre: "Crime • Drama", rating: "TV-MA", year: "2022" },
    { id: 5, title: "The Queen's Gambit", genre: "Drama • Sport", rating: "TV-MA", year: "2020" },
    { id: 6, title: "Money Heist", genre: "Crime • Thriller", rating: "TV-MA", year: "2021" },
    { id: 7, title: "Dark", genre: "Sci-Fi • Mystery", rating: "TV-MA", year: "2020" },
    { id: 8, title: "The Crown", genre: "Drama • Biography", rating: "TV-MA", year: "2022" },
  ];

  const popularShows = [
    { id: 9, title: "Breaking Bad", genre: "Crime • Drama", rating: "TV-MA", year: "2013" },
    { id: 10, title: "Better Call Saul", genre: "Crime • Drama", rating: "TV-MA", year: "2022" },
    { id: 11, title: "The Mandalorian", genre: "Sci-Fi • Adventure", rating: "TV-14", year: "2023" },
    { id: 12, title: "House of Cards", genre: "Political • Drama", rating: "TV-MA", year: "2018" },
    { id: 13, title: "Narcos", genre: "Crime • Biography", rating: "TV-MA", year: "2017" },
    { id: 14, title: "Game of Thrones", genre: "Fantasy • Drama", rating: "TV-MA", year: "2019" },
    { id: 15, title: "The Boys", genre: "Action • Comedy", rating: "TV-MA", year: "2023" },
    { id: 16, title: "Euphoria", genre: "Drama", rating: "TV-MA", year: "2022" },
  ];

  const newReleases = [
    { id: 17, title: "Wednesday", genre: "Comedy • Horror", rating: "TV-14", year: "2023" },
    { id: 18, title: "The Night Agent", genre: "Action • Thriller", rating: "TV-MA", year: "2023" },
    { id: 19, title: "Ginny & Georgia", genre: "Comedy • Drama", rating: "TV-14", year: "2023" },
    { id: 20, title: "You", genre: "Thriller • Romance", rating: "TV-MA", year: "2023" },
    { id: 21, title: "Elite", genre: "Drama • Thriller", rating: "TV-MA", year: "2023" },
    { id: 22, title: "The Diplomat", genre: "Political • Drama", rating: "TV-MA", year: "2023" },
    { id: 23, title: "Heartstopper", genre: "Romance • Drama", rating: "TV-14", year: "2023" },
    { id: 24, title: "The Summer I Turned Pretty", genre: "Romance • Drama", rating: "TV-14", year: "2023" },
  ];

  const documentaries = [
    { id: 25, title: "Our Planet", genre: "Documentary • Nature", rating: "TV-G", year: "2022" },
    { id: 26, title: "The Social Dilemma", genre: "Documentary • Tech", rating: "PG-13", year: "2020" },
    { id: 27, title: "Tiger King", genre: "Documentary • Crime", rating: "TV-MA", year: "2020" },
    { id: 28, title: "My Octopus Teacher", genre: "Documentary • Nature", rating: "G", year: "2020" },
    { id: 29, title: "The Last Dance", genre: "Documentary • Sport", rating: "TV-14", year: "2020" },
    { id: 30, title: "Seaspiracy", genre: "Documentary • Environment", rating: "TV-14", year: "2021" },
    { id: 31, title: "Free Solo", genre: "Documentary • Adventure", rating: "PG-13", year: "2018" },
    { id: 32, title: "Won't You Be My Neighbor?", genre: "Documentary • Biography", rating: "PG-13", year: "2018" },
  ];

  const handleContentAction = (contentId: number, action: string) => {
    console.log(`${action} content with ID: ${contentId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <PremiumNavbar />
      <HeroSlider />
      
      <div className="relative -mt-40 z-30">
        <PremiumContentRow 
          title="Trending Now" 
          movies={trendingMovies}
          onMoviePlay={(id) => handleContentAction(id, "Play")}
          onMovieAddToList={(id) => handleContentAction(id, "Add to list")}
          onMovieLike={(id) => handleContentAction(id, "Like")}
          onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
        />
        
        <PremiumContentRow 
          title="Popular on StreamFlix" 
          movies={popularShows}
          onMoviePlay={(id) => handleContentAction(id, "Play")}
          onMovieAddToList={(id) => handleContentAction(id, "Add to list")}
          onMovieLike={(id) => handleContentAction(id, "Like")}
          onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
        />
        
        <PremiumContentRow 
          title="New Releases" 
          movies={newReleases}
          onMoviePlay={(id) => handleContentAction(id, "Play")}
          onMovieAddToList={(id) => handleContentAction(id, "Add to list")}
          onMovieLike={(id) => handleContentAction(id, "Like")}
          onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
        />
        
        <PremiumContentRow 
          title="Award-Winning Documentaries" 
          movies={documentaries}
          onMoviePlay={(id) => handleContentAction(id, "Play")}
          onMovieAddToList={(id) => handleContentAction(id, "Add to list")}
          onMovieLike={(id) => handleContentAction(id, "Like")}
          onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
        />
      </div>
      
      {/* Footer space */}
      <div className="h-24"></div>
    </div>
  );
};

export default Index;
