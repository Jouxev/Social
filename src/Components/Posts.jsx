import styled from "styled-components";
import { postsData } from "../Data";
import { tablet } from "../responsive";
import { Post } from "./Post/Post";

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
    width: "90%",
  })}
`;

export const Posts = () => {
  return (
    <Container>
      {postsData.map((post) => (
        <Post item={post} key={post.id} />
      ))}
      {postsData.map((post) => (
        <Post item={post} key={post.id} />
      ))}
    </Container>
  );
};
