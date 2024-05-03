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
const Popup = () => {
  const [selectedFile, setSelectedFile] = useState(null);

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

    try {
      await uploadBytes(fileRef, selectedFile);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed");
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
              Title.
            </Label>
            <Input
              id="Flatno"
              placeholder="Legal Document"
              className="col-span-3"
            />
          </div>
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
