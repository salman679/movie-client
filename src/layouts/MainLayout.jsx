import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import MovieCarousel from "../components/slider/Slider";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <MovieCarousel />
      </div>
      <Footer />
    </>
  );
}
