import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext, route } from "../../App";
import "./product.css";
import noImage from "../../assets/productimage.webp";
import Reviews from "./Reviews";

import CardHandler from "../Store/CartHandler";
const ProductPage = () => {
  const { update } = useContext(AppContext);

  const token = localStorage.getItem("token");
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const id = useParams().id;
  useEffect(() => {
    if (token) {
      fetch(`${route}store/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProduct(data.data);
          if (data.data) {
            setImages([data.data?.imageCover, ...data.data?.images]);
          }
        });
    }
  }, [token, update]);
  return (
    <div className="p-6 w-full ">
      <div className="border bg-dark border-gray md:grid md:grid-cols-12 p-4 rounded-2xl">
        <div className="col-span-7">
          <div className="bg-white t-ddark">
            <h2 className="text-xl">{product?.title}</h2>

            <h4 className="price t-ddark py-4 m-0">
              {product.isFree ? (
                "Free"
              ) : (
                <>
                  <span
                    className="text-lg"
                    style={{ color: "red", marginRight: "15px" }}
                  >
                    <del>${product?.price}</del>
                  </span>
                  <span className="text-lg">
                    ${product?.priceAfterDiscount}
                  </span>
                </>
              )}
            </h4>
            <div className=" mb-4">
              {product?.ratingsQuantity === 0 && "No Rating "}
              {product?.ratingsAverage && (
                <>
                  {[...Array(Math.floor(product?.ratingsAverage))].map(
                    (_, index) => (
                      <i
                        className="fa-solid fa-star text-gold text-xl mx-1"
                        key={index}
                      ></i>
                    )
                  )}
                  {product?.ratingsAverage % 1 !== 0 && (
                    <span className="relative ">
                      <i className="fa-solid fa-star-half text-gold fa-flip-horizontal   text-xl mx-1"></i>
                      <i className="fa-solid fa-star-half text-dark absolute top-[3px] left-0"></i>
                    </span>
                  )}
                  {[...Array(5 - Math.ceil(product?.ratingsAverage))].map(
                    (_, index) => (
                      <i
                        className="fa-solid fa-star text-dark text-xl mx-1"
                        key={index}
                      ></i>
                    )
                  )}
                  ({product?.ratingsQuantity})
                </>
              )}
            </div>

            <div>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                القسم:
                <span>
                  <h5 className="m-0">{product?.category?.title}</h5>
                </span>
              </h4>
            </div>
            <div>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                الناشر:
                <span>
                  <h5 className="m-0">{product?.publisher}</h5>
                </span>
              </h4>
            </div>
            <div className="my-4">
              <p className="m-0">الوصف : {product?.description}</p>
            </div>
            <div className="w-fit">
              <CardHandler productId={product?._id} isFree={product?.isFree} />
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <img
            src={images[imageIndex]}
            onError={(e) => {
              e.target.src = noImage;
            }}
            className="w-full rounded-xl"
            alt=""
          />
          <div className="miniImages">
            {images?.map((image, index) => (
              <img
                key={image}
                onError={(e) => {
                  e.target.src = noImage;
                }}
                src={image}
                onClick={() => setImageIndex(index)}
                className={
                  index === imageIndex
                    ? "border  border-gold rounded-xl"
                    : "rounded-xl"
                }
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
      <Reviews product={product} />
    </div>
  );
};

export default ProductPage;
