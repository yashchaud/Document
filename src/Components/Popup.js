import React, { useState, useEffect } from "react";
import { Button } from "@com/ui/button";
import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { app } from "../Firebase";
import Roleselect from "./ReuseableComponents.js/SelectComponent";

import { setUserlist } from "../Redux/sessionSlice";
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
import Userlist from "./ReuseableComponents.js/Userlist";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

const Popup = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); // State to store selected role

  const db = getFirestore(app);
  const dispatch = useDispatch();

  const [Allusers, Setallusers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { userlist } = useSelector((state) => state.counterSlice);

  const fetchUsers = async () => {
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id, // Store the Firestore document ID
    }));
    Setallusers(userList);
    dispatch(setUserlist(userList));
    console.log(userList);
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    const Flatno = document.getElementById("Flatno").value;
    const email = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Firebase Authentication user created:", user);

      const docRef = await addDoc(collection(db, "users"), {
        Flatno,
        email,
        Role: selectedRole,
      });
      console.log("Firestore document written with ID:", docRef.id);

      await fetchUsers();
      setOpen(!open);
      setInputValue("");
      setFilteredUsers([]);
    } catch (e) {
      console.error("Error creating user:", e);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      const filter = userlist.filter((user) =>
        user.email.toLowerCase().includes(value.toLowerCase())
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    try {
      if (inputValue) {
        const userToDelete = userlist.find(
          (user) => user.email.toLowerCase() === inputValue.toLowerCase()
        );
        if (userToDelete && userToDelete.id) {
          await deleteDoc(doc(db, "users", userToDelete.id));
          console.log("Document deleted with ID: ", userToDelete.id);
          await fetchUsers(); // Refresh list after deletion
          setOpen(!open);
          setInputValue("");
          setFilteredUsers([]);
        } else {
          console.error("No user found with the provided email!");
        }
      }
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
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
              ? "Enter the Email of the User you want to Delete"
              : "Please Enter Flatno, Email, Password to Create the user"}
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
                Email
              </Label>
              <Input id="name" placeholder="My-user" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                placeholder="123456"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Role
              </Label>
              <Roleselect onSelectRole={setSelectedRole} />
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
                      onClick={() => handleSelectUser(user.email)}
                    >
                      {user.email} - Flat {user.Flatno}
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
              onClick={() => {
                setOpen(!open);
                setInputValue(""); // Reset input value when toggling states
                setFilteredUsers([]); // Clear any filtered results
              }}
              type="button"
            >
              {open ? "Cancel" : "Delete User"}
            </Button>
            {open ? (
              <Button onClick={handleDeleteUser} type="submit">
                Delete User
              </Button>
            ) : (
              <Button type="submit" onClick={handleCreateUser}>
                Create User
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
