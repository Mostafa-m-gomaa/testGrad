import { useContext } from "react";
import { AppContext } from "../App";

const GoogleTransTwo = () => {
  const { setTransOpen } = useContext(AppContext);
  return (
    <div
      onClick={() => setTransOpen(true)}
      className=" flex items-center justify-center font-semibold gap-4 border border-gray px-3 py-2 rounded-lg hover:bg-[#fff] hover:text-dark transition"
    >
      <i className="fa-solid fa-globe text-[#fffff] "></i>
      تغير اللغة
    </div>
  );
};

export default GoogleTransTwo;
