import { toast } from "react-hot-toast";
import { AppContext, route } from "../../App";

import { useContext } from "react";
import axios from "axios";
const CardHandler = ({ productId, isFree }) => {
  const { cart, setUpdate } = useContext(AppContext);

  const token = localStorage.getItem("token");
  const inCart = cart?.cartItems
    ? cart?.cartItems?.filter((product) => product?.product?._id === productId)
        ?.length !== 0
    : false;
  const addToCart = () => {
    if (isFree) {
      axios
        .post(`${route}store/products/getFree/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((data) =>
          data.status === "success"
            ? toast.success("The product in your profile now")
            : ""
        );
    } else {
      if (!inCart) {
        axios
          .post(
            `${route}store/cart`,
            JSON.stringify({
              productId: productId,
            }),
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            toast.success("The product in your cart now");
            setUpdate((prev) => prev + 1);
          });
      } else {
        toast.error("product already in card");
      }
    }
  };
  return (
    <div
      onClick={addToCart}
      className={`${
        inCart ? "text-dark bg-gold" : "text-gold"
      } flex-nowrap whitespace-nowrap flex items-center gap-2 p-2 px-3 text-sm md:text-base cursor-pointer border-gold border rounded-3xl`}
    >
      <i className=" fa-solid fa-cart-shopping"></i>
      {isFree ? "اضفة مجانا" : inCart ? "تمت الاضافة" : "اضف السلة"}
    </div>
  );
};

export default CardHandler;
