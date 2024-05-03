import React, { useEffect, useState } from "react";
import { Button } from "@com/ui/button";
import Svg from "../../images/ext_pdf_filetype_icon_176234.png";
import { storage } from "../../Firebase"; // Ensure Firebase is properly imported
import { ref, listAll, getDownloadURL } from "firebase/storage";
import CreatingNewDocument from "../CreatingNewDocument";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PDFdiv = ({ setOpen, documentId }) => {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);

  const Navigate = useNavigate();
  const User = Cookies.get("user"); // Make sure to use get method correctly
  const userObject = User ? JSON.parse(User) : null; // Safely parse the JSON string

  useEffect(() => {
    console.log(userObject.email);
  }, [User]);

  useEffect(() => {
    const fetchFiles = async () => {
      const folderRef = ref(storage, documentId); // documentId is the folder name
      try {
        const fileList = await listAll(folderRef);
        const fileUrls = await Promise.all(
          fileList.items.map((fileRef) => getDownloadURL(fileRef))
        );
        console.log(fileUrls);
        setFiles(
          fileUrls.map((url, index) => ({
            url,
            name: fileList.items[index].name, // Optional: Capture the file name if needed
          }))
        );
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    if (documentId) {
      fetchFiles();
    }
  }, [documentId]);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Pdf Documents</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              Navigate("/documents");
            }}
            variant="outline"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
          </Button>
          {userObject.isAdmin && <CreatingNewDocument />}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-muted/40 dark:bg-gray-800/40">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Created By
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr className="border-b border-muted/40 dark:border-gray-800/40">
                <td className="px-4 py-3">
                  <img
                    alt="Product Image"
                    className="aspect-square rounded-md object-cover"
                    height={40}
                    src={Svg}
                    width={40}
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium">{file.name}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  John Doe
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  2023-04-01
                </td>
                <td className="px-4 py-3 text-sm">
                  <Button size="sm" variant="outline">
                    View PDF
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PDFdiv;

function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
