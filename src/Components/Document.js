import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@com/ui/button";
import { Label } from "@com/ui/label";
import { Input } from "@com/ui/input";
import PDF from "../images/pdf_4726010.png";
import PopupElemnet from "./Popup";
import CreatingNewDocument from "./CreatingNewDocument";
import PDFdiv from "./ReuseableComponents.js/PDFdiv";
import NavComponent from "./ReuseableComponents.js/Nav";
// import Link from "next/link";
import FOlderdiv from "./ReuseableComponents.js/Folderdiv";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { Badge } from "@com/ui/badge";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@com/ui/card";
import Userlist from "./ReuseableComponents.js/Userlist";
import { SheetTrigger, SheetContent, Sheet } from "@com/ui/sheet";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@com/ui/dropdown-menu";

const Document = () => {
  let location = useLocation();
  let { documentId } = useParams(); // This will be used to get dynamic segments from the URL

  const [Documents, SetDocuments] = useState([
    { name: "Legal Documents", id: 1 },
    { name: "Registration", id: 2 },
    { name: "Employee data", id: 3 },
    { name: "MassegesData", id: 4 },
  ]);
  const [CurrentWidth, SetCurrentwidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const [query, SetQuery] = useState("");

  const renderContent = () => {
    if (
      location.pathname.startsWith(`/documents/${documentId}`) &&
      documentId
    ) {
      return <PDFdiv setOpen={setOpen} documentId={documentId} />;
    } else if (location.pathname === "/documents") {
      return <FOlderdiv setOpen={setOpen} />;
    } else {
      // Default case if no other routes match
      return <div>Not Found</div>;
    }
  };
  const handleQueryChange = (event) => {
    SetQuery(event.target.value);
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      SetCurrentwidth(window.innerWidth);
    });
    console.log(CurrentWidth);

    return () => {
      window.removeEventListener("resize", () => {
        SetCurrentwidth(window.innerWidth);
      });
    };
  }, [CurrentWidth]);

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <a className="flex items-center gap-2 font-semibold" href="#">
                <Package2Icon className="h-6 w-6" />
                <span className="">Sanmisha</span>
              </a>
            </div>
            <NavComponent />
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="shrink-0 md:hidden"
                  size="icon"
                  variant="outline"
                >
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="flex flex-col" side="left">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    className="flex items-center gap-2 text-lg font-semibold"
                    to="/"
                  >
                    <Package2Icon className="h-6 w-6" />
                    <span className="sr-only">Sanmisha</span>
                  </Link>

                  <Link
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                    to="/documents"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                    Documents
                  </Link>

                  <Link
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    to="users"
                  >
                    <UsersIcon className="h-5 w-5" />
                    Users
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  {open ? (
                    <Input
                      className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                      placeholder="Search Documents..."
                      type="search"
                    />
                  ) : (
                    <Input
                      className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                      placeholder="Search Folders..."
                      type="search"
                    />
                  )}
                </div>
              </form>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full"
                  size="icon"
                  variant="secondary"
                >
                  <CircleUserIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          {location.pathname === "/users" ? <Userlist /> : renderContent()}
        </div>
      </div>
    </>
  );
};

export default Document;

const Triggersheet = styled.div`
  margin-top: 1rem;
`;
const Cover = styled.div`
  display: flex;
  min-height: 100vh;
`;
const InnerContainerDiv = styled.div`
  margin-left: 2rem;
  margin-top: 2rem;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  .Inputdiv {
    width: 15rem;
  }
  label {
    margin-left: 1rem;
    margin-top: 1rem;
  }
  .ListedDocuments {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    margin-left: 1rem;
    border: 1px solid #c0c0c0;
    border-radius: 1rem;
    padding: 1rem;
    .ListImage {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      justify-content: center;
      label {
        margin: 0;
      }
    }
    .ListDiv {
      display: flex;
      justify-content: space-between;
      padding: 0.8rem;

      border-radius: 0.5rem;
    }
  }
`;

const DocumentDiv = styled.div`
  width: 100%;
  min-height: 100%;
  padding-inline: 1rem;

  background-color: antiquewhite;
  .MainContinerdocuments {
    margin-top: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Sidebar = styled.div`
  width: 12rem;
  height: 100%;
  gap: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  .Createuser {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .DocumentNamediv {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    h1 {
      font-weight: bold;
    }
    .ContainerDocuments {
      display: flex;
      gap: 1rem;
      flex-direction: column;
    }
  }
`;

function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CircleUserIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LineChartIcon(props) {
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
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function PackageIcon(props) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
