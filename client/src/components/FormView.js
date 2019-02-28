import React from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { NavLink, Link, Route } from "react-router-dom";

const FormView = props => {
  const { user, formChange, login, register, userRegistered } = props;
  return (
    <>
      <Route
        exact
        path="/register"
        render={props => (
          <RegisterForm
            {...props}
            user={user}
            formChange={formChange}
            register={register}
          />
        )}
      />
      <Route
        exact
        path="/login"
        render={props => (
          <LoginForm
            {...props}
            user={user}
            formChange={formChange}
            login={login}
            userRegistered={userRegistered}
          />
        )}
      />
      <div className="nav-buttons">
      <p>Not what you're looking for? Try this.</p>
        <NavLink to="/register">
          <button>Register</button>
        </NavLink>
        <NavLink to="/login">
          <button>Log In</button>
        </NavLink>
      </div>
    </>
  );
};

export default FormView;
