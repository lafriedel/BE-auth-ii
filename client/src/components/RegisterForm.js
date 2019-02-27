import React from 'react';

const RegisterForm = props => {
    return (
        <>
            <form>
                <input type="text" name="username" value={props.user.username} onChange={e => props.formChange(e)} placeholder="Username" />
                <input type="password" name="password" value={props.user.password} onChange={e => props.formChange(e)} placeholder="Password" />
                <input type="text" name="department" value={props.user.department} onChange={e => props.formChange(e)} placeholder="Department" />
                <button>Register</button>
            </form>
        </>
    )
}

export default RegisterForm;