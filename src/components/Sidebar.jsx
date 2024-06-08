import { Link, NavLink, useNavigate } from "react-router-dom";
import GoogleTransTwo from "./GoogleTransTwo";
import { useContext } from "react";
import { AppContext, route } from "../App";

import { toast } from "react-hot-toast";
import ThemeChanger from "./ThemeChanger";

const Sidebar = () => {
  const data = JSON.parse(localStorage.getItem("data"));

  const token = localStorage.getItem("token");

  const { cart, setLoading } = useContext(AppContext);
  const nav = useNavigate();
  const onActive = async () => {
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
          nav("/active");
        }
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setLoading(false));
  };
  return (
    <div className="w-full p-6">
      {data?.emailVerified === false && (
        <div
          onClick={onActive}
          className="my-4 cursor-pointer w-full text-center bg-red text-re py-2 rounded-xl"
        >
          تفعيل بريدك الالكتروني
        </div>
      )}
      <div>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-gold text-dark"
                : "hover:bg-gold hover:text-dark transition-all"
            } pt-2 pb-3 px-2 rounded-lg  block w-full text-xl whitespace-nowrap`
          }
        >
          <i className="fa-solid fa-house ml-3"></i>
          الصفحة الرئيسية
        </NavLink>
      </div>
      <div className="border-y border-y-gray py-6 my-4">
        <NavLink
          to="/education"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-gold text-dark"
                : "hover:bg-gold hover:text-dark transition-all"
            } pt-2 pb-3 px-2 rounded-lg  block w-full text-xl `
          }
        >
          <i className="fa-solid fa-graduation-cap ml-3"></i>
          الكورسات
        </NavLink>
    
        <NavLink
          to="/lives"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-gold text-dark"
                : "hover:bg-gold hover:text-dark transition-all"
            } pt-2 pb-3 px-2 rounded-lg  block w-full text-xl `
          }
        >
          <i className="fa-solid fa-house-signal ml-3"></i>
          البث المباشر
        </NavLink>
     {localStorage.getItem("role") === "instructor" ? null :    <NavLink
          to="/instructor-request"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-gold text-dark"
                : "hover:bg-gold hover:text-dark transition-all"
            } pt-2 pb-3 px-2 rounded-lg  block w-full text-xl `
          }
        >
         <i class="fa-solid fa-person-chalkboard"></i>
         التقديم كمدرس
        </NavLink>}
      </div>
      <div className="border-b border-b-gray py-6 my-4">
        {/* <NavLink
          to="/packages"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-gold text-dark"
                : "hover:bg-gold hover:text-dark transition-all"
            } pt-2 pb-3 px-2 rounded-lg  block w-full text-xl `
          }
        >
          <i className="fa-solid fa-cube ml-3"></i>
          الباقات
        </NavLink> */}
        {/* <NavLink
          to="/store"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-gold text-dark"
                : "hover:bg-gold hover:text-dark transition-all"
            } pt-2 pb-3 px-2 rounded-lg  block w-full text-xl my-2 `
          }
        >
          <i className="fa-solid fa-bag-shopping ml-3"></i>
          المتجر
        </NavLink> */}
        {/* <NavLink
          to="/freestore"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-gold text-dark"
                : "hover:bg-gold hover:text-dark transition-all"
            } pt-2 pb-3 px-2 rounded-lg  block w-full text-xl whitespace-nowrap my-2 `
          }
        >
          <i className="fa-solid fa-bag-shopping ml-3"></i>
          المنتجات المجانية
        </NavLink> */}
 
      </div>
      {/* <div>
        <div className="flex justify-center my-4">
          <ThemeChanger />
        </div>
        <GoogleTransTwo />
        <Link
          to={"/cart"}
          className="my-2 flex items-center justify-center font-semibold gap-4 border border-gray px-3 py-2 rounded-lg hover:bg-[#fff] hover:text-dark transition"
        >
          <i className="fa-solid fa-cart-shopping text-[#fffff] "></i>
          السلة{" "}
          <span className="flex justify-center items-center w-8 h-8 rounded-full bg-gold text-dark font-semibold">
            {cart?.cartItems?.length}
          </span>
        </Link>
      </div> */}
    </div>
  );
};

export default Sidebar;
