import axios from "axios";
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const DELETE_USER = "DELETE_USER";
export const GET_USER_ERRORS = "GET_USER_ERRORS";

const token = localStorage.getItem('jwt')

export const getUser = (uid) => {
  return async (dispatch) => {
    try {
      const res = await axios
        .get(`${process.env.REACT_APP_API_URL}api/users/${uid}`, {
          withCredentials: true,
          headers: { 'Authorization':  token }
        });
      if (res.data.imageUrl === null) {
        res.data.imageUrl = "./img/profil/random-user.png"
      }
      dispatch({ type: GET_USER, payload: res.data });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const uploadPicture = (fd, id) => {
  return (dispatch) => {
    return axios.post( `${process.env.REACT_APP_API_URL}api/users/picture/${id}`, fd, {
        headers: { "Content-type": "multipart/form-data", 'authorization': token }
        })
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const deleteProfil = (userData) => {
  const userId = userData.id
  return () => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/users/${userId}`,
    })
      .then((res) => {
        localStorage.clear()
        window.location = "/"
      })
      .catch((err) => console.log(err));
  };
};
