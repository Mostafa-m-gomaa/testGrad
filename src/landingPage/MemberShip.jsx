import { useEffect, useState } from "react";
import banner from "../assets/panars/Member Benifits.webp";
import LoadingSpinner from "./components/LoadingSpinner";
import axios from "axios";
import { Fragment } from "react";
import { route } from "../App";
import Package from "./components/Package";


import PackageCard from "./components/PackageCard";
import '../components/sass-folder/package.css'
const MemberShip = () => {
  const [packages, setPackages] = useState([]);
  const [showPack,setShowPack]=useState(false)
  const [packId,setPackId]=useState("")
  const clickPack = (id) => {
    setPackId(id);
    setShowPack(true)
    console.log(id)
  }
  useEffect(() => {
    axios
      .get(`${route}education/packages`)
      .then((res) => setPackages(res.data.data));
  }, []);
  return (
    <div className="packages" id="packs">
      <h1 data-aos-duration="1000" data-aos="fade-up" className="packages-h">Packages</h1>
      <div className="packs">
        {packages?.length ? (
          packages?.map((item) => {
            return (
              <Fragment key={item._id}>
                <PackageCard data={item} clickFun={clickPack}  />
                {/* <Package packId={packId} showPack={showPack} setShowPack={setShowPack} data={item} /> */}
                {item._id === packId ? <Package packId={packId} showPack={showPack} setShowPack={setShowPack} data={item} />:null }
              </Fragment>
            );
          })
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default MemberShip;
