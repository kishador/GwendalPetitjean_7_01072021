import { DELETE_COMMENT, GET_COMMENTS } from "../actions/post.actions";

const initialState = {};

export default function allPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload
      case DELETE_COMMENT:
        return state.filter((comment) => comment.id !== action.payload.commentId);
    default: 
      return state;
  }
}