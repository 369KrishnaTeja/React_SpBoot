import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header1 from "./Header1";
import './bootstrap.css';

export default function Profile1() {
    const [data1, setdata1] = useState();
    const [user1,setuser1]=useState("");
    const [email,setemail]=useState("");
    const [companyname,setcompanyname]=useState("");
    const [alertmessage,setAlertMessage]=useState("");
    const [abc, setabc] = useState(false);
    const user = JSON.parse(localStorage.getItem('token-info1'));

    useEffect(() => {
        getdata1();
    }, []);

    const getdata1 = async() => {
        if (user) {
                const response = await axios.get('http://localhost:9090/comprofile/' + user);
                setdata1(response.data);
                console.log(data1);
            }
    }

    const SaveVal=(event)=>
    {
        event.preventDefault();
        axios.post("http://localhost:9090/update1/"+user+"/"+user1+"/"+email+"/"+companyname).then(response => {
            const responseData = response.data;
            if(responseData==="Success")
            {
                setAlertMessage(
                    <div className="alert alert-dismissible alert-success">
                      <button type="button" className="btn-close" data-bs-dismiss="alert" onClickCapture={()=>{localStorage.removeItem('token-info1');window.location.replace('http://localhost:3000/comlogin');}}></button>
                      <strong>Well done!</strong> {response.data}
                    </div>
                  );
            }
        });
    }

    return (
        <div>
            <Header1></Header1>
            {alertmessage}
            {
                user ? (
                    abc?(
                    <div>
                        <center><h1>Profile</h1>
                        <h2>Username: {data1?.username}</h2>
                        <h2>Email: {data1?.email}</h2>
                        <h2>CompanyName: {data1?.companyname}</h2>
        <form onSubmit={SaveVal}>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Enter Username" value={user1} name="user" required onChange={(e)=>{setuser1(e.target.value)}}></input>
            <label for="floatingInput">Username</label>
        </div><br/>
        <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="Enter Email" value={email} name="email" required onChange={(e)=>{setemail(e.target.value)}}></input>
            <label for="floatingInput">Email</label>
        </div><br/>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" placeholder="Enter CompanyName" value={companyname} name="companyname" required onChange={(e)=>{setcompanyname(e.target.value)}}></input>
            <label for="floatingInput">CompanyName</label>
        </div><br/>
            <button type="submit" class="btn btn-primary">Update</button>
        </form>
        </center>
                    </div>
                    ):(
                        <div>
                        <center><h1>Profile</h1></center>
                        <h2>Username: {data1?.username}</h2>
                        <h2>Email: {data1?.email}</h2>
                        <h2>Company Name: {data1?.companyname}</h2>
                        <button type="button" class="btn btn-primary" onClickCapture={()=>{setabc(true);}}>Edit</button>
                    </div>
                    )
                ) : (<h2>Please Login to View Data</h2>)
            }
        </div>
    );
}
