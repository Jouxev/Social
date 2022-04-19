import styled from "styled-components";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import { ThemeswitchIcon } from ".";
import { mobile, tablet } from "../responsive";
import { useState } from "react";

const Container = styled.header``;
const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HomeIconContainer = styled.div`
  & > svg {
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
`;
const UserActionContainer = styled.div`
  display: flex;
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
export const Navbar = () => {
  const [menuOpened, setmenuOpened] = useState(false);
  return (
    <Container>
      <NavbarContainer>
        <HomeIconContainer>
          <HomeRoundedIcon />
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
          <ThemeswitchIcon />
          <ForumOutlinedIcon />
          <LogoutRoundedIcon />
        </UserActionContainer>
        <HamburgerMenuContainer>
          {menuOpened ? (
            <ClearOutlinedIcon onClick={() => setmenuOpened(!menuOpened)} />
          ) : (
            <MenuOutlinedIcon onClick={() => setmenuOpened(!menuOpened)} />
          )}
        </HamburgerMenuContainer>
      </NavbarContainer>
    </Container>
  );
};
