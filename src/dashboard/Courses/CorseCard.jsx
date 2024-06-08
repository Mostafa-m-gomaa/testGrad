import React from 'react';
import './CourseCard.css'; // تأكد من أنك تنشئ وتستورد ملف CSS الخاص بك

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-info">
        <h2 className="course-title">{course.title}</h2>
        <p className="course-description">{course.description}</p>
        <div className="course-details">
          {/* <p><strong>Instructor:</strong> {course.instructor.username}</p> */}
          <p><strong>Category:</strong> {course.category.title}</p>
          <p><strong>Price:</strong> ${course.priceAfterDiscount} <span className="original-price">${course.price}</span></p>
          <p><strong>Sold:</strong> {course.sold}</p>
          <p><strong>Ratings:</strong> {course.ratingsQuantity}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
