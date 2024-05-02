import React from "react";
import { Button } from "@com/ui/button";
import Svg from "../../images/folder.png";
const Folderdiv = ({ setOpen }) => {
  console.log(setOpen);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Folders</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              console.log("Back button clicked");

              setOpen(false);
            }}
            variant="outline"
          >
            <ArrowLeftIcon
              onClick={() => setOpen(false)}
              className="h-4 w-4 mr-2"
            />
            Back
          </Button>
          <Button>View Products</Button>
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
              <td className="px-4 py-3 text-sm font-medium">Product Name</td>
              <td className="px-4 py-3 text-sm text-muted-foreground"></td>
              <td className="px-4 py-3 text-sm text-muted-foreground"></td>
              <td className="px-4 py-3 text-sm">
                <Button
                  onClick={() => setOpen(true)}
                  size="sm"
                  variant="outline"
                >
                  Open
                </Button>
              </td>
            </tr>
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
              <td className="px-4 py-3 text-sm font-medium">Another Product</td>
              <td className="px-4 py-3 text-sm text-muted-foreground"></td>
              <td className="px-4 py-3 text-sm text-muted-foreground"></td>
              <td className="px-4 py-3 text-sm">
                <Button
                  onClick={() => setOpen(true)}
                  size="sm"
                  variant="outline"
                >
                  Open
                </Button>
              </td>
            </tr>
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
              <td className="px-4 py-3 text-sm font-medium">Cool Product</td>
              <td className="px-4 py-3 text-sm text-muted-foreground"></td>
              <td className="px-4 py-3 text-sm text-muted-foreground"></td>
              <td className="px-4 py-3 text-sm">
                <Button
                  onClick={() => setOpen(true)}
                  size="sm"
                  variant="outline"
                >
                  Open
                </Button>
              </td>
            </tr>
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
              <td className="px-4 py-3 text-sm font-medium">Awesome Product</td>
              <td className="px-4 py-3 text-sm text-muted-foreground"></td>
              <td className="px-4 py-3 text-sm text-muted-foreground"></td>
              <td className="px-4 py-3 text-sm">
                <Button
                  onClick={() => setOpen(true)}
                  size="sm"
                  variant="outline"
                >
                  Open
                </Button>
              </td>
            </tr>
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
