import React, { useState } from 'react';
import '../Styling/App.css';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('User'); // Default role is 'User'
    const [adminKey, setAdminKey] = useState(''); // New state for admin key

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const signupData = { username, email, password, role };
        if (role === 'Admin') {
            signupData.adminKey = adminKey; // Add admin key to the request if role is Admin
        }

        Axios.post(`${baseUrl}/auth/signup`, signupData)
            .then(response => {
                if (response.data.status) {
                    navigate('/login');
                } else {
                    alert(response.data.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <body class='login-body'>
        <div className='sign-up-container'>
            <h2>Sign Up</h2>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <label htmlFor='username'>Username </label>
                <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="email">Email </label>
                <input type="email" autoComplete='off' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password </label>
                <input type="password" placeholder='**********' onChange={(e) => setPassword(e.target.value)} />

                {/* New Role Selection */}
                <label htmlFor="role">Role </label>
                <div>
                    <input
                        type="radio"
                        id="user"
                        name="role"
                        value="User"
                        checked={role === 'User'}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <label htmlFor="user">User</label>

                    <input
                        type="radio"
                        id="admin"
                        name="role"
                        value="Admin"
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <label htmlFor="admin">Admin</label>
                </div>

                {role === 'Admin' && (
                    <div>
                        <label htmlFor="adminKey">Admin Key </label>
                        <input
                            type="password"
                            placeholder='Enter Admin Key'
                            onChange={(e) => setAdminKey(e.target.value)}
                        />
                    </div>
                )}

                <button type='submit'>Sign Up</button>
                <p>Already have an account? <Link to='/login'>Login</Link> </p>
            </form>
        </div>
        </body>
    );
};

export default Signup;
