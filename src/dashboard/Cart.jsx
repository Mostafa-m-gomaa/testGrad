import { useContext, useState } from "react";
import { AppContext, route } from "../App";
import image from "../assets/productimage.webp";

import { toast } from "react-hot-toast";

const Cart = () => {
  const { cart, setLoading, setUpdate } = useContext(AppContext);

  const token = localStorage.getItem("token");
  const [copuon, setCopuon] = useState("");
  const [open, setOpen] = useState(false);
  // cart cartitems prdocuts title - imageCover
  const handleCopon = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${route}store/cart/applaycoupon`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coupon: copuon,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.error(data.message);
        } else {
          toast.success("تم اضافة الخصم لعربتك");
        }
        setUpdate((prev) => prev + 1);
      })
      .catch((err) => {
        if (err.message) {
          toast.error(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteFromCart = (id) => {
    setLoading(true);

    fetch(`${route}store/cart/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Product has been removed");

        setUpdate((prev) => prev + 1);
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  const pay = () => {
    setLoading(true);
    fetch(`${route}store/orders/checkout-session/${cart._id}`, {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = data.session.url;
      })
      .finally(() => setLoading(false));
  };
  const buyPackCr = () => {
    setLoading(true);
    fetch(`${route}store/orders/coinbase/${cart._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((red) => {
        if (red?.status == "success") {
          window.location.href = red?.session?.hosted_url;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="p-6 w-full">
      {open && (
        <div className="fixed w-full h-full top-0 right-0 bg-[#000] bg-opacity-75 flex justify-center items-center">
          <div className=" bg-blackGold w-1/2 min-w-[300px] p-8 rounded-2xl">
            <div className="flex  gap-5 sm:flex-row flex-col">
              <div
                onClick={pay}
                className="cursor-pointer text-xl font-semibold w-full py-3 rounded-full text-center border border-gold text-gold"
              >
                Card
              </div>
              <div
                onClick={buyPackCr}
                className="cursor-pointer text-xl font-semibold w-full py-3 rounded-full text-center border border-gold text-gold"
              >
                Crypto
              </div>
            </div>
            <div
              onClick={() => setOpen(false)}
              className="cursor-pointer text-xl font-semibold w-full py-3 my-5 rounded-full text-center border border-red text-red"
            >
              Cancel
            </div>
          </div>
        </div>
      )}
      <div className=" bg-dark flex flex-col-reverse gap-4 p-5 justify-between items-center rounded-2xl border border-gray md:flex-row-reverse ">
        <div className="flex flex-col-reverse md:flex-row-reverse gap-4">
          <div
            className="whitespace-nowrap bg-gold text-dark px-2 py-2 rounded-lg w-full cursor-pointer"
            onClick={() => setOpen(true)}
          >
            قم بالشراء
          </div>
          <div className="whitespace-nowrap text-gold bg-lightGold px-2 py-2 rounded-lg w-full">
            الاجمالي{" "}
            {cart?.totalCartpriceAfterDiscount
              ? cart?.totalCartpriceAfterDiscount
              : cart?.totalCartprice}
            $
          </div>
          <form onSubmit={(e) => handleCopon(e)}>
            <div className="relative">
              <input
                type="text"
                className="bg-dark  placeholder:text-lightGray border border-lightGray px-2 pr-8 py-2 pb-3 rounded-lg"
                placeholder="رمز التخفيض"
                onChange={(e) => setCopuon(e.target.value)}
                required
              />
              <input
                type="submit"
                value="اضف"
                className="cursor-pointer absolute h-full aspect-square bg-lightGray rounded-l-lg text-dark font-semibold left-0"
              />
              <i className="fa-solid fa-tag absolute right-3 text-xl top-[50%] translate-y-[-50%]"></i>
            </div>
          </form>
        </div>
        <div>
          لديك <span className="text-gold">{cart?.cartItems?.length}</span> منتج
          في السلة{" "}
        </div>
      </div>
      <div className=" bg-dark sm:p-5 rounded-2xl border border-gray my-8">
        {cart?.cartItems?.map((item) => (
          <div
            key={item._id}
            className="border-b  border-b-gray p-4 flex justify-center items-center flex-col gap-4 sm:flex-row sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={item?.product?.imageCover}
                className="w-[60px]"
                alt=""
                onError={(e) => {
                  e.target.src = image;
                }}
                style={{ aspectRatio: "6/4" }}
              />
              <h2>{item?.product?.title}</h2>
            </div>
            <div className="flex items-center ">
              <h2>
                {item?.product?.priceAfterDiscount
                  ? item?.product?.priceAfterDiscount
                  : item?.product?.price}
                $
              </h2>
              <div
                className="w-8 flex justify-center items-center rounded-full bg-red cursor-pointer mr-5 h-8"
                onClick={() => deleteFromCart(item._id)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
