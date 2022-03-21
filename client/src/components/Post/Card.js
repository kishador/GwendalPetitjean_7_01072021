import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { timestampParser, isEmpty } from "../Utils";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);


  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post.id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user.id === post.userId) return user.imageUrl;
                    else return null;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user.id === post.userId) return user.pseudo;
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
              <span>{timestampParser(post.createdAt)}</span>
            </div>
            <p>{post.message}</p>
           
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
           
            {(userData.id === post.userId || userData.isAdmin === true) && (
              <div className="button-container">
                <DeleteCard id={post.id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/icons/post.svg"
                  alt="comment"
                />
              </div>
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
