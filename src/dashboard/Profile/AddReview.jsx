import { useContext, useState } from "react";
import { AppContext, route } from "../../App";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddReview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setLoading, theme } = useContext(AppContext);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [updateId, setUpdateId] = useState("");
  const token = localStorage.getItem("token");

  const getReview = () => {
    axios
      .get(`${route}systemReviews/getMyReview`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.data._id) {
          setRating(res.data.data.ratingsAverage);
          setReview(res.data.data.opinion);
          setUpdateId(res.data.data._id);
        }
      });
  };
  useState(() => {
    getReview();
  }, []);
  const handelSubmit = function (e) {
    e.preventDefault();
    setLoading(true);
    if (updateId) {
      axios
        .put(
          `${route}systemReviews/${updateId}`,
          { opinion: review, ratingsAverage: rating },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success("تم تحديث تقييمك");
          getReview();
          setIsOpen(false);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            toast.error(
              "لا يمكنك اضافه تقييم الا بعد المشاركه في كورسات بقيمه 100 دولار او اكتر"
            );
          }
        })
        .finally(() => setLoading(false));
    } else {
      axios
        .post(
          `${route}systemReviews`,
          { opinion: review, ratingsAverage: rating },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success("تم اضافه تقييمك");
          getReview();
          setIsOpen(false);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            toast.error(
              "لا يمكنك اضافه تقييم الا بعد المشاركه في كورسات بقيمه 100 دولار او اكتر"
            );
          }
        })
        .finally(() => setLoading(false));
    }
  };
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <i
        className={`fa-solid fa-star fa-xl ${
          index + 1 <= rating ? "text-gold" : "text-[gray]"
        }`}
        onClick={() => setRating(index + 1)}
        key={index}
      ></i>
    ));
  };
  const deleteReview = () => {
    setLoading(true);
    axios
      .delete(`${route}systemReviews/${updateId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("تم حذف تقييمك");
          setIsOpen(false);
          setUpdateId("");
          setRating(1);
          setReview("");
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
                <i className="fa-solid fa-comment"></i>{" "}
              </div>
              <input
                type="text"
                value={review}
                required
                onChange={(e) => setReview(e.target.value)}
                placeholder="رايك في الموقع"
                className="w-full bg-goldenGray px-4 pt-3 pb-4 text-xl pr-16 rounded-full placeholder:text-lightGray"
              />
            </div>
            <div style={{ direction: "ltr" }}>
              <h3 className="mb-6 font-semibold">تقييمك للموقع من 5 نجوم</h3>
              <div className="flex gap-4">{renderStars()}</div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-gold py-4 rounded-full text-dark font-semibold text-xl"
            >
              {updateId ? "تعديل" : "ارسال"}
            </button>
            {updateId && (
              <button
                type="button"
                onClick={deleteReview}
                className="w-full bg-red text-[white] py-4 rounded-full text-dark font-semibold text-xl"
              >
                حذف تقييمي
              </button>
            )}
          </form>
        </div>
      )}
      <div
        className="cursor-pointer flex items-center justify-center w-[200px] h-[40px] bg-gold text-dark gap-4 font-semibold rounded-2xl"
        onClick={() => setIsOpen(true)}
      >
        <i className="fa-solid fa-star"></i> تقييم الموقع
      </div>
    </div>
  );
};

export default AddReview;
