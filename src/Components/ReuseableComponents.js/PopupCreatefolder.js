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
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Firebase"; // Ensure you have imported storage
import cookies from "js-cookies";

const PopupCreatefolder = () => {
  const [folderName, setFolderName] = useState("");
  const [isError, setIsError] = useState(false);
  const User = cookies.getItem("user");
  const user = User ? JSON.parse(User) : null; // Safely parse the JSON string

  const createFolderInStorage = async () => {
    if (!folderName.trim()) {
      alert("Please enter a valid folder name.");
      return;
    }
    const folderPath = `${folderName}/placeholder.txt`; // Creating a placeholder file
    const folderRef = ref(storage, folderPath);

    try {
      // Upload a tiny placeholder to simulate folder creation
      await uploadBytes(folderRef, new Blob(["Folder placeholder"]));
      alert("Folder created successfully in Firebase Storage.");
      window.location.reload();
    } catch (error) {
      console.error("Firebase Storage operation failed", error);
      alert("Creation failed: " + error.message);
    }
  };

  const handleFolderNameChange = (e) => {
    const input = e.target.value;
    if (input.includes(" ")) {
      setIsError(true);
    } else {
      setIsError(false);
      setFolderName(input);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Folder</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Folder in Storage</DialogTitle>
          <DialogDescription>
            Enter folder name (no spaces allowed)
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="folderName" className="text-right">
              Folder Name
            </Label>
            <Input
              id="folderName"
              placeholder="Enter folder name"
              className="col-span-3"
              onChange={handleFolderNameChange}
            />
            {isError && (
              <span className="col-span-4 text-red-500 text-sm">
                * Spaces are not allowed in folder name
              </span>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={createFolderInStorage} type="button">
            Create Folder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PopupCreatefolder;
