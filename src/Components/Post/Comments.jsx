import React from "react";
import styled from "styled-components";
import { Comment } from "./Comment";
const Container = styled.div`
  height: 500px;
  overflow: scroll;
`;

export const Comments = (props) => {
  return (
    <Container>
      {props.items.length > 0 && <Comment item={props.items[0]} />}
      {props.items.length > 0 && <Comment item={props.items[0]} />}
      {props.items.length > 0 && <Comment item={props.items[0]} />}
      {props.items.length > 0 && <Comment item={props.items[0]} />}
      {props.items.length > 0 && <Comment item={props.items[0]} />}
      {props.items.length > 0 && <Comment item={props.items[0]} />}
      {props.items.length > 0 && <Comment item={props.items[0]} />}
      {props.items.length > 0 && <Comment item={props.items[0]} />}
    </Container>
  );
};
