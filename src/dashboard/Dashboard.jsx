import { useEffect, useRef, useState } from "react";
import DashboardSlide from "../components/DashboardSlide";
import PostCard from "../components/PostCard";
import { route } from "../App";
import EconomicCalendar from "../components/EconomicCalendar";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [ads, setAds] = useState([]);
  const token = localStorage.getItem("token");
  const history = useNavigate()

  // pagenation
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);
  const contianer = useRef();
  useEffect(() => {
    fetch(`${route}advertisements`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAds(data.data);
      });
  }, [token]);
  useEffect(() => {
    fetch(`${route}posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
        console.log(data);
        // setPagesNumber(data.paginationResult.numberOfPages);
      });
  }, [token]);
  useEffect(()=>{
    if(sessionStorage.getItem("catId")){
      history(`/education/${sessionStorage.getItem("catId")}`)
    }

  },[])
  return (
    <div className="home-for-login" ref={contianer}>
      <DashboardSlide />

      <div className="flex flex-col-reverse lg:flex-row">
        <div className="w-[100%] p-4">
          <div>
            {posts?.map((post) => {
              return <PostCard post={post} key={post._id} />;
            })}
          </div>
          {pagesNumber > 1 && (
            <div className="bg-blackGold p-4 rounded-xl">
              <h2 className="text-xl text-center">هناك {pagesNumber} صفحات</h2>
              <div className="flex w-fit items-center justify-center border mx-auto border-lightGray rounded-xl">
                <button
                  className={`rounded-r-xl p-3 text-center disabled:cursor-not-allowed w-[90px] bg-gold text-dark disabled:bg-gray`}
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((prev) => prev - 1);
                    contianer.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  السابق
                </button>

                <div className=" p-3 text-center w-[90px]">{currentPage}</div>

                <button
                  className={`rounded-l-xl p-3 text-center disabled:cursor-not-allowed w-[90px] bg-gold text-dark disabled:bg-gray`}
                  disabled={pagesNumber <= currentPage}
                  onClick={() => {
                    setCurrentPage((prev) => prev + 1);
                    contianer.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  التالي
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-full lg:w-[450px] xl:w-[650px]   px-2 md:px-4 rounded-xls mt-8">
          {/* <div className="bg-blackGold p-6 rounded-2xl mb-4">
            <div className=" max-w-[100%] overflow-auto">
              <EconomicCalendar />
            </div>
          </div> */}
          {/* <div className="bg-blackGold p-6 rounded-2xl">
            {ads?.map((ad) => (
              <a key={ad._id} target="_blank" rel="noreferrer" href={ad.link}>
                <img src={ad.image} className="my-4 w-full" alt="" />
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
