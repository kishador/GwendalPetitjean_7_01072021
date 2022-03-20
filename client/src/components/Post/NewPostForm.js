import React, { useState } from "react";
import {  useSelector, useDispatch } from "react-redux";
import { timestampParser } from "../Utils";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions";


const NewPostForm = () => {

  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch()

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  
  }

  const handlePost = async () => {
    if (message || postPicture) {

      await dispatch(addPost(userData.id, message, file))
      dispatch(getPosts())
      cancelPost()

    } else {
      alert("Veuillez entrer un message")
    }
  }

  const cancelPost = () => {
    setMessage('')
    setPostPicture('')
    setFile('')
  }




  return (
    <div className="post-container">
        <div className="data">
        </div>
        <NavLink to="/profil">
          <div className="user-info">
            <img src={userData.imageUrl} alt="user-img"/>
          </div>
        </NavLink>
        <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
        {message || postPicture ? (
          <li className="card-container">
            <div className="card-left">
              <img src={userData.imageUrl} alt="user-pic"/>
            </div>
            <div className="card-right">
              <div className="card-header">
                <div className="pseudo">
                  <h3>{userData.pseudo}</h3>
                </div>
                <span>{timestampParser(Date.now())}</span>
              </div>
              <div className="content">
                <p>{message}</p>
                <img src={postPicture} alt=""/>
              </div>
            </div>

          </li>
        ) : null}
        <div className="footer-form">
          <div className="icon">
            <>
            <img src="./img/icons/picture.svg" alt="img"/>
            <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg, .gif, .png" onChange={(e) => handlePicture(e)}/>
            </>
          </div>
          <div className="btn-send">
            {message || postPicture ? (
            <button className="cancel" onClick={cancelPost}>Annuler message</button>
            ) : null}
            <button className="send" onClick={handlePost}>Envoyer</button>
          </div>
        </div>
        </div>
</div>
  );
};

export default NewPostForm;
