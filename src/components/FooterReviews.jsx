import { useEffect, useState } from "react";
import { route } from "../App";
import axios from "axios";
import LoadingSpinner from "../landingPage/components/LoadingSpinner";
import Slider from "react-slick";

const FooterReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  var settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${route}systemReviews`)
      .then((res) => {
        console.log(res.data.data);
        setReviews(res.data.data);
      })
      .finally(() => setLoading(false));
  }, []);
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <i
        className={`fa-solid fa-star mx-1 ${
          index + 1 <= rating ? "text-gold" : "text-[gray]"
        }`}
        key={index}
      ></i>
    ));
  };
  return (
    <div className="border border-gray lg:my-0 my-4 rounded-xl p-4">
      {loading && <LoadingSpinner isSmall={true} />}

      {!loading && (
        <div className="container mx-auto footer-review">
          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review._id} className="p-4">
                <div className="p-4 bg-blackGold my-3 rounded-xl ">
                  <div className="flex gap-4">
                    <div className="bg-gray w-12 h-12 flex relative justify-center items-center rounded-full">
                      <i className="fa-solid fa-user"></i>
                      <img
                        src={review?.user?.profileImg}
                        onError={(e) => e.target.classList.add("opacity-0")}
                        className={`absolute w-12 h-12 top-0 right-0 rounded-full ${
                          review?.user?.profileImg ? "" : "opacity-0"
                        }`}
                        alt=""
                      />
                    </div>
                    <div>
                      <div>{review.user.name}</div>
                      <div>{renderStars(review.ratingsAverage)}</div>
                    </div>
                  </div>
                  <p className="bg-dark font-semibold my-2 p-2 rounded-xl px-4">
                    {review.opinion}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => {
                document.querySelector(".footer-review .slick-next")?.click();
              }}
              className="w-6 h-6 bg-gold text-dark rounded-full flex items-center justify-center disabled:bg-gray "
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
            <button
              onClick={() => {
                document.querySelector(".footer-review .slick-prev")?.click();
              }}
              className="w-6 h-6 bg-gold text-dark rounded-full flex items-center justify-center disabled:bg-gray "
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterReviews;
