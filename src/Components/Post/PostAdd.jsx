import styled from "styled-components";
import { mobile, tablet } from "../../responsive";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1.5rem 0px;
  background: ${(props) => props.theme.element};
  border-radius: 10px;
  margin-bottom: 10px;
`;
const TextAdd = styled.textarea`
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  resize: none;
  width: 90%;
  font-family: "Monteserrat";
  flex: 1;
  cursor: pointer;
  color: ${(props) => props.theme.fontColorSecondary};
  background: ${(props) => props.theme.input};
  ${tablet({
    width: "90%",
  })}
`;
const PostButton = styled.div`
  margin-top: 20px;
  width: 90%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
const PostButtonIcon = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  margin-left: 10px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props) => props.theme.input};
  transition: 0.2s ease all;
  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

export const PostAdd = () => {
  return (
    <Container>
      <TextAdd rows={5} placeholder="What's on your mind " />
      <PostButton>
        <PostButtonIcon>
          <ImageRoundedIcon />
        </PostButtonIcon>
        <PostButtonIcon>
          <SendRoundedIcon />
        </PostButtonIcon>
      </PostButton>
    </Container>
  );
};
