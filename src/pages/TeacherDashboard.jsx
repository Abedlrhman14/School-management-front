import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import axios from './axiosInstance';
import { toast } from 'react-toastify';
import Addclas from '../Component/Addclas';
import { ToastContainer } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const TeacherDashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [classes , setClasses] = useState([]); // this for catch the classes
    const [addModal , setAddModal] = useState(false); //this for add student button 
    const [deleteModal , setDeleteModal] = useState(false); // this for delete Modal
    const [targetClassId , setTargetClassId] = useState(null) // to catch class id
    const [studentEmail , setStudentEmail] = useState(''); // to catch stduent email
          const fetchClasses = async ()=>{
            try{
                const response = await axios.get('/classes/',{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                setClasses(response.data);
                // console.log(response);
            }catch(err){
                console.error(err.response?.data?.errors);
                  toast.error(err.response?.data?.errors);
            }
        }
         fetchClasses();
    
    
        
  return (
    <div>   
      <Container>
        <Row>
            <Col>
               <div className='mt-5 ms-5'>
                  <h2>My classees</h2>
               </div>
            </Col>
        </Row>
            <Row>
              <Col>
                <Addclas></Addclas>
              </Col>
           </Row>
          <div className='mt-5'>
                <div className='classNav bg-secondary '>
                    <div className='d-flex justify-content-between'>
                    <p style={{ position:"absolute", color:'white', fontSize:'20px', marginTop:'10px', marginLeft:'20px'}}>class name</p>
                    <p style={{ position:"absolute", color:'white', fontSize:'20px', marginTop:'10px', marginLeft:'90%'}}>Action</p>
                </div>
                </div>
          </div>
      
            <Row>
                <Col>
                    {classes.map((cls)=>(
                        <Card body>
                            {cls.name}
                            {/* {cls.id} */}
                                <div className='d-flex justify-content-end mx-5'>
                                <a href='#' onClick={(e) => e.preventDefault()} style={{marginLeft:'20px'}}>
                                    <i
                                    onClick={()=>{
                                        setAddModal(true)// to show modal 
                                        setTargetClassId(cls.id) // to pass  the class id to modal
                                    }}
                                     class="fa-solid fa-user-plus text-secondary"></i>
                               </a>
                                <a  href='#' onClick={(e) => e.preventDefault()}   style={{marginLeft:'20px'}}>
                                   <i 
                                     onClick={() => navigate(`/class-detailes/${cls.id}`)}
                                    class="fa-solid fa-eye">
                                  </i>
                                </a>
                                   <a href="#" onClick={(e) => e.preventDefault()}   style={{marginLeft:'20px'}} >
                                    <i 
                                         onClick={()=>{
                                            setDeleteModal(true) //to show  delete modal 
                                            setTargetClassId(cls.id) // to pass  the class id to modal
                                         }}
                                            className="fa-solid fa-trash text-danger">
                                     </i>
                                </a>
                            </div>
                        </Card>
                    ))}
                </Col>
            </Row>
      </Container>

      <Modal
      //this modal for add student
       show={addModal}
       onHide={() => setAddModal(false)
       }
      >
        <Modal.Header closeButton>
            <Modal.Title> Add Student</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <input
                    type='email'
                    className='form-control'
                    placeholder='Student Email'
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                >
                </input>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn btn-danger' onClick={()=>setAddModal(false)}>Cancel</Button>
                <Button 
                    className='btn btn-primary'
                    onClick={async()=>{
                        //this function to add the student
                        try{
                            const res = await axios.post(`/classes/${targetClassId}/students`,
                                
                                {student_email :studentEmail},
                                {
                                    headers:{
                                        Authorization:`Bearer ${token}`,
                                    },
                                }
                            );
                            toast.success('Student was added successfully');
                              fetchClasses();
                            setAddModal(false);
                            setStudentEmail('');
                            setTargetClassId(null);
                          
                            // console.log('Posting to class:', targetClassId);
                        }catch(err){
                            const errormsg = err.response?.data?.student_email?.[0]||
                            err.response?.data?.message||
                            'Failed To Add student'
                            toast.error(errormsg);
                        }
                    }}
                >
                    Add Student
                </Button>
            </Modal.Footer>
      </Modal>
      <Modal 
        show={deleteModal} 
        onHide={()=>setDeleteModal(false)}
        >
            <Modal.Header closeButton>
                Delete Student
            </Modal.Header>
            <Modal.Body>
                <p>Are you Sure</p>
            </Modal.Body>
            <Modal.Footer  className='d-flex justify-content-center'>
                    <Button 
                        className='btn btn-danger'
                        onClick={async () =>{
                            try{
                                const res = await axios.delete(`/classes/${targetClassId}`,{
                                    headers:{
                                        Authorization:`Bearer ${token}`
                                    }
                                });
                                setTargetClassId(null)
                                setDeleteModal(false)
                                toast.success('Class deleted successufely');
                                   fetchClasses();
                            }catch(err){
                                  toast.error( err.response?.data?.message)
                            }
                        }}
                    >
                        Delete
                    </Button>

                    <Button className='btn btn-primary' onClick={()=>{setDeleteModal(false)}}>Cancel</Button>
            </Modal.Footer>
        </Modal>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>

  )
}

export default TeacherDashboard
