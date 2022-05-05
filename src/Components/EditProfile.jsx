import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { API_URI } from "../Config";
import { setUser, userState } from "../Redux/userSlice";
import { mobile, tablet } from "../responsive";
import moment from "moment";

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  background: ${(props) => props.theme.element};
  padding: 20px;
  border-radius: 20px;
  width: 30%;
  ${tablet({
    width: "50%",
  })}
  ${mobile({
    width: "80%",
  })}
`;
const Form = styled.form``;
const Title = styled.h2``;
const InputGroupe = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 10px;
`;
const InputTitle = styled.span`
  display: block;
  color: ${(props) => props.theme.fontColorSecondary};
  font-size: 14px;
`;
const InputItem = styled.input`
  font-size: 18px;
  padding: 10px;
  border: none;
  outline: none;
  color: ${(props) => props.theme.fontColor};
  background: ${(props) => props.theme.input};
`;
const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.element};
  font-size: 18px;
  cursor: pointer;
  margin: 20px 0px;
  background: ${(props) => props.theme.fontColorSecondary};
  &:hover {
    transform: scale(1.01);
    opacity: 0.8;
  }
`;

export const EditProfile = (props) => {
  const [user, setuser] = useState({});
  const { currentUser } = useSelector(userState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };
  const updateUser = () => {
    setIsLoading(true);
    axios
      .post(`${API_URI}api/users/update`, JSON.stringify(user), {
        headers: { "Content-type": "application/json" },
      })
      .then((res) => {
        setIsLoading(false);
        dispatch(setUser(user));
        props.refresh();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setuser(currentUser);
  }, []);
  return (
    <Container onClick={() => props.toggleEdit()}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Title> Edit Profile</Title>
          <InputGroupe>
            <InputTitle>Name :</InputTitle>
            <InputItem
              type={"text"}
              value={user.fullname}
              onChange={(e) => {
                setuser({ ...user, fullname: e.target.value });
              }}
            />
          </InputGroupe>
          <InputGroupe>
            <InputTitle>Email :</InputTitle>
            <InputItem
              type={"text"}
              value={user.email}
              onChange={(e) => {
                setuser({ ...user, email: e.target.value });
              }}
            />
          </InputGroupe>
          <InputGroupe>
            <InputTitle>Birthday :</InputTitle>
            <InputItem
              type={"date"}
              value={moment(user.birthday).utc().format("YYYY-MM-DD")}
              onChange={(e) => {
                setuser({ ...user, birthday: e.target.value });
              }}
            />
          </InputGroupe>
          <InputGroupe>
            <InputTitle>Location :</InputTitle>
            <InputItem
              type={"text"}
              value={user.location}
              onChange={(e) => {
                setuser({ ...user, location: e.target.value });
              }}
            />
          </InputGroupe>
          <InputGroupe>
            <Button type={"submit"} disabled={isLoading}>
              {" "}
              {isLoading ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                "Save"
              )}{" "}
            </Button>
          </InputGroupe>
        </Form>
      </Wrapper>
    </Container>
  );
};
