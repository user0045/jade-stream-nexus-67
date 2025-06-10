
import PremiumNavbar from "@/components/PremiumNavbar";
import HeroSlider from "@/components/HeroSlider";
import SimplePremiumContentRow from "@/components/SimplePremiumContentRow";

const Index = () => {
  const newReleases = [
    { id: 13, title: "Indiana Jones 5", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 14, title: "Transformers: Rise of the Beasts", genre: "Action • Sci-Fi", rating: "PG-13", year: "2023" },
    { id: 15, title: "The Flash", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 16, title: "Elemental", genre: "Animation • Family", rating: "PG", year: "2023" },
    { id: 17, title: "Spider-Man: No Way Home", genre: "Action • Adventure", rating: "PG-13", year: "2021" },
    { id: 18, title: "Top Gun: Maverick", genre: "Action • Drama", rating: "PG-13", year: "2022" },
    { id: 19, title: "The Bear Season 3", genre: "Comedy • Drama", rating: "TV-MA", year: "2023" },
    { id: 20, title: "House of the Dragon S2", genre: "Fantasy • Drama", rating: "TV-MA", year: "2024" },
    { id: 21, title: "Wednesday Season 2", genre: "Comedy • Horror", rating: "TV-14", year: "2024" },
    { id: 22, title: "Stranger Things S5", genre: "Sci-Fi • Horror", rating: "TV-14", year: "2024" },
    { id: 23, title: "The Last of Us S2", genre: "Drama • Horror", rating: "TV-MA", year: "2024" },
  ];

  const popular = [
    { id: 1, title: "Oppenheimer", genre: "Biography • Drama", rating: "R", year: "2023" },
    { id: 2, title: "Barbie", genre: "Comedy • Adventure", rating: "PG-13", year: "2023" },
    { id: 3, title: "Spider-Man: Across the Spider-Verse", genre: "Animation • Action", rating: "PG", year: "2023" },
    { id: 4, title: "Guardians of the Galaxy Vol. 3", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 5, title: "Fast X", genre: "Action • Crime", rating: "PG-13", year: "2023" },
    { id: 6, title: "The Little Mermaid", genre: "Family • Musical", rating: "PG", year: "2023" },
    { id: 7, title: "The Last of Us", genre: "Drama • Horror", rating: "TV-MA", year: "2023" },
    { id: 8, title: "Wednesday", genre: "Comedy • Horror", rating: "TV-14", year: "2022" },
    { id: 9, title: "House of the Dragon", genre: "Fantasy • Drama", rating: "TV-MA", year: "2022" },
    { id: 10, title: "Stranger Things", genre: "Sci-Fi • Horror", rating: "TV-14", year: "2022" },
    { id: 11, title: "The Bear", genre: "Comedy • Drama", rating: "TV-MA", year: "2022" },
  ];

  const actionContent = [
    { id: 24, title: "John Wick 4", genre: "Action • Thriller", rating: "R", year: "2023" },
    { id: 25, title: "Top Gun: Maverick", genre: "Action • Drama", rating: "PG-13", year: "2022" },
    { id: 26, title: "Mission Impossible 7", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 27, title: "The Batman", genre: "Action • Crime", rating: "PG-13", year: "2022" },
    { id: 28, title: "Fast X", genre: "Action • Crime", rating: "PG-13", year: "2023" },
    { id: 29, title: "Guardians of the Galaxy Vol. 3", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 30, title: "Spider-Man: No Way Home", genre: "Action • Adventure", rating: "PG-13", year: "2021" },
    { id: 31, title: "The Flash", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 32, title: "Transformers: Rise of the Beasts", genre: "Action • Sci-Fi", rating: "PG-13", year: "2023" },
    { id: 33, title: "Indiana Jones 5", genre: "Action • Adventure", rating: "PG-13", year: "2023" },
    { id: 34, title: "Jack Ryan Season 4", genre: "Action • Thriller", rating: "TV-MA", year: "2023" },
  ];

  const dramaContent = [
    { id: 35, title: "Oppenheimer", genre: "Biography • Drama", rating: "R", year: "2023" },
    { id: 36, title: "The Power of the Dog", genre: "Drama", rating: "R", year: "2021" },
    { id: 37, title: "Nomadland", genre: "Drama", rating: "R", year: "2020" },
    { id: 38, title: "Minari", genre: "Drama • Family", rating: "PG-13", year: "2020" },
    { id: 39, title: "Sound of Metal", genre: "Drama • Music", rating: "R", year: "2020" },
    { id: 40, title: "The Father", genre: "Drama • Mystery", rating: "PG-13", year: "2020" },
    { id: 41, title: "The Last of Us", genre: "Drama • Horror", rating: "TV-MA", year: "2023" },
    { id: 42, title: "House of the Dragon", genre: "Fantasy • Drama", rating: "TV-MA", year: "2022" },
    { id: 43, title: "The Bear", genre: "Comedy • Drama", rating: "TV-MA", year: "2022" },
    { id: 44, title: "Succession", genre: "Drama • Comedy", rating: "TV-MA", year: "2023" },
    { id: 45, title: "The Crown", genre: "Drama • Biography", rating: "TV-MA", year: "2023" },
  ];

  const comedyContent = [
    { id: 46, title: "Barbie", genre: "Comedy • Adventure", rating: "PG-13", year: "2023" },
    { id: 47, title: "Everything Everywhere All at Once", genre: "Sci-Fi • Comedy", rating: "R", year: "2022" },
    { id: 48, title: "The Grand Budapest Hotel", genre: "Comedy • Drama", rating: "R", year: "2014" },
    { id: 49, title: "Knives Out", genre: "Comedy • Mystery", rating: "PG-13", year: "2019" },
    { id: 50, title: "Jojo Rabbit", genre: "Comedy • Drama", rating: "PG-13", year: "2019" },
    { id: 51, title: "The French Dispatch", genre: "Comedy • Drama", rating: "R", year: "2021" },
    { id: 52, title: "Wednesday", genre: "Comedy • Horror", rating: "TV-14", year: "2022" },
    { id: 53, title: "The Bear", genre: "Comedy • Drama", rating: "TV-MA", year: "2022" },
    { id: 54, title: "Ted Lasso", genre: "Comedy • Sport", rating: "TV-MA", year: "2023" },
    { id: 55, title: "Abbott Elementary", genre: "Comedy", rating: "TV-14", year: "2023" },
    { id: 56, title: "What We Do in the Shadows", genre: "Comedy • Horror", rating: "TV-MA", year: "2023" },
  ];

  const sciFiContent = [
    { id: 57, title: "Dune", genre: "Sci-Fi • Adventure", rating: "PG-13", year: "2021" },
    { id: 58, title: "Everything Everywhere All at Once", genre: "Sci-Fi • Comedy", rating: "R", year: "2022" },
    { id: 59, title: "Blade Runner 2049", genre: "Sci-Fi • Thriller", rating: "R", year: "2017" },
    { id: 60, title: "Arrival", genre: "Sci-Fi • Drama", rating: "PG-13", year: "2016" },
    { id: 61, title: "Interstellar", genre: "Sci-Fi • Drama", rating: "PG-13", year: "2014" },
    { id: 62, title: "The Martian", genre: "Sci-Fi • Adventure", rating: "PG-13", year: "2015" },
    { id: 63, title: "Stranger Things", genre: "Sci-Fi • Horror", rating: "TV-14", year: "2022" },
    { id: 64, title: "The Mandalorian", genre: "Sci-Fi • Adventure", rating: "TV-14", year: "2023" },
    { id: 65, title: "Andor", genre: "Sci-Fi • Action", rating: "TV-14", year: "2022" },
    { id: 66, title: "Foundation", genre: "Sci-Fi • Drama", rating: "TV-14", year: "2023" },
    { id: 67, title: "For All Mankind", genre: "Sci-Fi • Drama", rating: "TV-MA", year: "2023" },
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
            title="New Releases" 
            movies={newReleases}
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Popular" 
            movies={popular}
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Action & Adventure" 
            movies={actionContent}
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Drama" 
            movies={dramaContent}
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Comedy" 
            movies={comedyContent}
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
          />
          
          <SimplePremiumContentRow 
            title="Sci-Fi" 
            movies={sciFiContent}
            onMoviePlay={(id) => handleContentAction(id, "Play")}
            onMovieMoreInfo={(id) => handleContentAction(id, "More info")}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
