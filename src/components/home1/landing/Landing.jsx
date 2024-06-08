import React from 'react'
import './landing.css'
import landing from '../../../assets/elements/Asset 10.png'
import search from '../../../assets/elements/Asset 5.png'
import profile from '../../../assets/elements/Asset 7.png'
import mopile from '../../../assets/elements/Asset 8.png'
import surface from '../../../assets/elements/Asset 4.png'
import qube from '../../../assets/elements/cube.png'
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="landing">
        <img src={landing} alt="" className="back" />
        <div className="container">
           <div className="left">
           <h1>تجربة تعلم جديدة </h1>
           <h1>العلم نور</h1>
          
<Link to="/login">يلا بينا</Link>
           </div>
           <div className="right">
            <img src={mopile} alt="" className="mopile" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500"/>
            <img src={surface} alt="" className="surface" data-aos="fade-left"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
     data-aos-duration="500" />
            <img src={qube} alt="" className="qube"  data-aos="fade-right"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
     data-aos-duration="500" />
            <img src={profile} alt="" className="profile" data-aos="zoom-out-down" data-aos-duration="700" />
            <img src={search} alt="" className="search" data-aos="fade-left"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
     data-aos-duration="700" />
             
           </div>
        </div>
    </div>
  )
}

export default Landing