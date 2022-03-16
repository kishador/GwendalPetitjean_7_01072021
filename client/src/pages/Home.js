import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";

import Log from "../components/Log";
import NewPostForm from "../components/Post/NewPostForm";



const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      <div className="main">
        <div className="home-header">
     {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        
      </div>
    </div>
  );
};

export default Home;
