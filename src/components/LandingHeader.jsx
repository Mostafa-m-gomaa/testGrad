import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import GoogleTransTwo from "./GoogleTransTwo";
import { useState } from "react";
import TickerTape from "./TradingViewWidget ";
import ThemeChanger from "./ThemeChanger";
import './sass-folder/header.css'
         {/* <GoogleTransTwo /> */}
            {/* <ThemeChanger /> */}
const LandingHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");

  return (
  
      <div className="header" data-aos="fade-down"  data-aos-duration="2000">
        <div className="in-header">
         
            <Link
              to={token ? "/dashboard" : "/login"}
              className="login-btn"
            >
              {token ? "اذهب الي الصفحة الرئيسية" : "تسجيل الدخول"}
            </Link>
   
          
          
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "active" : ""
                } pt-1 pb-2 px-2 rounded-lg mx-2 block w-fit`
              }
            >
              الصفحة الرئيسية
            </NavLink>
            <a
              href="#prod"
              className={({ isActive }) =>
                `${
                  isActive ? "active" : ""
                } pt-1 pb-2 px-2 rounded-lg mx-2 block w-fit`
              }
            >
            الأقسام
            </a>
            {/* <a
             href="#packs"
              className={({ isActive }) =>
                `${
                  isActive ? "active " : ""
                } pt-1 pb-2 px-2 rounded-lg mx-2 block w-fit`
              }
            >
              الباقات
            </a> */}
            <a
              href="#leads"
              className={({ isActive }) =>
                `${
                  isActive ? "active" : ""
                } pt-1 pb-2 px-2 rounded-lg mx-2 block w-fit`
              }
            >
              القيادة
            </a>
            <a
              href="#who"
              className={({ isActive }) =>
                `${
                  isActive ? "active" : ""
                } pt-1 pb-2 px-2 rounded-lg mx-2 block w-fit`
              }
            >
              تعرف علينا
            </a>
          


          {/* dwdwdwdwdwdwddwd */}
          <div
            className="lg:hidden cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <i className="fa-solid fa-bars text-4xl"></i>
          </div>{" "}
          <Link to={"/"}>
            <img src={logo} alt="Logo" className="logo" />
          </Link>{" "}
          {isOpen && (
            <div className=" animation lg:hidden fixed h-full flex w-full right-0 top-0 z-50">
              <div className="overflow-y-auto bg-blackGold w-1/2 p-4 text-sm flex flex-col gap-6 items-center">
                <img src={logo} alt="Logo" className="h-18" />
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-lightGold " : ""
                    } pt-1 pb-2 px-2 rounded-lg mx-2 block w-fit`
                  }
                >
                  الصفحة الرئيسية
                </NavLink>
                <NavLink
                  to="/productsLanding"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-lightGold " : ""
                    } pt-1 pb-2 px-2 rounded-lg mx-2 block w-fit`
                  }
                >
                  المنتجات
                </NavLink>
                <NavLink
                  to="/memberShip"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-lightGold " : ""
                    } pt-1 pb-2 px-2 rounded-lg mx-2 block w-fit`
                  }
                >
                  فوائد الاشتراك
                </NavLink>
                <NavLink
                  to="/leaderShip"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-lightGold " : ""
                    } pt-1 pb-2 px-2 rounded-lg mx-2 block w-fit`
                  }
                >
                  مركز القيادة
                </NavLink>
                <Link
                  to={token ? "/dashboard" : "/login"}
                  className="bg-gold h-[40px] px-[12px] flex items-center justify-center rounded-lg"
                >
                  {token ? "الذاهب للداشبورد" : "تسجيل الدخول"}
                </Link>
                <GoogleTransTwo />
              </div>

              <div
                className="flex-1 bg-[#000] bg-opacity-75"
                onClick={() => setIsOpen(false)}
              />
            </div>
          )}
        </div>
{/* 
        {isOpen && (
          <div className=" animation lg:hidden fixed h-full flex w-full right-0 top-0 z-50">
            <div className="overflow-y-auto bg-blackGold w-1/2 p-4 text-sm flex flex-col gap-6 items-center">
              <img src={logo} alt="Logo" className="h-14" />
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-lightGold " : ""
                  } pt-1 pb-2 px-2 rounded-lg mx-2 block w-fit`
                }
              >
                الصفحة الرئيسية
              </NavLink>
              <NavLink
                to="/productsLanding"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-lightGold " : ""
                  } pt-1 pb-2 px-2 rounded-lg mx-2 block w-fit`
                }
              >
                المنتجات
              </NavLink>
              <NavLink
                to="/memberShip"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-lightGold " : ""
                  } pt-1 pb-2 px-2 rounded-lg mx-2 block w-fit`
                }
              >
                فوائد الاشتراك
              </NavLink>
              <NavLink
                to="/leaderShip"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-lightGold " : ""
                  } pt-1 pb-2 px-2 rounded-lg mx-2 block w-fit`
                }
              >
                مركز القيادة
              </NavLink>
              <Link
                to={token ? "/dashboard" : "/login"}
                className="bg-gold h-[40px] px-[12px] flex items-center justify-center rounded-lg"
              >
                {token ? "الذاهب للداشبورد" : "تسجيل الدخول"}
              </Link>
              <ThemeChanger />
              <GoogleTransTwo />
            </div>

            <div
              className="flex-1 bg-[#000] bg-opacity-75"
              onClick={() => setIsOpen(false)}
            />
          </div>
        )} */}
      {/* <TickerTape /> */}
      {/* <EconomicCalendar /> */}
    
      </div>
  );
};

export default LandingHeader;
