import '../App.css';
import axios from 'axios';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const RegisterForm = () => {
  const { addToast } = useToasts();

  
  const [firstname,setFirstName] = useState("");
  
  const [lastname,setLastname] = useState("");
  
  const [location,setLocation] = useState("");

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  return (
    <div className="App">
      
  <div class="sidenav">
         <div class="login-main-text">
            <h2>LocationApp - GEOCODING<br/> Register Here</h2>
            <p>Login or register from here to access.</p>
         </div>
      </div>
      <div class="main">
         <div class="col-md-6 col-sm-12">
            <div class="login-form">
               <form>
               <div class="form-group">
                     <label>Firstname</label>
                     <input type="text" onChange = {(e) => {setFirstName(e.target.value)}} class="form-control" placeholder="firstname"/>
                  </div>
                  <div class="form-group">
                     <label>Lastname</label>
                     <input type="text" onChange = {(e) => {setLastname(e.target.value)}} class="form-control" placeholder="lastname"/>
                  </div>
                  <div class="form-group">
                     <label>Email</label>
                     <input type="email" onChange = {(e) => {setEmail(e.target.value)}} class="form-control" placeholder="Email"/>
                  </div>
                  <div class="form-group">
                     <label>Password</label>
                     <input type="password" onChange = {(e) => {setPassword(e.target.value)}} class="form-control" placeholder="Password"/>
                  </div>
                  <div class="form-group">
                     <label>Location-Address</label>
                     <input type="text" onChange = {(e) => {setLocation(e.target.value)}} class="form-control" placeholder="New Delhi"/>
                  </div>
                  <button type="submit" onClick = {(e) => register(e,firstname,lastname,email,password,location,addToast)} class="btn btn-black">Register </button>
                  <span> </span>
                  <Link to="/" class="btn btn-secondary"> Go to Login </Link>
                  
               </form>
            </div>
         </div>
      </div>
    </div>
  );
}

const Register = () => (
  <ToastProvider>
    <RegisterForm />
  </ToastProvider>
  )



  function register (e,firstname,lastname,email,password,location,addToast)  {
  

    if (!location.length > 0)
    {
        location = "New Delhi";
    }

    e.preventDefault()
    // this whole axios function will return a promise that would be handled by pair of then and catch
    axios({
      headers : {
          'Content-Type': 'application/json;charset=UTF-8',
      },
      method : 'post',
      url : 'https://location-restapi.herokuapp.com/api/signup',
      data : {
          firstname,
          lastname,
          email,                      // js is smart enough to understand this as 
          password,
          location                            // email : email
      }
  }).then
  ((res)=>{
  console.log(res.data);
    addToast('Registration Successful, Redirecting to Login', { appearance: 'success' })
    window.location.href = '/';
  })
  .catch((error) => {
    if (error.response.data.error){
    console.log(error.response.data.error)
    addToast(error.response.data.error, { appearance: 'error' })
    }
    else{
    addToast('Internal Server Error,Try after Somtime', { appearance: 'error' })
    }
  })

}


export default Register;
