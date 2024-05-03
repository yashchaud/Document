import React, { useEffect, useState } from "react";
import { Button } from "@com/ui/button";
import Svg from "../../images/folder.png";
import PopupCreatefolder from "./PopupCreatefolder";
import { ref, listAll } from "firebase/storage";
import { storage } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Folderdiv = ({ setOpen }) => {
  const [folders, setFolders] = useState([]);
  const Navigate = useNavigate();
  const User = Cookies.get("user"); // Make sure to use get method correctly
  const userObject = User ? JSON.parse(User) : null; // Safely parse the JSON string

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const listRef = ref(storage, ""); // pointing to the root of your storage
        const res = await listAll(listRef);
        const folderNames = res.prefixes.map((folderRef) => folderRef.name);
        setFolders(folderNames);
      } catch (error) {
        console.error("Failed to fetch folders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, [storage]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Folders</h1>
        <div className="flex items-center gap-2">
          {userObject.isAdmin && <PopupCreatefolder />}
        </div>{" "}
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
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"></th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"></th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {folders.map((folder) => (
              <tr
                key={folder}
                className="border-b border-muted/40 dark:border-gray-800/40"
              >
                <td className="px-4 py-3">
                  <img
                    alt="Product Image"
                    className="aspect-square rounded-md object-cover"
                    height={40}
                    src={Svg}
                    width={40}
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium">{folder}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground"></td>
                <td className="px-4 py-3 text-sm text-muted-foreground"></td>
                <td className="px-4 py-3 text-sm">
                  <Button
                    onClick={() => {
                      Navigate(`/documents/${folder}`);
                    }}
                    size="sm"
                    variant="outline"
                  >
                    Open
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

export default Folderdiv;

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
