import { useContext, useEffect, useState } from "react";

import { AppContext, route } from "../../App";
import DashboardSlide from "../../components/DashboardSlide";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import LessonCard from "../../components/LessonCard";

const SingelCourse = () => {
  const { setLoading } = useContext(AppContext);
  const [lessons, setLessons] = useState([]);

  const token = localStorage.getItem("token");
  const courseId = useParams().id;

  useEffect(() => {
    setLoading(true);

    fetch(`${route}/lessons/incourse/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("lessons",data);
        if (data?.msg) {
          toast.error(data?.msg);
        }
        if (data.data) {
          setLessons(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <DashboardSlide />
      {!lessons?.length && (
        <div className="text-lightGray text-4xl my-20 text-center w-full">
          Can not find any lessons in this course
        </div>
      )}
      <h1 className="p-2 md:p-6  m-2  md:m-6 text-2xl bg-lightGold w-fit rounded-xl text-gold">
        Recorded Lessons
      </h1>
      <div className="border border-gray rounded-2xl bg-blackGold p-2 md:p-6  m-2  md:m-6 gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid">
        {lessons.map((lesson) => {
          if (lesson.type === "recorded") {
            return <LessonCard key={lesson._id} lesson={lesson} />;
          } else {
            return null;
          }
        })}
      </div>
    
    </div>
  );
};

export default SingelCourse;
