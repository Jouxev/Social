import styled from "styled-components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { CommentAdd } from "./CommentAdd";

const Container = styled.div`
  padding: 10px 20px;
  margin-bottom: 20px;
`;

const Reactions = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    font-size: 2rem;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }
`;
const Count = styled.span`
  font-size: 8px;
  font-color: ${(props) => props.theme.fontColorSecondary};
  margin-right: 10px;
`;

export const Interaction = () => {
  return (
    <Container>
      <Reactions>
        <FavoriteBorderOutlinedIcon />
        <Count> 10K</Count>
        <ModeCommentOutlinedIcon />
      </Reactions>
      <CommentAdd />
    </Container>
  );
};
