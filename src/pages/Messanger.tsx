import {  Box } from "@mui/material";

import styled from "@emotion/styled";

import Topbar from "../components/Topbar";
import ChatBox from "../components/ChatBox";

export default function Messanger() {
 
  return (
    <Messenger>
      <Box
        sx={{
          boxShadow: 3,
          width: "50%",
          height: "90%",
          backgroundColor: "white",
          borderRadius: "20px",
        }}
      >
        <Topbar />
        <ChatBox/>
       
      </Box>
    </Messenger>
  );
}
const Messenger = styled.div({
  display: "flex",
  height: "calc(100vh - 20px)",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1877f2",
  borderRadius: "20px",
});

