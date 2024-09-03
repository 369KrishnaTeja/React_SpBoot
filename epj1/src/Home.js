import React from "react";
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "./Header";
import './bootstrap.css';
export default function Home() {
        const location = useLocation();
        const navigate= useNavigate();
        //const user = location.state && location.state.user;
        const user=JSON.parse(localStorage.getItem('token-info'));
        const logout=()=>{
            localStorage.removeItem('token-info');
            window.location.replace('http://localhost:3000/login');
        }
        const upload=()=>{
            navigate('/upload',{ state: {user:user} });
        }

        const applyjob=()=>{
            navigate('/applyjob',{state: {user:user}});
        }

        const company=()=>{
            navigate('/company',{state:{user:user}});
        }
        //<div><button type="button" class="btn btn-primary" onClickCapture={logout}>Logout </button><button type="button" class="btn btn-primary" onClickCapture={upload}>Upload</button><button type="button" class="btn btn-primary" onClickCapture={company}>Company List</button> <button type="button" class="btn btn-primary" onClickCapture={applyjob}>Applied Job Profiles</button></div>
        return (
            <div>
            <Header></Header><br/>
            {user?(<h1>Hello {user}</h1>):(<div><h1>Please Login to access features </h1></div>)}
            <div class="card text-white bg-primary mb-3" style={{maxWidth:"20rem"}}>
  <div class="card-header">Header</div>
  <div class="card-body">
    <h4 class="card-title">Primary card title</h4>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
<div class="card text-white bg-primary mb-3" style={{maxWidth:"20rem"}}>
  <div class="card-header">Header</div>
  <div class="card-body">
    <h4 class="card-title">Primary card title</h4>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
            </div>
        );
}