import { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./Globalstyles";
import Document from "./Components/Document";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  useLocation,
  Link,
} from "react-router-dom";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/documents" element={<Document />} />
        <Route path="/users" element={<Document />} />
        <Route path="/login" element={<Login />} />
        <Route path="/documents/:documentId" element={<Document />} />
        {/* <Document /> */}
      </Routes>
    </>
  );
}

export default App;

const Cover = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 20rem;
  background-color: aliceblue;
`;
