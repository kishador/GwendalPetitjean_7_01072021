import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";

import NewPostForm from "../components/Post/NewPostForm";

import Log from "../components/Log";



const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
    
        {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
    
       
    </div>
  );
};

export default Home;
