import React from 'react';
import axios from 'axios';

class UserList extends React.Component {
    state = {
        users: []
    }

    componentDidMount() {
        axios.get("http://localhost:8000/api/users")
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
    }
    render() {
        return (
            <>
                <h1>Users</h1>
                {this.state.users.map(user => (
                    <div key={user.id}>{user.username}</div>
                ))}
            </>
        )
    }

}

export default UserList;