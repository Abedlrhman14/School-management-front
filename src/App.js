import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/9747.jpg_wh860.jpg'
import {Button} from "react-bootstrap"
import { BrowserRouter, HashRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
function App() {
  return (
    <div className="">
    
   
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/Register' element={<Register></Register>}></Route>
            <Route path='/Login' element={<Login></Login>}></Route>
      </Routes>
    
     
    </div>
  );
}

export default App;
