import styled from "styled-components";
import { Navbar, Posts, ProfileCard, SideBar } from "../Components";
import { tablet } from "../responsive";

const Container = styled.div`
  width: auto;
  height: 100vh;
  padding: 20px 20px 0px 20px;
`;
const ProfileContainer = styled.div`
  display: flex;
  ${tablet({
    flexDirection: "column",
  })}
`;
export const Profile = () => {
  return (
    <Container>
      <Navbar />
      <ProfileContainer>
        <ProfileCard />
        <Posts currentUserId={3} />
        <SideBar />
      </ProfileContainer>
    </Container>
  );
};
