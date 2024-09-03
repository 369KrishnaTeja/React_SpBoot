import React from "react";
import './bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Header1(){

    const user=JSON.parse(localStorage.getItem('token-info1'));

    return(
        <div>
        {user?(
        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand">EasyPlace</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:3000/reghome">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:3000/jobprofile">Register Job Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:3000/viewjob">Job Profiles Registered</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:3000/applystudent">Students Applied</a>
        </li>
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Logout/Profile
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
        <li class="nav-item">
        <button type="button" class="btn btn-primary" onClickCapture={()=>{localStorage.removeItem('token-info1');
            window.location.replace('http://localhost:3000/comlogin');
            }}>Logout </button>
        </li>
        </Dropdown.Item>
        <Dropdown.Item href="http://localhost:3000/profile1">Profile</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </ul>
    </div>
  </div>
</nav>
    ):(
//         <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
//   <div class="container-fluid">
//     <a class="navbar-brand">EasyPlace</a>
//     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
//       <span class="navbar-toggler-icon"></span>
//     </button>
//     <div class="collapse navbar-collapse" id="navbarColor01">
//       <ul class="navbar-nav me-auto">
//         <li class="nav-item">
//           <a class="nav-link" href="http://localhost:3000/reghome">Home</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="http://localhost:3000/jobprofile">Register Job Profile</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="http://localhost:3000/viewjob">Job Profiles Registered</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="http://localhost:3000/applystudent">Students Applied</a>
//         </li>
//         <li class="nav-item dropdown">
//         <a class="nav-link dropdown-toggle show" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">Dropdown</a>
//           <div class="dropdown-menu">
//             <a class="dropdown-item" href="http://localhost:3000/comlogin">Login</a>
//             <div class="dropdown-divider"></div>
//             <a class="dropdown-item" href="http://localhost:3000/comregister">Register</a>
//           </div>
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>
<nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand">EasyPlace</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
      <li class="nav-item">
           <a class="nav-link" href="http://localhost:3000/reghome">Home</a>
         </li>
         <li class="nav-item">
           <a class="nav-link" href="http://localhost:3000/jobprofile">Register Job Profile</a>
         </li>
         <li class="nav-item">
           <a class="nav-link" href="http://localhost:3000/viewjob">Job Profiles Registered</a>
         </li>
         <li class="nav-item">
           <a class="nav-link" href="http://localhost:3000/applystudent">Students Applied</a>
         </li>
        {/* <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">Dropdown</a>
          <div class="dropdown-menu show" data-bs-popper="static">
          <a class="dropdown-item" href="http://localhost:3000/comlogin">Login</a>
             <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="http://localhost:3000/comregister">Login</a>
          </div>
        </li> */}
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Login/Register
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="http://localhost:3000/comlogin">Login</Dropdown.Item>
        <Dropdown.Item href="http://localhost:3000/comregister">Register</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </ul>
    </div>
  </div>
</nav>
    )
    }
    </div>
    );
}