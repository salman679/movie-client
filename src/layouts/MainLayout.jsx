import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-6">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
