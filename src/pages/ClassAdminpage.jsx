    import React, { useEffect, useState } from 'react'
    import axios from './axiosInstance';
    import { toast } from 'react-toastify';
    import { Button, Card } from 'react-bootstrap';

    const ClassAdminpage = () => {
        const token = localStorage.getItem('token');
        const [ classes ,setClasses] = useState([]);
        useEffect(()=>{
            const getClasses = async ()=>{
                try{
                    const response = await axios.get ('/show/classses',{
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    });
                    setClasses(response.data.data)
                    console.log(response.data.data);
                }catch(err){
                    toast.error(err?.data?.data.message);
                }
            }
            getClasses()
        },[])
    return (
        <div>
            <div className='classNav'>
                <div className='d-flex justify-content-between'>
                    <p style={{ position:"absolute", color:'white', fontSize:'20px', marginTop:'10px', marginLeft:'20px'}}>class name</p>
                    <p style={{ position:"absolute", color:'white', fontSize:'20px', marginTop:'10px', marginLeft:'90%'}}>Action</p>
                </div>
            </div>
            {classes.map((cla)=>(
                    <Card body>
                        {cla.name}
                        {/* {cla.id} */}
                    
                        <div className='d-flex justify-content-end'>
                            <Button className='btn btn-danger'style={{marginLeft:'20px'}}>
                                Delete
                            </Button>
                            <Button style={{marginLeft:'20px'}}>
                                View
                            </Button>
                                <Button style={{marginLeft:'20px'}}>
                                add <i class="fa-solid fa-plus"></i>
                            </Button>
                        </div>
                    </Card>
            ))}
        
        
        </div>
    )
    }

    export default ClassAdminpage
