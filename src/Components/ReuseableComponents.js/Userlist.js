import React, { useState } from "react";
import { Button } from "@com/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@com/ui/avatar";
import { Badge } from "@com/ui/badge";
import { Card } from "@com/ui/card";
import { Input } from "@com/ui/input";
import Createuser from "../Popup";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@com/ui/table";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const Userlist = () => {
  const { userlist } = useSelector((state) => state.counterSlice);
  const User = Cookies.get("user"); // Make sure to use get method correctly
  const userObject = User ? JSON.parse(User) : null; // Safely parse the JSON string
  const [query, setQuery] = useState("");

  const deactivateUser = (uid) => {
    const user = firebase.auth().currentUser;
    if (user && user.uid === uid) {
      // Firebase doesn't support directly deactivating, so you might handle it by disabling the user
      user
        .updateProfile({ disabled: true })
        .then(() => {
          console.log("User deactivated");
        })
        .catch((error) => {
          console.error("Error deactivating user:", error);
        });
    }
  };

  const deleteUser = (uid) => {
    firebase
      .auth()
      .getUser(uid)
      .then((userRecord) => {
        userRecord
          .delete()
          .then(() => {
            console.log("User deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  return (
    <div className="container  mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex items-center gap-2">
          <Input
            className="max-w-xs"
            placeholder="Search users..."
            type="search"
            onChange={(e) => setQuery(e.target.value)}
          />
          {userObject.Role == "admin" && <Createuser />}
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flatno</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userlist
              .filter((user) => user.email.toLowerCase().includes(query))
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.Flatno}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {userObject.Role == "admin" && (
                      <div className="flex items-center gap-2 max-md:flex-col max-md:h-22">
                        <Button size="sm" variant="outline">
                          Deactivate
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Userlist;
