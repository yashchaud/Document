import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@com/ui/button";
import { Label } from "@com/ui/label";
import { Input } from "@com/ui/input";
import PDF from "../images/pdf_4726010.png";
import PopupElemnet from "./Popup";
import CreatingNewDocument from "./CreatingNewDocument";
import Sheet from "./sheet";

const Document = () => {
  const [Documents, SetDocuments] = useState([
    { name: "Legal Documents", id: 1 },
    { name: "Registration", id: 2 },
    { name: "Employee data", id: 3 },
    { name: "MassegesData", id: 4 },
  ]);
  const [CurrentWidth, SetCurrentwidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(true);
  const [query, SetQuery] = useState("");

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
      <Cover>
        {CurrentWidth > 769 && (
          <Sidebar>
            <div className="Createuser">
              <Label>Create New User</Label>
              <PopupElemnet onClick={() => setOpen(false)} />
            </div>
            <div className="DocumentNamediv">
              <Label>Documents</Label>
              <Input onChange={(e) => handleQueryChange(e)} />

              <div className="ContainerDocuments">
                {Documents.filter((item) =>
                  item.name.toLowerCase().includes(query)
                ).map((item, index) => {
                  return (
                    <Button variant="outline" key={index}>
                      {item.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </Sidebar>
        )}
        <DocumentDiv>
          <Triggersheet>
            {CurrentWidth < 769 && <Sheet Documents={Documents} />}
          </Triggersheet>
          <div className="MainContinerdocuments">
            <Label>Compliance Documents</Label>
            <CreatingNewDocument />
          </div>
          <InnerContainerDiv>
            <div className="Inputdiv">
              <Input />
            </div>
            <Label>20 Documents</Label>
            <div className="ListedDocuments">
              <div className="ListDiv">
                <div className="ListImage">
                  <img src={PDF} alt="" />
                  <Label>Legal Document</Label>
                </div>
                <Button>View</Button>
              </div>
              <div className="ListDiv">
                <div className="ListImage">
                  <img src={PDF} alt="" />
                  <Label>Legal Document</Label>
                </div>
                <Button>View</Button>
              </div>
            </div>
          </InnerContainerDiv>
        </DocumentDiv>
      </Cover>
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
