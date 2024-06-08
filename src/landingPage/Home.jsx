import { Link, NavLink } from "react-router-dom";
import { useState ,useEffect, useContext } from "react";
import { AppContext, route } from "../App";
import '../components/sass-folder/home.css'
import fives from "../assets/OCf9aqYsunt0ikTbmPEXtFRHc8.webp";
import triangle from "../assets/rmUdoCKrFcyVAEVCTrisCUuXci0.webp";
import imgBack from "../assets/ggrgr.png";
import axios from "axios";
import LoadingSpinner from "./components/LoadingSpinner";
import {motion} from "framer-motion"
import circle from "../assets/7Xvt3cwXgJTnJCJ8yoisW2XCmy8.webp";
import shape from "../assets/t9Bh6M6UAubysuqEg3VRFnNJEw.webp";
import HomeOne from "../components/home1/Home";

const Home = () => {
  const [leaders, setLeaders] = useState([]);
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCourses,setShowCourses] = useState(false)
  const [courses,setCourses] = useState([])
  const {setLoading}=useContext(AppContext)
  const [catId,setCatId] = useState("")


  const getSpicCourse =()=>{
    sessionStorage.setItem("catId",catId)
  }

  const getCourses = (e,id) => {
setLoading(true)
setCatId(id)
    e.preventDefault();
    fetch(`${route}/courses/relatedCourses/${id}`)
    .then((res) => res.json())
    .then((data) => {
      
      if(data.data){
        setCourses(data.data)
        setLoading(false)
        setShowCourses(true)
      }
    });
  }
  

  useEffect(() => {
    axios
      .get(`${route}users/getInstructors`)
      .then((res) => {
        console.log(res)

        setLeaders(res.data.data)});
  }, []);
  
  useEffect(() => {
    axios
      .get(`${route}education/packages`)
      .then((res) => setPackages(res.data.data));
  }, []);

  useEffect(() => {
    fetch(`${route}categories`)
      .then((res) => res.json())
      .then((data) => {
      
        if(data.data){
          setCategories(data.data);
        }
   
      });
  }, []);
  return (
    <>
{showCourses ?     <div className="show-courses">
      <div className="courses-over" onClick={()=>setShowCourses(false)}></div>
    <div className="prod-cont">
      
              {courses.map((product, index) => (
                <div
                  key={index}
                  className="prod-card"
                  data-aos="fade-up"
                  data-aos-duration={`2000`}
                >
                  <img
                    src={product.image}
                    alt=""
                  />
                  <div className="num">{product.title}</div>
                  <Link onClick={()=>getSpicCourse()} to={"/login"}>Enroll</Link>
             
                </div>
              ))}
            </div>
    </div>: null}
    <HomeOne />

      {/* productss ************************************************ */}

      
        <div className="product" id="course" style={{
          position: "relative",
          zIndex: "100",
        }}>
          <motion.div 
          initial={{x : -200}}
          animate={{x : 0}}
          transition={{duration : 1}}
          >
            <h1>أقسام الكورسات</h1>
          </motion.div>
          <div className="container">
            <p className=" text-xl text-lightGray text-center px-12">
اطلع علي كورساتنا في احدث المجالات             </p>
            <div className="prod-cont">
              <img src={fives} alt="" data-aos-duration={`2000`} data-aos="fade-left" className="shape-one" />
              <img src={triangle} alt="" data-aos-duration={`2000`} data-aos="fade-right" className="shape-two" />
              {categories.map((product, index) => (
                <div
                  key={index}
                  className="prod-card"
                  data-aos="fade-up"
                  data-aos-duration={`2000`}
                >
                  <img
                    src={product.image}
                    alt=""
                  />
                  <div className="num">{product.title}</div>
                  <Link onClick={(e)=>getCourses(e,product._id)} to={"/lo"}>اطلع</Link>
             
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* leaders */}
        {/* <div className="leaders" id="leaders" >
          <img src={circle} data-aos-duration={`2000`} data-aos="fade-right"  className="circle" alt="" />
          <img src={shape} data-aos-duration={`2000`} data-aos="fade-left"   className="shape" alt="" />
<h1>القادة</h1>
        <div className="leads">
        {leaders?.length ? (
          leaders.map((leader, index) => (
          <div className="leader" data-aos="fade-up"  data-aos-duration="2000" key={index}>
            <div className="imgs">

            <img src={imgBack} alt="" className="back" />
            <img src={leader.profileImg} alt="" className="profile" />
            </div>
<div className="about">{leader.about}</div>
<div className="name">{leader.name}</div>
          </div>
          ))
        ) : (
          <LoadingSpinner />
        )}
        </div>
        </div> */}
    </>
  );
};

export default Home;
