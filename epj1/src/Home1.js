import React from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import './bootstrap.css';
import Header1 from "./Header1";

export default function Home1() {
        const location = useLocation();
        const navigate= useNavigate();
        //const user = location.state && location.state.user;
        const user=JSON.parse(localStorage.getItem('token-info1'));
        const logout=()=>{
            localStorage.removeItem('token-info1');
            window.location.replace('http://localhost:3000/comlogin');
        }

        const job=()=>{
            navigate('/jobprofile',{ state: {user:user} });
        }

        const viewjob=()=>{
            navigate('/viewjob',{state: {user:user}});
        }

        const applystudent=()=>{
            navigate('/applystudent',{state: {user:user}});
        }

        return (
            <div>
                <Header1></Header1><br/>
            {user?(<h1>Hello {user}</h1>):(<div><h1>Please Login to view options </h1></div>)}
            </div>
        );
}