import { useEffect } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="bg-gray-900 text-white">
        <div className="container min-h-screen mx-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
