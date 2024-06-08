import { useContext, useState } from "react";

import authPhoto from "../assets/auth.webp";
import axios from "axios";
import { AppContext, route } from "../App";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router";
const Active = () => {
  const nav = useNavigate();
  const [code, setCode] = useState("");

  const { setLoading } = useContext(AppContext);

  const token = localStorage.getItem("token");
  const handelSubmit = function (e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `${route}auth/verifyEmail`,
        JSON.stringify({
          verifyCode: code,
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success("Done");
        if (res.data) {
          localStorage.setItem("data", JSON.stringify(res.data.data));
          localStorage.setItem("token", res.data.token);
          nav("/dashboard");
        }
      })
      .catch((err) => {
        if (err?.response?.status === 500) {
          toast.error("verification code invalid or expired");
        }
      })
      .finally(() => setLoading(false));
  };
  const reSend = function () {
    setLoading(true);
    axios
      .get(`${route}auth/sendVerifyCode`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Done");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="mainBg">
      <div className="py-16 container mx-auto md:grid grid-cols-2">
        <div className="mx-auto w-fit text-center">
          <img src={authPhoto} className="mx-auto" alt="" />
          <h1 className="text-3xl font-semibold my-6">
            تاكيد بريدك الالكتروني
          </h1>
          <p className="text-xl  my-4">
            لقد قمنا بارسال الرمز الي بريدك الالكتروني{" "}
          </p>
        </div>
        <form
          onSubmit={(e) => handelSubmit(e)}
          action=""
          className="max-w-[450px]  my-8 md:my-0 mx-auto bg-blackGold p-6 flex items-center justify-center flex-col rounded-xl gap-5"
        >
          <h2 className="text-xl font-semibold my-6">
            ادخل الرمز المكون من 6 ارقام
          </h2>

          <div className="relative w-full">
            <div className="absolute top-[50%] translate-y-[-50%] right-2 w-10 h-10 bg-lightGold text-gold text-xl rounded-full flex justify-center items-center">
              <i className="fa-solid fa-user"></i>
            </div>
            <input
              type="text"
              required
              onChange={(e) => setCode(e.target.value)}
              placeholder="الرمز المرسل اليك"
              className="w-full bg-goldenGray placeholder:text-lightGray px-4 pt-3 pb-4 text-xl pr-16 rounded-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gold py-4 rounded-full text-dark font-semibold text-xl"
          >
            ارسال
          </button>
          <span className="text-gold" onClick={reSend}>
            اعادة ارسال الرمز
          </span>
        </form>
      </div>
    </div>
  );
};

export default Active;
