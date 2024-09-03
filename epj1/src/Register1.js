import React, { useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import './bootstrap.css';
export default function Register1()
{
    const [user,setuser]=useState("");
    const [pass,setpass]=useState("");
    const [email,setemail]=useState("");
    const [alertmessage,setAlertMessage]=useState("");
    const [companyname,setcompanyname]=useState("");
    const fromdata=new FormData();
    fromdata.append('username',user);
    fromdata.append('password',pass);
    fromdata.append('email',email);
    fromdata.append('companyname',companyname);

    const SaveData=(event)=>{
        event.preventDefault();
        axios.post("http://localhost:9090/comreg",fromdata).then(response => {
            const responseData = response.data;
            if(responseData==="Success")
            {
                setAlertMessage(
                    <div className="alert alert-dismissible alert-success">
                      <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{window.location.replace('http://localhost:3000/comlogin');}}></button>
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

    return(
        <center>
        <div class="form-group">
        <div>
            <h2>Hello Company Register Here</h2>
            {alertmessage}
            <form onSubmit={SaveData}>
            <div class="form-floating">
                <input type="text" value={user} class="form-control" id="floatingInput" placeholder="Enter Username" name="user" required onChange={(e)=>{setuser(e.target.value)}}></input>
                <label for="floatingInput">Username</label>
            </div><br/>
            <div class="form-floating">
                <input type="password" value={pass} class="form-control" id="floatingInput" placeholder="Enter Password" name="pass" required onChange={(e)=>{setpass(e.target.value)}}></input>
                <label for="floatingInput">Password</label>
            </div><br/>
            <div class="form-floating">
                <input type="email" value={email} class="form-control" id="floatingInput" placeholder="Enter Email" name="email" required onChange={(e)=>{setemail(e.target.value)}}></input>
                <label for="floatingInput">Email</label>
            </div><br/>
            <div class="form-floating">
                <input type="text" value={companyname} class="form-control" id="floatingInput" placeholder="Enter Company Name" name="companyname" required onChange={(e)=>{setcompanyname(e.target.value)}}></input>
                <label for="floatingInput">CompanyName</label>
            </div><br/>
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
            <Link to="/comlogin">Login</Link>
        </div>
        </div>
        </center>
    );
}