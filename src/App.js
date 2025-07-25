import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/9747.jpg_wh860.jpg'
import {Button,} from "react-bootstrap"
import { BrowserRouter, HashRouter, Route, Router, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Mainnavbar from './pages/Mainnavbar';
import Sidebar from './pages/AppSidebar'
import main from './pages/MainPage'
import MainPage from './pages/MainPage';
import ProtectedRoute  from './Component/ProtectedRoute'
import Subject from './pages/SubjectPage'
import ProfilePage from './pages/ProfilePage';
import HomeSuper from './pages/HomeSuperAdmin';
import AdminClass from './pages/ClassAdminpage'
import TeacherDashboard from './pages/TeacherDashboard';
import ClassDetailes from './pages/ClassDetailes';
import Students from './pages/Students';
// import RoleProtectedRoute  from './Component/RoleProtectedRoute'
function App() {
    const location = useLocation();
    const hidenNavbarPath = ['/login' , '/register' , '/'];
    const shouldHidenNavbar = hidenNavbarPath.includes(location.pathname.toLowerCase());
    
  return (
    <div className="main-content">
    
    <>
     {/* {!shouldHidenNavbar && <ProtectedRoute><Mainnavbar /></ProtectedRoute>} */}
      {!shouldHidenNavbar &&<ProtectedRoute><Sidebar /></ProtectedRoute> }
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/Register' element={<Register></Register>}></Route>
            <Route path='/Login' element={<Login></Login>}></Route>
            <Route path='/main' element={<ProtectedRoute allowedRoles={['super_admin']}><MainPage></MainPage></ProtectedRoute>}></Route>
            <Route path='/subject' element={<ProtectedRoute  allowedRoles={['super_admin','student']}> <Subject></Subject></ProtectedRoute>}></Route>
            <Route path='/profile' element={<ProfilePage></ProfilePage>}></Route>
            <Route path='/homesuper' element={<HomeSuper></HomeSuper>}></Route>
            <Route path='/adminclass' element={<AdminClass></AdminClass>}></Route>
            <Route path='/teacherDashboard' element={<TeacherDashboard></TeacherDashboard>}></Route>
            <Route path='/class-detailes/:id' element={<ClassDetailes></ClassDetailes>}></Route>
            <Route path='/students' element={<Students></Students>}></Route>
       </Routes>
    </>
     
    </div>
  );
}

export default App;
