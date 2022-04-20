import styled from "styled-components";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import ProfilePic from "../Assets/Images/profile.jpeg";

import { ThemeswitchIcon } from ".";
import { tablet } from "../responsive";

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  display: none;
  ${tablet({
    display: "block",
  })}
`;
const SideMenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 70%;
  background: ${(props) => props.theme.element};
  -webkit-box-shadow: -3px 1px 9px 0px
    ${(props) => props.theme.fontColorSecondary};
  box-shadow: -3px 1px 9px 0px ${(props) => props.theme.fontColorSecondary};
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
  overflow: scroll;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: lighter;
`;
export const SideMenu = (props) => {
  return (
    <Container onClick={() => props.toggleMenu()}>
      <SideMenuContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <UserActionContainer>
          <UserAvatar title={"Full name "}>
            <UserImage src={ProfilePic} alt="userName" />
          </UserAvatar>
          <ThemeswitchIcon />
          <ForumOutlinedIcon />
          <LogoutRoundedIcon />
        </UserActionContainer>
        <FriendListContainer>
          <Title>Friend List</Title>
        </FriendListContainer>
      </SideMenuContainer>
    </Container>
  );
};
