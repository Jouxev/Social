import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { tablet } from "../responsive";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  background: ${(props) => props.theme.element};
  position: relative;
  height: 600px;
  border-radius: 20px;
  padding: 20px;
  ${tablet({
    width: "100%",
  })}
`;
const MainImage = styled.img`
  height: 80%;
  width: auto;
  object-fit: cover;
  margin-top: 50px;
  border-radius: 20px;
  ${tablet({
    width: "100%",
  })}
`;
const ImageThumbContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ImageThumb = styled.img`
  height: 48px;
  width: 48px;
  object-fit: cover;
  margin: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.fontColorSecondary};
  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;
const ButtonClose = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 10px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${(props) => props.theme.input};
  &:hover {
    transform: scale(1.2);
    opacity: 0.8;
  }
  & > svg {
    color: ${(props) => props.theme.fontColorSecondary};
    font-size: 2rem;
  }
`;

export const ImageGallery = (props) => {
  const [mainImage, setmainImage] = useState(null);

  useEffect(() => {
    setmainImage(props.imgs[0]);
  }, []);

  return (
    <Container onClick={() => props.toggleGalleryOpen()}>
      <Wrapper>
        <ButtonClose>
          <CloseRoundedIcon />
        </ButtonClose>
        <MainImage src={mainImage && mainImage.url} alt="postImage" />
        <ImageThumbContainer
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {props.imgs.length > 1 &&
            props.imgs.map((img, index) => (
              <ImageThumb
                src={img.url}
                key={index}
                onClick={() => setmainImage(img)}
              />
            ))}
        </ImageThumbContainer>
      </Wrapper>
    </Container>
  );
};
