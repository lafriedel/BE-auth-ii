import React from "react";

const Logout = props => {
  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    props.history.push("/login");
  }
  return (
    <>
      <button onClick={e => logout(e)}>Logout</button>
    </>
  );
};

export default Logout;
