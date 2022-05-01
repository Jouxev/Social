import styled from "styled-components";
import { commentsData } from "../../Data";
import { mobile, tablet } from "../../responsive";
import { Author } from "./Author";
import { Comments } from "./Comments";
import { Interaction } from "./Interaction";
import { PostContent } from "./PostContent";

const Container = styled.div`
  width: 80%;
  height: 90%;
  margin: 2rem;
  overflow-y: scroll;
  background: ${(props) => props.theme.element};
  border-radius: 10px;
  margin-bottom: 10px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  ${tablet({
    width: "100%",
    margin: "2rem 0px 0px 0px",
  })}
`;
const PostViewContainer = styled.div`
  display: flex;
  ${tablet({
    flexDirection: "column",
  })}
`;
const PostContentContainer = styled.div`
  width: 65%;
  border-right: 1px solid ${(props) => props.theme.fontColorSecondary};
  ${tablet({
    width: "100%",
    borderRight: "none;",
  })}
`;
const PostCommentContainer = styled.div`
  padding: 0px 10px;
  height: 100%;
`;
const CommentCount = styled.h1`
  font-weight: bold;
  font-size: 16px;
`;

export const PostView = (props) => {
  return (
    <Container>
      <Author item={props.item} />
      <PostViewContainer>
        <PostContentContainer>
          <PostContent item={props.item} />
        </PostContentContainer>
        <PostCommentContainer>
          <CommentCount> 12K Comments</CommentCount>

          <Comments
            items={commentsData.filter(
              (comment) => comment.postId === props.item.id
            )}
          />
        </PostCommentContainer>
      </PostViewContainer>
      <Interaction item={props.item} />
    </Container>
  );
};
