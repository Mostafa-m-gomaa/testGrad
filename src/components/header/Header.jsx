import React from 'react'
import logo from '../../assets/elements/logo.png'
import { Link } from 'react-router-dom'
import reg from '../../assets/elements/Asset 28.png'
import './head.css'
import log from '../../assets/elements/Asset 29.png'

const HeaderOne = () => {
  return (
    <div className="header-one">
        <div className="container">
            <div className="left">
            <img src={logo} alt="" className='logo' />
            <Link to="/">الرئيسية</Link>
            <a href="#course">أقسام الكورسات</a>
            <a href="#leaders">ِشركاء النجاح</a>
            <a href="#who">من نحن</a>
            </div>
            <div className="right">
       
            <Link to="/login"><img src={log} alt="" />تسجيل الدخول</Link>
            </div>
        </div>
    </div>
  )
}

export default HeaderOne