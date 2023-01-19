import { Button } from "@material-ui/core";
import React from "react";
import { signInWithGoogle } from "../services/firebase";
import { Navigate } from "react-router-dom";
import { MyAuth } from "../services/MyAuth";

const LoginPage = ({ setToken }) => {
  console.log("try login");
  const handleSubmit = async (e) => {
    e.preventDefault();
    signInWithGoogle(setToken);
    console.log("signInWithGoogle");
  };
  if (MyAuth) {
    console.log("login already");
    return <Navigate to="/" replace={true} />;
  }
  console.log("user not signed");
  return (
    <Button onClick={handleSubmit} variant="contained" color="primary">
      signIn With Google
    </Button>
  );
};
export default LoginPage;
