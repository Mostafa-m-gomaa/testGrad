import { Link } from "react-router-dom";
import payment from "../assets/payment.png";
import { useContext } from "react";
import { AppContext, route } from "../App";
import axios from "axios";
import FooterReviews from "./FooterReviews";
import trading from '../assets/WhatsApp Image 2023-12-23 at 02.30.41_197ad013.jpg'
import './sass-folder/footer.css'
const Footer = () => {
  const media = [
    {
      label: "telegram",
      icon: "fa-brands fa-telegram",
      link: "",
    },
    {
      label: "twitter",
      icon: "fa-brands fa-twitter",
      link: "",
    },
    {
      label: "instagram",
      icon: "fa-brands fa-instagram",
      link: "",
    },
    {
      label: "mail",
      icon: "fa-brands fa-google",
      link: "",
    },
    {
      label: "tiktok",
      icon: "fa-brands fa-tiktok",
      link: "",
    },
  ];
  const lang = useContext(AppContext);
  return (
    <div className="footer">
      <div className="border-t-gold border-t py-3">
        <div className="container mx-auto  flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-center">
          <div className="flex gap-4">
   
                      {media.map((element) => (
                <a
                  href={element.link}
                  target="_blank"
                  rel="noreferrer"
                  key={element.label}
                  className="w-[40px] h-[40px] flex items-center justify-center rounded-lg bg-gray mx-2  hover:text-gray hover:bg-[#ffffff] transition"
                >
                  <i className={`${element.icon} text-xl`}></i>
                </a>
              ))}
            
            <a href="#who" className="hoverGold">
              من نحن
            </a>
          
          </div>
      
          <div>
            <img src={payment} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
