import { useContext, useState } from "react";
import { AppContext, route } from "../../App";
import axios from "axios";
import { toast } from "react-hot-toast";

import data from "../../vlaue";
import ProfileImage from "./imageCrop/ProfileImage";

const EditData = () => {
  const token = localStorage.getItem("token");
  const dataa = JSON.parse(localStorage.getItem("data"));
  const [isOpen, setIsOpen] = useState(false);
  const { setLoading } = useContext(AppContext);
  const [name, setName] = useState(dataa.name);
  const [profileImg, setProfileImg] = useState(null);
  const [phone, setPhone] = useState(dataa?.phone);
  const [country, setCountry] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImg(file);
    } else {
      setProfileImg(null);
    }
  };

  const handelSubmit = function (e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (name) {
      formData.append("name", name);
    }
    if (phone) {
      formData.append("phone", phone);
    }
    if (country) {
      formData.append("country", country);
    }
    if (profileImg) {
      formData.append("profileImg", profileImg);
    }
    axios
      .put(`${route}users/changeMyData`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Done");
        if (res.data) {
          localStorage.setItem("data", JSON.stringify(res.data.data));
        }
        setIsOpen(false);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        if (err?.response?.status === 400) {
          toast.error("invalid data");
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
            {profileImg && (
              <ProfileImage
                profileImg={profileImg}
                setProfileImg={setProfileImg}
              />
            )}

            <div className="relative  w-full">
              <div className="absolute top-[50%] translate-y-[-50%] right-2 w-10 h-10 bg-lightGold text-gold text-xl rounded-full flex justify-center items-center">
                <i className="fa-regular fa-user"></i>
              </div>
              <input
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="ادخل الاسم الجديد"
                value={name}
                className="w-full bg-goldenGray px-4 pt-3 pb-4 text-xl pr-16 rounded-full placeholder:text-lightGray"
              />
            </div>
            <div className="relative  w-full">
              <div className="absolute top-[50%] translate-y-[-50%] right-2 w-10 h-10 bg-lightGold text-gold text-xl rounded-full flex justify-center items-center">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <select
                type="email"
                onChange={(e) => setCountry(e.target.value)}
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
            <div className="relative  w-full">
              <div className="absolute top-[50%] translate-y-[-50%] right-2 w-10 h-10 bg-lightGold text-gold text-xl rounded-full flex justify-center items-center">
                <i className="fa-solid fa-phone"></i>
              </div>
              <input
                type="text"
                minLength={10}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="ادخل رقم الهاتف"
                value={phone}
                className="w-full bg-goldenGray px-4 pt-3 pb-4 text-xl pr-16 rounded-full placeholder:text-lightGray"
              />
            </div>
            <div className="relative  w-full">
              <div className="absolute top-[50%] translate-y-[-50%] right-2 w-10 h-10 bg-lightGold text-gold text-xl rounded-full flex justify-center items-center">
                <i className="fa-solid fa-image"></i>
              </div>
              <input
                type="file"
                onChange={handleImageChange}
                placeholder="قم برفع صورتك"
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
        تعديل الحساب
      </div>
    </div>
  );
};

export default EditData;
