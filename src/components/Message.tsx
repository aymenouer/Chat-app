import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar";
import TimeAgo from "react-timeago";
import Linkify from "react-linkify";
import DeleteIcon from "@mui/icons-material/Delete";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import {  toast } from 'react-toastify';
import { useMessages } from "../store/useMessages";
import { MessageType } from "../model/message";


export default function Message(props: MessageType) {
  const { removeMessage, messages } = useMessages();



  const DeleteMessage =()=>{

    removeMessage(props.id);
  toast.success("Message Deleted!");
  localStorage.setItem("messages", JSON.stringify(messages.filter(function( obj:MessageType ) {
    return obj.id !== props.id;
})));
  
  
  }
  return (
    <>
      <Messages>
        <MessageTop>
          <Avatar
            src="image.jpg"
            alt="aymenface"
            sx={{ marginRight: "10px" }}
          />

          <MessageText>
          
            <Linkify>{props.message}</Linkify>
          </MessageText>
          <DeleteIcon onClick={()=>{DeleteMessage()}} style={{color:"red",cursor:"pointer"}} />
        </MessageTop>
        <MessageBottom>
          <TimeAgo date={props.createdAt} />
        </MessageBottom>
      </Messages>
      {props.url ? (
        <Messages>
          <MessageTop>
            <Avatar
              src="image.jpg"
              alt="aymenface"
              sx={{ marginRight: "10px" }}
            />

            <MessageText>

              <LinkPreview url={props.url} width="300px" />{" "}
            </MessageText>
            <DeleteIcon onClick={()=>{DeleteMessage()}} style={{color:"red",cursor:"pointer"}} />
           </MessageTop>
          <MessageBottom>
            <TimeAgo date={props.createdAt} />
          </MessageBottom>
        </Messages>
      ) : (
        <> </>
      )}
    </>
  );
}
const Messages = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
});
const MessageTop = styled.div({
  display: "flex",
  alignItems: "center",
});
const MessageBottom = styled.div({
  fontSize: "12px",
});
const MessageText = styled.p({
  padding: "10px",
  borderRadius: "20px",
  backgroundColor: "#1877f2",
  color: "white",
  maxWidth: "300px",
  wordBreak: "break-word",
});
