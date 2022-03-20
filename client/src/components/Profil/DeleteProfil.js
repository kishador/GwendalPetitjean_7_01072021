import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfil } from "../../actions/user.actions";

const DeleteProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const deleteQuote = () => dispatch(deleteProfil(userData));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer votre compte ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/icons/delete.svg" alt="delete" />
    </div>
  );
};

export default DeleteProfil;