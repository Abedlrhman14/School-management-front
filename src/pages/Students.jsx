import React, { useEffect, useState } from 'react'
import axios from './axiosInstance';
import { Card, Col, Row } from 'react-bootstrap';

const Students = () => {
    const [students , setStudents] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(()=>{
        const fetchStudent = async () =>{
            try{
                const res = await axios.get(`http://school.test/api/show-students`,
                    {
                        headers:{
                            Authorization:`Bearer  ${token}`
                        },
                    });
                    setStudents(res.data.data);
                    console.log(res.data);
            }catch(err){
                console.error(err.response?.data?.message);
            }
        }
         fetchStudent(); 
    },[])
  return (
    <div>
      <div className="container mt-5">
            <h2>Students List</h2>
            {Array.isArray(students) && students.length > 0 ? (
                <Row>
                {students.map((student) => (
                    
                        <Col className='d-flex justify-content-start mt-3  'md={3}>
                            <Card style={{width:"300px"}} body>
                                <p><strong>Name:</strong> {student.name}</p>
                                <p><strong>Email:</strong> {student.email}</p>
                                <p><strong>Role:</strong> {student.role}</p>
                             </Card>
                        </Col>
                     
                ))}
               
                </Row>
                
            ) : (
                <p>No students found.</p>
            )}
            </div>
    </div>
    
  )

}

export default Students
