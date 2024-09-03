import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './bootstrap.css';
import Header from "./Header";

export default function Upload(){
    const [file,setfile]=useState();
    const formData=new FormData();
    const navigate = useNavigate();
    const location=useLocation();
    //const user = location.state && location.state.user;
    const user=JSON.parse(localStorage.getItem('token-info'));
    formData.append('file',file);
    //formData.append('user',user);
    const UploadFile=(event)=>{
        event.preventDefault();
        axios.post("http://localhost:9090/upload",formData).then(response => {
            const responseData = response.data;
            window.alert(responseData);
            localStorage.setItem('token-info',JSON.stringify(user));
            navigate('/', { state: {user:user} });
        });
    }
    const download=(event)=>{
        axios.get("http://localhost:9090/getdata", { responseType: 'arraybuffer' }).then((response) => {
  const filename = user + ' resume.jpeg';
  const blob = new Blob([response.data], { type: 'application/jpeg' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
});
    }
    return(
        <div>
            <Header></Header><br/>
            {user?(
                <div>
            <form onSubmit={UploadFile}>
            <div class="form-group">
      <h3><label for="formFile" class="form-label mt-4">Upload Your Resume</label></h3>
      <input class="form-control" type="file" id="formFile" name="file" onChange={(e)=>{setfile(e.target.files[0])}}></input>
      <button type="submit" class="btn btn-primary">Upload</button>
    </div>
                {/* <input type="file" name="file" onChange={(e)=>{setfile(e.target.files[0])}}></input> */}
                {/* <button type="submit">Upload</button><br/> */}
                <h4>Upload resume in jpeg format [0-50kb]</h4>
            </form><br/>
            <button type="button" class="btn btn-primary" onClickCapture={download}>Download</button>
            </div>
            ):(<div><h2>Please Login To Upload File</h2></div>)}
        </div>
    );
}