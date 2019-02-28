import React from 'react';

const LoginForm = props => {
    return (
        <>
            {props.userRegistered && <p>Registration successful! Please log in.</p>}
            <form onSubmit={e => props.login(e)}>
                <input type="text" name="username" value={props.user.username} onChange={e => props.formChange(e)} placeholder="Username" />
                <input type="password" name="password" value={props.user.password} onChange={e => props.formChange(e)} placeholder="Password" />
                <button>Log In</button>
            </form>
        </>
    )
}

export default LoginForm;