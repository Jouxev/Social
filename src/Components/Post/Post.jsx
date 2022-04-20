import { useState } from "react";
import styled from "styled-components";
import avatarImage from "../../Assets/Images/avatar.png";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { CommentAdd } from "./CommentAdd";
import { mobile } from "../../responsive";

const Container = styled.div`
  background: ${(props) => props.theme.element};
  border-radius: 10px;
  margin: 10px 0px;
`;

const AuthorContainer = styled.div`
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

const PostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
const PostText = styled.p``;
const PostImages = styled.div`
  margin: 10px;
`;
const Image = styled.img`
  width: 600px;
  border-radius: 10px;
  margin: 20px 0px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  ${mobile({
    width: "100%",
  })}
`;
const ImagesTumbnails = styled.div`
  display: flex;
  align-items: center;
`;
const Thumb = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  margin: 0px 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.fontColor};
  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

const InterActionContent = styled.div`
  padding: 10px 20px;
  margin-bottom: 20px;
`;

const Reactions = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    font-size: 2rem;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }
`;
const Count = styled.span`
  font-size: 8px;
  font-color: ${(props) => props.theme.fontColorSecondary};
  margin-right: 10px;
`;
export const Post = (props) => {
  const [selectedImage, setselectedImage] = useState(null);

  return (
    <Container>
      <AuthorContainer>
        <UserAvatarContainer>
          <UserAvatar
            src={
              props.item.author.avatar === ""
                ? avatarImage
                : props.item.author.avatar
            }
            alt={props.item.author.name}
          />
        </UserAvatarContainer>
        <AuthorInfoContainer>
          <AuthorName> {props.item.author.name} </AuthorName>
          <PostDateTime> {props.item.publishedAt} </PostDateTime>
        </AuthorInfoContainer>
      </AuthorContainer>
      <PostContentContainer>
        <PostText>{props.item.content !== "" && props.item.content}</PostText>
        {props.item.images.length > 0 && (
          <PostImages>
            <Image
              src={
                selectedImage !== null ? selectedImage : props.item.images[0]
              }
              alt={props.item.content}
            />
            {props.item.images.length > 1 && (
              <ImagesTumbnails>
                {props.item.images.map((image) => (
                  <Thumb
                    src={image}
                    alt="imagePreview"
                    onClick={(e) => setselectedImage(e.target.src)}
                  />
                ))}
              </ImagesTumbnails>
            )}
          </PostImages>
        )}
      </PostContentContainer>
      <InterActionContent>
        <Reactions>
          <FavoriteBorderOutlinedIcon />
          <Count> 10K</Count>
          <ModeCommentOutlinedIcon />
        </Reactions>
        <CommentAdd />
      </InterActionContent>
    </Container>
  );
};
