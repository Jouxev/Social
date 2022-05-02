import styled from "styled-components";
import { mobile, tablet } from "../../responsive";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useRef } from "react";
import { API_URI } from "../../Config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Redux/postSlice";
import { userState } from "../../Redux/userSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1.5rem 0px;
  background: ${(props) => props.theme.element};
  border-radius: 10px;
  margin-bottom: 10px;
`;
const TextAdd = styled.textarea`
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  resize: none;
  width: 90%;
  font-family: "Monteserrat";
  flex: 1;
  cursor: pointer;
  color: ${(props) => props.theme.fontColorSecondary};
  background: ${(props) => props.theme.input};
  ${tablet({
    width: "90%",
  })}
`;
const PostButton = styled.div`
  margin-top: 20px;
  width: 90%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
const FileInput = styled.input`
  display: none;
`;
const PostButtonIcon = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  margin-left: 10px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props) => props.theme.input};
  transition: 0.2s ease all;
  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;
const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ImagePreview = styled.img``;
const ImagePreviewThumContainer = styled.div`
  position: relative;
  border: 2px solid ${(props) => props.theme.fontColorSecondary};
  border-radius: 5px;
  height: 64px;
  width: 64px;
  margin: 20px 10px;
  & > svg {
    display: none;
    position: absolute;
    top: 0px;
    cursor: pointer;
    right: 0;
    z-index: 99 !important;
  }
  &:hover {
    & > svg {
      display: block;
    }
    & > img {
      opacity: 0.8;
    }
  }
`;
const ImagePreviewThumb = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  }
`;

export const PostAdd = () => {
  const inputFile = useRef(null);
  const [imageCollection, setImageCollection] = useState([]);
  const [postContent, setpostContent] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(userState);
  const ImageFileInputChange = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[i]);
      reader.onloadend = () => {
        setImageCollection((imageCollection) => [
          ...imageCollection,
          { main: i == 1, dataUrl: reader.result },
        ]);
      };
    }
  };
  const removeFromImgCollection = (index) => {
    var myArray = [...imageCollection];
    myArray.splice(index, 1);
    setImageCollection(myArray);
  };

  const postToServer = () => {
    setisLoading(true);
    let post = {
      userId: currentUser.userId,
      content: postContent,
      images: imageCollection,
    };
    axios
      .post(`${API_URI}api/post/new`, post, {
        "Content-type": "application/json",
      })
      .then((data) => {
        // reset fields
        setpostContent("");
        setImageCollection([]);
        setisLoading(false);
        dispatch(getPosts());
      })
      .catch((err) => {
        console.log(err.message);
        setisLoading(false);
      });
  };
  return (
    <Container>
      {imageCollection.length > 0 && (
        <ImagePreviewContainer>
          {imageCollection.map((img, index) => (
            <ImagePreviewThumContainer key={index}>
              <HighlightOffRoundedIcon
                onClick={() => removeFromImgCollection(index)}
              />
              <ImagePreviewThumb
                src={img.dataUrl}
                alt="img Thumb"
                key={index}
              />
            </ImagePreviewThumContainer>
          ))}
        </ImagePreviewContainer>
      )}
      <TextAdd
        rows={5}
        placeholder="What's on your mind "
        onChange={(e) => setpostContent(e.target.value)}
        value={postContent}
      />
      <PostButton>
        <PostButtonIcon>
          <ImageRoundedIcon onClick={() => inputFile.current.click()} />
          <FileInput
            type={"file"}
            ref={inputFile}
            multiple
            accept="image/png, image/jpg"
            onChange={(e) => {
              ImageFileInputChange(e);
            }}
          />
        </PostButtonIcon>
        <PostButtonIcon>
          {isLoading ? (
            <CircularProgress color="inherit" size={25} />
          ) : (
            <SendRoundedIcon onClick={() => postToServer()} />
          )}
        </PostButtonIcon>
      </PostButton>
    </Container>
  );
};
