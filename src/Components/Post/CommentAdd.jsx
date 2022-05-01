import styled from "styled-components";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { mobile } from "../../responsive";
import { API_URI } from "../../Config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../Redux/postSlice";

const Container = styled.div`
  margin: 20px 10px;
  display: flex;
  align-items: center;
  width: 100%;
  & > svg {
    font-size: 2.5rem;
    cursor: pointer;
    margin: 0px 10px;
    ${mobile({
      justifySelf: "flex-end",
      fontSize: "1.5rem",
      margin: "0px 5px",
    })};
    &:hover {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }
  ${mobile({})}
`;
const CommentText = styled.textarea`
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  resize: none;
  font-family: "Monteserrat";
  flex: 1;
  cursor: pointer;
  color: ${(props) => props.theme.fontColorSecondary};
  background: ${(props) => props.theme.input};
  ${mobile({
    width: "100%",
  })}
`;

export const CommentAdd = (props) => {
  const [commentText, setcommentText] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  const postComment = () => {
    setisLoading(true);
    axios
      .post(
        `${API_URI}api/post/comment`,
        JSON.stringify({
          postId: props.item._id,
          userId: props.item.author,
          content: commentText,
        }),
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        setisLoading(false);
        setcommentText("");
        dispatch(getPosts());
        props.postPage && props.refreshPage();
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };
  return (
    <Container>
      <CommentText
        rows={4}
        placeholder="Tap to Comment"
        title="write what you think about this post"
        onChange={(e) => setcommentText(e.target.value)}
        value={commentText}
      ></CommentText>
      {isLoading ? (
        <CircularProgress color="inherit" size={25} />
      ) : (
        <SendOutlinedIcon onClick={() => postComment()} />
      )}
    </Container>
  );
};
