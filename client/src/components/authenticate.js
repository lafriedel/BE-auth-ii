import React from "react";
import { Route } from "react-router";
import axios from "axios";
import FormView from "./FormView";
import UserList from "./UserList";

const authenticate = UserList => FormView =>
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

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token && token !== "") {
            this.setState({
                ...this.state,
                userLoggedIn: true
            })
            this.props.history.push("/users");
        } else {
            this.props.history.push("/login");
        }
    }

    formChange = e => {
      this.setState({
        ...this.state,
        user: {
          ...this.state.user,
          [e.target.name]: e.target.value
        }
      });
    };

    login = e => {
      e.preventDefault();
      axios
        .post("http://localhost:8000/api/login", this.state.user)
        .then(res => {
          const token = res.data.token;
          localStorage.setItem("token", token);
          this.setState({
            ...this.state,
            userLoggedIn: true
          });
          this.props.history.push("/users")
        })
        .catch(err => console.log(err));
    };

    register = e => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/register", this.state.user)
            .then(res => {
                this.setState({
                    ...this.state,
                    userRegistered: true,
                    user: {
                        username: "",
                        department: "",
                        password: ""
                    }
                });
                this.props.history.push("/login");
            })
            .catch(err => console.log(err));
    }

    render() {
      return this.state.userLoggedIn ? (
        <Route
          path="/users"
          render={props => (
            <UserList {...props} username={this.state.username} />
          )}
        />
      ) : (
        <FormView
          history={this.props.history}
          user={this.state.user}
          formChange={this.formChange}
          login={this.login}
          register={this.register}
          userRegistered={this.state.userRegistered}
        />
      );
    }
  };

export default authenticate(UserList)(FormView);
