import React from "react";
import { Button } from "@com/ui/button";
import { Input } from "@com/ui/input";
import { Label } from "@com/ui/label";
import styled from "styled-components";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@com/ui/sheet";
import PopupElemnet from "./Popup";

const sheet = ({ Documents }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Sidebar</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Sidebar</SheetTitle>
          <SheetDescription>Sidebar</SheetDescription>
        </SheetHeader>
        {/*Content*/}
        <NewuserDiv className="Createuser">
          <Label>Create New User</Label>
          <PopupElemnet onClick={() => setOpen(false)} />
        </NewuserDiv>
        <DocumentSearch className="DocumentNamediv">
          <Label>Documents</Label>
          <Input />
        </DocumentSearch>
        <SheetFooter>
          <SheetClose asChild>
            <DocumentDivs className="ContainerDocuments">
              {Documents.map((item, index) => {
                return (
                  <Button variant="outline" key={index}>
                    Legal Documents
                  </Button>
                );
              })}
            </DocumentDivs>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default sheet;

const NewuserDiv = styled.div`
  margin-top: 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 0.2rem;
  }
`;

const DocumentSearch = styled.div`
  margin-top: 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 0.2rem;
  }
`;

const DocumentDivs = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
  gap: 0.5rem;
`;
