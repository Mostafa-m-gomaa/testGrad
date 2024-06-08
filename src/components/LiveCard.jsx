import { AppContext, route } from "../App";
import { toast } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LiveCard = ({ live }) => {
  const { setLoading , setLiveLink } = useContext(AppContext);

  const myId = JSON.parse(localStorage.getItem("data"))._id;
  const token = localStorage.getItem("token");
  const [isFollowed, setIsFollowed] = useState(
    live?.followers?.filter((user) => user.user !== myId).length !== 0
  );
  useEffect(() => {
    setIsFollowed(
      live?.followers?.filter((user) => user.user === myId).length !== 0
    );
  }, [live]);
  const followLive = (id) => {
    // if (isFollowed) {
    //   toast.success("You Are Already following this live");
    // } else {
    
    // }
    setLoading(true);
    fetch(`${route}/lives/followLive/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          toast.success("You Are Follow This Live Now");
          setIsFollowed(true);
        } else {
          toast.success("You Are Already following this live");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-2 border-y py-4 border-y-gray" key={live._id}>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="bg-gray w-8 h-8 relative flex justify-center items-center rounded-full">
            <i className="fa-solid fa-user"></i>
            <img
              src={live?.creator?.profileImg}
              className="w-8 h-8 absolute top-0 right-0 rounded-full"
              onError={(e) => e.target.classList.add("opacity-0")}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">{live?.creator?.name}</span>
            <span style={{ direction: "ltr" }} className="text-xs">
              {live.day} / {live.month} , at {live.hour}
            </span>
          </div>
        </div>
        <div>
          {live.course ? (
            <div className="p-[4px] bg-lightGold text-[10px] text-gold  rounded-2xl ">
              دورة : {live.course.title}
            </div>
          ) : (
            <div className="p-[4px] bg-lightGold text-[10px] text-gold rounded-2xl ">
              عام
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="mx-4 my-6 text-lightGray">{live.title}</div>
      </div>
      <div className="flex flex-col sm:flex-row text-base justify-between gap-4">
        <div
          className={`w-full text-center py-3 rounded-full cursor-pointer ${
            isFollowed ? " text-gold bg-lightGold" : " border border-gold"
          }`}
          onClick={() => followLive(live._id)}
        >
          {isFollowed ? "تمت المتابعة" : "تابع"}
        </div>
        {live.link ? (
          <Link
            to={"/start-meeting"}
           onClick={()=>setLiveLink(live.link)}
            className=" w-full text-center py-3 rounded-full bg-gold text-dark font-semibold"
            rel="noreferrer"
          >
            we are live
          </Link>
        ) : (
          <div className="flex items-center justify-center gap-2 w-full text-center py-3 rounded-full bg-gold text-dark font-semibold">
---          </div>
        )}
      </div>
    </div>
  );
};

export default LiveCard;
