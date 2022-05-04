import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Navbar, Posts, ProfileCard, SideBar } from "../Components";
import { API_URI } from "../Config";
import { userState } from "../Redux/userSlice";
import { tablet } from "../responsive";
import axios from "axios";

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
  const { id } = useParams();
  const [UserProfile, setUserProfile] = useState();
  const { currentUser } = useSelector(userState);
  const fetchProfile = () => {
    axios
      .post(
        `${API_URI}api/users/show`,
        JSON.stringify({
          userId: id ? id : currentUser.userId,
        }),
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchProfile();
  }, [id]);
  return (
    <Container>
      <Navbar />
      <ProfileContainer>
        {UserProfile && (
          <ProfileCard
            user={UserProfile}
            refresh={() => {
              fetchProfile();
            }}
          />
        )}
        <Posts currentUserId={UserProfile && UserProfile._id} />
        <SideBar />
      </ProfileContainer>
    </Container>
  );
};
