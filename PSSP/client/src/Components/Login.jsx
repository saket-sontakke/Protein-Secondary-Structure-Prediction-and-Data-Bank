import React, { useState } from 'react';
import '../Styling/Login.css';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User'); 
    const [adminKey, setAdminKey] = useState(''); 
    
    // Loading states
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isGuestLoading, setIsGuestLoading] = useState(false);

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoginLoading(true); // Start loading

        const loginData = { email, password, role };
        if (role === 'Admin') {
            loginData.adminKey = adminKey; 
        }

        Axios.post(`${baseUrl}/auth/login`, loginData)
            .then(response => {
                if (response.data.status) {
                    if (role === 'Admin') {
                        navigate('/admin');
                    } else {
                        navigate('/home');
                    }
                } else {
                    alert(response.data.message);
                    setIsLoginLoading(false); // Stop loading on error
                }
            })
            .catch(err => {
                console.log(err);
                setIsLoginLoading(false); // Stop loading on error
            });
    };

    const handleGuestLogin = () => {
        setIsGuestLoading(true); // Start loading

        Axios.post(`${baseUrl}/auth/guest-login`)
            .then(response => {
                if (response.data.status) {
                    navigate('/home');
                } else {
                    alert("Guest login unavailable");
                    setIsGuestLoading(false); // Stop loading on error
                }
            })
            .catch(err => {
                console.log(err);
                setIsGuestLoading(false); // Stop loading on error
            });
    };

    return (
        <div className='login-body'>
            <div className='sign-up-container'>
                <h2>Login</h2>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <label htmlFor="email">Email </label>
                    <input type="email" autoComplete='off' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password </label>
                    <input type="password" placeholder='**********' onChange={(e) => setPassword(e.target.value)} />

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
                        <label htmlFor="user" style={{ marginRight: '6px' }}>User</label>
                        
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
                         <>
                            <label htmlFor="adminKey">Admin Key</label>
                            <input 
                                type="password" 
                                placeholder="Enter Admin Key" 
                                onChange={(e) => setAdminKey(e.target.value)} 
                            />
                        </>
                    )}

                    {role !== 'Admin' && (
                        <button 
                            type='button' 
                            className='guest-btn' 
                            onClick={handleGuestLogin}
                            disabled={isGuestLoading || isLoginLoading}
                        >
                            {isGuestLoading ? <FaSpinner className="icon-spin" /> : 'Continue as Guest'}
                        </button>
                    )}

                    <button type='submit' disabled={isLoginLoading || isGuestLoading}>
                        {isLoginLoading ? <FaSpinner className="icon-spin" /> : 'Login'}
                    </button>

                    <Link to="/forgotPassword" style={{ textAlign: 'center', marginTop: '10px', display: 'block' }}>Forgot Password?</Link>
                    <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;