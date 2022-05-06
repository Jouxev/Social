import styled from "styled-components";
import { Navbar } from "../Components";
import { FriendItem } from "../Components/SideBar/FriendItem";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { mobile, tablet } from "../responsive";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import avatar from "../Assets/Images/avatar.png";
import { useSelector } from "react-redux";
import { userState } from "../Redux/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { API_URI } from "../Config";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const Container = styled.div`
  width: auto;
  height: 100vh;
  padding: 20px 20px 0px 20px;
`;
const ChatContainer = styled.div`
  height: 100vh;
  padding: 20px 20px 0px 20px;
  display: flex;
  ${mobile({
    padding: "20px 0px 0px 0px",
  })}
`;
const FriendContainer = styled.div`
  background: ${(props) => props.theme.element};
  width: 20%;
  margin: 0px 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 20px;
  height: 75vh;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  ${(props) =>
    props.mobileShow
      ? mobile({
          display: "block",
        })
      : mobile({
          display: "none",
        })};
  ${tablet({
    width: "35%;",
    borderRadius: "10px",
  })}
  ${mobile({
    width: "100%",
  })}
`;
const FriendItemContainer = styled.div``;

const ConversationContainer = styled.div`
  background: ${(props) => props.theme.element};
  width: 80%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: calc(75vh + 40px);
  display: flex;
  flex-direction: column;
  position: relative;
  ${(props) =>
    props.mobileShow
      ? mobile({
          display: "block",
        })
      : mobile({
          display: "none",
        })};
  ${mobile({
    width: "100%",
  })}
`;
const Recipient = styled.div`
  border-top-right-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${(props) => props.theme.input};
`;
const ReturnButton = styled.div`
  display: none;
  height: 48px;
  width: 48px;
  padding: 1px;
  border-radius: 50%;

  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.element};
  transition: 0.2s ease all;
  cursor: pointer;
  margin-right: 20px;
  &:hover {
    border: 1px solid ${(props) => props.theme.fontColorSecondary};
    transform: scale(1.1);
    opacity: 0.8;
  }
  & > svg {
    font-weight: bold;
  }
  ${mobile({
    display: "flex",
  })}
`;
const UserAvatarContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  maring: 20px 30px 20px 0px;
  align-items: center;
  border-radius: 50%;
  margin-right: 10px;
  padding: 1px;
  border: 2px solid ${(props) => props.theme.fontColor};
  cursor: pointer;
  transition: 0.2 ease all;
  &:hover {
    border: 2px solid ${(props) => props.theme.fontColorSecondary};
    & > img {
      transition: 0.2 ease all;
      opacity: 0.8;
    }
  }
`;
const UserImage = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
`;
const UserName = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Messages = styled.div`
  height: 70%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.input};
`;

const MeesageText = styled.div`
  padding: 10px 5px;
  background: ${(props) => props.theme.input};
  width: fit-content;
  height: fit-content;
  position: relative;
  border-radius: 5px;
  margin: 10px 0px;
  ${(props) => !props.recieved && " align-self: flex-end;"};
  &::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    content: "";
    position: absolute;
    border: 10px solid transparent;
    border-top: 10px solid ${(props) => props.theme.input};
    ${(props) =>
      props.recieved
        ? "left: 0; transform: translateX(-50%);"
        : "right: 0; transform: translateX(50%);"};
  }
`;
const MessageTime = styled.span`
  position: absolute;
  font-size: 0.56rem;
  ${(props) => (props.recieved ? "left: 0.5rem" : "right: 0.5rem")};
  bottom: -2em;
`;
const AddMessage = styled.div`
  background: ${(props) => props.theme.input};
  margin: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;
const AddText = styled.textarea`
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  resize: none;
  font-family: "Monteserrat";
  flex: 1;
  cursor: pointer;
  color: ${(props) => props.theme.fontColorSecondary};
  background: ${(props) => props.theme.input};
  ${mobile({
    width: "100%",
  })}
`;

const ActionButton = styled.div`
  display: flex;
`;
const ButtonIcon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0px 5px;
  background: ${(props) => props.theme.element};
  transition: 0.2s ease all;
  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

