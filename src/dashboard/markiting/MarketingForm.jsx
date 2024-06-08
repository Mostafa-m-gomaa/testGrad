import axios from "axios";
import { useContext, useState } from "react";
import { AppContext, route } from "../../App";
import toast from "react-hot-toast";

const MarketingForm = () => {
  const { setLoading } = useContext(AppContext);
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({
    fullName: "",
    country: "",
    city: "",
    birthDate: "",
    currentWork: "",
    ansOfQuestion: "",
    facebook: "",
    instgram: "",
    tiktok: "",
    telegram: "",
    identity: null,
    paymentMethod: "",
  });
  const setValues = function (value, key) {
    setUserData((prev) => {
      return { ...prev, [key]: value };
    });
  };
  const onSubmit = function (e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    axios
      .post(`${route}marketingReq`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Done");
      })
      .catch((err) => {
        if (err?.response?.data?.msg) {
          toast.error(err?.response?.data?.msg);
        } else if (err?.response?.data?.errors?.length) {
          err?.response?.data?.errors.map((error) => {
            toast.error(error.msg);
          });
        } else {
          toast.error("something went wrong");
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="p-6 bg-dark rounded-2xl border border-gray m-6 sm:m-12">
      <h2 className="font-semibold text-center text-xl">
        سجل كمسوق وضاعف ارباحك
      </h2>
      <p className="text-[gray] text-sm my-6 ">
        ملاحظه يجب ان تكون معلوماتك مطابقه للوثائق الرسميه التي سوف تقدمها (هويه
        ، جواز سفر ، اجازه سائق) و تغيير هذه المعلومات يكون حصرا عن طريق البريد
        الالكتروني والتواصل مع الشركه
      </p>
      <form className="space-y-4" onSubmit={(e) => onSubmit(e)}>
        <div className="space-y-3">
          <label>الاسم بالكامل :</label>
          <input
            type="text"
            placeholder="الاسم"
            required
            minLength={2}
            onChange={(e) => setValues(e.target.value, "fullName")}
            className=" w-full py-2 bg-dark border border-goldenGray px-6  rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label>مكان الإقامة :</label>
          <div className="flex gap-3">
            <input
              required
              minLength={2}
              type="text"
              placeholder="البلد"
              onChange={(e) => setValues(e.target.value, "country")}
              className=" w-full py-2 bg-dark border border-goldenGray px-6  rounded-md"
            />
            <input
              required
              minLength={2}
              type="text"
              placeholder="المدينة"
              onChange={(e) => setValues(e.target.value, "city")}
              className=" w-full py-2 bg-dark border border-goldenGray px-6  rounded-md"
            />
          </div>
        </div>
        <div className="space-y-3">
          <label>تاريخ الميلاد :</label>
          <input
            required
            type="date"
            onChange={(e) => setValues(e.target.value, "birthDate")}
            className=" w-full py-2 bg-dark border border-goldenGray px-6  rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label>العمل الحالي :</label>
          <input
            type="text"
            placeholder="العمل"
            minLength={5}
            required
            onChange={(e) => setValues(e.target.value, "currentWork")}
            className=" w-full py-2 bg-dark border border-goldenGray px-6  rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label>
            لماذا تود ان تكون مرشد للتداول ف الاسواق الماليه مع مؤسسه نيو نورمال :
          </label>
          <input
            type="text"
            placeholder="الإجابة"
            required
            minLength={50}
            onChange={(e) => setValues(e.target.value, "ansOfQuestion")}
            className=" w-full py-2 bg-dark border border-goldenGray px-6  rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label>حسابك علي فيسبوك :</label>
          <input
            type="text"
            placeholder="https://example"
            required
            onChange={(e) => setValues(e.target.value, "facebook")}
            className=" w-full py-2 bg-dark border border-goldenGray px-6  rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label>حسابك علي انستجرام :</label>
          <input
            type="text"
            placeholder="https://example"
            required
            onChange={(e) => setValues(e.target.value, "instgram")}
            className=" w-full py-2 bg-dark border border-goldenGray px-6  rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label>حسابك علي تيكتوك :</label>
          <input
            type="text"
            placeholder="https://example"
            required
            onChange={(e) => setValues(e.target.value, "tiktok")}
            className=" w-full py-2 bg-dark border border-goldenGray px-6  rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label>حسابك علي تيليجرام :</label>
          <input
            type="text"
            placeholder="https://example"
            required
            onChange={(e) => setValues(e.target.value, "telegram")}
            className=" w-full py-2 bg-dark border border-goldenGray px-6  rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label>إثبات الهوية : (Pdf)</label>
          <input
            type="file"
            required
            // accept=".pdf"
            onChange={(e) => setValues(e.target.files[0], "identity")}
            className=" w-full py-2 bg-dark border border-goldenGray px-6  rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label>Cv : (Pdf)</label>
          <input
            type="file"
            required
            // accept=".pdf"
            onChange={(e) => setValues(e.target.files[0], "identity")}
            className=" w-full py-2 bg-dark border border-goldenGray px-6  rounded-md"
          />
        </div>
        <div className="space-y-3">
          <label>طريقه الحصول علي العمولات :</label>
          <select
            required
            onChange={(e) => setValues(e.target.value, "paymentMethod")}
            className=" w-full py-2 bg-dark border border-goldenGray px-6  rounded-md"
          >
            <option value="" disabled selected></option>
            <option value="wise">wise</option>
            <option value="crypto">crypto</option>
          </select>
        </div>
        <button
          type="submit"
          className="font-semibold text-dark bg-gold px-10 py-2 rounded-xl mx-auto block w-fit"
        >
          سجل
        </button>
      </form>
    </div>
  );
};

export default MarketingForm;
