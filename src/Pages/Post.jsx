import styled from "styled-components";
import { useEffect, useState } from "react";
import { Navbar, SideBar } from "../Components";
import CircularProgress from "@mui/material/CircularProgress";
import { PostView } from "../Components/Post/PostView";
import { postsData } from "../Data";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URI } from "../Config";

const Container = styled.div`
  width: auto;
  height: 100vh;
  padding: 20px 20px 0px 20px;
`;
const PostContainer = styled.div`
  display: flex;
`;

export const PostPage = () => {
  const [isLoading, setisLoading] = useState(false);
  const [post, setpost] = useState(null);
  const { id } = useParams();
  const fetchPost = () => {
    setisLoading(true);
    axios
      .post(
        `${API_URI}api/post/show`,
        JSON.stringify({
          postId: id,
        }),
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((data) => {
        setisLoading(false);
        setpost(data.data);
      })
      .catch((err) => {
        setisLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <Container>
      <Navbar />
      {isLoading && <CircularProgress color="inherit" size={25} />}
      {post !== null && (
        <PostContainer>
          <PostView item={post} refreshPage={() => fetchPost()} />
          <SideBar />
        </PostContainer>
      )}
    </Container>
  );
};
