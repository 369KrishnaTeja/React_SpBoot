import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './bootstrap.css';
import Header1 from "./Header1";

export default function Company(){
    const location=useLocation();
    //const user=location.state && location.state.user;
    const user=JSON.parse(localStorage.getItem('token-info1'));
    const[data,setdata]=useState([]);
    const [alertmessage,setAlertMessage]=useState("");
    useEffect(
        ()=>{getdata();},[]
    )
    const getdata=(event)=>{
        if(user){
        axios.get('http://localhost:9090/getcompanybyuser/'+user).then(response=>{
            setdata(response.data);
            console.log(response.data);
        })
    }
    }

    return(
        <div>
            <Header1></Header1><br/>
            {user?(
                <div>
                    {alertmessage}
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">CompanyName</th>
                            <th scope="col">JobName</th>
                            <th scope="col">JobDesc</th>
                            <th scope="col">JobLocation</th>
                            <th scope="col">JobSalary</th>
                            <th scope="col">JobType</th>
                            <th scope="col">Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((job,key)=>{
                            return(
                                <tr class="table-active" key={key}>
                                    <td>{job.companyname}</td>
                                    <td>{job.jobname}</td>
                                    <td>{job.jobdesc}</td>
                                    <td>{job.jobloc}</td>
                                    <td>{job.jobsal}</td>
                                    <td>{job.jobtype}</td>
                                    <td><button onClickCapture={(event)=>{event.preventDefault();axios.get('http://localhost:9090/deletejob/'+job.jobdesc+'/'+user).then(response=>{
            setAlertMessage(
                <div className="alert alert-dismissible alert-success">
                  <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{window.location.reload();}}></button>
                  <strong>Well done!</strong> {response.data}
                </div>
              );
        })}}>Delete</button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            ):(<div><h1>Please Login to View Data</h1></div>)
            }
        </div>
    );
}