import axios from "axios";
// posts
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";
export const DELETE_COMMENT = "DELETE_COMMENT";
// errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";

const token = localStorage.getItem('jwt')

export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/posts/`)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });    
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (id, message, file) => {
  return (dispatch) => {
    return axios
    ({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/posts/new`,
        withCredentials: true,
        headers: {
          'Authorization':  token
          },
      data: { userId: id, message: message, file  },
    })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      });
  };
};

export const deletePost = (postId) => {
  console.log(postId)
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (postId, userId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/comments/new`,
        withCredentials: true,
        headers: {
          'Authorization':  token
          },
      data: { userId: userId, postId: postId, content: text, commenterPseudo: commenterPseudo  },
    })
      .then((res) => {
        console.log(res)
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          console.log(res)
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const getComments = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/comments`)
      .then((res) => {
        dispatch({ type: GET_COMMENTS, payload: res.data });       
      })
      .catch((err) => console.log(err));
  };
};
export const deleteComment = (commentId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/comments/${commentId}`,

    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { commentId } });
      })
      .catch((err) => console.log(err));
  };
};
