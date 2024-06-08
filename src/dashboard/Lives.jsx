import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { route } from "../App";

import LiveCard from "../components/LiveCard";
const Lives = () => {
  const [lives, setLives] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isAll, setIsAll] = useState(true);
  const [myFollow, setMyFollow] = useState(false);
  var currentTime = new Date();
  const token = localStorage.getItem("token");

  const getByDate = (date) => {
    setDate(date);
    const formatedDate = new Date(date).toDateString();
    setIsAll(false);
    setMyFollow(false);
    fetch(
      `${route}education/lives/searchByDate/${formatedDate
        .split(" ")
        .join("-")}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setLives(data.data);
        } else {
          setLives([]);
        }
      });
  };

  const getAll = (state) => {
    setIsAll(true);
    console.log(state);
    if (state) {
      fetch(`${route}/education/lives/myFollowedLives`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setLives(data.data);
          } else {
            setLives([]);
          }
        });
    } else {
      fetch(`${route}/education/lives`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setLives(data.data);
          } else {
            setLives([]);
          }
        });
    }
  };
  const getAllMyLives = () => {
    setIsAll(true);
    setMyFollow(false);
   

    fetch(`${route}lives`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          setLives(data.data);
        } else {
          setLives([]);
        }
      });
  };
  const getAllMyFollowedLives = () => {


    fetch(`${route}myFollowedLives`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          setLives(data.data);
        } else {
          setLives([]);
        }
      });
  };

  useEffect(() => {
    // getByDate(currentTime);
    getAllMyLives()
  }, []);
  return (
    <div>
      <div className="p-6 gap-6 lg:grid lg:grid-cols-5">
        {/* <div className="col-span-3 ">
          <div className="bg-dark">
            <Calendar onChange={getByDate} value={date} className="bg-dark" />
          </div>
        </div> */}
        <div className="bg-dark col-span-2 p-2 rounded-2xl border border-gray">
          <div className="flex pb-2 gap-2 px-2 mb-4  text-sm border-b border-b-gray">
            <div
              className={`px-4 py-3 rounded-2xl cursor-pointer ${
                !myFollow && isAll
                  ? " text-gold bg-lightGold "
                  : "border border-gray text-lightGray"
              }`}
              onClick={() => {
                setMyFollow(false);
                // getAll(false);
                getAllMyLives
              }}
            >
              الكل
            </div>
            <div
              className={`px-4 py-3 rounded-2xl cursor-pointer ${
                myFollow
                  ? " text-gold bg-lightGold "
                  : "  border border-gray text-lightGray"
              }`}
              onClick={() => {
                setMyFollow(true);
                // getAll(true);
                getAllMyFollowedLives
              }}
            >
              التي اتابعها فقط
            </div>
          </div>
          <div className="flex justify-between px-2 mb-4  text-sm">
            {isAll ? (
              <>
                <span className="text-lightGray mt-4 mb-2">كل المحاضرات</span>
              </>
            ) : (
              <>
                <span className="text-lightGray">
                  محاضرات هذا اليوم ({lives?.length})
                </span>
                <span className="text-gold">{date.toDateString()}</span>
              </>
            )}
          </div>

          {lives?.length ? (
            lives?.map((live) => {
              return <LiveCard key={live._id} live={live} />;
            })
          ) : (
            <div
              style={{ textAlign: "center", margin: "40px", fontSize: "40px" }}
            >
              there is no lives{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lives;
