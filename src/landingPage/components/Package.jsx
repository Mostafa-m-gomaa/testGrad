import { Link } from "react-router-dom";
import back from '../../assets/ggrgr.png'
import { motion ,AnimatePresence } from "framer-motion";

import { Fragment } from "react";



const Package= ({ data ,setShowPack ,showPack ,packId}) => {
  return (

    <AnimatePresence>
        {showPack ?<motion.div
    initial={{opacity : 0}}
    animate={{opacity : 1}}
    transition={{duration : 0.9 ,type : "spring" }}
    exit={{opacity : 0}}
    className="show-package-container">
        <div onClick={()=>setShowPack(false)} className="show-back-ground"></div>
        <div className="in-show-package">
            <div className="title">
                <img src={back} alt="" className="bak" />
        <h2 className="">
          {data?.title}
        </h2>
          
      
        <Link
          to="/packages"
        >
        قم بالشراء
        </Link>
        <Link
          to="/packages"
         
        >
       سجل واحصل علي ميزات مجانية
        </Link>
        <div onClick={()=>setShowPack(false)} className="close">x</div>
    

            </div>
        <h3 className="price">
          {data?.priceAfterDiscount ? (
            <>
              <del className="text-red mr-2">${data?.price}</del>
              <span>${data?.priceAfterDiscount}</span>
            </>
          ) : (
            <span> ${data?.price}</span>
          )}
        </h3>
            <h2 className="desc">{data?.description}</h2>
       
        <div className="courss">
          {data?.courses?.length !== 0 && (
            <ul>
              <h3 className="text-lg my-2">Courses</h3>
              {data?.courses?.map((e) => (
                <li
                  key={e._id}
                  className=""
                >
                  {e.title}{" "}
                  <span className="block w-4 h-4 bg-gold rounded-full  border-[2px] border-gray outline outline-[1px] outline-gold"></span>
                </li>
              ))}
            </ul>
          )}
          {data?.telegramChannelNames?.length !== 0 && (
            <ul>
              <h3 className="text-lg my-2">Telegram channels</h3>

              {data?.telegramChannelNames?.map((e) => (
                <li key={e} className="flex items-center gap-3 justify-end">
                  {e === "*" ? "جميع قنوات التيلجيرام" : e}
                  <span className="block w-4 h-4 bg-gold rounded-full  border-[1px] border-gray outline outline-[1px] outline-gold"></span>
                </li>
              ))}
            </ul>
          )}
        </div>
 
        </div>
   
    </motion.div> : null}
    
    </AnimatePresence>

  );
};

export default Package;
