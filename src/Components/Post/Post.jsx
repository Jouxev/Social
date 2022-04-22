import styled from "styled-components";

import { Author } from "./Author";
import { Interaction } from "./Interaction";
import { PostContent } from "./PostContent";

const Container = styled.div`
  background: ${(props) => props.theme.element};
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const Post = (props) => {
  return (
    <Container>
      <Author item={props.item} />
      <PostContent item={props.item} />
      <Interaction />
    </Container>
  );
};
