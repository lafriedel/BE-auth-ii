import React from "react";

const LoginForm = props => {
  return (
    <div className="cred-form">
    <h1>Log In</h1>
      {props.userRegistered && <p>Registration successful! Please log in.</p>}
      <form onSubmit={e => props.login(e)}>
      <div>
      <input
          type="text"
          name="username"
          value={props.user.username}
          onChange={e => props.formChange(e)}
          placeholder="Username"
        />
      </div>
      <div>
      <input
          type="password"
          name="password"
          value={props.user.password}
          onChange={e => props.formChange(e)}
          placeholder="Password"
        />
      </div>

        <button>Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
