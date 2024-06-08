import { useEffect, useState } from "react";
import { route } from "../../App";
import LoadingSpinner from "../../landingPage/components/LoadingSpinner";

import image from "../../assets/productimage.webp";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
const MyPackages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  console.log(packages);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setIsLoading(true);
    fetch(`${route}education/packages/myPackages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.message) {
          toast.error(data.message);
        }
        if (data.packages) {
          setPackages(data.packages);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="bg-dark border rounded-xl p-4 border-gray my-10">
      <h1 className="text-2xl text-gold bg-lightGold w-fit px-5 py-3 pb-4 rounded-2xl">
        باقاتي
      </h1>
      {isLoading && <LoadingSpinner />}
      <div className=" sm:p-5 rounded-2xl border border-gray my-8">
        {packages.map((item) => {
          const humanReadableDate = new Date(
            item?.users[0]?.end_date
          ).toLocaleDateString();

          return (
            <div
              key={item._id}
              className="border-b  border-b-gray  p-4 flex justify-center items-center flex-col gap-4 sm:flex-row sm:justify-between"
            >
              <div className="flex items-center gap-4 w-1/3">
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
                <h3 className="whitespace-nowrap">
                  ينتهي في : {humanReadableDate}
                </h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {item?.courses.map((course) => (
                  <Link
                    to={`/education/${course?.category?._id}/course/${course?._id}`}
                    className="flex items-center "
                    key={course._id}
                  >
                    <div className="px-2 gap-2 flex justify-center items-center rounded-xl mx-1 bg-lightGold text-gold cursor-pointer  h-8">
                      {course?.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPackages;
