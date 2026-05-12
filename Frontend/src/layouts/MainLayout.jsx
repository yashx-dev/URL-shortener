import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
