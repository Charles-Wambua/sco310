import React, { useState } from "react";
import "./pages.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FirebaseConfig.js";
import { setDoc, doc } from "firebase/firestore";


function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const register = () => {
    if (email === "" || password === "" || phone === "") {
      window.alert(
        "Invalid Details",
        "Please enter all the credentials",
        [
          {
            text: "cancel",
            onPress: () => {},
            style: "cancel",
          },
          { text: "ok", onPress: () => {} },
        ],
        { cancelable: false }
      );
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials._tokenResponse.email;
        const uid = auth.currentUser.uid;
        setDoc(doc(db, "users", `${uid}`), {
          email: user,
          phone: phone,
          isAdmin: false,
        });
        localStorage.setItem("isAdmin", "false");
        setIsLoading(false);
        setEmail("");
        setPassword("");
        setPhone("");
        console.log("success")
        alert("success")
      })
      .catch((error) => {
        setIsLoading(false);
        alert("An error occured:", error)
      
        console.log("Registration Error:", error);
      });
  };
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        
      }}
    >
      <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
                      marginTop: 150,
            textAlign:"center"
          }}
        >
          <p style={{ color: "#003580", fontSize: 17, fontWeight: "700" }}>
            Sign Up
          </p>
          <p style={{ fontSize: 17, fontWeight: "500", marginTop: 15 }}>
            Create an account
          </p>
        </div>
        <div style={{ marginTop: 50 }}>
          <p style={{ fontWeight: "500", fontSize: 17, textAlign:"match-parent"}}>Email</p>
          <input
          type="email"
            value={email}
           
            onChange={(e)=> setEmail(e.target.value)}
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
          <p style={{ fontWeight: "500", fontSize: 17 }}>Phone number</p>
          <input
            type="text"
            value={phone}
            onChange={(e)=> setPhone(e.target.value)}
            placeholder="enter your phone number"
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
              onChange={(e)=> setPassword(e.target.value)}
            
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
          onClick={register}
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
              Register
            </p>
          )}
        </button>

        <div style={{paddingTop:20}}>
        Already registered? <a href="/">Login</a>
      </div>
      </div>
    </div>
  );
}

export default RegisterPage;
