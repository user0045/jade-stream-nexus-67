
-- Create content table for movies and TV shows
CREATE TABLE public.content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Movie', 'TV Show')),
  genre TEXT NOT NULL,
  duration TEXT NOT NULL,
  rating TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Published' CHECK (status IN ('Published', 'Draft')),
  views TEXT NOT NULL DEFAULT '0',
  description TEXT,
  thumbnail_url TEXT,
  video_url TEXT,
  trailer_url TEXT,
  release_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create upcoming content table
CREATE TABLE public.upcoming_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('movie', 'tv')),
  genre TEXT NOT NULL,
  release_date DATE NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT,
  trailer_url TEXT,
  section_order INTEGER NOT NULL CHECK (section_order >= 1 AND section_order <= 20),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(section_order)
);

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create watchlist table for user's saved content
CREATE TABLE public.watchlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content_id UUID REFERENCES public.content(id) ON DELETE CASCADE NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, content_id)
);

-- Create viewing history table
CREATE TABLE public.viewing_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content_id UUID REFERENCES public.content(id) ON DELETE CASCADE NOT NULL,
  watched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  progress_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upcoming_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.viewing_history ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Content policies (public read, admin write)
CREATE POLICY "Anyone can view published content" 
  ON public.content 
  FOR SELECT 
  USING (status = 'Published');

CREATE POLICY "Admins can manage all content" 
  ON public.content 
  FOR ALL 
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Upcoming content policies (public read, admin write)
CREATE POLICY "Anyone can view upcoming content" 
  ON public.upcoming_content 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage upcoming content" 
  ON public.upcoming_content 
  FOR ALL 
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Profile policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Profiles are created on signup" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- User roles policies
CREATE POLICY "Users can view their own roles" 
  ON public.user_roles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" 
  ON public.user_roles 
  FOR ALL 
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Watchlist policies
CREATE POLICY "Users can manage their own watchlist" 
  ON public.watchlist 
  FOR ALL 
  USING (auth.uid() = user_id);

-- Viewing history policies
CREATE POLICY "Users can manage their own viewing history" 
  ON public.viewing_history 
  FOR ALL 
  USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'username',
    NEW.raw_user_meta_data ->> 'full_name'
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger to create profile and assign role on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample content data
INSERT INTO public.content (title, type, genre, duration, rating, description, release_year) VALUES
('The Dark Knight', 'Movie', 'Action • Crime', '152 min', '9.0', 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.', 2008),
('Stranger Things', 'TV Show', 'Sci-Fi • Horror', '8 episodes', '8.7', 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.', 2016),
('Avatar', 'Movie', 'Adventure • Sci-Fi', '162 min', '7.8', 'A paraplegic Marine dispatched to the moon Pandora joins a mission to mine a precious mineral.', 2009),
('Breaking Bad', 'TV Show', 'Crime • Drama', '62 episodes', '9.5', 'A high school chemistry teacher diagnosed with cancer turns to manufacturing drugs.', 2008),
('Inception', 'Movie', 'Sci-Fi • Action', '148 min', '8.8', 'A thief who steals corporate secrets through dream-sharing technology.', 2010),
('The Office', 'TV Show', 'Comedy', '201 episodes', '9.0', 'A mockumentary on a group of typical office workers in Scranton, Pennsylvania.', 2005),
('Interstellar', 'Movie', 'Sci-Fi • Drama', '169 min', '8.6', 'A team of explorers travel through a wormhole in space to save humanity.', 2014),
('Game of Thrones', 'TV Show', 'Fantasy • Drama', '73 episodes', '9.3', 'Nine noble families fight for control of the lands of Westeros.', 2011),
('Pulp Fiction', 'Movie', 'Crime • Drama', '154 min', '8.9', 'The lives of two mob hitmen, a boxer, and others intertwine in four tales of violence.', 1994),
('Friends', 'TV Show', 'Comedy • Romance', '236 episodes', '8.9', 'Follows the lives of six friends living in Manhattan.', 1994);

-- Insert sample upcoming content
INSERT INTO public.upcoming_content (title, type, genre, release_date, description, section_order) VALUES
('Avatar 3', 'movie', 'Sci-Fi • Adventure', '2025-12-20', 'The third installment in James Cameron''s epic Avatar saga continues the journey of Jake Sully and his family.', 1),
('Stranger Things Season 5', 'tv', 'Sci-Fi • Horror', '2025-07-15', 'The final season promises to conclude the epic battle between Hawkins and the Upside Down.', 2),
('Dune: Part Three', 'movie', 'Sci-Fi • Adventure', '2025-11-08', 'Paul Atreides continues his legendary journey as he unites the desert tribes.', 3),
('The Witcher Season 4', 'tv', 'Fantasy • Adventure', '2025-09-12', 'Geralt faces new monsters and ancient prophecies in the latest season.', 4),
('Spider-Man: Beyond the Spider-Verse', 'movie', 'Animation • Action', '2025-12-14', 'Miles Morales embarks on his most dangerous adventure yet across the multiverse.', 5);
