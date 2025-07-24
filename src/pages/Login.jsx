import axios from './axiosInstance';
import React from 'react'
import { useState } from 'react'
import { Button, Form} from 'react-bootstrap';
import { useNavigate ,Navigate, Link } from 'react-router-dom';
import { toast , ToastContainer } from 'react-toastify';
import photo from '../assets/cartoon-happy-school-boy-uniform-giving-thumb-up_29190-4932.avif'
import { jwtDecode } from 'jwt-decode';
const Login = () => {
    const [email , setemail] = useState('');
    const [password , setpassword] = useState('');
    const [loading , setloading] = useState(false);
    const [Errorvalidation , setErrorvalidation] = useState({});
    const [showPassword , setShowpassword] = useState('');
    const [error , seterror] = useState('')
    const navigate = useNavigate();
    const handelsubmit= async(e)=>{
        e.preventDefault();
        seterror('');
        setErrorvalidation({});
        setloading(true)
        if(!email){
          toast.error('Email is Requierd');
          return;
        }
        if(!password){
          toast.error('Password is Requierd');
          return;
        }
        try { 
             const response =await axios.post('/login',{
               email,
              password,
        });
        const token = response.data.token
        localStorage.setItem('token' , token)
        const decode = jwtDecode(token)
      const role = response.data.user.role;
      localStorage.setItem('role', role); 
      console.log('Token saved:', localStorage.getItem('token')); // Debugging
    console.log('Role saved:', localStorage.getItem('role')); // Debugging
        toast.success('login successfuly');
        if(role === 'super_admin'){
          navigate('/main')
        } if(role ==='teacher'){
              navigate('/teacherDashboard');
        }
            }catch(err){
                console.error('Login error',err);
                if(err.response && err.response.data){
                    const errData = err.response.data;
                    if(errData.errors){
                        setErrorvalidation(errData.errors);
                        toast.error(errData.errors)
                    }
                        seterror(errData.message || 'login failed');
                        toast.error(errData.message || 'login failed');   
                }else{
                      seterror('Something went wrong');
                     toast.error('Something went wrong');
                }
        }finally{
            setloading(false);
        }
    }
  return (
    <div className='main-login'>

        <div className='login-form '>
            <div >
                <h1>Login</h1>
                <p>Welcome back! please enetr your details</p>
            </div>
              <Form onSubmit={handelsubmit}>
                 <div className='input-login '>
                    <div >
                        <input
                          type='email'
                          value={email}
                          onChange={(e)=>setemail(e.target.value)}
                          className='form-control'
                          placeholder='Enter You E-mail'
                        ></input>
                         
                    </div>
                    <div className='mt-4 password'>
                      <input
                       type={showPassword ? 'text' : 'password'}
                       value={password}
                       onChange={(e)=>setpassword(e.target.value)}
                       className='form-control'
                       placeholder='Enter Your Password'
                       ></input>
                          <div> 
                            <i 
                            className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
                            onClick={()=>setShowpassword(!showPassword)}
                            >
                            </i>
                        </div>
                    </div>
                 </div>
                  <div className='mt-5 d-flex justify-content-center'>
                    <Button type='submit' disabled={loading} >{loading ? "Loging" : 'Login'}</Button>
                  </div>
                  <div >
                    <p>Don't have an account : <Link className='go-register' to={'/register'}>Register</Link></p>
                  </div>
              </Form>
        </div>
        <div className='login-photo'>
          <img src={photo}/>
        </div>
         <ToastContainer position="top-right" autoClose={3000} />
         {Errorvalidation.email && <p style={{color: 'red'}}>{Errorvalidation.email[0]}</p>}
    </div>
   
  )
}

export default Login
