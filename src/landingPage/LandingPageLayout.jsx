import { Outlet } from "react-router";
import Footer from "../components/Footer";
import LandingHeader from "../components/LandingHeader";
import HeaderOne from "../components/header/Header";


const LandingPageLayout = () => {
  return (
    <div style={{
      height: "fit-content",
    }}>
      <HeaderOne />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
