import styled from "styled-components";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import ProfilePic from "../Assets/Images/profile.jpeg";
import avatar from "../Assets/Images/avatar.png";

import { ThemeswitchIcon } from ".";
import { mobile, tablet } from "../responsive";
import { FriendItem } from "./SideBar/FriendItem";
import { API_URI } from "../Config";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, userState } from "../Redux/userSlice";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  display: none;
  z-index: 5 !important;
  ${tablet({
    display: "block",
  })}
`;
const SideMenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 50%;
  background: ${(props) => props.theme.element};
  -webkit-box-shadow: -3px 1px 9px 0px
    ${(props) => props.theme.fontColorSecondary};
  box-shadow: -3px 1px 9px 0px ${(props) => props.theme.fontColorSecondary};
  ${mobile({
    width: "70%",
  })}
`;
const UserActionContainer = styled.div`
  display: none;
  padding: 10px;
  border-top: 1px solid ${(props) => props.theme.fontColorSecondary};
  border-bottom: 1px solid ${(props) => props.theme.fontColorSecondary};
  justify-content: flex-end;
  align-items: center;
  margin: 4rem 0px 20px 0px;
  & > svg {
    font-size: 2.5rem;
    margin-left: 1.5rem;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
  ${tablet({
    display: "flex",
  })}
`;
const UserAvatar = styled.div`
  display: flex;
  justify-content: center;
  margin: 0px 20px;
  align-items: center;
  border-radius: 50%;
  padding: 1px;
  border: 2px solid ${(props) => props.theme.fontColor};
  cursor: pointer;
  transition: 0.2 ease all;
  &:hover {
    border: 2px solid ${(props) => props.theme.fontColorSecondary};
    transform: scale(1.1);
    & > img {
      transition: 0.2 ease all;
      opacity: 0.8;
    }
  }
`;
const UserImage = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
`;

const FriendListContainer = styled.div`
  padding: 10px;
  height: 100%;
  overflow: scroll;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: lighter;
`;
export const SideMenu = (props) => {
  const [followings, setfollowings] = useState([]);
  const [otherUsers, setotherUsers] = useState([]);
  const { currentUser } = useSelector(userState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const logout = () => {
    dispatch(logoutUser());
    navigate("/signin");
  };
  useEffect(() => {
    loadFollowings();
    loadOtherUsers();
  }, []);
  return (
    <Container onClick={() => props.toggleMenu()}>
      <SideMenuContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <UserActionContainer>
          <UserAvatar
            title={currentUser && currentUser.fullname}
            onClick={() => navigate(`/profile/${currentUser.userId}`)}
          >
            <UserImage
              src={
                currentUser &&
                (currentUser.userPic !== "" ? currentUser.userPic : avatar)
              }
              alt="userName"
            />
          </UserAvatar>
          <ThemeswitchIcon />
          <ForumOutlinedIcon onClick={() => navigate("/chat")} />
          <LogoutRoundedIcon onClick={() => logout()} />
        </UserActionContainer>
        <FriendListContainer>
          <Title>Followings</Title>
          {followings.map((item, index) => (
            <FriendItem key={index} item={item} friend />
          ))}
          <Title>Other Users</Title>
          {otherUsers.map((item, index) => (
            <FriendItem key={index} item={item} />
          ))}
        </FriendListContainer>
      </SideMenuContainer>
    </Container>
  );
};
