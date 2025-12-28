import React, { useState } from 'react';
import '../Styling/Login.css'; 
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('User'); 
    const [adminKey, setAdminKey] = useState(''); 
    
    // Loading state
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const signupData = { username, email, password, role };
        if (role === 'Admin') {
            signupData.adminKey = adminKey; 
        }

        Axios.post(`${baseUrl}/auth/signup`, signupData)
            .then(response => {
                if (response.data.status) {
                    navigate('/login');
                } else {
                    alert(response.data.message);
                    setLoading(false); // Stop loading on error
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Stop loading on error
            });
    };

    return (
        <div className='login-body'>
        <div className='sign-up-container'>
            <h2>Sign Up</h2>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <label htmlFor='username'>Username </label>
                <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />

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
                        <label htmlFor="adminKey">Admin Key </label>
                        <input
                            type="password"
                            placeholder='Enter Admin Key'
                            onChange={(e) => setAdminKey(e.target.value)}
                        />
                    </>
                )}

                <button type='submit' disabled={loading}>
                    {loading ? <FaSpinner className="icon-spin" /> : 'Sign Up'}
                </button>
                <p>Already have an account? <Link to='/login'>Login</Link> </p>
            </form>
        </div>
        </div>
    );
};

export default Signup;