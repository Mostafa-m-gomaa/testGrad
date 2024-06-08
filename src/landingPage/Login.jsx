import { useContext, useEffect, useState } from "react";

import authPhoto from "../assets/logo.png";
import data from "../vlaue";
import axios from "axios";
import { AppContext, route } from "../App";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
const Login = () => {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isRegister, setIsRegister] = useState(false);
  const [inviteId, setInviteId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPawword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setLoading } = useContext(AppContext);
  useEffect(() => {
    if (searchParams.get("inviteId")) {
      setIsRegister(true);
      setInviteId(searchParams.get("inviteId"));
    }
  }, []);
  const handelSubmit = function (e) {
    e.preventDefault();
    setLoading(true);
    if (!isRegister) {
    
      axios
        .post(
          `${route}auth/login`,
          JSON.stringify({
            email,
            password,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          console.log(res);
          setLoading(false);
          toast.success("Done");
          if (res.data) {
            localStorage.setItem("data", JSON.stringify(res.data.data));
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userName", res.data.data.username);
            localStorage.setItem("role", res.data.data.role);
            nav("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.msg);
          if (err.response.status === 429) toast.error(err.response.data);
          if (err?.response?.status === 401) {
            toast.error("invalid email or password");
          }
        })
        .finally(() => setLoading(false));
    } else {
      // register
      const myData = {
        username: name,
        email: email,
        country: country,
        password: password,
        passwordConfirm: confirmPassword,
      };
      if (inviteId) myData.invitor = inviteId;
      axios
        .post(`${route}auth/signup`, JSON.stringify(myData), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          toast.success("Done");
          if (res.data) {
            localStorage.setItem("data", JSON.stringify(res.data.data));
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userName", res.data.data.username);
            localStorage.setItem("role", res.data.data.role);
          }

          nav("/active");
        })
        .catch((err) => {
          if (err?.response?.data?.errors?.length) {
            err?.response?.data?.errors.map((error) => {
              toast.error(error.msg);
            });
          }
        })
        .finally(() => setLoading(false));
    }
  };
  return (
    <div className="mainBg py-24">
      <div className="my-16 container mx-auto md:grid grid-cols-2">
        <div className="mx-auto w-fit text-center">
          <img src={authPhoto} className="mx-auto" alt="" />
          <h1 className="text-3xl font-semibold my-6">
            {isRegister ? "حساب جديد" : "تسجيل الدخول"}
          </h1>
          <p className="text-xl  my-4">
            {isRegister ? (
              <>
                لديك حساب بالفعل؟ اذا يمكنك{" "}
                <span
                  className="text-gold cursor-pointer"
                  onClick={() => setIsRegister((prev) => !prev)}
                >
                  تسجيل الدخول
                </span>
              </>
            ) : (
              <>
                لديك حساب؟ اذا يمكنك{" "}
                <span
                  className="text-gold cursor-pointer"
                  onClick={() => setIsRegister((prev) => !prev)}
                >
                  انشاء حساب جديد
                </span>
              </>
            )}
          </p>
        </div>
        <form
          onSubmit={(e) => handelSubmit(e)}
          action=""
          className="py-12  my-8 md:my-0 mx-auto bg-blackGold p-6 flex items-center justify-center flex-col rounded-xl gap-5"
        >
          {isRegister && (
            <div className="relative w-full">
              <div className="absolute top-[50%] translate-y-[-50%] right-2 w-10 h-10 bg-lightGold text-gold text-xl rounded-full flex justify-center items-center">
                <i className="fa-solid fa-user"></i>
              </div>
              <input
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="الاسم"
                className="w-full bg-goldenGray placeholder:text-lightGray px-4 pt-3 pb-4 text-xl pr-16 rounded-full"
              />
            </div>
          )}
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
          {isRegister && (
            <div className="relative  w-full">
              <div className="absolute top-[50%] translate-y-[-50%] right-2 w-10 h-10 bg-lightGold text-gold text-xl rounded-full flex justify-center items-center">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <select
                type="email"
                onChange={(e) => setCountry(e.target.value)}
                required
                placeholder="البريد الالكتروني"
                className="w-full bg-goldenGray px-4 pt-3 pb-4 text-xl pr-16 rounded-full text-lightGray"
              >
                <option value="" disabled selected>
                  الدولة
                </option>
                {data.map((item) => (
                  <option key={item.value}>{item.value}</option>
                ))}
              </select>
            </div>
          )}

          <div className="relative  w-full">
            <div className="absolute top-[50%] translate-y-[-50%] right-2 w-10 h-10 bg-lightGold text-gold text-xl rounded-full flex justify-center items-center">
              <i className="fa-solid fa-lock"></i>
            </div>
            <input
              type="password"
              required
              onChange={(e) => setPawword(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full bg-goldenGray px-4 pt-3 pb-4 text-xl pr-16 rounded-full placeholder:text-lightGray"
            />
          </div>
          {isRegister && (
            <div className="relative  w-full">
              <div className="absolute top-[50%] translate-y-[-50%] right-2 w-10 h-10 bg-lightGold text-gold text-xl rounded-full flex justify-center items-center">
                <i className="fa-solid fa-lock"></i>
              </div>
              <input
                type="password"
                required
                pattern={password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="تاكيد كلمة المرور"
                className="w-full bg-goldenGray px-4 pt-3 pb-4 text-xl pr-16 rounded-full placeholder:text-lightGray"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gold py-4 rounded-full font-semibold text-xl"
          >
            {isRegister ? "انشاء حساب" : "تسجيل دخول"}
          </button>
          {!isRegister && (
            <Link to="/resetepassword" className="text-darkGold font-semibold">
              نسيت كلمة المرور
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
