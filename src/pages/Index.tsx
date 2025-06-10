
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContentRow from "@/components/ContentRow";

const Index = () => {
  const trendingMovies = [
    { title: "Stranger Things", genre: "Sci-Fi • Drama", rating: "TV-14", year: "2022" },
    { title: "The Witcher", genre: "Fantasy • Adventure", rating: "TV-MA", year: "2021" },
    { title: "Bridgerton", genre: "Romance • Drama", rating: "TV-MA", year: "2022" },
    { title: "Ozark", genre: "Crime • Drama", rating: "TV-MA", year: "2022" },
    { title: "The Queen's Gambit", genre: "Drama • Sport", rating: "TV-MA", year: "2020" },
    { title: "Money Heist", genre: "Crime • Thriller", rating: "TV-MA", year: "2021" },
  ];

  const popularShows = [
    { title: "Breaking Bad", genre: "Crime • Drama", rating: "TV-MA", year: "2013" },
    { title: "Better Call Saul", genre: "Crime • Drama", rating: "TV-MA", year: "2022" },
    { title: "The Mandalorian", genre: "Sci-Fi • Adventure", rating: "TV-14", year: "2023" },
    { title: "House of Cards", genre: "Political • Drama", rating: "TV-MA", year: "2018" },
    { title: "Narcos", genre: "Crime • Biography", rating: "TV-MA", year: "2017" },
    { title: "Dark", genre: "Sci-Fi • Mystery", rating: "TV-MA", year: "2020" },
  ];

  const newReleases = [
    { title: "Wednesday", genre: "Comedy • Horror", rating: "TV-14", year: "2023" },
    { title: "The Night Agent", genre: "Action • Thriller", rating: "TV-MA", year: "2023" },
    { title: "Ginny & Georgia", genre: "Comedy • Drama", rating: "TV-14", year: "2023" },
    { title: "You", genre: "Thriller • Romance", rating: "TV-MA", year: "2023" },
    { title: "Elite", genre: "Drama • Thriller", rating: "TV-MA", year: "2023" },
    { title: "The Diplomat", genre: "Political • Drama", rating: "TV-MA", year: "2023" },
  ];

  const documentaries = [
    { title: "Our Planet", genre: "Documentary • Nature", rating: "TV-G", year: "2022" },
    { title: "The Social Dilemma", genre: "Documentary • Tech", rating: "PG-13", year: "2020" },
    { title: "Tiger King", genre: "Documentary • Crime", rating: "TV-MA", year: "2020" },
    { title: "My Octopus Teacher", genre: "Documentary • Nature", rating: "G", year: "2020" },
    { title: "The Last Dance", genre: "Documentary • Sport", rating: "TV-14", year: "2020" },
    { title: "Seaspiracy", genre: "Documentary • Environment", rating: "TV-14", year: "2021" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <div className="relative -mt-32 z-30">
        <ContentRow title="Trending Now" movies={trendingMovies} />
        <ContentRow title="Popular on StreamFlix" movies={popularShows} />
        <ContentRow title="New Releases" movies={newReleases} />
        <ContentRow title="Award-Winning Documentaries" movies={documentaries} />
      </div>
      
      {/* Footer space */}
      <div className="h-20"></div>
    </div>
  );
};

export default Index;
