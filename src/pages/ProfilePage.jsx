import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "./axiosInstance";
import img from '../assets/9747.jpg_wh860.jpg'
import { Form } from "react-bootstrap";
import { type } from "@testing-library/user-event/dist/type";
const ProfilePage = () => {
    const [user , setUser] = useState(null);
    const token = localStorage.getItem('token');
    console.log(token); //Debugging
    const [image , setImage] = useState('');
    const [selectFile , setSelectFile] = useState('');
      useEffect(()=>{
        const getProfile = async() =>{
            try{
                const response = await axios.get('/profile',{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setUser(response.data);
                console.log(setUser);//Debugging
            }catch(err){
                toast.error(err.response?.data?.message);
            }
        }
            getProfile();
    },[])
  return (
    <div className="profile">
        <Form className="profile-form d-flex align-items-center">
            <div>
                <label className="">
                        <img src={user?.image}></img>
                        <input 
                        type="file"
                        hidden
                        onChange={(e)=>{ const file =e.target.files[0]
                            if(file){
                                setImage(URL.createObjectURL(file))   
                                setSelectFile(file);
                            }
                        }}></input>
                         
              </label>
            </div>
            <div className="form-info">
                {/* <input type=""></input> */}
                   <div className="form-word">
                        <p className="mt-5"> {user?.name}</p>
                        <p> {user?.email}</p>
                        <p>{user?.name} ID : {user?.id}</p>
                        <p>{user?.name} Role : {user?.role}</p>
                   </div>
            </div>
        </Form>
    
    </div>
  )
}

export default ProfilePage
