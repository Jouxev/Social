import styled from "styled-components";
import avatarImage from "../Assets/Images/avatar.png";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";
import { tablet } from "../responsive";

const Container = styled.div`
  background: ${(props) => props.theme.element};
  margin-top: 3rem;
  height: 400px;
  border-radius: 20px;
  width: 30%;
  position: relative;
  ${tablet({
    width: "90%",
    margin: "5rem 2rem 0rem 2rem",
  })}
`;
const UserPic = styled.div`
  background: ${(props) => props.theme.element};
  position: absolute;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  left: 50%;
  transform: translate(-50%, -65%);
  & > svg {
    font-size: 2rem;
    position: absolute;
    right: 0px;
    bottom: 0px;
    cursor: pointer;
    transition: 0.2s ease all;
    &:hover {
      opacity: 0.8;
      transform: scale(1.2);
    }
  }
`;
const UserImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
`;

const UserName = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2.5rem 0rem;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0px;
`;
const SubTitle = styled.span`
  font-size: 0.8rem;
  font-weight: ligher;
  color: ${(props) => props.theme.fontColorSecondary};
`;

const UserInfo = styled.ul`
  list-style: none;
`;
const InfoItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${(props) => props.theme.fontColorSecondary};
  margin: 20px 0px;
  & > svg {
    color: ${(props) => props.theme.fontColor};
    margin-right: 20px;
  }
`;
const ButtonEdit = styled.button`
  width: 85%;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 10px;
  color: ${(props) => props.theme.fontColor};
  font-weight: bold;
  background: ${(props) => props.theme.input};
  cursor: pointer;
  transition: 0.2s ease all;
  &:hover {
    opacity: 0.8;
  }
`;

export const ProfileCard = () => {
  return (
    <Container>
      <UserPic>
        <UserImage src={avatarImage} alt="profile Picture" />
        <CameraAltRoundedIcon />
      </UserPic>
      <UserName>
        <Title>Jhoe Baiden </Title>
        <SubTitle> About </SubTitle>
      </UserName>
      <UserInfo>
        <InfoItem>
          <WatchLaterRoundedIcon /> Joined 12 dec 1981{" "}
        </InfoItem>
        <InfoItem>
          <LocationOnRoundedIcon /> Algiers, Algeria{" "}
        </InfoItem>
        <InfoItem>
          <EmailRoundedIcon /> joeBaide@outlook.com
        </InfoItem>
        <InfoItem>
          <CakeRoundedIcon /> dec, 12th, 2015{" "}
        </InfoItem>
        <InfoItem>
          <ButtonEdit> Edit Profile </ButtonEdit>
        </InfoItem>
      </UserInfo>
    </Container>
  );
};