export const ChatPage = () => {
  const { id } = useParams();
  const [frndsViewVisible, setfrndsViewVisible] = useState(true);
  const [cnvrView, setcnvrView] = useState(false);
  const { currentUser } = useSelector(userState);
  const [messageContent, setMessageContent] = useState("");
  const [imageCollections, setImageCollections] = useState([]);
  const [isSendingLoading, setIsSendingLoading] = useState(false);
  const [followings, setfollowings] = useState([]);
  const [otherUsers, setotherUsers] = useState([]);
  const [conversationMessage, setconversationMessage] = useState(null);
  const [reciever, setreciever] = useState(null);
  const navigate = useNavigate();

  const loadFollowings = () => {
    axios
      .post(
        `${API_URI}api/users/followings`,
        JSON.stringify({
          userId: currentUser.userId,
        }),
        { headers: { "Content-type": "application/json" } }
      )
      .then((res) => {
        setfollowings(res.data);
      })
      .catch((err) => console.log(err));
  };
  const loadOtherUsers = () => {
    axios
      .get(`${API_URI}api/users/`)
      .then((res) => {
        setotherUsers(res.data);
      })
      .catch((err) => console.log(err));
  };
  const loadConversation = async () => {
    await axios
      .post(
        `${API_URI}api/message/conversation`,
        JSON.stringify({
          user: currentUser.userId,
          friend: id,
        }),
        { headers: { "Content-type": "application/json" } }
      )
      .then((data) => {
        setconversationMessage(data.data);
      })
      .catch((err) => console.log(err));
  };
  const loadReciever = async () => {
    await axios
      .post(
        `${API_URI}api/users/show`,
        JSON.stringify({
          userId: id,
        }),
        { headers: { "Content-type": "application/json" } }
      )
      .then((data) => {
        setreciever(data.data);
      })
      .catch((err) => console.log(err));
  };

  const loadMessage = (item) => {
    navigate(`/chat/${item}`);
    setcnvrView(true);
    setfrndsViewVisible(false);
  };
  const loadFriends = () => {
    setcnvrView(false);
    setfrndsViewVisible(true);
  };

  const sendMessage = async () => {
    setIsSendingLoading(true);
    await axios
      .post(
        `${API_URI}api/message/send`,
        JSON.stringify({
          sender: currentUser.userId,
          reciever: reciever._id,
          content: messageContent,
          images: imageCollections,
        }),
        { headers: { "Content-type": "application/json" } }
      )
      .then((data) => {
        console.log(data);
        setMessageContent("");
        setIsSendingLoading(false);
      })
      .catch((err) => {
        setIsSendingLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    loadFollowings();
    loadOtherUsers();
    loadConversation();
    loadReciever();

    const interval = setInterval(() => {
      loadConversation();
    }, 2500);

    return () => clearInterval(interval);
  }, [id]);
  return (
    <Container>
      <Navbar />
      <ChatContainer>
        <FriendContainer mobileShow={frndsViewVisible}>
          {followings.map((item, index) => (
            <FriendItemContainer
              key={index}
              onClick={() => {
                loadMessage(item);
              }}
            >
              <FriendItem item={item} friend chat />
            </FriendItemContainer>
          ))}
          {otherUsers.map((item, index) => (
            <FriendItemContainer
              key={index}
              onClick={() => {
                loadMessage(item._id);
              }}
            >
              <FriendItem item={item} friend chat />
            </FriendItemContainer>
          ))}
        </FriendContainer>
        <ConversationContainer mobileShow={cnvrView}>
          <Recipient>
            <ReturnButton onClick={() => loadFriends()}>
              <ArrowBackIosRoundedIcon />
            </ReturnButton>
            <UserAvatarContainer>
              <UserImage
                src={
                  reciever
                    ? reciever.profilePic !== ""
                      ? reciever.profilePic
                      : avatar
                    : avatar
                }
                alt={reciever ? reciever.fullname : "picture"}
              />
            </UserAvatarContainer>
            <UserName>
              {" "}
              {reciever ? reciever.fullname : "No User Selected"}
            </UserName>
          </Recipient>
          <Messages>
            {conversationMessage && conversationMessage.length > 0
              ? conversationMessage.map((message, index) => (
                  <MeesageText
                    key={index}
                    recieved={message.reciever == currentUser.userId}
                  >
                    {message.content}
                    <MessageTime
                      recieved={message.reciever == currentUser.userId}
                    >
                      {" "}
                      {moment(message.createdAt).calendar()}{" "}
                    </MessageTime>
                  </MeesageText>
                ))
              : "No Message yet"}
          </Messages>
          {reciever && (
            <AddMessage>
              <AddText
                rows={2}
                placeholder="type a message ..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
              <ActionButton>
                <ButtonIcon>
                  <ImageRoundedIcon />
                </ButtonIcon>
                <ButtonIcon>
                  {isSendingLoading ? (
                    <CircularProgress color={"inherit"} size={25} />
                  ) : (
                    <SendRoundedIcon
                      disabled={isSendingLoading}
                      onClick={() => sendMessage()}
                    />
                  )}
                </ButtonIcon>
              </ActionButton>
            </AddMessage>
          )}
        </ConversationContainer>
      </ChatContainer>
    </Container>
  );
};
