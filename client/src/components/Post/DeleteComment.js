import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../actions/post.actions";

const DeleteComment = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deleteComment(props.id));

  return (
    <div className="delete-comment">
      <div className="btn">
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="trash" />
    </div>
    </div>
    </div>
  );
};

export default DeleteComment;