import React, { useState, useEffect } from "react";
import "./pages.css";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "../FirebaseConfig.js";
import { getDoc } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    

const navigate=useNavigate()
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const login = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();

          console.log("Fetched user data:", userData);
          alert("success")
          navigate('/home');

       
          localStorage.setItem("isAdmin", userData.isAdmin.toString());

          console.log("isAdmin:", userData.isAdmin); 

          setIsLoading(false);
          setEmail("");
          setPassword("");

        
          if (userData.isAdmin) {
            console.log("Navigating to Admin screen"); 
          } else {
            console.log("Navigating to Home screen"); 
          
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Invalid credentials");
        console.log("Login Error:", error);
      });
  };
  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (!authUser) {
        }
        if (authUser) {
        
        }
      });
      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 150,
            textAlign: "center",
          }}
        >
          <p style={{ color: "#003580", fontSize: 17, fontWeight: "700" }}>
            Sign In
          </p>
          <p style={{ fontSize: 17, fontWeight: "500", marginTop: 15 }}>
            Sign In to your account
          </p>
        </div>
        <div style={{ marginTop: 50 }}>
          <p
            style={{
              fontWeight: "500",
              fontSize: 17,
              textAlign: "match-parent",
            }}
          >
            Email
          </p>
          <input
            type="email"
            value={email}
         
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your email address"
            style={{
              borderColor: "gray",
              borderWidth: 1,
              marginVertical: 15,
              width: 300,
              borderRadius: 15,
              padding: 10,
            }}
          />
        </div>

        <div style={{ marginTop: 15 }}>
          <p style={{ fontWeight: "500", fontSize: 17 }}>Password</p>
          <div
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: "gray",
              borderWidth: 1,
              marginVertical: 15,
              width: 300,
              borderRadius: 15,
              padding: 10,
            }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
             
              placeholder="enter your password"
              style={{
                borderColor: "gray",
                borderWidth: 1,
                marginVertical: 15,
                width: 300,
                borderRadius: 15,
                padding: 10,
              }}
            />
          </div>
        </div>
        <button
          onClick={login} 
          disabled={isLoading}
          style={{
          
            maxWidth: 100, 
            backgroundColor: isLoading ? "gray" : "#003580",
            paddingRight: "20px",
            paddingLeft: 20,
            borderRadius: 7,
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",

            textAlign: "center", 
          }}
        >
          {isLoading ? (
            <p>loading</p>
          ) : (
            <p
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Login
            </p>
          )}
        </button>

        <div style={{paddingTop:20}}>
        Not registered? <a href="/register">Register</a>
      </div>
      </div>
    </div>
  );
}

export default LoginPage;
