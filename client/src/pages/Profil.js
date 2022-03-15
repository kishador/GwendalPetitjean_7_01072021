import React, { useContext } from "react";

import { UidContext } from "../components/AppContext";


const Profil = () => {
  const uid = useContext(UidContext);
console.log(uid)
  return (
    <div className="profil-page">
      
    </div>
  );
};

export default Profil;
