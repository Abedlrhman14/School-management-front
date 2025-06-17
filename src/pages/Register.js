import React, { useState , useEffect} from 'react'
import regphoto from '../assets/OIP (1).jpeg'
import axios from 'axios'
import { Link, Navigate,  } from 'react-router-dom';
import { Button , Form , Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const [name , setname] = useState('');
    const [email ,setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirm_password , setconfirm_password] = useState('');
    const [showPaassword , setShowpassword] = useState(false);
    const [showpasswordconfirmation , setShowpasswordconfirmation] = useState(false);
    const [error , setError] = useState('');
    const [loading , setLoading] = useState(false);
    const [validationErrors , setValidationErrors] = useState({});
    const navigate = useNavigate('')
      const handelsubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError('');
        setValidationErrors({});
        if(password !== confirm_password){
          setError('password do not match');
          setLoading(false);
          return;
        }
        try{
          const response = await axios.post('http://school.test/api/register',{
            name,
            email,
            password,
            confirm_password,
        });
         toast.success("Registration successful!");
         setTimeout(() => {
            navigate('/login')
         }, 1500);
        }catch(err){
          console.error('registation error',err);
          if(err.response && err.response.data){
            const errorData = err.response.data;
            if(errorData.errors){
              setValidationErrors(errorData.errors);
            }
            setError(errorData.message|| 'Registration fieled');
            toast.error(errorData.message || 'Registration Fieled')
          }else{
               setError('Something went wrong');
               toast.error('Something went wrong');
          }
        }finally{
          setLoading(false);
        }
      }
  return (
    <div className='main-register '>
      <Form onSubmit={handelsubmit}>
         <div className='register-form'>
          <div>
             <h2 className=' d-flex justify-content-center'>Register</h2>
             {/* <p className='d-flex justify-content-start'>
                create your account
             </p> */}
                    <div className=' input-register '>
                            <input className='form-control' type='text' placeholder='Enter Your Name' value={name} onChange={e =>setname(e.target.value)}required></input>
                            <div className="input-group  mb-3">
                                <input type="email" className="form-control mt-3"  placeholder="User Email" aria-label="Recipient's username" aria-describedby="basic-addon2"value={email} onChange={e => setEmail(e.target.value)}required></input>
                                <span className="input-group-text mt-3"  id="basic-addon2">@School.com</span>
                                {validationErrors.name &&(
                                   <div className='text-denger'>{validationErrors.name[0]}</div> 
                                )}
                                
                            </div>
                            <div className='password'>
                                <input value={password} className='form-control' type={showPaassword ? 'text' : 'password'} placeholder='New password' onChange={e => setPassword(e.target.value)}req></input>
                                <div> <i className={showPaassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}onClick={()=>setShowpassword(!showPaassword)}></i></div>
                                {validationErrors.password && (
                                    <div className="text-danger">{validationErrors.password[0]}</div>
                                     )}
                            </div>
                            <div className='password'>
                                <input value={confirm_password} className='form-control mt-3' type={showpasswordconfirmation ? 'text' :'password'} placeholder='New password' onChange={e => setconfirm_password(e.target.value)}required></input>
                               <div> <i className={showpasswordconfirmation ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}onClick={()=>setShowpasswordconfirmation(!showpasswordconfirmation)}></i></div>
                               {validationErrors.confirm_password && (
                                <div className='text-denger'>{validationErrors.confirm_password[0]}</div>
                               )}
                            </div>
                            <Button type='submit' disabled={loading}>
                              {loading ? 'Registering' : 'Register'}
                              </Button>
                    </div>
                     {/* {error && <Alert variant="danger" className="mt-3">{error}</Alert>} */}
                     
          </div>
         </div>
      </Form>
      <ToastContainer position="top-right" autoClose={3000} />
        <div className='register-photo'>
            <img src={regphoto}/>
        </div>
    </div>
  )
}

export default Register
