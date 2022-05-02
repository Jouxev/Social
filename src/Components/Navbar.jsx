import styled from "styled-components";
import { SideMenu } from "./";
import avatarImage from "../Assets/Images/avatar.png";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import { ThemeswitchIcon } from ".";
import { mobile, tablet } from "../responsive";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, userState } from "../Redux/userSlice";

const Container = styled.header`
  position: relative;
`;
const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HomeIconContainer = styled.div`
  & > a {
    color: inherit;
  }
  & > a > svg {
    font-size: 2.5rem;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
`;
const SearchContainer = styled.div`
display: flex;
padding: 5px;
border-radius: 10px;
background: ${(props) => props.theme.element};
align-items: center;
& svg {
    cursor: pointer;
    font-size 2rem;
    &:hover{
        transform: scale(1.1);
        font-weight: bold;
    }
}
${mobile({
  justifyContent: "center",
})}
`;
const SearchInput = styled.input`
  padding: 10px 20px;
  font-size: 14px;
  width: 20rem;
  border: none;
  border-radius: 5px;
  background: ${(props) => props.theme.element};
  color: ${(props) => props.theme.fontColor};
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 0.8;
    font-size: 16px;
    color: lightgray;
  }
  ${mobile({
    width: "10rem",
  })}
`;
const UserActionContainer = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    font-size: 2.5rem;
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
  ${tablet({
    display: "none",
  })}
`;
const HamburgerMenuContainer = styled.div`
  display: none;
  z-index: 99 !important;
  & > svg {
    font-size: 2.5rem;
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
  ${tablet({
    display: "block",
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
  object-fit: cover;
  border-radius: 50%;
`;

export const Navbar = () => {
  const [menuOpened, setmenuOpened] = useState(false);
  const { currentUser } = useSelector(userState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/signin");
  };
  useEffect(() => {
    currentUser == null && navigate("/signin");
  }, []);
  return (
    <Container>
      <NavbarContainer>
        <HomeIconContainer>
          <Link to={"/"}>
            <HomeRoundedIcon />{" "}
          </Link>
        </HomeIconContainer>
        <SearchContainer>
          <SearchOutlinedIcon />
          <SearchInput
            type={"text"}
            placeholder="Tap to Search"
            title="Search for user or a post"
          />
        </SearchContainer>
        <UserActionContainer>
          <UserAvatar title={"Full name "} onClick={() => navigate("/profile")}>
            <UserImage
              src={
                currentUser &&
                (currentUser.userPic ? currentUser.userPic : avatarImage)
              }
              alt={currentUser && currentUser.fullname}
            />
          </UserAvatar>
          <ThemeswitchIcon />
          <ForumOutlinedIcon onClick={() => navigate("/chat")} />
          <LogoutRoundedIcon onClick={() => logout()} />
        </UserActionContainer>
        <HamburgerMenuContainer>
          {menuOpened ? (
            <ClearOutlinedIcon onClick={() => setmenuOpened(!menuOpened)} />
          ) : (
            <MenuOutlinedIcon onClick={() => setmenuOpened(!menuOpened)} />
          )}
        </HamburgerMenuContainer>
      </NavbarContainer>
      {menuOpened && <SideMenu toggleMenu={() => setmenuOpened(!menuOpened)} />}
    </Container>
  );
};
