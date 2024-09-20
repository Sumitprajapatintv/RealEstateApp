import React from 'react';
import {GoogleAuthProvider,getAuth, signInWithPopup,signInWithRedirect } from "firebase/auth"
import { app } from '../firebase';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from './../redux/user/userSlice.js';

function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick =async ()=>{
    {
      try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
     
           const result= await signInWithPopup(auth, provider);
          
        //  console.log("ress",result);
        const res=await fetch('/api/auth/google',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          })
        })
        const data=await res.json();
        // console.log("data",data);
        dispatch(signInSuccess(data));
        navigate('/');
        // console.log("Result",result)
      } catch (error) {
        console.log(error)
      }
  }
}
  return (
    <button onClick={handleGoogleClick} type='button' className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">SignIn with Google</button>
  )
}

export default OAuth;