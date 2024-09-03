import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './bootstrap.css';
import Header from "./Header";

export default function Applyjob(){
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
        axios.get('http://localhost:9090/getapplyjob').then(response=>{
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
                            <th scope="col">Username</th>
                            <th scope="col">CompanyName</th>
                            <th scope="col">JobName</th>
                            <th scope="col">JobDesc</th>
                            <th scope="col">Status</th>
                            <th scope="col">Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((job,key)=>{
                            if(job.status==="Pending")
                            {
                            return(
                                <tr class="table-active" key={key}>
                                    <td>{job.username}</td>
                                    <td>{job.companyname}</td>
                                    <td>{job.jobname}</td>
                                    <td>{job.jobdesc}</td>
                                    <td>{job.status}</td>
                                    <td><button onClickCapture={(event)=>{event.preventDefault();
                                    formData.append('username', job.username);
                                    formData.append('jobname', job.jobname);
                                    formData.append('companyname',job.companyname);
                                    formData.append('jobdesc',job.jobdesc);
                                    formData.append('status', job.status);
                                    axios.post('http://localhost:9090/removeapply',formData).then(response=>{
                                        setAlertMessage(
                                            <div className="alert alert-dismissible alert-success">
                                              <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{window.location.reload();}}></button>
                                              <strong>Well done!</strong> {response.data}
                                            </div>
                                          );
        })}}>Remove</button></td>
                                </tr>
                            )}
                            else if(job.status==="Offered")
                            {
                                return(
                                    <tr class="table-success" key={key}>
                                    <td>{job.username}</td>
                                    <td>{job.companyname}</td>
                                    <td>{job.jobname}</td>
                                    <td>{job.jobdesc}</td>
                                    <td>{job.status}</td>
                                    <td><button onClickCapture={()=>{axios.get("http://localhost:9090/accept/"+job.jobdesc+"/"+job.username+"/"+job.companyname).then((response) => {
            setAlertMessage(
                <div className="alert alert-dismissible alert-success">
                  <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{window.location.reload();}}></button>
                  <strong>Well done!</strong> {response.data}
                </div>
              );
        })}}>Accept</button> <button onClickCapture={()=>{axios.get("http://localhost:9090/studentreject/"+job.jobdesc+"/"+job.username+"/"+job.companyname).then((response) => {
            setAlertMessage(
                <div className="alert alert-dismissible alert-success">
                  <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{window.location.reload();}}></button>
                  <strong>Well done!</strong> {response.data}
                </div>
              );
        })}}>Reject</button></td>
                                </tr>
                                )
                            }
                            else if(job.status==="Accepted"){
                                return(
                                    <tr class="table-success" key={key}>
                                        <td>{job.username}</td>
                                        <td>{job.companyname}</td>
                                        <td>{job.jobname}</td>
                                        <td>{job.jobdesc}</td>
                                        <td>{job.status}</td>
                                    </tr>
                                )
                            }

                            else{
                                return(
                                    <tr class="table-danger" key={key}>
                                        <td>{job.username}</td>
                                        <td>{job.companyname}</td>
                                        <td>{job.jobname}</td>
                                        <td>{job.jobdesc}</td>
                                        <td>{job.status}</td>
                                    </tr>
                                )
                            }
                        })}
                        </tbody>
                    </table>
                </div>
            ):(<div><h2>Please Login to View Data</h2></div>)
            }
        </div>
    );
}