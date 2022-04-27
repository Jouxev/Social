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

export const PostContent = (props) => {
  const [selectedImage, setselectedImage] = useState(null);
  return (
    <Container>
      <PostText>{props.item.content !== "" && props.item.content}</PostText>
      {props.item.images.length > 0 && (
        <PostImages>
          <Image
            src={selectedImage !== null ? selectedImage : props.item.images[0]}
            alt={props.item.content}
          />
          {props.item.images.length > 1 && (
            <ImagesTumbnails>
              {props.item.images.map((image, index) => (
                <Thumb
                  key={index}
                  src={image}
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
