import axios from "axios";
import { useContext, useState } from "react";

import { AppContext, route } from "../../App";
import { toast } from "react-hot-toast";

function Reviews({ product }) {
  const myId = JSON.parse(localStorage.getItem("data"))._id;
  const token = localStorage.getItem("token");
  const [rating, setRating] = useState(1);
  const [text, setText] = useState("");
  const [myRewId, setMyRevId] = useState(0);
  const [edit, setEdit] = useState(false);
  const { setLoading, setUpdate } = useContext(AppContext);
  const handleRatingClick = (value) => {
    setRating(value);
  };
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <i
        className={`cursor-pointer fa-solid fa-star  text-xl mx-1 ${
          index + 1 <= rating ? "text-gold" : "text-dark"
        } `}
        onClick={() => handleRatingClick(index + 1)}
        key={index}
      ></i>
    ));
  };

  let handel = async function () {
    setLoading(true);
    if (edit) {
      await axios
        .put(
          `${route}store/reviews/${myRewId}`,
          {
            title: text,
            ratings: rating,
            product: product._id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Review has been updated");
            setText("");
            setRating(1);
            setUpdate((prev) => prev + 1);
          }
        })
        .catch((err) => {
          if (err.error.statusCode === 403) {
            toast.error("Admin cannot add review");
          }
        });
    } else {
      await axios
        .post(
          `${route}store/reviews`,
          {
            title: text,
            ratings: rating,
            product: product._id,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            toast.success("Review has been added");
            setUpdate((prev) => prev + 1);
            setText("");
            setRating(1);
          }
        })
        .catch((err) => {
          if (err?.error?.statusCode === 403) {
            toast.error("Admin cannot add review");
          }
          if (err?.response?.status === 400) {
            toast.error("You already have a review ");
          }
        });
    }
    setLoading(false);
  };
  const deletee = function (id) {
    setLoading(true);

    axios
      .delete(`${route}store/reviews/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Review has been deleted");
          setUpdate((prev) => prev + 1);
          setEdit(false);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-dark border border-gray rounded-2xl my-4 p-4">
      <h2 className="text-2xl px-6 py-4  bg-lightGold text-gold w-fit rounded-xl">
        المراجعات
      </h2>
      <div className="flex flex-col lg:flex-row gap-4 my-4">
        <div className=" w-full bg-blackGold rounded-xl p-4">
          <h2 className="py-4 text-xl">
            {edit == true ? "عدل" : "اضف"} مراجعتك{" "}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handel();
            }}
          >
            <div className="my-4 items-center justify-start flex ">
              <h4 className=" text-lg">عدد النجوم:</h4>
              <div className=" flex mx-4 ">{renderStars()}</div>
              <span>{rating}</span>
            </div>
            <textarea
              onChange={(e) => setText(e.target.value)}
              required
              value={text}
              rows="10"
              minLength={16}
              placeholder="اترك مراجعتك"
              className="bg-dark w-full p-4 rounded-xl"
            ></textarea>
            <button className="bg-gold block w-[50%] mx-auto text-blackGold my-4 p-3 rounded-xl text-xl font-semibold">
              {edit === true ? "عدل" : "اضف"}
            </button>
          </form>
        </div>
        <div className=" w-full bg-blackGold rounded-xl p-4">
          <h2 className="line-clamp-2 text-xl  mb-4 border-b border-b-dark">
            {`${product?.reviews?.length} review for "${product?.title}"`}
          </h2>
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            {product?.reviews?.length === 0 && (
              <div className=" text-center my-5">There is no reviews</div>
            )}
            {product?.reviews?.map((e) => {
              return (
                <div
                  key={e._id}
                  className="p-4 border border-gray my-2 rounded-xl"
                >
                  <div className="flex justify-between">
                    <h4 className="mb-4">
                      {e?.user?._id == myId && "(مراجعتك)"}
                    </h4>
                    {e?.user?._id == myId && (
                      <div>
                        <button
                          className="bg-lightGold px-3 rounded-xl text-gold py-2"
                          onClick={() => {
                            setEdit(true);
                            setText(e.title);
                            setRating(e.ratings);
                            setMyRevId(e._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-lightGold px-3 mx-2 rounded-xl text-red py-2"
                          onClick={() => deletee(e._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <>
                      {[...Array(Math.floor(e?.ratings))].map((_, index) => (
                        <i
                          className="fa-solid fa-star text-gold text-xl mx-1"
                          key={index}
                        ></i>
                      ))}
                      {e?.ratings % 1 !== 0 && (
                        <span className="relative ">
                          <i className="fa-solid fa-star-half text-gold fa-flip-horizontal text-xl mx-1"></i>
                          <i className="fa-solid fa-star-half text-dark absolute top-[3px] text-xl left-0"></i>
                        </span>
                      )}
                      {[...Array(5 - Math.ceil(e?.ratings))].map((_, index) => (
                        <i
                          className="fa-solid fa-star text-dark text-xl mx-1"
                          key={index}
                        ></i>
                      ))}
                    </>
                  </div>
                  <p className="my-4">{e?.title}</p>
                  <div className="text-right p-2">
                    {e.updatedAt.split("T")[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
