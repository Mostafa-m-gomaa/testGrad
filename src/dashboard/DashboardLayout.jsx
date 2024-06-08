import { Navigate, Outlet, useLocation } from "react-router";
import DashHeader from "../components/DashHeader";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import TickerTape from "../components/TradingViewWidget ";
import { AppContext, route } from "../App";
import toast from "react-hot-toast";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const data = JSON.parse(localStorage.getItem("data"));
  const nav = useNavigate();
  const { setLoading } = useContext(AppContext);
  const onActive = () => {
    setLoading(true);
    fetch(`${route}auth/sendVerifyCode`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.succes === "true") {
          toast.success("لقد قمنا بارسال رمز لبريدك الالكتروني");
       
          nav("/active");
        }
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (!data?.emailVerified) {
      onActive();
    }
  }, []);

  if (!token) {
    return <Navigate state={{ from: location }} replace to="/login" />;
  }

  return (
    <>
      <DashHeader />
      <div className="flex">
        <div className="hidden lg:block w-[250px] border-l rounded-tl-3xl border-gray">
          <Sidebar />
        </div>
        <div className="bashboardBg dashboarOutLet w-full">
          {/* <div className="w-full  lg:hidden">
            <TickerTape />
          </div> */}
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
