import React from "react";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import DeleteProfil from "./DeleteProfil";
import { dateParser } from "../Utils";


const UpdateProfil = () => {
  
  
  const userData = useSelector((state) => state.userReducer);
 
  const error = useSelector((state) => state.errorReducer.userError);

  return (
    <div className="profil-container">
      <h1> Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.imageUrl} alt="user-pic" />
          <UploadImg />
          <p>{error.maxSize}</p>
          <p>{error.format}</p>
        </div>
        <div className="right-part">
          <h4>E-mail : {userData.email}</h4>
          <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          <div className="button-container">
        <DeleteProfil />
        </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
