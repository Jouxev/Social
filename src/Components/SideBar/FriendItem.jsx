import axios from "axios";
import { useState } from "react";
import avatar from "../../Assets/Images/avatar.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URI } from "../../Config";

const Container = styled.div`
  display: flex;
  margin: 10px 0px;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease all;
  border-radius: 20px;
  &:hover {
    opacity: 0.8;
    transform: scale(1.01);
    background: ${(props) => props.theme.input};
  }
`;
const Avatar = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  maring: 20px 30px 20px 0px;
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
const UserAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
`;
const UserName = styled.h2`
  margin-left: 20px;
  font-size: 1rem;
`;

export const FriendItem = (props) => {
  const [User, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.friend) {
      axios
        .post(
          `${API_URI}api/users/show`,
          JSON.stringify({
            userId: props.item,
          }),
          {
            headers: { "Content-type": "application/json" },
          }
        )
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <Container
      onClick={() =>
        !props.chat &&
        navigate(`/profile/${User ? props.item : props.item._id}`)
      }
    >
      <Avatar>
        <UserAvatar
          src={
            User
              ? User.profilePic !== ""
                ? User.profilePic
                : avatar
              : props.item.profilePic !== ""
              ? props.item.profilePic
              : avatar
          }
          alt="profile pci"
        />
      </Avatar>
      <UserName> {User ? User.fullname : props.item.fullname} </UserName>
    </Container>
  );
};
