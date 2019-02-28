import React from "react";
import axios from "axios";
import Logout from "./Logout";

class UserList extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get("http://localhost:8000/api/users").then(res => {
      console.log(res.data);
      this.setState({
        users: res.data
      });
    });
  }
  render() {
    return (
      <>
        <h1>Users</h1>
        {this.state.users.map(user => (
          <div key={user.id}>
            <p>Username: {user.username}</p>
            <p>Department: {user.department}</p>
          </div>
        ))}
        <Logout history={this.props.history} />
      </>
    );
  }
}

export default UserList;
