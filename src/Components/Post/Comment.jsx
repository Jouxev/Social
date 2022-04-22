import styled from "styled-components";
import { Author } from "./Author";

const Container = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.fontColor};
  padding: 10px 0px;
`;
const Content = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.fontColorSecondary};
  font-weight: lighter;
  margin-left: 20px;
`;
export const Comment = (props) => {
  return (
    <Container>
      <Author item={props.item} />
      <Content> {props.item.content} </Content>
    </Container>
  );
};
