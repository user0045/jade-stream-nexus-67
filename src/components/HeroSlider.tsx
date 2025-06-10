
import { useState, useEffect } from "react";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroContent {
  id: number;
  title: string;
  description: string;
  genre: string;
  rating: string;
  year: string;
  duration: string;
  background: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroContents: HeroContent[] = [
    {
      id: 1,
      title: "The Crown",
      description: "A biographical drama that chronicles the reign of Queen Elizabeth II, from the 1940s to modern times. Experience the political rivalries and romance of the events that shaped the second half of the 20th century.",
      genre: "Drama • Biography • History",
      rating: "TV-MA",
      year: "2022",
      duration: "4 Seasons",
      background: "from-emerald-900/40 via-green-800/20 to-background"
    },
    {
      id: 2,
      title: "Stranger Things",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      genre: "Sci-Fi • Horror • Drama",
      rating: "TV-14",
      year: "2023",
      duration: "4 Seasons",
      background: "from-red-900/40 via-orange-800/20 to-background"
    },
    {
      id: 3,
      title: "The Witcher",
      description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
      genre: "Fantasy • Adventure • Action",
      rating: "TV-MA",
      year: "2023",
      duration: "3 Seasons",
      background: "from-purple-900/40 via-indigo-800/20 to-background"
    },
    {
      id: 4,
      title: "Money Heist",
      description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
      genre: "Crime • Thriller • Drama",
      rating: "TV-MA",
      year: "2021",
      duration: "5 Seasons",
      background: "from-yellow-900/40 via-amber-800/20 to-background"
    },
    {
      id: 5,
      title: "Dark",
      description: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.",
      genre: "Sci-Fi • Mystery • Thriller",
      rating: "TV-MA",
      year: "2020",
      duration: "3 Seasons",
      background: "from-gray-900/40 via-slate-800/20 to-background"
    },
    {
      id: 6,
      title: "The Queen's Gambit",
      description: "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA.",
      genre: "Drama • Sport • Coming-of-age",
      rating: "TV-MA",
      year: "2020",
      duration: "Limited Series",
      background: "from-teal-900/40 via-cyan-800/20 to-background"
    },
    {
      id: 7,
      title: "Bridgerton",
      description: "Wealth, lust, and betrayal set in the backdrop of Regency era England, seen through the eyes of the powerful Bridgerton family.",
      genre: "Romance • Drama • Period",
      rating: "TV-MA",
      year: "2022",
      duration: "2 Seasons",
      background: "from-pink-900/40 via-rose-800/20 to-background"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroContents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroContents.length) % heroContents.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentContent = heroContents[currentSlide];

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient with smooth transitions */}
      <div className={`absolute inset-0 bg-gradient-to-r ${currentContent.background} transition-all duration-1000 ease-in-out`}></div>
      
      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-background/10 hover:bg-background/20 backdrop-blur-sm transition-all duration-300"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-background/10 hover:bg-background/20 backdrop-blur-sm transition-all duration-300"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-foreground leading-tight">
            {currentContent.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            {currentContent.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              <Play className="mr-3 h-6 w-6" />
              Play Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-foreground/30 hover:border-primary hover:bg-primary/10 px-10 py-4 rounded-lg transition-all duration-300 backdrop-blur-sm"
            >
              <Info className="mr-3 h-6 w-6" />
              More Info
            </Button>
          </div>

          {/* Meta information */}
          <div className="flex items-center gap-6 text-lg text-muted-foreground">
            <span className="bg-accent/80 px-4 py-2 rounded-lg backdrop-blur-sm">{currentContent.rating}</span>
            <span>{currentContent.duration}</span>
            <span>{currentContent.genre}</span>
            <span className="text-primary font-semibold">★ {(8.1 + Math.random() * 1.8).toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {heroContents.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-primary shadow-lg shadow-primary/50" 
                : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
    </div>
  );
};

export default HeroSlider;
