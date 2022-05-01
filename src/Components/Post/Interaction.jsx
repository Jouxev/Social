import styled from "styled-components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { CommentAdd } from "./CommentAdd";
import axios from "axios";
import { API_URI } from "../../Config";
import { useDispatch } from "react-redux";
import { getPosts } from "../../Redux/postSlice";

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

export const Interaction = (props) => {
  const dispatch = useDispatch();
  const likeToggle = () => {
    axios
      .post(
        `${API_URI}api/post/like`,
        JSON.stringify({
          postId: props.item._id,
          userId: props.item.author,
        }),
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then(() => {
        dispatch(getPosts());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Reactions>
        {props.item.Likes.includes("626d918be17a9c01f348f72d") ? (
          <FavoriteRoundedIcon
            onClick={() => {
              likeToggle();
            }}
          />
        ) : (
          <FavoriteBorderOutlinedIcon
            onClick={() => {
              likeToggle();
            }}
          />
        )}

        <Count> {props.item.Likes.length}</Count>
        <ModeCommentOutlinedIcon />
      </Reactions>
      <CommentAdd />
    </Container>
  );
};
