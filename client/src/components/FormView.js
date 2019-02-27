import React from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { Link, Route } from "react-router-dom";

const FormView = props => {
  const { user, formChange, login } = props;
  return (
    <>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/login">
        <button>Log In</button>
      </Link>
      <Route
        exact
        path="/register"
        render={props => <RegisterForm {...props} user={user} formChange={formChange} />}
      />
      <Route
        exact
        path="/login"
        render={props => (
          <LoginForm {...props} user={user} formChange={formChange} login={login} />
        )}
      />
    </>
  );
};

export default FormView;
