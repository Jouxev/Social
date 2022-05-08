import styled from "styled-components";
import { SideMenu } from "./";
import avatarImage from "../Assets/Images/avatar.png";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { CircularProgress } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import { ThemeswitchIcon } from ".";
import { mobile, tablet } from "../responsive";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, userState } from "../Redux/userSlice";
import axios from "axios";
import { API_URI } from "../Config";

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
position: relative;
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
const SearchResult = styled.div`
  position: absolute;
  top: 3.2rem;
  left: 0;
  max-height: 80vh;
  width: 100%;
  border-radius: 20px;
  background-color: ${(props) => props.theme.element};
  box-shadow: 0 0 30px rgb(0 0 0 / 47%);
  z-index: 9 !important;
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

const SearchResultDiv = styled.div`
  padding: 20px;
  max-height: 50%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Title = styled.h3`
  font-size: 16px;
`;
const Items = styled.ul`
  list-style: auto;
  margin: 0;
`;
const Item = styled.li`
  margin: 10px 0px;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.fontColorSecondary};
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const Navbar = () => {
  const [menuOpened, setmenuOpened] = useState(false);
  const { currentUser } = useSelector(userState);
  const [searchVisible, setsearchVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [searchPostResult, setsearchPostResult] = useState([]);
  const [searchUserResult, setsearchUserResult] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/signin");
  };
  const handleInputChange = (e) => {
    setsearchText(e.target.value);
    searchText.length > 2 && getSeachResult();
  };

  const getSeachResult = async () => {
    setIsLoading(true);
    await axios
      .post(
        `${API_URI}api/search`,
        JSON.stringify({
          keyword: searchText,
        }),
        { headers: { "Content-type": "application/json" } }
      )
      .then((data) => {
        setsearchPostResult(data.data.postsResult);
        setsearchUserResult(data.data.usersResult);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {}, []);
  return (
    <Container>
      <NavbarContainer>
        <HomeIconContainer>
          <Link to="/">
            <HomeRoundedIcon />
          </Link>
        </HomeIconContainer>
        <SearchContainer>
          <SearchOutlinedIcon
            onClick={() => setsearchVisible(!searchVisible)}
          />
          <SearchInput
            type={"text"}
            placeholder="Tap to Search"
            title="Search for user or a post"
            onChange={(e) => handleInputChange(e)}
            onKeyDown={() =>
              searchText.length > 2
                ? setsearchVisible(true)
                : setsearchVisible(false)
            }
            value={searchText}
          />
          {searchVisible &&
            (isLoading ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              <SearchResult>
                <SearchResultDiv>
                  <Title> User ({searchUserResult.length})</Title>
                  <Items>
                    <Items>
                      {searchUserResult.map((user, index) => (
                        <Item
                          key={index}
                          onClick={() => {
                            navigate(`/profile/${user._id}`);
                            setsearchVisible(!searchVisible);
                          }}
                        >
                          {" "}
                          {user.fullname}
                        </Item>
                      ))}
                    </Items>
                  </Items>
                </SearchResultDiv>
                <SearchResultDiv>
                  <Title> Posts ({searchPostResult.length})</Title>
                  <Items>
                    {searchPostResult.map((post, index) => (
                      <Item
                        key={index}
                        onClick={() => {
                          navigate(`/post/${post._id}`);
                          setsearchVisible(!searchVisible);
                        }}
                      >
                        {" "}
                        {post.content}
                      </Item>
                    ))}
                  </Items>
                </SearchResultDiv>
              </SearchResult>
            ))}
        </SearchContainer>
        <UserActionContainer>
          <Link to={currentUser !== null && `/profile/${currentUser.userId}`}>
            <UserAvatar title={"Full name "}>
              <UserImage
                src={
                  currentUser &&
                  (currentUser.userPic ? currentUser.userPic : avatarImage)
                }
                alt={currentUser && currentUser.fullname}
              />
            </UserAvatar>
          </Link>
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
