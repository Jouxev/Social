import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { tablet } from "../responsive";
import { getPosts, postState } from "../Redux/postSlice";
import { Post } from "./Post/Post";
import { PostAdd } from "./Post/PostAdd";
import CircularProgress from "@mui/material/CircularProgress";

const Container = styled.div`
  width: 60%;
  height: 90%;
  margin: 2rem;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  ${tablet({
    width: "100%",
    margin: "2rem 0rem",
  })}
`;

export const Posts = (props) => {
  const { loading, posts } = useSelector(postState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <Container>
      <PostAdd />
      {loading === "loading" && <CircularProgress color="inherit" size={25} />}
      {posts.map((post, index) =>
        props.currentUserId ? (
          post.author === props.currentUserId && (
            <Post item={post} key={index} />
          )
        ) : (
          <Post item={post} key={index} />
        )
      )}
    </Container>
  );
};
