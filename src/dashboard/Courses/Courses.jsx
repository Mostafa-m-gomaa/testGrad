import { useContext, useEffect, useState } from "react";

import { AppContext, route } from "../../App";
import DashboardSlide from "../../components/DashboardSlide";
import { Link, useParams } from "react-router-dom";

const Courses = () => {
  const { setLoading } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");
  const catId = useParams().catId;


  useEffect(() => {
    setLoading(true);
    if(sessionStorage.getItem("catId")){
      sessionStorage.removeItem("catId")
    }

    fetch(
      `${route}/categories/${catId}/courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCourses(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  // const buy = (id) => {
  //   console.log(token);
  //   fetch(
  //     `${route}/orders/checkout-session/${id}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
        
  //     })
  // }

  const buy = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${route}orders/checkout-session/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to initiate checkout session'); // Or you could throw a more specific error based on response.status
      }
  
      const data = await response.json();
      console.log(data);
      if(data.status="success"){
        window.location.href = data.session.url;
      }
    
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here, such as displaying a message to the user
    }
  }
  


  const preventLink = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <DashboardSlide />
      {!courses?.length && (
        <div className="text-lightGray text-4xl my-20 text-center w-full">
          Can not find any courses in this category
        </div>
      )}
      <div className="border border-gray rounded-2xl bg-blackGold p-2 md:p-6  m-2  md:m-6 gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid">
        {courses?.map((course) => {
          return (
            <Link
              to={`course/${course._id}`}
              className="col-span-1 p-2 border border-gray rounded-2xl"
              key={course._id}
              onClick={preventLink}
            >
              <div className="category" key={course._id}>
                <h2 className="text-center p-2 sm:text-lg md:text-xl lg:text-2xl">
                  {course.title}
                </h2>
                <h2 className="text-center p-2 sm:text-lg md:text-xl lg:text-2xl">
                 By : {course.instructor.username}
                </h2>
                <img src={course.image}  className="aspect-square  rounded-2xl" alt="" />
                {/* <h2 style={{
                  textAlign: "center",
              
                  width: "fit-content",
                  margin: " 15px auto",
                  padding: "5px",
                  borderRadius: "10px",
                }}>
                  {course.description}$
                </h2> */}
                <h2 style={{
                  textAlign: "center",
                  border: "1px solid #fff",
                  width: "fit-content",
                  margin: " 15px auto",
                  padding: "5px",
                  borderRadius: "10px",
                }}>
                  {course.price}$ after discount {course.priceAfterDiscount} $
                </h2>
                <Link to={`/courseDetails/${course._id}`}>
                <h2 style={{
                  textAlign: "center",
                 
                  width: "fit-content",
                  margin: " auto",
                  padding: "5px 15px",
                  borderRadius: "7px",
                  cursor: "pointer",
                  backgroundColor: "#3846a1",
                  marginBottom: "10px"
                }}>
                  View Course
                </h2>
                </Link>
                <h2 onClick={()=>buy(course._id)} style={{
                  textAlign: "center",
                
                  width: "fit-content",
                  margin: " auto",
                  padding: "5px 15px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  backgroundColor: "#ffb900",
                }}>
                  Enroll
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
