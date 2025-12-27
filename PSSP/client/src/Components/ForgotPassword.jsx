import React, { useState } from 'react'
import '../Styling/Login.css'
import Axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const ForgotPassword = () => {
    
    const [email, setEmail] = useState("");

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:3000/auth/forgot-password', { email }).then(response => {
            if(response.data.status) {
                alert("Check your email for reset password link")
                navigate('/login')
            } else {
                alert(response.data.message); 
            }
        }).catch(err => {
            console.log(err)
        })
    }

  return (
    <body class='login-body'>
    <div className='sign-up-container'>
    <h2>Forgot Password</h2>
    <form className='sign-up-form' onSubmit={handleSubmit}>

        <label htmlFor="email">Email </label>
        <input type="email" autoComplete='off' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

        <button type='submit'>Send</button>
    </form>
</div>
</body>
  )
}

export default ForgotPassword
