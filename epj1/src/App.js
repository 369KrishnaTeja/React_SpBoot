import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Upload from './Upload';
import Company from './Company';
import Register1 from './Register1';
import Login1 from './Login1';
import Home1 from './Home1';
import Job from './Job';
import Viewjob from './Viewjob';
import Applyjob from './Applyjob';
import Studentsapply from './Studentsapply';
import Profile from './Profile';
import Profile1 from './Profile1';

function App() {
  return (
    <div>
      <BrowserRouter>
         <Routes>
         <Route path="/" element={<Home/>} exact/>
         <Route path="/company" element={<Company/>} exact/>
         <Route path="/login" element={<Login/>} exact/>
         <Route path="/register" element={<Register/>} exact/>
         <Route path="/upload" element={<Upload/>} exact/>
         <Route path="/comregister" element={<Register1/>} exact/>
         <Route path="/comlogin" element={<Login1/>} exact/>
         <Route path="/reghome" element={<Home1/>} exact/>
         <Route path="/jobprofile" element={<Job/>} exact/>
         <Route path="/viewjob" element={<Viewjob/>} exact/>
         <Route path="/applyjob" element={<Applyjob/>} exact/>
         <Route path="/applystudent" element={<Studentsapply/>} exact/>
         <Route path="/profile" element={<Profile/>} exact/>
         <Route path="/profile1" element={<Profile1/>} exact/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
