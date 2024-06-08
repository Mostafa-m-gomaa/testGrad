import logo from "../assets/logo.png";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import TickerTape from "./TradingViewWidget ";
const DashHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-b-gray py-2">
      <div className="px-2 md:px-4 container mx-auto flex justify-between gap-8 py-3 items-center">
        <div className="hidden lg:block">
          <ProfileMenu />
        </div>
        <div
          className="lg:hidden cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <i className="fa-solid fa-bars text-4xl"></i>
        </div>
        {isOpen && (
          <div className=" animation lg:hidden fixed h-full flex min-w-full right-0 top-0 z-50">
            <div className="overflow-y-auto bg-blackGold min-w-1/2 p-4 text-sm flex flex-col gap-6 items-center">
              <Link to={"/dashboard"}>
                <img src={logo} alt="Logo" className="h-12" />
              </Link>
              <Sidebar />
              <ProfileMenu />
            </div>
            <div
              className="flex-1 bg-[#000] bg-opacity-75"
              onClick={() => setIsOpen(false)}
            />
          </div>
        )}
        {/* <div className="w-full hidden lg:block">
          <TickerTape />
        </div> */}

        <Link to={"/dashboard"}>
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
      </div>
    </div>
  );
};

export default DashHeader;
