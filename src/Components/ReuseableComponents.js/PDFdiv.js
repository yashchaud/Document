import React, { useEffect, useState } from "react";
import { Button } from "@com/ui/button";
import Svg from "../../images/ext_pdf_filetype_icon_176234.png";
import { storage } from "../../Firebase"; // Ensure Firebase is properly imported
import { ref, listAll, getDownloadURL } from "firebase/storage";
import CreatingNewDocument from "../CreatingNewDocument";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getFirestore } from "firebase/firestore";

import { app } from "../../Firebase"; // Ensure Firestore is properly imported
import {
  collection,
  getDocs,
  query as firestoreQuery,
  where,
} from "firebase/firestore";

const PDFdiv = ({ setOpen, query, documentId }) => {
  const [files, setFiles] = useState([]);
  const Navigate = useNavigate();
  const User = Cookies.get("user");
  const userObject = User ? JSON.parse(User) : null;
  const db = getFirestore(app);

  useEffect(() => {
    console.log(userObject.email);
  }, [User]);

  useEffect(() => {
    const fetchFiles = async () => {
      const folderRef = ref(storage, documentId);
      try {
        const fileList = await listAll(folderRef);
        // Filter the files to include only PDFs
        const pdfFiles = fileList.items.filter((fileRef) =>
          fileRef.name.endsWith(".pdf")
        );

        const fileUrls = await Promise.all(
          pdfFiles.map((fileRef) => getDownloadURL(fileRef))
        );

        const filesMetadataQuery = firestoreQuery(
          collection(db, "files"),
          where("folderName", "==", documentId)
        );
        const filesMetadata = await getDocs(filesMetadataQuery);
        const metadataMap = new Map();
        filesMetadata.forEach((doc) => {
          console.log(doc.id, " => ", doc.data()); // Log each document to check the actual data
          metadataMap.set(doc.data().fileName, {
            createdBy: doc.data().createdBy,
            createdAt: doc.data().createdAt,
            Flatno: doc.data().Flatno,
          });
        });

        const filesWithMetadata = pdfFiles.map((item, index) => ({
          url: fileUrls[index],
          name: item.name,
          createdBy: metadataMap.get(item.name)?.createdBy || "Unknown",
          createdAt: metadataMap.get(item.name)?.createdAt || "Unknown date",
          Flatno: metadataMap.get(item.name)?.Flatno,
        }));

        setFiles(filesWithMetadata);
      } catch (error) {
        console.error("Error fetching files and metadata:", error);
      }
    };

    if (documentId) {
      fetchFiles();
    }
  }, [documentId]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">PDF Documents</h1>
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
          {userObject &&
            (userObject.Role === "admin" || userObject.Role === "coadmin") && (
              <CreatingNewDocument setOpen={setOpen} />
            )}
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
                Flatno
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
            {files
              .filter((file) => file.createdBy.includes(query))
              .map((file) => (
                <tr
                  key={file.name}
                  className="border-b border-muted/40 dark:border-gray-800/40"
                >
                  <td className="px-4 py-3">
                    <img
                      alt="PDF Icon"
                      className="aspect-square rounded-md object-cover"
                      height={40}
                      src={Svg}
                      width={40}
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {file.Flatno}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{file.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {file.createdBy}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {file.createdAt}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline">
                        View PDF
                      </Button>
                    </a>
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
