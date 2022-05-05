import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { API_URI } from "../../Config";
import { tablet } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userState } from "../../Redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  background: ${(props) => props.theme.input};
  padding: 40px;
  border-radius: 10px;
`;
const Form = styled.form``;
const Title = styled.h1`
  font-size: 28px;
  color: ${(props) => props.theme.fontColorSecondary};
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  jusity-content: flex-start;
  & > label {
    font-size: 12px;
    margin: 5px 0px 0px 10px;
    font-weight: bold;
    color: ${(props) => props.theme.danger};
  }
  margin: 20px 0px;
`;
const Input = styled.input`
  padding: 10px 20px;
  font-size: 20px;
  width: 20rem;
  border: none;
  border-radius: 5px;
  background: ${(props) => props.theme.element};
  color: ${(props) => props.theme.fontColor};
  &:focus {
    outline: 1px solid #aa7c7a;
  }
  &::placeholder {
    opacity: 0.8;
    font-size: 16px;
    color: lightgray;
  }
  ${tablet({
    width: "auto",
  })}
`;
const Label = styled.label``;
const Button = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  color: ${(props) => props.theme.input};
  background: ${(props) => props.theme.fontColor};
  cursor: pointer;
  transition: 0.2 ease all;
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
  }
`;
const LinkContainer = styled.div`
  font-size: 14px;
  font-weight: light;
  & > a {
    font-weight: bold;
    text-decoration: none;
    color: ${(props) => props.theme.fontColor};
  }
`;

export const Signin = () => {
  const [userName, setuserName] = useState("");
  const [userNameError, setuserNameError] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [passWord, setpassWord] = useState("");
  const [passWordError, setpassWordError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = () => {
    setisLoading(true);
    axios
      .post(
        `${API_URI}api/users/login`,
        JSON.stringify({
          user: userName,
          pass: passWord,
        }),
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((res) => {
        dispatch(setUser(res.data));
        setisLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
        toast.error("email or password are incorrect,", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    userName === "" ? setuserNameError(true) : setuserNameError(false);
    passWord === "" ? setpassWordError(true) : setpassWordError(false);
    !userNameError && !passWordError && login();
  };

  return (
    <Container>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Title> Sign In </Title>
        <InputContainer>
          <Input
            placeholder="Username or Email "
            type="text"
            onChange={(e) => setuserName(e.target.value)}
            value={userName}
          />
          {userNameError && <Label>Your Email or Username is required </Label>}
        </InputContainer>
        <InputContainer>
          <Input
            placeholder="Password "
            type="password"
            value={passWord}
            onChange={(e) => setpassWord(e.target.value)}
          />
          {passWordError && <Label> Your Password is required </Label>}
        </InputContainer>
        <InputContainer>
          <Button type="submit">
            {isLoading ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Sign In"
            )}
          </Button>
        </InputContainer>
        <LinkContainer>
          Don't have account ? <Link to="/register"> Register Now </Link>
        </LinkContainer>
      </Form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};
