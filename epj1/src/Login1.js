import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './bootstrap.css';
export default function Login1() {
    const [user,setuser]=useState("");
    const [pass,setpass]=useState("");
    const [alertmessage,setAlertMessage]=useState("");
    const navigate = useNavigate();
    const formData = new FormData();
    formData.append('username', user);
    formData.append('password', pass);

    const SaveVal=(event)=>
    {
        event.preventDefault();
        axios.post("http://localhost:9090/comlog",formData).then(response => {
            const responseData = response.data;
            if(responseData==="Invalid")
            {
                setAlertMessage(
                    <div className="alert alert-dismissible alert-danger">
                      <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{window.location.reload();}}></button>
                      <strong>Sorry </strong> {response.data}
                    </div>
                  );
            }
            else
            {
                //window.location.replace('http://localhost:3000')
                localStorage.setItem('token-info1',JSON.stringify(user));
                navigate('/reghome', { state: {user:user} });
            }
        });
    }
    return (
        <center>
            {alertmessage}
        <div class="form-group">
        <div>
        <h1>Hello Company this is Login</h1>
        <form onSubmit={SaveVal}>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Enter Username" value={user} name="user" required onChange={(e)=>{setuser(e.target.value)}}></input>
            <label for="floatingInput">Username</label>
        </div><br/>
        <div class="form-floating">
            <input type="password" class="form-control" id="floatingInput" placeholder="Enter Password" value={pass} name="pass" required onChange={(e)=>{setpass(e.target.value)}}></input>
            <label for="floatingInput">Password</label>
            </div><br/>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <Link to="/comregister">Register</Link>
        </div>
        </div>
        </center>
    );
}