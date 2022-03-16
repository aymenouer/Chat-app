
import styled from "@emotion/styled";
import Avatar from '@mui/material/Avatar';
import ReactTimeAgo from 'react-time-ago'
import Linkify from 'react-linkify';
interface MessageType {
  message: String;
}
export default function Message(props:MessageType) {
  return (
    <Messages>
        <MessageTop >
        <Avatar sx={{marginRight:"10px" }}  >AO</Avatar>
        
           <MessageText><Linkify>{props.message}</Linkify></MessageText>
        </MessageTop>
        <MessageBottom >sss</MessageBottom>

    </Messages>
  )


}
const Messages = styled.div({
  display: "flex",
  flexDirection:"column",
  marginTop:"20px",
  alignItems:"flex-end"
});
const MessageTop = styled.div({
  display: "flex",
  alignItems:"center"

});
const MessageBottom = styled.div({
  fontSize:"12px",
  marginTop:"10px"

});
const MessageText = styled.p({
padding:"10px",
borderRadius:"20px",
backgroundColor:"#1877f2",
color:"white",
maxWidth:"300px",
wordBreak:"break-word"
});
