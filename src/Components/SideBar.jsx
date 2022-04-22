import styled from "styled-components";
import { tablet } from "../responsive";
import { FriendItem } from "./SideBar/FriendItem";
const Container = styled.div`
  height: 90%;
  width: 35%;
  margin-top: 2rem;
  bottom: 0;
  right: 0;
  background: ${(props) => props.theme.element};
  border-radius: 10px;
  padding: 20px;
  ${tablet({
    display: "none",
  })}
`;
const Title = styled.h1``;
const FriendListContainer = styled.div``;

export const SideBar = () => {
  return (
    <Container>
      <Title> Friends</Title>
      <FriendListContainer>
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
      </FriendListContainer>
    </Container>
  );
};
