import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from './axiosInstance';
import { toast } from 'react-toastify';
import { Card, Col, Container, Row } from 'react-bootstrap';

const ClassDetailes = () => {
    const {id} = useParams();
    const [classData , setClassData] = useState(null);
    const token = localStorage.getItem('token');
    // this function for catch data
    useEffect(()=>{
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
        fetchClassDetailes();
    },[id])
      if (!classData) return <p>Loading...</p>;
  return (
    <div>
       <Container className="mt-5">
      <h2>Class: {classData.name}</h2>
      <p><strong>Grade:</strong> {classData.grade?.name}</p>

      <h4 className="mt-4">Students:</h4>
      {classData.students.length > 0 ? (
        <Row>
          {classData.students.map((student) => (
            <Col md={4} key={student.id} className="mb-3">
              <Card body>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No students in this class.</p>
      )}

      <h4 className="mt-4">Tasks:</h4>
      {classData.tasks.length > 0 ? (
        <ul>
          {classData.tasks.map((task, index) => (
            <li key={index}>{task.title}</li> // حسب البيانات المتاحة لاحقًا
          ))}
        </ul>
      ) : (
        <p>No tasks for this class.</p>
      )}
    </Container>
    </div>
  )
}

export default ClassDetailes
