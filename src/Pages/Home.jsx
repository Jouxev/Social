import styled from "styled-components";
import { Navbar, Posts, SideBar } from "../Components";

const Container = styled.div`
  width: auto;
  height: 100vh;
  padding: 20px 20px 0px 20px;
`;
const HomeContainer = styled.div`
  height: 100vh;
  display: flex;
`;

export const Home = () => {
  return (
    <Container>
      <Navbar />
      <HomeContainer>
        <Posts />
        <SideBar />
      </HomeContainer>
    </Container>
  );
};
