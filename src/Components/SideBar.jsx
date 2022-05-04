import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { API_URI } from "../Config";
import { userState } from "../Redux/userSlice";
import { tablet } from "../responsive";
import { FriendItem } from "./SideBar/FriendItem";
const Container = styled.div`
  height: 500px;
  width: 25%;
  margin-top: 2rem;
  bottom: 0;
  right: 0;
  background: ${(props) => props.theme.element};
  border-radius: 10px;
  padding: 20px;
  overflow: scroll;
  ${tablet({
    display: "none",
  })}
`;
const Title = styled.h3``;
const FriendListContainer = styled.div``;

export const SideBar = () => {
  const [followings, setfollowings] = useState([]);
  const [otherUsers, setotherUsers] = useState([]);
  const { currentUser } = useSelector(userState);
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
  useEffect(() => {
    loadFollowings();
    loadOtherUsers();
  }, []);
  return (
    <Container>
      <Title> Following</Title>
      <FriendListContainer>
        {followings.map((item, index) => (
          <FriendItem item={item} key={index} friend />
        ))}
      </FriendListContainer>
      <Title> Other Users </Title>
      <FriendListContainer>
        {otherUsers.map((item, index) => (
          <FriendItem item={item} key={index} />
        ))}
      </FriendListContainer>
    </Container>
  );
};
