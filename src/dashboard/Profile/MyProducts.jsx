import { useEffect, useState } from "react";
import { route } from "../../App";
import LoadingSpinner from "../../landingPage/components/LoadingSpinner";

import image from "../../assets/productimage.webp";
import { Link } from "react-router-dom";
const MyProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {

  
      const endpoint = `${route}/courses/MyCourses`;
  
      fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data",data);
          if (data.data) {
            setProducts(data.data);
        
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    
  }, []);

  return (
    <div className="bg-dark border rounded-xl p-4 border-gray my-10">
      <h1 className="text-2xl text-gold bg-lightGold w-fit px-5 py-3 pb-4 rounded-2xl">
        كورساتي
      </h1>
      {isLoading && <LoadingSpinner />}
      <div className=" sm:p-5 rounded-2xl border border-gray my-8">
        {products.map((item) => (
          <Link
          to={`/course/${item._id}`}
            key={item._id}
            className="border-b  border-b-gray p-4 flex justify-center items-center flex-col gap-4 sm:flex-row sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                className="w-[60px]"
                alt=""
                onError={(e) => {
                  e.target.src = image;
                }}
                style={{ aspectRatio: "6/4" }}
              />
              <h2>{item?.title}</h2>
            </div>
       
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
