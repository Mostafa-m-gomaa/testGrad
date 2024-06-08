import React, { useEffect ,useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext, route } from '../../App';
import CourseCard from './CorseCard';
import './CourseCard.css'


const SpecCourse = () => {
    const {setLoading} = useContext(AppContext)
    const param = useParams()
    const [course,setCourse]=useState({})
    useEffect(() => {
        
        setLoading(true); 
        fetch(`${route}/courses/${param.id}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setCourse(data.data)
    
          })
          .finally(() => setLoading(false));
      }, []);
  return (
    <div>
          <div className="course-card">
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-info">
        <h2 className="course-title">{course.title}</h2>
        <p className="course-description">{course.description}</p>
        <div className="course-details">
          {/* <p><strong>Instructor:</strong> {course.instructor.username}</p> */}
          {/* <p><strong>Category:</strong> {course.category.title}</p> */}
          <p><strong>Price:</strong> ${course.priceAfterDiscount} <span className="original-price">${course.price}</span></p>
          <p><strong>Sold:</strong> {course.sold}</p>
          <p><strong>Ratings:</strong> {course.ratingsQuantity}</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SpecCourse