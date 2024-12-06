import MovieSection from "../components/movie/featured/Featured";
import MovieCarousel from "../components/slider/Slider";

export default function Home() {
  return (
    <>
      <MovieCarousel />

      <MovieSection />
    </>
  );
}
