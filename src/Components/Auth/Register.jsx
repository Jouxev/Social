import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

export const Register = () => {
  const [fullName, setfullName] = useState("");
  const [fullNameError, setFullNameError] = useState(false);

  const [userName, setuserName] = useState("");
  const [userNameError, setuserNameError] = useState(false);

  const [passWord, setpassWord] = useState("");
  const [passWordError, setpassWordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fullName === "" ? setFullNameError(true) : setuserNameError(false);
    userName === "" ? setuserNameError(true) : setuserNameError(false);
    passWord === "" ? setpassWordError(true) : setpassWordError(false);
  };

  return (
    <Container>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Title> Registration </Title>
        <InputContainer>
          <Input
            placeholder="Full Name "
            type="text"
            onChange={(e) => setfullName(e.target.value)}
            value={fullName}
          />
          {userNameError && <Label> Full name is required </Label>}
        </InputContainer>
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
          <Button type="submit"> Register </Button>{" "}
        </InputContainer>
        <LinkContainer>
          Already have account ? <Link to="/signin"> Sign In </Link>
        </LinkContainer>
      </Form>
    </Container>
  );
};
