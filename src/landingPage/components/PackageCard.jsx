import { Link } from "react-router-dom";
import back from '../../assets/ggrgr.png'

const PackageCard = ({ data ,clickFun }) => {
  return (

    <div onClick={()=>clickFun(data._id)} className="package-card" data-aos-duration="1000" data-aos="fade-up">
      <img src={back} alt="" className="back" />
      
        {" "}
        <h2 className="title">
          {data?.title}
        </h2>
        <h2 className="desc">{data?.description}</h2>
        <h3 className="">
          {data?.priceAfterDiscount ? (
            <>
              <del className="">${data?.price}</del>
              <span>${data?.priceAfterDiscount}</span>
            </>
          ) : (
            <span> ${data?.price}</span>
          )}
        </h3>
        <i data-aos-duration="1000" data-aos="fade-left" class="fa-brands fa-galactic-republic"></i>
     
   
    </div>
  );
};

export default PackageCard;
