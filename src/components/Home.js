import '../home.css';
import axios from 'axios';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import React, { useState , useEffect } from 'react';
import {Link} from 'react-router-dom';

import MapLocator from './MapLocator';

const UserDetailsAndLocation = () => {

  
  const { addToast } = useToasts();

  const [user,setUser] = useState({});

  const [location,setLocation] = useState("");

  /* eslint-disable */
  useEffect(() => {  fetchData();}, []) 

  /* eslint-enable */

  const fetchData = async () => {
   
    const data = await getUser();
    if (data.latitude === undefined || data.latitude === null || data.latitude.length < 1)
    {
        const CoOrdinates = await getCoOrdinates(data.location);
        if (CoOrdinates.lat !== null || CoOrdinates.lng !== null)
        {
          data.latitude = CoOrdinates.lat;
          data.longitude = CoOrdinates.lng;
          sessionStorage.setItem("latitude",data.latitude)
          sessionStorage.setItem("longitude",data.longitude)
        }
        else
        {
          addToast('Cannot get Co-ordinates',{appearance : 'error'})
        }
        
    }
    setUser(data);

    if (Object.keys(data).length !== 0)
    {
  addToast('Loaded User Data', { appearance: 'success' })
    }
    else
    {

      addToast('Unable to Load data', { appearance: 'error' })
    }
    
  }

  if (! (sessionStorage.getItem("jwt")!==null || sessionStorage.getItem("jwt")!==undefined ) )
  {
    
        return (

            <div class = "error1" align = "center">
            <aside><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png" alt = "" height = "400px" width = "500px"/>
            </aside>
            <main>
              <h1 class = "abcd">Please Login Again!</h1>
              <p class = "abc">
                You are not authenticated or signed in <em> ...</em>
              </p>
               <Link to = "/"> You can go now  to Login!  </Link> 
            </main>
          </div>
        )
  }
    
  return (

    <div class = "all">
<button type="submit" onClick = { (e) => {logout(e,addToast)}} class="btn btn-link btn-logout">Logout</button>

    <div class="card">
  <h1>{user.firstname}</h1>
  <p class="title">{user.lastname}</p>
  <p>Id : <b>{user._id} </b> </p>
  <p>Location : {user.location}</p>
 </div>
 <p></p>
 <div class="container">
    <h2>Co-Ordinates of {user.location} </h2>
    <p> Latitude  : <b>{user.latitude}</b></p>
    <p> Longitude : <b>{user.longitude}</b> </p>
</div>
{/* Map and search bar starts here*/ }
<p></p>
<form class="form-inline md-form mr-auto mb-4">
  <input id = "makenull" class="form-control mr-sm-2" onChange = {(e) => {setLocation(e.target.value)}} type="text" placeholder="Enter Location Name" aria-label="Search"/>
  <button type="submit" onClick = {(e) => {changeLocation(e,location,user,addToast)}} class="btn btn-black">Search</button>
</form>
<MapLocator user = {user}/>
</div>
  );

  }

const Home = () => (
  <ToastProvider>
    <UserDetailsAndLocation />
  </ToastProvider>
)


async function getUser ()  {
  

  // this whole axios function will return a promise that would be handled by pair of then and catch
 const data = await axios({
    headers : {
        'Authorization' : `Bearer ${sessionStorage.getItem("jwt")}`,
        'Content-Type': 'application/json;charset=UTF-8',
    },
    method : 'get',
    url : `https://location-restapi.herokuapp.com/api/user/${sessionStorage.getItem("id")}`
}).then
((res)=>{
console.log(res.data);
return res.data.message;
})
.catch((error) => {
  if (error.response.data.error){
      console.log(error.response.data.error)
      return {};
  }
})

return data;

}


function logout(e,addToast)
{
  sessionStorage.removeItem("jwt");
  sessionStorage.removeItem("location")
  sessionStorage.removeItem("latitude")
  sessionStorage.removeItem("longitude")
  sessionStorage.removeItem("id")
  e.preventDefault();
  axios({
    headers : {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    method : 'get',
    url : 'https://location-restapi.herokuapp.com/api/signout',
}).then
((res)=>{
  console.log(res.data);
  addToast('Logout Successful', { appearance: 'success' })
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

async function getCoOrdinates(newLocation)
{

const data = await axios({
    headers : {
        'Authorization' : `Bearer ${sessionStorage.getItem("jwt")}`,
        'Content-Type': 'application/json;charset=UTF-8',
    },
    method : 'post',
    url : `https://location-restapi.herokuapp.com/api/location/${sessionStorage.getItem("id")}`,
    data : {
      address : newLocation
    }
}).then
((res)=>{
console.log(res.data.data,"Location");
return res.data.data.location;
})
.catch((error) => {
  if (error.response.data.error){
      console.log(error.response.data.error)
      return {latitude : null,longitude:null};
  }
})

return data;

}

function updateUser(user,addToast)
{
  
 axios({
  headers : {
      'Authorization' : `Bearer ${sessionStorage.getItem("jwt")}`,
      'Content-Type': 'application/json;charset=UTF-8',
  },
  method : 'put',
  url : `https://location-restapi.herokuapp.com/api/user/${sessionStorage.getItem("id")}`,
  data : {
    location : user.location,
    latitude : user.latitude,
    longitude : user.longitude
  }
}).then
((res)=>{
console.log(res.data,"Update");

sessionStorage.setItem("location",res.data.message.location)
sessionStorage.setItem("latitude",res.data.message.latitude);
sessionStorage.setItem("longitude",res.data.message.longitude);

addToast('Updated Location Data', { appearance: 'success' })


})
.catch((error) => {
if (error.response.data.error){
    console.log(error.response.data.error)
    
  addToast(error.response.data.error, { appearance: 'error' })
}
else
{
  
  addToast('Internal Server Error', { appearance: 'error' })
}
})

}

async function changeLocation(e,location,user,addToast)
{
  e.preventDefault();
    console.log("Got Location data",location)
    const data = await getCoOrdinates(location);
    console.log("Data",data)
  document.getElementById("makenull").value = "";
    if (data.lat != null && data.lng != null)
    {
    user.location = location 
    user.latitude = data.lat
    user.longitude = data.lng
    window.scrollTo(0,200);
    await updateUser(user,addToast);
    }
    else
    {
      addToast("Bad Location input..Give Accordingly" , {appearance : 'error'});
    }

}


export default Home;
