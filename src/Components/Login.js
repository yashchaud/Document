import React, { useState } from "react";
import { Button } from "@com/ui/button";
import styled from "styled-components";
import { auth } from "../Firebase";
import { app } from "../Firebase"; // Assume db is your Firestore instance
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore, addDoc, deleteDoc, doc } from "firebase/firestore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@com/ui/card";
import { Input } from "@com/ui/input";
import { Label } from "@com/ui/label";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const db = getFirestore(app);

  const handlesignin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        Cookies.set(
          "user",
          JSON.stringify({
            email: user.email,
            uid: user.uid,
            isAdmin: true,
          }),
          { expires: 1 }
        ); // Expires in 7 days
        navigate("/users");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const handleUserlogin = async () => {
    const usersRef = collection(db, "users"); // Adjust "users" to your collection name
    const q = query(usersRef, where("Email", "==", email));
    console.log(q);

    try {
      const querySnapshot = await getDocs(q);
      let userFound = false;
      querySnapshot.forEach((doc) => {
        // Assuming 'password' is stored in the document (not recommended)
        if (doc.data().password === password) {
          userFound = true;
          // Handle successful login here
          console.log(doc.data());
          Cookies.set(
            "user",
            JSON.stringify({
              email: doc.data().Email,
              Flatno: doc.data().Flatno,
              username: doc.data().username,
              isAdmin: doc.data().isAdmin,
              uid: doc.id,
            }),
            { expires: 7 }
          );
          navigate("/users"); // Adjust as necessary
        }
      });
      if (!userFound) {
        alert("No matching user found or password incorrect.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login");
    }
  };
  return (
    <Cover>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter style={{ gap: "1rem" }}>
          <Button onClick={handlesignin} className="w-full">
            Adminlogin
          </Button>
          <Button onClick={handleUserlogin} className="w-full">
            Userlogin
          </Button>
        </CardFooter>
      </Card>
    </Cover>
  );
};

export default Login;

const Cover = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
