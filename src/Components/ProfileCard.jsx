import styled from "styled-components";
import avatarImage from "../Assets/Images/avatar.png";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";
import { CircularProgress, circularProgressClasses } from "@mui/material";
import { tablet } from "../responsive";
import moment from "moment";
import { useRef } from "react";
import axios from "axios";
import { API_URI } from "../Config";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userState } from "../Redux/userSlice";

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
  & > svg,
  span {
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

const ActionItem = styled.div`
  display: flex;
  padding: 5px;
  background: ${(props) => props.theme.input};
  margin: 0px 5px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s ease all;
  &:hover {
    transform: scale(1.1);
  }
  & > svg {
    margin-right: 5px;
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
const FileInput = styled.input`
  display: none;
`;

export const ProfileCard = (props) => {
  const InputRef = useRef(null);
  const [isLoading, setisLoading] = useState(false);
  const { currentUser } = useSelector(userState);

  const uploadImage = (e) => {
    if (e.target.files.length > 0) {
      setisLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        axios
          .post(
            `${API_URI}api/users/uploadUserImage`,
            JSON.stringify({
              userId: props.user._id,
              image: reader.result,
            }),
            {
              headers: { "Content-type": "application/json" },
            }
          )
          .then((res) => {
            setisLoading(false);
            props.refresh();
          })
          .catch((err) => {
            console.log(err);
            setisLoading(false);
          });
      };
    }
  };
  const follow = () => {
    axios
      .post(
        `${API_URI}api/users/follow`,
        JSON.stringify({
          userId: currentUser.userId,
          follow: props.user._id,
        }),
        { headers: { "Content-type": "application/json" } }
      )
      .then((res) => {
        props.refresh();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <UserPic>
        <UserImage
          src={props.user.profilePic ? props.user.profilePic : avatarImage}
          alt="profile Picture"
        />
        {currentUser.userId === props.user._id &&
          (isLoading ? (
            <CircularProgress color="inherit" size={25} />
          ) : (
            <CameraAltRoundedIcon onClick={() => InputRef.current.click()} />
          ))}
        <FileInput
          ref={InputRef}
          type={"file"}
          accept="image/png, image/jpg"
          onChange={(e) => uploadImage(e)}
        />
      </UserPic>
      <UserName>
        <Title>{props.user.fullname} </Title>
        <SubTitle> About </SubTitle>
      </UserName>
      <UserInfo>
        <InfoItem>
          <WatchLaterRoundedIcon /> {moment(props.user.createdAt).calendar()}
        </InfoItem>
        <InfoItem>
          <LocationOnRoundedIcon /> Algiers, Algeria{" "}
        </InfoItem>
        <InfoItem>
          <EmailRoundedIcon /> {props.user.email}
        </InfoItem>
        <InfoItem>
          <CakeRoundedIcon /> dec, 12th, 2015{" "}
        </InfoItem>
        <InfoItem>
          {currentUser.userId === props.user._id ? (
            <ButtonEdit> Edit Profile </ButtonEdit>
          ) : (
            <>
              {props.user.followers.includes(currentUser.userId) ? (
                <ActionItem onClick={() => follow()}>
                  <PersonRemoveAlt1RoundedIcon />
                  Unfollow
                </ActionItem>
              ) : (
                <ActionItem onClick={() => follow()}>
                  <PersonAddAltRoundedIcon />
                  Follow
                </ActionItem>
              )}

              <ActionItem>
                <ChatRoundedIcon />
                Message
              </ActionItem>
            </>
          )}
        </InfoItem>
      </UserInfo>
    </Container>
  );
};
