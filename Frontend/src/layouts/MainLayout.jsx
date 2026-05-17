import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <hr />
      <Outlet />
      <hr />
      <Footer />
    </>
  );
};

export default MainLayout;
