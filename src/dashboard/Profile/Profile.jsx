import MyProducts from "./MyProducts";
import MyPackages from "./MyPackages";
import EditPassword from "./EditPassword";
import EditData from "./EditData";
import { AppContext, route } from "../../App";
import { useContext, useEffect , useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import AddReview from "./AddReview";
import { Link } from "react-router-dom";
import './profile.css'
const Profile = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  const token = localStorage.getItem("token");
  const { setLoading } = useContext(AppContext);
  const [requests,setRequests]=useState([])
  const nav = useNavigate();

  const onActive = async () => {
    setLoading(true);
    fetch(`${route}auth/sendVerifyCode`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.succes === "true") {
          nav("/active");
        }
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetch(`${route}/instructorsReqs/my-reqs`,{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => res.json())
    .then((data) => {
     
      if(data.data){
        setRequests(data.data)
      }
    })
  }, []);

  return (
    <div className="p-4 w-full">
      <div className="bg-dark border rounded-xl p-4 border-gray">
        <div className="relative w-[150px] h-[150px] bg-gray border border-gold mx-auto rounded-full flex justify-center items-center">
          <i className="text-6xl fa-solid fa-user"></i>
          <img
            src={data?.profileImg}
            onError={(e) => e.target.classList.add("opacity-0")}
            className={`absolute w-full h-full top-0 right-0 rounded-full ${
              data?.profileImg ? "" : "opacity-0"
            }`}
            alt=""
          />
        </div>
        <div>
          <h1 className="text-center my-4 text-xl">{data.name}</h1>
          <h2 className="text-center text-lightGray text-sm">{data.role}</h2>
          <h2 className="text-center text-lightGray text-sm">{data.country}</h2>
        </div>
        {data?.emailVerified === false && (
          <div
            onClick={onActive}
            className="my-4 cursor-pointer w-1/2 mx-auto text-center bg-red text-re py-2 rounded-xl"
          >
            تفعيل بريدك الالكتروني
          </div>
        )}
        {data?.phone ? (
          <div className="w-1/2 bg-goldenGray p-4 mx-auto text-lightGray rounded-lg my-4 flex flex-col sm:flex-row">
            <div className="sm:w-1/2 text-center sm:border-l sm:border-l-lightGray">
              {data.email}
            </div>
            <div className="sm:w-1/2 text-center">{data.phone}</div>
          </div>
        ) : (
          <div className="w-1/2 bg-goldenGray p-4 mx-auto text-lightGray rounded-lg my-4 text-center">
            {data.email}
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          <EditPassword />
          <AddReview />
          <EditData />
   {localStorage.getItem("role") === "instructor" ?        <Link to="/start-meeting"
        className="cursor-pointer flex items-center justify-center w-[200px] h-[40px] bg-lightGray text-dark gap-4 font-semibold rounded-2xl"
        
      >
        
       Start Meeting
             </Link> : null}
   
        </div>
      </div>
  {requests.length>0  ?    <div class="e-card playing">
  <div class="image"></div>
  
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
      <div class="infotop">
   <br />  
   <h2>
       طلبات الانضمام للتدريس
        </h2>    
        {requests.map((req, index) => {
  const isLast = index === requests.length - 1; // Determine if this is the last element
  return isLast ? (
    <div className="req" key={index}>
      {req.status === "pending" ? <div> لديك طلب جار مراجعته </div> : null}
      {req.status === "reject" ? <div>  تم رفض طلبك يمكنك اعادة ارسال الطلب</div> : null}
      {req.status === "accepted" ? (
        <div>
          <div> تم قبول طلبك </div>
          <a className="comic-button" href="http://localhost:5175/" target="_blank">
            اذهب الي لوحة التحكم
          </a>
        </div>
      ) : null}
    </div>
  ) : null;
})}
<br />
<div class="name">{localStorage.getItem("userName")}</div>
  </div>
</div> : null
  }
      <MyProducts />
   
      {/* <MyPackages /> */}
    </div>
  );
};

export default Profile;
