import { useEffect, useState } from "react";
import banner from "../assets/panars/Leadership.webp";
import LoadingSpinner from "./components/LoadingSpinner";
import axios from "axios";
import { route } from "../App";
import LeaderCard from "./components/LeaderCard";
const LeaderShip = () => {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    axios
      .get(`${route}users/instractors`)
      .then((res) => setLeaders(res.data.data));
  }, []);
  return (
    <div>
      <div className="bannerBg py-8">
        <div className="container mx-auto">
          <img src={banner} alt="banner" className="rounded-2xl my-4" />
        </div>
      </div>

      <div className="mainHeading">
        <h1>فريق صناع الثروة</h1>
      </div>
      <div className="bg-lightGold">
        {leaders?.length ? (
          leaders.map((leader, index) => (
            <LeaderCard
              name={leader.name}
              about={leader.about}
              image={leader.profileImg}
              key={leader._id}
              isOdd={index % 2}
            />
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default LeaderShip;
