import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Thread from "../components/Thread"
import Log from "../components/Log";
import NewPostForm from "../components/Post/NewPostForm";



const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      <div className="main">
        <div className="home-header">
     {uid ?( <div><div><NewPostForm /></div> <div><Thread /></div></div>) : (<Log signin={true} signup={false} />)}
        </div>
        
      </div>
    </div>
  );
};

export default Home;
