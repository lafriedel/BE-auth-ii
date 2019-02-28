import React from "react";

const RegisterForm = props => {
  return (
    <div className="cred-form">
    <h1>Register</h1>
      <form onSubmit={e => props.register(e)}>
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
        <div>
          <input
            type="text"
            name="department"
            value={props.user.department}
            onChange={e => props.formChange(e)}
            placeholder="Department"
          />
        </div>

        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
