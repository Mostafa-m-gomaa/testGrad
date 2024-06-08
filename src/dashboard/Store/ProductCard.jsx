import { Link } from "react-router-dom";
import image from "../../assets/productimage.webp";
import CardHandler from "./CartHandler";

const ProductCard = ({ data }) => {
  return (
    <div className="p-[16px] border bg-dark border-gray rounded-lg">
      <Link to={`/store/${data._id}`}>
        <img
          src={data?.imageCover}
          onError={(e) => (e.target.src = image)}
          alt=""
          className="w-full"
          style={{ aspectRatio: "6/4" }}
        />
      </Link>
      <Link to={`/store/${data._id}`}>
        <h2 className="my-3 text-2xl hoverGold">{data?.title}</h2>
      </Link>

      <h3 className="my-4">
        <div className=" text-center    ">
          {data?.ratingsQuantity === 0 && "No Rating "}
          {data?.ratingsAverage && (
            <>
              {[...Array(Math.floor(data?.ratingsAverage))].map((_, index) => (
                <i
                  className="fa-solid fa-star text-gold text-xl mx-1"
                  key={index}
                ></i>
              ))}
              {data?.ratingsAverage % 1 !== 0 && (
                <span className="relative ">
                  <i className="fa-solid fa-star-half text-gold fa-flip-horizontal   text-xl mx-1"></i>
                  <i className="fa-solid fa-star-half text-dark absolute top-[3px] left-0"></i>
                </span>
              )}
              {[...Array(5 - Math.ceil(data?.ratingsAverage))].map(
                (_, index) => (
                  <i
                    className="fa-solid fa-star text-dark text-xl mx-1"
                    key={index}
                  ></i>
                )
              )}
              ({data?.ratingsQuantity})
            </>
          )}
        </div>
      </h3>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <span className="text-xl">
          {data?.isFree ? (
            <>Free</>
          ) : (
            <span>
              $
              {data?.priceAfterDiscount
                ? data?.priceAfterDiscount
                : data?.price}
            </span>
          )}
        </span>
        <CardHandler productId={data?._id} isFree={data?.isFree} />
      </div>
    </div>
  );
};

export default ProductCard;
