import React, { useState } from "react";
import { Button } from "@com/ui/button";
import styled from "styled-components";
import { auth } from "../Firebase";
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
import { app } from "../Firebase"; // Assume db is your Firestore instance
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const db = getFirestore(app);

  const handlesignin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        const usersRef = collection(db, "users"); // Adjust "users" to your collection name
        const q = query(usersRef, where("email", "==", user.email));
        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            Cookies.set(
              "user",
              JSON.stringify({
                email: doc.data().email,
                Flatno: doc.data().Flatno,
                Role: doc.data().Role,
                uid: doc.id,
              }),
              { expires: 7 }
            );
            navigate("/documents");
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          alert("Failed to fetch user data");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });
  };

  const handlePasswordReset = () => {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Password reset email sent. Please check your inbox.");
        })
        .catch((error) => {
          console.error("Error sending password reset email:", error);
          alert("Failed to send password reset email.");
        });
    } else {
      alert("Please enter your email first.");
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter style={{ gap: "1rem" }}>
          <Button onClick={handlesignin} className="w-full">
            Login
          </Button>
          <Button onClick={handlePasswordReset} className="w-full">
            Forgot Password?
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
