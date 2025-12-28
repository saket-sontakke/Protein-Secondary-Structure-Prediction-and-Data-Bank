import React, { useState } from 'react'
import '../Styling/Login.css';
import Axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa';

const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const ResetPassword = () => {
    
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {token} = useParams()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true);

        Axios.post(`${baseUrl}/auth/reset-password/`+token, { password }).then(response => {
            if(response.data.status) {
                navigate('/login')
            } else {
                setLoading(false);
            }
        }).catch(err => {
            console.log(err) 
            setLoading(false);
        })
    };

  return (
    <div className='login-body'>
    <div className='sign-up-container'>
    <h2>Reset Password</h2>
    <form className='sign-up-form' onSubmit={handleSubmit}>

    <label htmlFor="password">New Password </label>
    <input type="password" placeholder='**********' onChange={(e) => setPassword(e.target.value)} />
        <button type='submit' disabled={loading}>
            {loading ? <FaSpinner className="icon-spin" /> : 'Reset'}
        </button>
    </form>
</div>
</div>
  )
}

export default ResetPassword