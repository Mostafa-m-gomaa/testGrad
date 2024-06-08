import { useEffect, useState } from "react";
import arrow from "../../assets/arrow.png";

import Slider from "react-slick";
import axios from "axios";
import { route } from "../../App";
import ReactPlayer from "react-player";
const Success = () => {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  useEffect(() => {
    axios.get(`${route}stories`).then((res) => {
      if (res.data.data) {
        setImages(res.data.data);
      }
    });
  }, []);
  return (
    <>
      {isOpen && (
        <div className="fixed z-[99999] bg-opacity-70 flex items-center justify-center top-0 right-0 w-full h-full bg-[#000]">
          <div className=" bg-blackGold p-4 relative">
            <div
              onClick={() => setIsOpen(false)}
              className="absolute border-gold -top-4 -right-4 border w-8 h-8 flex items-center justify-center  rounded-full bg-dark text-[#fff] text-xl cursor-pointer"
            >
              x
            </div>
            <ReactPlayer url={images[index]?.video} />
          </div>
        </div>
      )}
      <div>
        <div className="mainSuccess bg-blackGold w-full h-full py-1">
          <div className="mainHeading ">
            <h1>قصص النجاح</h1>
          </div>
        </div>
        <div className="successBg">
          <div className="mx-auto container">
            <p className=" text-xl text-lightGray text-center px-12">
              نقوم بالتأثير على الأشخاص الطموحين في جميع أنحاء العالم! اسمع ما
              يقوله بعض أعضائنا.
            </p>
          </div>
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer w-fit rounded-full relative mx-auto my-36"
          >
            <img
              src={images[index]?.image}
              className="rounded-full border border-gold w-[200px] sm:w-[300px] md:w-[350px] lg:w-[400px] "
              alt=""
            />
            <div className="absolute w-[120%] h-[120%]  rounded-full border-lightGold border-[2px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
            <div className="absolute w-[145%] h-[145%]  rounded-full border-blackGold border-[2px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
            <div
              className={`absolute h-[140%] top-[50%] left-[50%]  w-[140%] flex flex-col justify-between items-center transition-all rotatee${
                index % 5
              }
          `}
            >
              <div className="w-8 h-8 ml-20 bg-gold  rounded-full " />
              <div className="w-8 h-8 bg-blackGold  rounded-full mr-auto" />
              <div className="w-8 h-8 bg-lightGold  rounded-full ml-40" />
            </div>
          </div>
          <div className="container mx-auto success">
            <Slider {...settings}>
              {images.map((e, inde) => (
                <div key={e} className="p-3" onClick={() => setIndex(inde)}>
                  <div
                    className={`w-full md:w-3/4 lg:w-1/2 relative overlay ${
                      index === inde
                        ? ""
                        : "before:bg-[#000] before:bg-opacity-60"
                    }`}
                  >
                    <img
                      src={e?.image}
                      className={`w-full  mx-auto rounded-full ${
                        index === inde ? "border border-gold" : ""
                      }`}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </Slider>
            <div className="flex justify-center gap-10">
              <img
                src={arrow}
                className="h-36 md:h-44 lg:h-48 rotate-180 cursor-pointer"
                onClick={() => {
                  document.querySelector(".success .slick-next")?.click();
                }}
                alt=""
              />
              <img
                src={arrow}
                onClick={() => {
                  document.querySelector(".success .slick-prev")?.click();
                }}
                className="h-36 md:h-44 lg:h-48 cursor-pointer"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
