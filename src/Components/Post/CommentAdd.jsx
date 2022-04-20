import styled from "styled-components";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { mobile } from "../../responsive";

const Container = styled.div`
  margin: 20px 10px;
  display: flex;
  align-items: center;
  width: 100%;
  & > svg {
    font-size: 2.5rem;
    cursor: pointer;
    margin: 0px 10px;
    ${mobile({
      justifySelf: "flex-end",
      fontSize: "1.5rem",
      margin: "0px 5px",
    })};
    &:hover {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }
  ${mobile({})}
`;
const CommentText = styled.textarea`
  border: none;
  outline: none;
  border-radius: 10px;
  resize: none;
  font-family: "Monteserrat";
  flex: 1;
  cursor: pointer;
  color: ${(props) => props.theme.fontColorSecondary};
  background: ${(props) => props.theme.input};
  ${mobile({
    width: "100%",
  })}
`;

export const CommentAdd = () => {
  return (
    <Container>
      <CommentText
        rows={4}
        placeholder="Tap to Comment"
        title="write what you think about this post"
      ></CommentText>
      <SendOutlinedIcon />
    </Container>
  );
};
