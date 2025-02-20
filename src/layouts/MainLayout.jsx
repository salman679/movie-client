import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="bg-gray-900 dark:text-white">
        <div className="container min-h-screen mx-auto px-6 ">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
