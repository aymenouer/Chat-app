import { useEffect, useRef, useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import Message from "./Message";
import { useMessages } from "../store/useMessages";
import { v4 as uuidv4 } from "uuid";
export default function ChatBox() {
  const [newMessage, setNewMessage] = useState("");
  const { addMessage, messages } = useMessages();

  const scrollRef: any = useRef();
  var linkify = require("linkify-it")();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let createdAt = new Date();
    const mess = {
      id:uuidv4(),
      message: newMessage,
      url: linkify.match(newMessage) ? linkify.match(newMessage)[0].url : "",
      createdAt,
    };
    addMessage(mess);
    localStorage.setItem("messages", JSON.stringify([...messages,mess]));
    setNewMessage("");
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessage]);
  return (
    <Chat>
      <ChatBoxTop>
        {messages.map((m) => (
          <div ref={scrollRef}>
            <Message
              key={m.id}
              id={m.id}
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
    </Chat>
  );
}
const Chat = styled.div({
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
