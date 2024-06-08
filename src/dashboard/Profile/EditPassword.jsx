import { useContext, useState } from "react";
import { AppContext, route } from "../../App";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setLoading } = useContext(AppContext);
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const token = localStorage.getItem("token");
  const handelSubmit = function (e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("currentPassword", current);
    formData.append("password", password);
    formData.append("passwordConfirm", confirm);
    axios
      .put(`${route}users/changeMyPassword`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("Done");
        if (res.data) {
          localStorage.setItem("data", JSON.stringify(res.data.data));
          localStorage.setItem("token", res.data.token);
        }
        setIsOpen(false);
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          toast.error("invalid current password");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed w-full h-full bg-[#000] bg-opacity-75 flex justify-center items-center top-0 right-0 z-[1000]">
          <form
            onSubmit={(e) => handelSubmit(e)}
            action=""
            className="max-w-[450px]  my-8 md:my-0 mx-auto bg-blackGold p-6 flex items-center justify-center flex-col rounded-xl gap-5"
          >
            <div
              onClick={() => setIsOpen(false)}
              className="bg-lightGold text-gold w-1/2 text-center p-3 cursor-pointer rounded-xl text-2xl"
            >
              الغاء
            </div>
            <div className="relative  w-full">
              <div className="absolute top-[50%] translate-y-[-50%] right-2 w-10 h-10 bg-lightGold text-gold text-xl rounded-full flex justify-center items-center">
                <i className="fa-solid fa-lock"></i>
              </div>
              <input
                type="password"
                required
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="كلمة المرور الحالية"
                className="w-full bg-goldenGray px-4 pt-3 pb-4 text-xl pr-16 rounded-full placeholder:text-lightGray"
              />
            </div>
            <div className="relative  w-full">
              <div className="absolute top-[50%] translate-y-[-50%] right-2 w-10 h-10 bg-lightGold text-gold text-xl rounded-full flex justify-center items-center">
                <i className="fa-solid fa-lock"></i>
              </div>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور الجديدة"
                className="w-full bg-goldenGray px-4 pt-3 pb-4 text-xl pr-16 rounded-full placeholder:text-lightGray"
              />
            </div>
            <div className="relative  w-full">
              <div className="absolute top-[50%] translate-y-[-50%] right-2 w-10 h-10 bg-lightGold text-gold text-xl rounded-full flex justify-center items-center">
                <i className="fa-solid fa-lock"></i>
              </div>
              <input
                type="password"
                required
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="تاكيد كلمة المرور"
                className="w-full bg-goldenGray px-4 pt-3 pb-4 text-xl pr-16 rounded-full placeholder:text-lightGray"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold py-4 rounded-full text-dark font-semibold text-xl"
            >
              تعديل
            </button>
          </form>
        </div>
      )}
      <div
        className="cursor-pointer flex items-center justify-center w-[200px] h-[40px] bg-gold text-dark gap-4 font-semibold rounded-2xl"
        onClick={() => setIsOpen(true)}
      >
        <i className="fa-solid fa-pen"></i>
        تعديل كلمة المرور
      </div>
    </div>
  );
};

export default EditPassword;
