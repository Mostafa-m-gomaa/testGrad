import React, { useContext } from 'react'
import { useState } from 'react'
import './dash.css'
import { AppContext , route } from '../App'
import { toast } from "react-hot-toast";
const InstructorRequest = () => {
    const {setLoading}=useContext(AppContext)
    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [about, setAbout] = useState('')
    const [work, setWork] = useState('')
    const [link, setLink] = useState('')
    const [date, setDate] = useState('')
    const [file, setFile] = useState(null);

    
    const handleFileChange = (event) => {
        
        const uploadedFile = event.target.files[0];
        if (uploadedFile.type === "application/pdf") {
            setFile(uploadedFile);
        } else {
            alert("Please upload a PDF file.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        const formData = new FormData();
        formData.append("fullName", name);
        formData.append("country", country);
        formData.append("city", city);
        formData.append("ansOfQuestion", about);
        formData.append("currentWork", work);
        formData.append("sampleOfWork", link);
        formData.append("birthDate", date);
        formData.append("cv", file);
        fetch(`${route}instructorsReqs`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false)
                console.log(data);
                if (data.status === "success") {
                    toast.success("your request has been sent successfully");
                } else if(data.status === "faild") {
                  toast.error(data.msg);
                }
            });
    }



  return (
    <div className="instructor-request">
        <form class="form" onSubmit={handleSubmit}>
    <p class="title">التقديم </p>
    <p class="message">برجاء ملء هذه البيانات </p>
       
            
    <label>
        <input class="input" type="text"  placeholder="" onChange={(e)=>setName(e.target.value)} required="" />
        <span>الاسم كاملا</span>
    </label> 
    <label>
        <input class="input" type="text" placeholder="" onChange={(e)=>setCountry(e.target.value)} required="" />
        <span>البلد</span>
    </label> 
    <label>
        <input class="input" type="text" placeholder="" onChange={(e)=>setCity(e.target.value)} required="" />
        <span>المدينة</span>
    </label> 
    <label>
    <textarea class="input" name="" id="" onChange={(e)=>setAbout(e.target.value)}></textarea>
        <span>نبذه عنك </span>
    </label> 
    <label>
        <input class="input" type="text" placeholder="" required="" onChange={(e)=>setWork(e.target.value)} />
        <span>العمل الحالي </span>
    </label> 
    <label>
        <input class="input" type="text"  placeholder="" required="" onChange={(e)=>setLink(e.target.value)} />
        <span>رابط لبعض الاعمال </span>
    </label> 

    <label>
        <input class="input" type="date" placeholder="" onChange={(e)=>setDate(e.target.value)} required="" />
        <span>يوم الميلاد</span>
    </label> 
    <label>
        <input class="input" type="file" onChange={handleFileChange} accept="application/pdf"  placeholder="" required="" />
        <span>السيرة الذاتيه </span>
    </label> 
        
   

    <button class="submit">Submit</button>
   
</form>

    </div>
  )
}

export default InstructorRequest