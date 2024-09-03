import React, { useState } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import './bootstrap.css';
export default function Register() {
    const [user,setuser]=useState("");
    const [pass,setpass]=useState("");
    const [email,setemail]=useState("");
    const [phone,setphone]=useState("");
    const [alertmessage,setAlertMessage]=useState("");
    const [college,setcollege]=useState("");
    const formData = new FormData();
    formData.append('username', user);
    formData.append('password', pass);
    formData.append('email', email);
    formData.append('phoneno', phone);
    formData.append('college', college);

    const SaveVal=(event)=>
    {
        event.preventDefault();
        axios.post("http://localhost:9090/reg",formData).then(response => {
            const responseData = response.data;
            if(responseData==="Success")
            {
                setAlertMessage(
                    <div className="alert alert-dismissible alert-success">
                      <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{window.location.replace('http://localhost:3000/login');}}></button>
                      <strong>Well done!</strong> {response.data}
                    </div>
                  );
            }
            else
            {
                setAlertMessage(
                    <div className="alert alert-dismissible alert-danger">
                      <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{window.location.reload();}}></button>
                      <strong>Sorry !!</strong> {response.data}
                    </div>
                  );
            }
        });
    }
    return (
        <center>
        <div class="form-group">
        <div>
        <h1>Hello User this is Register</h1>
        {alertmessage}
        <form onSubmit={SaveVal}>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Enter Username" value={user} name="user" required onChange={(e)=>{setuser(e.target.value)}}></input>
            <label for="floatingInput">Username</label>
        </div><br/>
        <div class="form-floating">
            <input type="password" class="form-control" id="floatingInput" placeholder="Enter Password" value={pass} name="pass" required onChange={(e)=>{setpass(e.target.value)}}></input>
            <label for="floatingInput">Password</label>
        </div><br/>
        <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="Enter Email" value={email} name="email" required onChange={(e)=>{setemail(e.target.value)}}></input>
            <label for="floatingInput">Email</label>
        </div><br/>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Enter PhoneNo" value={phone} name="phone" required onChange={(e)=>{setphone(e.target.value)}}></input>
            <label for="floatingInput">PhoneNo</label>
        </div><br/>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Enter CollegeName" value={college} name="college" required onChange={(e)=>{setcollege(e.target.value)}}></input>
            <label for="floatingInput">CollegeName</label>
        </div><br/>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <Link to="/login">Login</Link>
        </div>
    </div>
    </center>
    );
}