import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './bootstrap.css';
import Header from "./Header";

export default function Company(){
    const location=useLocation();
    //const user=location.state && location.state.user;
    const user=JSON.parse(localStorage.getItem('token-info'));
    const[data,setdata]=useState([]);
    const [alertmessage,setAlertMessage]=useState("");
    const formData = new FormData();
    useEffect(
        ()=>{getdata();},[]
    )
    const getdata=(event)=>{
        axios.get('http://localhost:9090/getcompany').then(response=>{
            setdata(response.data);
            console.log(response.data);
        })
    }
    return(
        <div>
            <Header></Header><br/>
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
                                    <td><button onClickCapture={(event)=>{event.preventDefault();
                                    formData.append('companyname',job.companyname);
                                    formData.append('jobdesc',job.jobdesc);
                                    formData.append('jobname',job.jobname);
                                    formData.append('username', user);
                                    axios.post('http://localhost:9090/applyjob',formData).then(response=>{
                                            setAlertMessage(
                                              <div className="alert alert-dismissible alert-success">
                                                <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{window.location.reload();}}></button>
                                                <strong>Well done!</strong> {response.data}
                                              </div>
                                            );
        })}}>Apply</button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            ):(<div><h2>Please Login to View Data</h2></div>)
            }
        </div>
    );
}