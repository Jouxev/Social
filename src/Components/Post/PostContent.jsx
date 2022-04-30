import styled from "styled-components";
import { useState } from "react";
import { mobile } from "../../responsive";

const Container = styled.div`
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
  width: 100%;
  height: 400px;
  border-radius: 10px;
  margin: 20px 0px;
  cursor: pointer;
  object-fit: cover;
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

export const PostContent = (props) => {
  const [selectedImage, setselectedImage] = useState(null);
  return (
    <Container>
      <PostText>{props.item.content !== "" && props.item.content}</PostText>
      {props.item.Images.length > 0 && (
        <PostImages>
          <Image
            src={
              selectedImage !== null ? selectedImage : props.item.Images[0].url
            }
            alt={props.item.content}
          />
          {props.item.Images.length > 1 && (
            <ImagesTumbnails>
              {props.item.Images.map((image, index) => (
                <Thumb
                  key={index}
                  src={image.url}
                  alt="imagePreview"
                  onClick={(e) => setselectedImage(e.target.src)}
                />
              ))}
            </ImagesTumbnails>
          )}
        </PostImages>
      )}
    </Container>
  );
};
