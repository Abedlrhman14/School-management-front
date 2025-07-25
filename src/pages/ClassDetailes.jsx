import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from './axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';

const ClassDetailes = () => {
  const navigate = useNavigate();
    const {id} = useParams();
    const [classData , setClassData] = useState(null);
    const token = localStorage.getItem('token');
    const [showTaskModal , setShowTaskModal] = useState(false);
    const [taskTitle , setTaskTitle] = useState('');
    const [taskDescription , setTaskDescription] = useState('');
    const [file , setFile]  = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // عدد الطلاب لكل صفحة
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentStudents = classData?.students?.slice(startIndex, endIndex);
    const totalPages = Math.ceil(classData?.students?.length / itemsPerPage);

    useEffect(() => {
        const totalPages = Math.ceil(classData?.students?.length / itemsPerPage);
        if (currentPage > totalPages) {
          setCurrentPage(totalPages || 1);
        }
      }, [classData?.students]);

    // this function for catch data
    useEffect(()=>{
    
        fetchClassDetailes();
    },[id])
        const fetchClassDetailes = async() => {
            try{
                const res = await axios.get(`http://school.test/api/classDetailes/${id}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                });
                setClassData(res.data.data);
                console.log("API RESPONSE:", res.data);
            }catch(err){
                toast.error('Failed to load class details')
                console.error(err);
            }
        }
      if (!classData) return <p>Loading...</p>;
  return (
    <div>
       <Container className="mt-5">
        <Button onClick={() => navigate(-1)} variant="secondary" className="mb-3">
          Back
        </Button>
      <h2>Class: {classData.name}</h2>
      <p><strong>Grade:</strong> {classData.grade?.name}</p>
      <Button 
        onClick={()=> setShowTaskModal(true)}
      >
        Add Task
      </Button>
      <h4 className="mt-4">Students:</h4>
   
      {classData?.students?.length > 0 ? (
        <>
          <Row>
            {currentStudents.map((student) => (
              <Col  className='d-flex justify-content-start mt-3 'md={3} key={student.id} >
                <Card  body>
                  <p><strong>Name:</strong> {student.name}</p>
                  <p><strong>Email:</strong> {student.email}</p>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-center mt-3 gap-2">
            <Button 
              variant="outline-primary" 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              back
            </Button>

            {Array.from({ length: totalPages }, (_, index) => (
              <Button 
                key={index + 1}
                variant={currentPage === index + 1 ? 'primary' : 'outline-primary'}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}

            <Button 
              variant="outline-primary" 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </>
) : (
  <p>No students in this class.</p>
)}

      <h4 className="mt-4">Tasks:</h4>
      {classData.tasks.length > 0 ? (
        <ul>
          {classData.tasks.map((task, index) => (
            <li key={index}>{task.title}-{task.description}-
              <a
                href={`http://school.test/storage/${task.file_path}`}
                target="_blank"
               rel="noopener noreferrer"
              >
                   View File
              </a>
            </li> // حسب البيانات المتاحة لاحقًا
          ))}
        </ul>
      ) : (
        <p>No tasks for this class.</p>
      )}
    </Container>
    <Modal show={showTaskModal} onHide={()=>setShowTaskModal(false)}>
      <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type='text'
          className='form-control mb-3'
          placeholder='Task Title'
          value={taskTitle}
          onChange={(e)=>setTaskTitle(e.target.value)}
        >
        </input>
        <textarea
          className='form-control'
          placeholder='Task Description'
          rows={4}
          value={taskDescription}
          onChange={(e)=>setTaskDescription(e.target.value)}
        ></textarea>
            <input
                type="file"
                className="form-control mb-3"
                onChange={(e) => setFile(e.target.files[0])}
              />
      </Modal.Body>
      <Button
        variant='primary'
        onClick={ async  () => {
          try{
              const formData = new FormData();
             formData.append("title", taskTitle);            // هنا بدل ما تسيبهم في JSON
             formData.append("description", taskDescription);
             formData.append("file", file); 
            const res = await axios.post(`http://school.test/api/tasks/${id}`,formData,
            {
              headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
             toast.success('Task added successfully!');
              setShowTaskModal(false);
              setTaskTitle('');
              setTaskDescription('');
              fetchClassDetailes();
          }catch(err){
            console.error('Validation Error:', err.response?.data);
            toast.error(
              err.response?.data?.message || 'Failed to add task'
            );
          }
        }}
      >
        upload
      </Button>
      <Button className='btn btn-danger' onClick={()=>setShowTaskModal(false)}>Cancel</Button>
    </Modal>
       <ToastContainer position="top-right" autoClose={3000} />
    </div>  
  )
}

export default ClassDetailes
