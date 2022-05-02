import styled from "styled-components";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { CommentAdd } from "./CommentAdd";
import axios from "axios";
import { API_URI } from "../../Config";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Redux/postSlice";
import { userState } from "../../Redux/userSlice";

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
  const { currentUser } = useSelector(userState);
  const likeToggle = () => {
    axios
      .post(
        `${API_URI}api/post/like`,
        JSON.stringify({
          postId: props.item._id,
          userId: currentUser.userId,
        }),
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then(() => {
        dispatch(getPosts());
        props.postPage && props.refreshPage();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Reactions>
        {props.item.Likes.includes(currentUser.userId) ? (
          <FavoriteRoundedIcon
            onClick={() => {
              likeToggle();
            }}
          />
        ) : (
          <FavoriteBorderOutlinedIcon
            onClick={() => {
              likeToggle(props);
            }}
          />
        )}
        <Count> {props.item.Likes.length}</Count>
        <ModeCommentOutlinedIcon /> <Count> {props.item.Comments.length}</Count>
      </Reactions>
      <CommentAdd
        item={props.item}
        postPage
        refreshPage={() => props.refreshPage()}
      />
    </Container>
  );
};
