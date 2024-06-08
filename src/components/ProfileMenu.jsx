import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext, route } from "../App";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProfileMenu = () => {
  const { setLoading } = useContext(AppContext);
  const [imageError, setImageError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const data = JSON.parse(localStorage.getItem("data"));
  const token = localStorage.getItem("token");
  const nav = useNavigate("");
  const logOut = function () {
    setLoading(true);
    axios
      .get(`${route}auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.request) {
          toast.success("Logged out successfully");
        }
      })
      .finally(() => {
        localStorage.removeItem("data");
        localStorage.removeItem("token");
        nav("/");
        setLoading(false);
      });
  };

  return (
    <div className=" relative group whitespace-nowrap">
      <div
        className="flex items-center gap-4 cursor-pointer hover:text-gold transition-all"
        onClick={() => setIsOpen(true)}
      >
        {data?.profileImg && !imageError ? (
          <img
            src={data.profileImg}
            onError={() => setImageError(true)}
            alt=""
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="bg-gray w-12 h-12 flex justify-center items-center rounded-full">
            <i className="fa-solid fa-user"></i>
          </div>
        )}
        <h2>{data?.name}</h2>
      </div>
      <div
        className={`absolute px-4 py-2 bg-goldenGray rounded-lg w-fit  right-0 -bottom-28 group-hover:block transition-all ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Link
          to="/profile"
          className=" cursor-pointer block border-b border-b-gray p-3 "
        >
          <i className="fa-solid fa-user ml-4"></i> حسابي
        </Link>
        <div className="block text-red p-3 cursor-pointer " onClick={logOut}>
          <i className="fa-solid fa-arrow-right-from-bracket ml-4"></i> تسجيل
          الخروج
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default ProfileMenu;
