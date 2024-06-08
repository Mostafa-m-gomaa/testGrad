import { useEffect, useState } from "react";
import { route } from "../App";
import axios from "axios";
import DashboardSlide from "../components/DashboardSlide";
import LoadingSpinner from "../landingPage/components/LoadingSpinner";
import PackagesGrid from "../components/PackagesGrid";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    axios
      .get(`${route}education/packages?sort=-price`)
      .then((res) => setPackages(res.data.data));
  }, []);

  return (
    <div>
      <DashboardSlide />

      <div className="w-full max-w-[100vw] p-4  ">
        {packages?.length ? (
          <PackagesGrid packages={packages} />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default Packages;
