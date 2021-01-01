import '../App.css';
import axios from 'axios';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const LoginForm = () => {
  const { addToast } = useToasts();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  return (
    <div className="App">
      
  <div class="sidenav">
         <div class="login-main-text">
            <h2>LocationApp - GEOCODING<br/> Login Here</h2>
            <p>Login or register from here to access.</p>
         </div>
      </div>
      <div class="main">
         <div class="col-md-6 col-sm-12">
            <div class="login-form">
               <form>
                  <div class="form-group">
                     <label>Email</label>
                     <input type="email" onChange = {(e) => {setEmail(e.target.value)}} class="form-control" placeholder="Email"/>
                  </div>
                  <div class="form-group">
                     <label>Password</label>
                     <input type="password" onChange = {(e) => {setPassword(e.target.value)}} class="form-control" placeholder="Password"/>
                  </div>
                  <button type="submit" onClick = {(e) => login(e,email,password,addToast)} class="btn btn-black">Login</button>
                  <span> </span>
                  <Link to="/register" class="btn btn-secondary"> Register </Link>
                  
               </form>
            </div>
         </div>
      </div>
    </div>
  );
}

const Login = () => (
  <ToastProvider>
    <LoginForm />
  </ToastProvider>
)

function login (e,email,password,addToast)  {
  

    e.preventDefault()
    // this whole axios function will return a promise that would be handled by pair of then and catch
    axios({
      headers : {
          'Content-Type': 'application/json;charset=UTF-8',
      },
      method : 'post',
      url : 'https://location-restapi.herokuapp.com/api/signin',
      data : {
          email,                      // js is smart enough to understand this as 
          password                            // email : email
      }
  }).then
  ((res)=>{
  console.log(res.data);
  sessionStorage.setItem("jwt",res.data.jwt);
  sessionStorage.setItem("id",res.data.user._id);
  sessionStorage.setItem("location",res.data.user.location);
  sessionStorage.setItem("latitude",res.data.user.latitude);
  sessionStorage.setItem("longitude",res.data.user.longitude);
    addToast('Login Successful', { appearance: 'success' })
    window.location.href = `/home/${res.data.user._id}`;
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
export default Login;
