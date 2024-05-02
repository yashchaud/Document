import { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./Globalstyles";
import Document from "./Components/Document";

function App() {
  return (
    <>
      <GlobalStyle />
      <Document />
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
