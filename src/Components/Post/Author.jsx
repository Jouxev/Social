import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import avatarImage from "../../Assets/Images/avatar.png";
import { API_URI } from "../../Config";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
`;
const UserAvatarContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  maring: 0px 10px;
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
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
`;
const AuthorInfoContainer = styled.div`
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
`;
const AuthorName = styled.h3`
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  margin: 0px;
  &:hover {
    opacity: O.9;
  }
`;
const PostDateTime = styled.span`
  font-size: 10px;
  color: ${(props) => props.theme.fontColorSecondary};
  margin: 0;
`;

export const Author = (props) => {
  const [author, setauthor] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(
        `${API_URI}api/users/show`,
        JSON.stringify({
          userId: props.item.author,
        }),
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((data) => {
        setauthor({
          fullname: data.data.fullname,
          profilePic: data.data.profilePic,
          userId: data.data._id,
        });
      });
  }, []);
  return (
    <Container>
      <UserAvatarContainer
        onClick={() => navigate(`/profile/${author.userId}`)}
      >
        <UserAvatar
          src={author.profilePic === "" ? avatarImage : author.profilePic}
          alt={author.fullname}
        />
      </UserAvatarContainer>
      <AuthorInfoContainer>
        <AuthorName> {author.fullname} </AuthorName>
        {!props.comment && (
          <PostDateTime>
            {moment(props.item.createdAt).calendar()}{" "}
          </PostDateTime>
        )}
      </AuthorInfoContainer>
    </Container>
  );
};
