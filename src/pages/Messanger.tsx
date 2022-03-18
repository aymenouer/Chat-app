import { useEffect, useRef, useState } from "react";
import { Alert, Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styled from "@emotion/styled";
import Snackbar from "@mui/material/Snackbar";
import Message from "./../components/Message";
import Topbar from "../components/Topbar";
import Fade from "@mui/material/Fade";

interface MessageType {
  message: string;
  url: string;
  createdAt: Date;
}

export default function Messanger() {
  const [newMessage, setNewMessage] = useState("");
  // @ts-ignore
  const [messages, setMessages] = useState<MessageType[]>(JSON.parse(localStorage.getItem("messages")) || []);
  const scrollRef: any = useRef();
  var linkify = require("linkify-it")();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let array: MessageType[] = messages;
    let createdAt = new Date();
    array.push({
      message: newMessage,
      url: linkify.match(newMessage) ? linkify.match(newMessage)[0].url : "",
      createdAt,
    });
    setMessages(array);
    localStorage.setItem("messages", JSON.stringify(array));
    setNewMessage("");
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessage]);
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
        <Container>
          <ChatBoxTop>
            {messages.map((m) => (
              <div ref={scrollRef}>
                <Message
                  createdAt={m.createdAt}
                  message={m.message}
                  url={m.url}
                />
              </div>
            ))}
          </ChatBoxTop>
          <ChatBoxBottom>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={open}
              sx={{ top: { sm: "calc(75vh - 130px)" } }}
              onClose={handleClose}
              TransitionComponent={Fade}
              key="Fade"
              autoHideDuration={1000}
            >
              <Alert variant="filled" severity="info" sx={{ width: "100%" }}>
                Typing....
              </Alert>
            </Snackbar>
            <TextField
              style={{ width: "90%", height: "90px", padding: "10px" }}
              placeholder="Write something..."
              onChange={(e) => {
                setNewMessage(e.target.value);

                setOpen(true);
              }}
              value={newMessage}
              id="outlined-basic"
              label="Message"
              variant="outlined"
            />

            <Button
              onClick={handleSubmit}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </ChatBoxBottom>
        </Container>
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

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  padding: "10px",
  height: "90%",
});
const ChatBoxTop = styled.div({
  height: "100%",
  overflowY: "scroll",
  paddingRight: "10px",
});
const ChatBoxBottom = styled.div({
  marginTop: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
