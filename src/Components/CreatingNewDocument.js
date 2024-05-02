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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCreateUser = () => {
    // Check if a file is selected
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("document", selectedFile);

    // Make API POST request
    fetch("your_api_endpoint", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from the backend
        console.log("Response from backend:", data);
        // Optionally, you can close the dialog or show a success message here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });
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
          <Button onClick={handleCreateUser} type="submit">
            Create New Document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
