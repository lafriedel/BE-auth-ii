import React from "react";
import { Route } from "react-router";

import FormView from "./FormView";
import Users from "./UserList";

const authenticate = Users => FormView =>
  class extends React.Component {
    state = {
      userRegistered: false,
      userLoggedIn: false,
      user: {
        username: "",
        password: "",
        department: ""
      }
    };

    formChange = (e) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })
    };

    render() {
      return this.state.userLoggedIn ? (
        <Route
          path="/users"
          render={props => <Users {...props} username={this.state.username} />}
        />
      ) : (
        <FormView history={this.props.history} user={this.state.user} formChange={this.formChange} />
      );
    }
  };

export default authenticate(Users)(FormView);
