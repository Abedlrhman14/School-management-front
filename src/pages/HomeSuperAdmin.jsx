    import React, { useEffect, useState } from 'react'
    import axios from './axiosInstance';
    import { toast, ToastContainer } from 'react-toastify';
    import { Navigate } from 'react-router-dom';
    import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
    import studentimg from '../assets/OIP.jpeg'
    import teacherimg from '../assets/school-teacher_1301901-228.avif' 
    import classimg from '../assets/OIP (2).jpeg' 
import Addclas from '../Component/Addclas';
    const HomeSuperAdmin = () => {
        const token = localStorage.getItem('token')

        const [student , setStudent] = useState(''); 
        const [teacher , setTeacher] = useState(''); 
        const [classes , setClasses] = useState('');
        const [classList , setClassList] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [paginate , setPaginate] = useState({
            current_page:1,
            last_page:1
        });
        const classesPerPage =5;
        const [showModel , setShowModel] = useState(false);
        const [AddStudent , setAddStudent] = useState(false);
        const [selectedClass , setSelectedClass] = useState(null);
        const [studentEmail , setSudentEmail] = useState('');
        const [TargetClassId,setTargetClassId] = useState('');
        const [deleteClass , setDeleteClass] = useState()
        const [deletmodal , setDeleteModal] = useState(false);
            const getSuperHome = async ()=>{
                try{
                    const res1 = await axios.get('/show/super',{
                        headers :{
                            Authorization : `Bearer ${token}` 
                        },
                        
                    });
                        const res2 = await axios.get ('/show/classses',{
                            headers:{
                                Authorization:`Bearer ${token}`
                            }
                            
                        });
                    setStudent(res1.data.data.student);
                    setTeacher(res1.data.data.techers);
                    setClasses(res1.data.data.classes);
                    
                         
                }catch(err){
                    toast.error(err.response?.data?.errors);
                }  
            }
            const getClasses = async (page =1)=> {
               try{
                        const res5 = await axios.get(`/show/classses?page=${page}`,
                            {
                                headers:{Authorization:`Bearer ${token}`}
                            }
                        );
                        const responseData = res5.data.data;
                         setClassList(responseData.data);
                         console.log(setClassList);
                            setPaginate({
                            current_page:responseData.current_page,
                            last_page : responseData.last_page,
                        });
                        setCurrentPage(responseData.current_page)
               }catch(err){
                toast.error(err.response?.data?.data?.message)
               }
            }
              useEffect(()=>{
            getClasses(1)
            getSuperHome();
                        if (!token) {
                        return <Navigate to="/login" replace />;
                }
        },[])
    return (
        <div>
            <Row>
                <Col>
                    <h4 className='mt-5 ms-4'>School Dashboard</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                         <div className='supercard d-flex mt-5' >
                <Card style={{ width: '18rem', alignItems:'center' , marginTop:'300px'}} className='ms-5 mt-2'>
                    <Card.Body>
                        <Card.Title><img src={studentimg} className='ms-3'></img></Card.Title>
                        <Card.Title>Total Students</Card.Title>
                        <Card.Subtitle  className="mb-2 ms-5 text-muted">{student}</Card.Subtitle>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem', alignItems:'center' }} className='ms-5 mt-2'>
                    <Card.Body>
                        <Card.Title><img src={teacherimg} className='ms-3'></img></Card.Title>
                        <Card.Title>Total teachers</Card.Title>
                        <Card.Subtitle  className=  "mb-2 ms-5 text-muted">{teacher}</Card.Subtitle>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem', alignItems:'center' }} className='ms-5 mt-2'>
                    <Card.Body>
                        <Card.Title><img src={classimg} className='ms-3'></img></Card.Title>
                        <Card.Title>Total classes</Card.Title>
                        <Card.Subtitle  className=  "mb-2 ms-5 text-muted">{classes}</Card.Subtitle>
                    </Card.Body>
                </Card>
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
            {Array.isArray(classList) &&classList.map((cla)=>(
                <Card body key={cla.id}>
                            {cla.name}
                            <div className='d-flex justify-content-end mx-5'>
                                <a href="#" onClick={(e) => e.preventDefault()}   style={{marginLeft:'20px'}} >
                                    <i 
                                        onClick={()=>{
                                            setTargetClassId(cla.id);
                                            setDeleteModal(true);
                                        }}
                                            className="fa-solid fa-trash text-danger">
                                     </i>
                                </a>
                                <a href='#' onClick={(e) => e.preventDefault()}     style={{marginLeft:'20px'}}>
                                   <i 
                                     onClick={()=>{
                                     setSelectedClass(cla);
                                     setShowModel(true);
                                    }}
                                    class="fa-solid fa-eye">
                                    </i>
                                </a>
                                <a href='#' onClick={(e) => e.preventDefault()} style={{marginLeft:'20px'}}>
                                    <i
                                     onClick={()=>{
                                        setTargetClassId(cla.id);
                                        setAddStudent(true);
                                     }}
                                     class="fa-solid fa-user-plus text-secondary"></i>
                                     
                               </a>
                            </div>
                </Card>
            ))}
             <div className='d-flex justify-content-center mt-2'>
                <Button
                    disabled={paginate.current_page === 1}
                    onClick={() => getClasses(paginate.current_page - 1)}
                    className='me-2'
                >
                    Previous
                </Button>
              <span>Page {paginate.current_page} of {paginate.last_page}</span>
              <Button
                 disabled={paginate.current_page === paginate.last_page}
                 onClick={() => getClasses(paginate.current_page + 1)}
                className="ms-2"
             >
                  Next
              </Button>
            </div>

            <Modal show={showModel} onHide={()=>setShowModel(false)} centered backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Class Tedails</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedClass &&(
                        <>
                            <p><strong>Class name : {selectedClass.name}</strong></p>
                            <p><strong>Class ID : {selectedClass.id}</strong></p>
                            <p><strong>teacher name : {selectedClass.teacher.name}</strong></p>
                            <p><strong>Grade name  : {selectedClass.grade.name}</strong></p> 
                            <p><strong>Students  : {selectedClass.students_count}</strong></p> 
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center' >
                    <Button variant='danger' onClick={()=>setShowModel(false)}>Close</Button>
                </Modal.Footer>
            </Modal>     
            <Modal
                show={AddStudent}
                onHide={()=>{
                    setAddStudent(false);
                    setSudentEmail('');
                    setTargetClassId(null);
                }}
                centered
                backdrop='static'
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Email:</label>
                        <input
                            type='email'
                            className='form-control'
                            placeholder='studen@example.com'
                            value={studentEmail}
                            onChange={(e)=>setSudentEmail(e.target.value)}
                        >
                        </input>
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-center'>
                            <Button
                                variant='success'
                                onClick={async ()=>{
                                    if(!TargetClassId || !studentEmail){
                                        toast.error('Pleaser Provide student Email');
                                        return;
                                    }
                                    try{
                                    const res3=  await axios.post(`/classes/${TargetClassId}/students`,
                                            {student_email:studentEmail},
                                            {
                                                headers:{
                                                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                                                },
                                            }
                                        );
                                                console.log(res3.data);
                                                getSuperHome();
                                                toast.success('student Add successfuly');
                                                setAddStudent(false);
                                                setSudentEmail('');
                                                setTargetClassId(null);
                                    }catch(err){
                                    
                                        const errorMsg =
                                                    err.response?.data?.errors?.student_email?.[0] ||
                                                    err.response?.data?.message || 
                                                    "Failed to add student";
                                                    toast.error(errorMsg);
                                    }
                                }}
                            >
                                Add
                            </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setAddStudent(false);
                                        setSudentEmail('');
                                        setTargetClassId(null);
                                        
                                    }}
                                    >
                                    Cancel
                                </Button>
                        </Modal.Footer>
            </Modal>
            <Modal
                show={deletmodal}
                onHide={()=>{
                    setDeleteModal(false);
                    setDeleteClass(false);
                }}
                centered
                backdrop='static'
            >
                <Modal.Header closeButton>
                    Delete Student
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-center'>
                    <p className=''>Are you sure?</p>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    
                    <Button
                    className='btn btn-danger'
                    onClick={async () =>{
                        if(!TargetClassId){
                            toast.error('Please select class');
                            return;
                        }
                        try{
                        const   res4 = await axios.delete(`/classes/${TargetClassId}`,
                                {
                                    headers:{
                                        Authorization:`Bearer ${token}`
                                    }
                                }
                            );
                            setTargetClassId(null);
                            getSuperHome();
                            setDeleteClass(false);
                            setDeleteModal(false);
                            toast.success('Class deleted successufely');
                        }catch(err){
                                toast.error( err.response?.data?.message)
                        }
                    }}
                    >Delete</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
        
        
    )
    
    }


    export default HomeSuperAdmin
