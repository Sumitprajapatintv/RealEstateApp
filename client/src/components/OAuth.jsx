import React from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "./../redux/user/userSlice.js";

function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    dispatch(signInStart()); // Dispatching sign-in start action
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Try sign-in with popup
      const result = await signInWithPopup(auth, provider);

      // Send user details to the backend
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();

      // Dispatch the successful sign-in data
      dispatch(signInSuccess(data));

      // Navigate to the home page after successful login
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);

      // If the popup fails (due to blocked popups or cross-origin issues), fallback to redirect
      if (
        error.code === "auth/popup-blocked" ||
        error.code === "auth/cors-unsupported"
      ) {
        try {
          const provider = new GoogleAuthProvider();
          const auth = getAuth(app);
          await signInWithRedirect(auth, provider);
        } catch (redirectError) {
          console.error("Google sign-in with redirect error:", redirectError);
          dispatch(signInFailure(redirectError)); // Dispatching failure action
        }
      } else {
        dispatch(signInFailure(error)); // Dispatching failure action for any other error
      }
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Sign In with Google
    </button>
  );
}

export default OAuth;
