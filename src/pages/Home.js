import React from 'react'
import {Button} from "react-bootstrap"
import stimage from '../assets/9747.jpg_wh860.jpg'
import stu from '../assets/depositphotos_240461922-stock-illustration-students-different-character-isolated-white.jpg'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='main'>
         <div className='main-photo'>
             <img src={stu}/>
         </div>
         <div className='main2 font'>
            <h1>Welcome To School Hub </h1>
            <p>
              Streamline school management,class orgnization,and add students and faculty.seamlessy track attendancee,assess performance,and profide feedback.Access records,view marks,and communicate effortlesslu
            </p>
             <div className='d-flex justify-content-center p1'>
                 <Link to={'/Login'}><Button className='btn btn-light'>Login</Button></Link>
                 <Link to={'/Register'}><Button className='btn btn-light'>Register</Button></Link>
             </div>
         </div>
       
    </div>
  )
}

export default Home
