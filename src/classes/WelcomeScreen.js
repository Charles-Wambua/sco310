import React from "react";
import Appp from "./stack";

function WelcomeScreen() {
  return (
    <>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
      }}
    >
      <p style={{ color: "aliceblue", padding:"10px", fontSize:24, fontWeight:"900" }}>Welcome to our login page👋 </p>
      </div>
      
      <Appp/>
      </>
  );
}

export default WelcomeScreen;
