import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import axios from '../pages/axiosInstance'
import { toast } from 'react-toastify';
const Addclas = () => {
    const token = localStorage.getItem('token');
    const [name , SetName] = useState('');
    const [gradeId , setGradeId] = useState('');
    const [showModal , setShowModal] = useState(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const createClass  = async (e) =>{
         e.preventDefault();
        try {
            const response = await axios.post('http://school.test/api/classes',{
                name: name,
                grade_id: gradeId
            },
            {
              headers:{                
                 Authorization:`Bearer ${localStorage.getItem('token')}`,
                },
            }
        )
        // console.log(response); 
        toast.success('Class Added Successfuly');
        SetName('');
        setGradeId('');
        if (response.status === 200 || response.status === 201) {
  handleClose();
}  
        }catch(error) {
            // console.error(error.response?.data); //Debugging
            toast.error(error.response?.data.message)
        }
    }
  return (
    <div className=' d-flex justify-content-end'>
      <Row>
        <Col className='mx-5 mt-5'>
            <Button 
                onClick={handleOpen}
            >Add Class</Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose} centered backdrop='static'>
        <Modal.Header closeButton>
            <Modal.Title>Add New Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form >
                <Form.Group >
                    <Form.Label>Class Name</Form.Label>
                    <Form.Control
                        type='text'
                        value={name}
                        onChange={(e) => SetName(e.target.value)}
                    ></Form.Control>
                    <Form.Label className='mt-1'>Grade Id</Form.Label>
                    <Form.Control
                        type='text'
                        value={gradeId}
                        onChange={(e) => setGradeId(e.target.value)}
                    ></Form.Control>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
             <Button  onClick={createClass} type='submit'>Add</Button>
             <Button onClick={handleClose} className='btn btn-danger'>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Addclas
