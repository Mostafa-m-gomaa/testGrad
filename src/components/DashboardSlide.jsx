// import one from "../assets/panars/1-15.webp";
import one from "../assets/panars/ps.jpg";
const DashboardSlide = () => {
  return (
    <div className="max-w-[100vw]  md:m-6 rounded-lg">
      <img src={one} style={{
        maxHeight: "400px",
        width: "100%"
      }} className="p-2 md:m-0" alt="" />
    </div>
  );
};

export default DashboardSlide;
