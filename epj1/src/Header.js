import React from "react";
import './bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Header(){

    const user=JSON.parse(localStorage.getItem('token-info'));

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
          <a class="nav-link" href="http://localhost:3000/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:3000/upload">Upload</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:3000/company">Company List</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:3000/applyjob">Applied Jobs</a>
        </li>
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Logout/Profile
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
        <li class="nav-item">
        <button type="button" class="btn btn-primary" onClickCapture={()=>{localStorage.removeItem('token-info');
            window.location.replace('http://localhost:3000/login');
            }}>Logout </button>
        </li>
        </Dropdown.Item>
        <Dropdown.Item href="http://localhost:3000/profile">Profile</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </ul>
    </div>
  </div>
</nav>
    ):(
        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">EasyPlace</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:3000/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:3000/upload">Upload</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:3000/company">Company List</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:3000/applyjob">Applied Jobs</a>
        </li>
        {/* <li class="nav-item">
        <a class="nav-link" href="http://localhost:3000/login">Login</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="http://localhost:3000/register">Register</a>
        </li> */}
        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Login/Register
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="http://localhost:3000/login">Login</Dropdown.Item>
        <Dropdown.Item href="http://localhost:3000/register">Register</Dropdown.Item>
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