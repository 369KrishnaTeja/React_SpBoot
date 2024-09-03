import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './bootstrap.css';
import Header1 from "./Header1";
export default function Job()
{
    const location = useLocation();
    //const user = location.state && location.state.user;
    const user=JSON.parse(localStorage.getItem('token-info1'));
    const [companyname,setcompanyname]=useState("");

    useEffect(
        ()=>{getdata();},[]
    )
    const getdata=()=>{
        if(user)
        {
        axios.get('http://localhost:9090/getbyuser/'+user).then(response=>{
                    setcompanyname(response.data);
        });
    }
    }

    const [jobname,setjobname]=useState("");
    const [jobdesc,setjobdesc]=useState("");
    const [jobloc,setjobloc]=useState("");
    const [jobtype,setjobtype]=useState("");
    const [jobsal,setjobsal]=useState("");
    const [alertmessage,setAlertMessage]=useState("");
    const formdata=new FormData();
    formdata.append('jobname',jobname);
    formdata.append('jobdesc',jobdesc);
    formdata.append('jobloc',jobloc);
    formdata.append('jobtype',jobtype);
    formdata.append('jobsal',jobsal);
    formdata.append('companyname',companyname);

    const SaveVal=(event)=>
    {
        event.preventDefault();
        axios.post("http://localhost:9090/job",formdata).then(response => {
            const responseData = response.data;
            if (responseData === "Success") {
                setAlertMessage(
                  <div className="alert alert-dismissible alert-success">
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{window.location.reload();}}></button>
                    <strong>Well done!</strong> {response.data}
                  </div>
                );
              };              
        });
    }

    return(
        <center>
        <Header1></Header1><br/>
        {user?(
        <div class="form-group">
        <div>
        <h1>Hello Company Register for Job Role</h1>
        {alertmessage}
        <form onSubmit={SaveVal}>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Enter JobName" value={jobname} name="jobname" required onChange={(e)=>{setjobname(e.target.value)}}></input>
            <label for="floatingInput">Job Name</label>
        </div><br/>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Enter JobDescription" value={jobdesc} name="jobdesc" required onChange={(e)=>{setjobdesc(e.target.value)}}></input>
            <label for="floatingInput">Job Description</label>
        </div><br/>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Enter JobLocation" value={jobloc} name="jobloc" required onChange={(e)=>{setjobloc(e.target.value)}}></input>
            <label for="floatingInput">Job Location</label>
        </div><br/>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Enter JobType" value={jobtype} name="jobtype" required onChange={(e)=>{setjobtype(e.target.value)}}></input>
            <label for="floatingInput">Job Type</label>
        </div><br/>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Enter JobSalary" value={jobsal} name="jobsal" required onChange={(e)=>{setjobsal(e.target.value)}}></input>
            <label for="floatingInput">Job Salary</label>
        </div><br/>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
        </div>
        </div>
        ):(<div><h1>Please Login to View Data</h1></div>)
    }
        </center>
    );
}