import styled from "styled-components";
import { Navbar, Posts } from "../Components";
const Container = styled.div`
  width: auto;
  height: 100vh;
  padding: 20px;
`;

export const Home = () => {
  return (
    <Container>
      <Navbar />
      <Posts />
    </Container>
  );
};
