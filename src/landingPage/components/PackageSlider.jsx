import Slider from "react-slick";
import PackageCard from "./PackageCard";
import arrow from "../../assets/arrow.png";
const PackageSlider = ({ packages }) => {
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
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" mx-auto container my-4">
      <Slider {...settings}>
        {packages?.map((item) => (
          <PackageCard key={item?._id} data={item} />
        ))}
      </Slider>

    </div>
  );
};

export default PackageSlider;
