import React, { useState } from 'react'
import '../Styling/Login.css';
import Axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const ResetPassword = () => {
    
    const [password, setPassword] = useState("");
    const {token} = useParams()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post(`${baseUrl}/auth/reset-password/`+token, { password }).then(response => {
            if(response.data.status) {
                navigate('/login')
            }
            console.log(err)
        }).catch(err => {
            console.log(err) 
        })
    };

  return (
    <body class='login-body'>
    <div className='sign-up-container'>
    <h2>Reset Password</h2>
    <form className='sign-up-form' onSubmit={handleSubmit}>

    <label htmlFor="password">New Password </label>
    <input type="password" placeholder='**********' onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Reset</button>
    </form>
</div>
</body>
  )
}

export default ResetPassword
