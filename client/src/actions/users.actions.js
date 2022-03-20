import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/users`)
      .then((res) => {
        for (let i = 0; i < res.data.length; i++){
          if (res.data[i].imageUrl === null ){
            res.data[i].imageUrl = "./img/profil/random-user.png"
          }
        }
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
