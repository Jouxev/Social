import styled from "styled-components";
import { Navbar } from "../Components";
const Container = styled.div`
  width: auto;
  padding: 20px;
`;

export const Home = () => {
  return (
    <Container>
      <Navbar />
    </Container>
  );
};
