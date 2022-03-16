import { useEffect, useRef, useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styled from "@emotion/styled";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import Message from './../components/Message';

type TransitionProps = Omit<SlideProps, "direction">;
function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

export default function Messanger() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<String[]>([]);
  const scrollRef: any = useRef();

  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let array: String[] = messages;

    array.push(newMessage);
    setMessages(messages);
    setNewMessage("");
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessage]);
  return (
    <Messenger>
      <ChatBox>
        <Container>
          <ChatBoxTop>
            {messages.map((m) => (
              <div ref={scrollRef}>
                <Message message={m} />
              </div>
            ))}
          </ChatBoxTop>
          <ChatBoxBottom>
          <Snackbar
      anchorOrigin={{ vertical: 'bottom',
      horizontal: 'center', }}
              open={open}
              onClose={handleClose}
              TransitionComponent={transition}
              key={transition ? transition.name : ""}
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
                setTransition(() => TransitionUp);
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
      </ChatBox>

    </Messenger>
  );
}
const Messenger = styled.div({
  display: "flex",
  height: "calc(100vh - 70px)",
});
const ChatBox = styled.div({
  width: "100%",
  height: "100%",
});
const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  padding: "10px",
  height: "100%",
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
