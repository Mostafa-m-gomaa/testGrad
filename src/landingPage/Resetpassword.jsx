import { useContext, useState } from "react";

import authPhoto from "../assets/auth.webp";
import axios from "axios";
import { AppContext, route } from "../App";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
const Resetepassword = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const { setLoading } = useContext(AppContext);
  const handelSubmit = function (e) {
    e.preventDefault();
    axios
      .post(
        `${route}auth/forgotPassword`,
        JSON.stringify({
          email,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        toast.success("we sent code to your email");
        nav("/resetecode");
      })
      .catch((err) => {
        if (err.response.status === 429) toast.error(err.response.data);
        if (err?.response?.data?.message) {
          toast.error(err?.response?.data?.message);
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="mainBg py-24">
      <div className="my-16 container mx-auto md:grid grid-cols-2">
        <div className="mx-auto w-fit text-center">
          <img src={authPhoto} className="mx-auto" alt="" />
          <h1 className="text-3xl font-semibold my-6">نسيت كلمة المرور</h1>
        </div>
        <form
          onSubmit={(e) => handelSubmit(e)}
          action=""
          className="py-12  my-8 md:my-0 mx-auto bg-blackGold p-6 flex items-center justify-center flex-col rounded-xl gap-5"
        >
          <h1 className="my-4 text-2xl">ادخل بريدك الالتكروني</h1>
          <div className="relative  w-full">
            <div className="absolute top-[50%] translate-y-[-50%] right-2 w-10 h-10 bg-lightGold text-gold text-xl rounded-full flex justify-center items-center">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الالكتروني"
              className="w-full bg-goldenGray px-4 pt-3 pb-4 text-xl pr-16 rounded-full placeholder:text-lightGray"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gold py-4 rounded-full text-dark font-semibold text-xl"
          >
            التالي
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetepassword;
