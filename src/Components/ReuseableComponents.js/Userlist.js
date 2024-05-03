import React from "react";
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex items-center gap-2">
          <Input
            className="max-w-xs"
            placeholder="Search users..."
            type="search"
          />
          <Createuser />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flatno</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userlist.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.Flatno}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>
                  {userObject.isAdmin && (
                    <div className="flex items-center gap-2">
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
