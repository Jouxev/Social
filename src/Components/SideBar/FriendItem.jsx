import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin: 10px 0px;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease all;
  border-radius: 20px;
  &:hover {
    opacity: 0.8;
    transform: scale(1.01);
    background: ${(props) => props.theme.input};
  }
`;
const Avatar = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  maring: 20px 30px 20px 0px;
  align-items: center;
  border-radius: 50%;
  padding: 1px;
  border: 2px solid ${(props) => props.theme.fontColor};
  cursor: pointer;
  transition: 0.2 ease all;
  &:hover {
    border: 2px solid ${(props) => props.theme.fontColorSecondary};
    transform: scale(1.1);
    & > img {
      transition: 0.2 ease all;
      opacity: 0.8;
    }
  }
`;
const UserAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
`;
const UserName = styled.h2`
  margin-left: 20px;
  font-size: 1.2rem;
`;

export const FriendItem = () => {
  return (
    <Container>
      <Avatar>
        <UserAvatar
          src={
            "https://i.pinimg.com/originals/91/d0/c9/91d0c92333ccb56395febdc1e3a2dc9b.jpg"
          }
          alt=""
        />
      </Avatar>
      <UserName> Karim Joujo </UserName>
    </Container>
  );
};
