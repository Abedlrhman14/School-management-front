import React, { useEffect, useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import axios from './axiosInstance';
import { toast } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom';

const Mainnavbar = () => {
  const token = localStorage.getItem('token');
  const [user , setUser] = useState('');
  const [name , setName] = useState('');
  const [img , setImage] = useState('');
  useEffect(()=>{
      const profile = async ()=>{
        try{
          const response = await axios.get('/profile',{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          setUser(response.data)
        }catch(err){
          toast.error(err?.data?.data.message)
        }
      }
      profile();
  })
  return (
    <div className=''>
         <Navbar className="navbar bg-primary">
            <Container>
                    <Navbar.Brand style={{color:'white'}} className='ms-2'>Welcome {user.name}</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Link to={'/profile'}> <img src={user?.image}></img></Link>
                        {/* <h1>hi {user.name}</h1> */}
                    </Navbar.Text>
                    </Navbar.Collapse>
            </Container>
       </Navbar>
    </div>
  )
}

export default Mainnavbar
