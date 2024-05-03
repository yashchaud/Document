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
import { storage } from "../../Firebase"; // Import your Firebase storage reference
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import cookies from "js-cookies";

const PopupCreatefolder = () => {
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState("");
  const User = cookies.getItem("user");
  console.log(User);
  const uploadFile = async () => {
    if (!file || !folderName) {
      alert("Please select a file and enter a folder name.");
      return;
    }
    const fileRef = ref(storage, `${folderName}/${file.name}`);
    console.log(User);
    const metadata = {
      customMetadata: {
        username: User.username,
        createdAt: Date.now(),
      },
    };
    try {
      await uploadBytes(fileRef, file, metadata);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Folder</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
          <DialogDescription>Name your folder</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Pdf_file
            </Label>
            <Input
              id="name"
              className="col-span-3"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => uploadFile()} type="button">
            Create Folder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PopupCreatefolder;
