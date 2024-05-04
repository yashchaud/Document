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
import { storage } from "../Firebase"; // Import your Firebase storage reference
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";
import { firestore } from "../Firebase";
import { addDoc, collection } from "firebase/firestore";

import Cookies from "js-cookie";
const Popup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const User = Cookies.get("user"); // Make sure to use get method correctly
  const user = User ? JSON.parse(User) : null; // Safely parse the JSON string

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const { documentId } = useParams();

  const uploadFile = async () => {
    if (!selectedFile || !documentId) {
      alert("Please select a file and enter a folder name.");
      return;
    }
    const fileRef = ref(storage, `${documentId}/${selectedFile.name}`);
    const metadata = {
      customMetadata: {
        username: user?.email || "unknown",
        createdAt: new Date().toISOString(),
      },
    };
    try {
      const uploadTaskSnapshot = await uploadBytes(
        fileRef,
        selectedFile,
        metadata
      );
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      await addDoc(collection(firestore, "files"), {
        documentId,
        fileName: selectedFile.name,
        filePath: uploadTaskSnapshot.ref.fullPath,
        downloadURL,
        createdBy: user?.email || "unknown",
        createdAt: metadata.customMetadata.createdAt,
        folderName: documentId,
        Flatno: user?.Flatno,
      });
      alert("Document uploaded and data saved to Firestore successfully!");
    } catch (error) {
      console.error("Upload or Firestore save failed", error);
      alert("Upload or Firestore save failed: " + error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Document</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Document</DialogTitle>
          <DialogDescription>
            Please Choose a title and the pdf file to associate with it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              PDF
            </Label>
            <Input
              id="PDF"
              type="file"
              accept="application/pdf, application/vnd.ms-excel"
              className="w-24"
              onChange={handleFileChange}
            />
            {selectedFile && <span>{selectedFile.name}</span>}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={uploadFile} type="submit">
            Create New Document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
