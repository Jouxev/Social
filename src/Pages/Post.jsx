import styled from "styled-components";
import { Navbar, SideBar } from "../Components";
import { PostView } from "../Components/Post/PostView";
import { postsData } from "../Data";

const Container = styled.div`
  width: auto;
  height: 100vh;
  padding: 20px 20px 0px 20px;
`;
const PostContainer = styled.div`
  display: flex;
`;

export const PostPage = () => {
  return (
    <Container>
      <Navbar />
      <PostContainer>
        <PostView item={postsData[0]} />
        <SideBar />
      </PostContainer>
    </Container>
  );
};
