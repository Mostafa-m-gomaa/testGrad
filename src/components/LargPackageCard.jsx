import { useContext, useState } from "react";

import { AppContext, route } from "../App";
import { toast } from "react-hot-toast";

const LargPackageCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [coupon, setCopuon] = useState(false);

  const { setLoading } = useContext(AppContext);

  const token = localStorage.getItem("token");
  function convertTime(durationInDays) {
    if (durationInDays > 1000) {
      return "مدي الحياة";
    }
    if (durationInDays >= 365) {
      const years = Math.floor(durationInDays / 365);
      return `${years} سنة`;
    } else if (durationInDays >= 30) {
      const months = Math.floor(durationInDays / 30);
      return `${months} شهر`;
    } else if (durationInDays >= 7) {
      const weeks = Math.floor(durationInDays / 7);
      return `${weeks} أسبوع`;
    } else {
      return `${durationInDays} يوم`;
    }
  }
  const buyPackCard = () => {
    setLoading(true);
    fetch(`${route}education/orders/checkout-session/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        coupon: coupon,
      }),
    })
      .then((res) => res.json())
      .then((red) => {
        if (red?.message) {
          toast.error(red?.message);
        }
        if (red?.status == "success") {
          window.location.href = red?.session?.url;
        }
      })
      .catch((err) => {
        if (err?.message) {
          toast.error(err?.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const buyPackCr = () => {
    setLoading(true);
    fetch(`${route}education/orders/coinbase/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        coupon: coupon,
      }),
    })
      .then((res) => res.json())
      .then((red) => {
        if (red?.message) {
          toast.error(red?.message);
        }
        if (red?.status == "success") {
          window.location.href = red?.session?.hosted_url;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {open && (
        <div className="fixed w-full h-full top-0 right-0 bg-[#000] bg-opacity-75 flex justify-center items-center">
          <div className=" bg-blackGold w-1/2 min-w-[300px] p-8 rounded-2xl">
            <div className="relative w-full mb-4">
              <input
                type="text"
                className="bg-dark  w-full placeholder:text-gold border border-gold px-2 pr-8 py-2 pb-3 rounded-full"
                placeholder="رمز التخفيض"
                onChange={(e) => setCopuon(e.target.value)}
                required
              />
              <i className="fa-solid text-gold fa-tag absolute right-3 text-xl top-[50%] translate-y-[-50%]"></i>
            </div>
            <div className="flex  gap-5 sm:flex-row flex-col">
              <div
                onClick={buyPackCard}
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
      <div className="bg-dark my-4 flex flex-col justify-between gap-4 text-right border min-h-[400px] border-gray h-full mx-2  p-4 rounded-2xl">
        <div>
          <h2 className="text-2xl my-3">{data?.title}</h2>
          <h3 className="text-2xl font-bold text-gold py-3 border-y border-y-[#ffff] my-2">
            {data?.priceAfterDiscount ? (
              <>
                <del className="text-red mr-2">${data?.price}</del>
                <span>${data?.priceAfterDiscount}</span>
              </>
            ) : (
              <span> ${data?.price}</span>
            )}
          </h3>
          <h2 className="text-lg my-3">{data?.description}</h2>
          <div className="flex flex-col sm:flex-row border-dashed border-b-2 border-y-gray py-2">
            {data?.courses?.length !== 0 ? (
              <ul className="w-full">
                <h3 className="text-lg my-2">Courses</h3>
                {data?.courses?.map((e) => (
                  <li
                    key={e._id}
                    className="flex items-center gap-3 justify-end flex-row-reverse"
                  >
                    {e.title}{" "}
                    <span className="block w-4 h-4 bg-gold rounded-full  border-[2px] border-gray outline outline-[1px] outline-gold"></span>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
            {data?.telegramChannelNames?.length !== 0 ? (
              <ul className="w-full">
                <h3 className="text-lg my-2">Telegram channels</h3>

                {data?.telegramChannelNames?.map((e) => (
                  <li
                    key={e}
                    className="flex items-center gap-3 justify-end flex-row-reverse"
                  >
                    {e === "*" ? "جميع قنوات التيلجيرام" : e}
                    <span className="block w-4 h-4 bg-gold rounded-full  border-[2px] border-gray outline outline-[1px] outline-gold"></span>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row-reverse gap-4 sm:gap-8 items-center">
          <div
            onClick={() => setOpen(true)}
            className="cursor-pointer whitespace-nowrap w-full flex justify-between items-center bg-lightGold px-3 py-2 rounded-xl"
          >
            <div className="w-5 h-5 bg-gold text-dark rounded-full flex items-center justify-center">
              <i className="fa-solid fa-arrow-left text-base"></i>
            </div>
            <span>قم بالشراء</span>
          </div>

          <span className="whitespace-nowrap  text-left">
            المدة:
            {data?.expirationTime
              ? convertTime(data?.expirationTime)
              : "مدي الحياة"}
          </span>
        </div>
      </div>
    </>
  );
};

export default LargPackageCard;
