import React, { useState } from 'react';
import '../Styling/Login.css';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User'); // New state for role
    const [adminKey, setAdminKey] = useState(''); // New state for admin key

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginData = { email, password, role };
        if (role === 'Admin') {
            loginData.adminKey = adminKey; // Add admin key to the request if role is Admin
        }

        Axios.post('http://localhost:3000/auth/login', loginData)
            .then(response => {
                if (response.data.status) {
                    if (role === 'Admin') {
                        navigate('/admin');
                    } else {
                        navigate('/home');
                    }
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
                <h2>Login</h2>
                <form className='sign-up-form' onSubmit={handleSubmit}>
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

                    <button type='submit'>Login</button>
                    <Link to="/forgotPassword">Forgot Password?</Link>
                    <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                </form>
            </div>
        </body>
    );
};

export default Login;
