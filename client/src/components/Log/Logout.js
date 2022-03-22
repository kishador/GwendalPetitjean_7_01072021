import React from "react";

const Logout = () => {
  const logout = async () => {
  localStorage.clear()
  window.location = "/";
  };

  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
