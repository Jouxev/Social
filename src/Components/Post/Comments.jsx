import React from "react";
import styled from "styled-components";
import { Comment } from "./Comment";
const Container = styled.div`
  height: 500px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Comments = (props) => {
  return (
    <Container>
      {props.items.map((item) => (
        <Comment key={item._id} item={item} />
      ))}
    </Container>
  );
};
