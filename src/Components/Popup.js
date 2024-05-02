import React, { useState } from "react";
import { Button } from "@com/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@com/ui/dialog";
import { Input } from "@com/ui/input";
import { Label } from "@com/ui/label";

const Popup = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [Allusers, Setallusers] = useState([
    { username: "test", Flatno: "101" },
    { username: "test", Flatno: "101" },
    { username: "test", Flatno: "101" },
    { username: "test", Flatno: "101" },
  ]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      const filter = Allusers.filter((user) =>
        user.username.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filter);
    } else {
      setFilteredUsers([]);
    }
  };

  const handleSelectUser = (username) => {
    setInputValue(username);
    setFilteredUsers([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {open ? "Delete User" : "Create a New User"}
          </DialogTitle>
          <DialogDescription>
            {open
              ? "Enter the Username of the User you want to Delete"
              : "Please Enter Flatno, Username, Password to Create the user"}
          </DialogDescription>
        </DialogHeader>
        {!open && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Flatno.
              </Label>
              <Input id="Flatno" placeholder="101" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Username
              </Label>
              <Input id="name" placeholder="My-user" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Password
              </Label>
              <Input
                id="username"
                placeholder="123456"
                className="col-span-3"
              />
            </div>
          </div>
        )}

        {open && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Username.
              </Label>
              <Input
                id="Flatno"
                placeholder="Yash"
                value={inputValue}
                onChange={handleInputChange}
                className="relative col-span-3"
              />
              {filteredUsers.length > 0 && (
                <ul className="absolute  top-32 w-full bg-white border border-gray-300 mt-2 z-10">
                  {filteredUsers.map((user, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectUser(user.username)}
                    >
                      {user.username} - Flat {user.Flatno}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        <DialogFooter>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="destructive"
              onClick={() => setOpen(!open)}
              type="button"
            >
              {open ? "Cancel" : "Delete User"}
            </Button>
            {open ? (
              <Button type="submit">Delete User</Button>
            ) : (
              <Button type="submit">Create User</Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
