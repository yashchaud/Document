import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@com/ui/alert-dialog";
import { Button } from "@com/ui/button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LogoutPrompt = ({ logout, setlogout }) => {
  const Navigate = useNavigate();
  console.log(logout);
  const handleLogout = () => {
    Cookies.remove("user");
    Navigate("/");
  };
  return (
    <AlertDialog open={logout} onOpenChange={setlogout}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out? This action will sign you out of
            your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutPrompt;
