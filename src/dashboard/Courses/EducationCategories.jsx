import { useContext, useEffect, useState } from "react";

import { AppContext, route } from "../../App";
import DashboardSlide from "../../components/DashboardSlide";
import image from "../../assets/productimage.webp";
import { Link } from "react-router-dom";

const EducationCategories = () => {
  const { setLoading } = useContext(AppContext);
  const [cates, setCates] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);

    fetch(`${route}/categories`)
      .then((res) => res.json())
      .then((data) => {
      console.log(data)
      setCates(data.data);
      setLoading(false)
      })
     
  }, []);

  return (
    <div>
      <DashboardSlide />
      {!cates.length && (
        <div className="text-lightGray text-4xl my-20 text-center w-full">
          Can not find any products
        </div>
      )}
      <div className="border border-gray rounded-2xl bg-blackGold p-2 md:p-6  m-2  md:m-6 gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid">
        {cates?.map((cat) => {
          return (
            <Link
              to={`${cat._id}`}
              className="col-span-1 p-2 border border-gray rounded-2xl"
              key={cat._id}
            >
              <div className="category" key={cat._id}>
                {cat.image ? (
                  <img
                    src={cat.image}
                    onError={(e) => (e.target.src = image)}
                    className="aspect-square  rounded-2xl"
                  />
                ) : (
                  <img src={image} className="aspect-square  rounded-2xl" />
                )}
                <h2 className=" p-2 text-base flex items-center justify-between">
                  <span> {cat.title}</span>
                  <div className="w-5 h-5 bg-gold text-dark rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-arrow-left text-xs"></i>
                  </div>
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default EducationCategories;
