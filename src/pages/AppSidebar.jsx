import React, { useState } from 'react'
import { Button, Col, Container, Row , Offcanvas, } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { toast , ToastContainer } from 'react-toastify';

const AppSidebar = () => {
    const role = localStorage.getItem('role');
     const navigate = useNavigate();
    const Logout = () =>{
         localStorage.removeItem("role");
        localStorage.removeItem('token')
        navigate('/login')
        // toast.error(role.errors);
        
    }
  
  return (
    <div className='sidbar  '>
      <Container >
        <Row>
            <Col>
              <h2 className='mt-5 mx-5' >School</h2>
            </Col>
        </Row>
       <div>
            {role === 'teacher' && (
              <NavLink
                to={'/teacherDashboard'}
                end
                className={({isActive})=>
                `home a d-flex align-items-center px-3 py2 ${isActive ? 'bg-light text-white rounded' : ''}`
                }>
                     <i className="fa-solid fa-house text-primary me-2"></i>
                      <p className="mb-0">Dashboard</p>
              </NavLink>
            )}
             {role === 'super_admin' &&(
                     <NavLink
                    to={'/homesuper'}
                    end
                    className={({isActive})=>
                    `home a d-flex align-items-center px-3 py-2  ${isActive ? 'bg-light text-white rounded' : ''}`
                    }>
                      <i className="fa-solid fa-house text-primary me-2"></i>
                      <p className="mb-0">Dashboard</p>
                    </NavLink>
              )}
            <NavLink
                to={'/main'}
                end
                className={({isActive})=>
                `home a d-flex align-items-center px-3 py-2  ${isActive ? 'bg-light text-white rounded' : ''}`
                 }
            >
                 <i class="fa-solid fa-user me-2 text-primary"></i>
                  <p className="mb-0" >student</p>
            </NavLink>
            {role === 'super_admin' &&(
                <NavLink
                to={'/adminclass'}
                end
                className={({isActive})=>
                `home a d-flex align-items-center px-3 py-2  ${isActive ? 'bg-light text-white rounded' : ''}`
                 }
            >
                 <i class="fa-solid fa-building me-2 text-primary"></i>
                  <p className="mb-0">Classes</p>
                </NavLink>
            )}
                <NavLink
                to={'/profile'}
                end
                className={({isActive})=>
                `home a d-flex align-items-center px-3 py-2  ${isActive ? 'bg-primary text-white rounded' : ''}`
                 }
            >
                 <i className="fa-solid fa-house  me-2 text-primary"></i>
                  <p className="mb-0">Profile</p>
                </NavLink>
                <NavLink
              
                end
                style={{marginTop:"330px" , marginLeft:'30px'}}
                className={({isActive})=>
                `home a d-flex align-items-center px-3 py-2  }`
                 }
            >
                 <i className="fa-solid fa-power-off  me-2 text-danger"></i>
                  <p onClick={Logout} className="mb-0">Logout</p>
                </NavLink>
       </div>
   
      </Container>
    </div>

  )
}

export default AppSidebar
