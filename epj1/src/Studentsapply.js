import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './bootstrap.css';
import Header1 from "./Header1";

export default function Studentsapply(){
    const location=useLocation();
    //const user=location.state && location.state.user;
    const user=JSON.parse(localStorage.getItem('token-info1'));
    const[data,setdata]=useState([]);
    const [maildata,setmaildata]=useState("");
    const [jobname,setjobname]=useState("");
    const [abc,setabc]=useState(false);
    const [jobdesc,setjobdesc]=useState("");
    const [onstate,setonstate]=useState("Accepted");
    const [alertmessage,setAlertMessage]=useState("");
    useEffect(
        ()=>{getdata();},[]
    )
    const getdata=(event)=>{
        if(user){
        axios.get('http://localhost:9090/getstudents/'+user).then(response=>{
            setdata(response.data);
            console.log(response.data);
        })
    }
    }
    const mail=(event)=>{
        event.preventDefault();
        axios.post('http://localhost:9090/sendmail/'+jobname+'/'+jobdesc+'/'+maildata+'/'+user).then(response=>{
            setAlertMessage(
                <div className="alert alert-dismissible alert-success">
                  <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{window.location.reload();}}></button>
                  <strong>Well done!</strong> {response.data}
                </div>
              );
        }
        )
    }

    const onstatus=(event)=>{
        event.preventDefault();
        axios.get('http://localhost:9090/getstatusstudents/'+user+'/'+onstate).then(response=>{
            setdata(response.data);
            console.log(response.data);
        })
    }

    return(
        <div>
            <Header1></Header1><br/>
            {user?(
                <div>
                    {alertmessage}
                    <center>
                    <form onSubmit={onstatus}>
                    <div class="form-group">
      <label for="exampleSelect1" class="form-label mt-4">Filter</label>
      <select class="form-select" id="exampleSelect1" value={onstate} name="onstate" onChange={(e)=>{setonstate(e.target.value)}}>
        <option>Accepted</option>
        <option>Offered</option>
        <option>Pending</option>
        <option>Student Rejected</option>
      </select>
    </div>
                    <br/>
            <button type="submit" class="btn btn-primary">Apply</button>
        </form>
        </center>
                    <br/>
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">JobName</th>
                            <th scope="col">JobDesc</th>
                            <th scope="col">Student</th>
                            <th scope="col">Email</th>
                            <th scope="col">College</th>
                            <th scope="col">PhoneNo</th>
                            <th scope="col">Status</th>
                            <th scope="col">Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((job,key)=>{
                            if(job.status==="Accepted"||job.status==="Offered")
                            {
                                return(
                                    <tr class="table-success" key={key}>
                                        <td>{job.jobname}</td>
                                        <td>{job.jobdesc}</td>
                                        <td>{job.username}</td>
                                        <td>{job.email}</td>
                                        <td>{job.college}</td>
                                        <td>{job.phoneno}</td>
                                        <td>{job.status}</td>
                                    </tr>
                                )
                            }
                            else if(job.status==="Student Rejected")
                            {
                                return(
                                    <tr class="table-danger" key={key}>
                                        <td>{job.jobname}</td>
                                        <td>{job.jobdesc}</td>
                                        <td>{job.username}</td>
                                        <td>{job.email}</td>
                                        <td>{job.college}</td>
                                        <td>{job.phoneno}</td>
                                        <td>{job.status}</td>
            <td><button onClickCapture={()=>{axios.get("http://localhost:9090/rejected/"+job.jobdesc+"/"+job.username+"/"+user).then((response) => {
                setAlertMessage(
                    <div className="alert alert-dismissible alert-success">
                      <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{window.location.reload();}}></button>
                      <strong>Well done!</strong> {response.data}
                    </div>
                  );
            })}}>Remove</button></td>
                                    </tr>
                                )
                            }
                            else if(job.status==="Pending")
                            {
                            return(
                                <tr class="table-active" key={key}>
                                    <td>{job.jobname}</td>
                                    <td>{job.jobdesc}</td>
                                    <td>{job.username}</td>
                                    <td>{job.email}</td>
                                    <td>{job.college}</td>
                                    <td>{job.phoneno}</td>
                                    <td>{job.status}</td>
                                    <td><button onClickCapture={()=>{axios.get("http://localhost:9090/getresumedata/"+job.username, { responseType: 'arraybuffer' }).then((response) => {
      const filename = job.username + ' resume.jpeg';
      const blob = new Blob([response.data], { type: 'application/jpeg' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
        })}}>Download Resume</button>
        <button onClickCapture={()=>{axios.get("http://localhost:9090/rejected/"+job.jobdesc+"/"+job.username+"/"+user+"/"+job.jobname+"/"+job.email).then((response) => {
            setAlertMessage(
                <div className="alert alert-dismissible alert-success">
                  <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{window.location.reload();}}></button>
                  <strong>Well done!</strong> {response.data}
                </div>
              );
        })}}>Remove</button>
        <button onClickCapture={()=>{axios.get("http://localhost:9090/offer/"+job.jobdesc+"/"+job.username+"/"+user+"/"+job.jobname+"/"+job.email).then((response) => {
            setAlertMessage(
                <div className="alert alert-dismissible alert-success">
                  <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{window.location.reload();}}></button>
                  <strong>Well done!</strong> {response.data}
                </div>
              );
        })}}>Offer</button></td>
                                </tr>
                            )}
                        })}
                    
                        </tbody>
                    </table><br/>
                    <center>
                    {abc?(
                    <form onSubmit={mail}>
                    <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Enter JobName" value={jobname} name="jobname" required onChange={(e)=>{setjobname(e.target.value)}}></input>
            <label for="floatingInput">Job Name</label>
        </div><br/>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Enter JobDescription" value={jobdesc} name="jobdesc" required onChange={(e)=>{setjobdesc(e.target.value)}}></input>
            <label for="floatingInput">Job Description</label>
        </div><br/>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Enter Data" value={maildata} name="maildata" required onChange={(e)=>{setmaildata(e.target.value)}}></input>
            <label for="floatingInput">Enter Data</label>
        </div><br/>
            <button type="submit" class="btn btn-primary">Send Mail To Pending Students</button>
        </form>):(<button type="button" class="btn btn-primary" onClickCapture={()=>{setabc(true);}}>Mail</button>)}</center>
        <center><button type="button" class="btn btn-primary" onClickCapture={()=>{window.print();}}>Print</button></center>
                </div>
            
            ):(<div><h1>Please Login to View Data</h1></div>)
            }
        </div>
    );
}