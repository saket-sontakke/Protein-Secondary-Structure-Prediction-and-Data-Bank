import React, { useState } from 'react'
import '../Styling/Login.css'
import Axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa';

const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const ForgotPassword = () => {
    
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true);

        Axios.post(`${baseUrl}/auth/forgot-password`, { email }).then(response => {
            if(response.data.status) {
                alert("Check your email for reset password link")
                navigate('/login')
            } else {
                alert(response.data.message); 
                setLoading(false);
            }
        }).catch(err => {
            console.log(err)
            setLoading(false);
        })
    }

  return (
    <div className='login-body'>
    <div className='sign-up-container'>
    <h2>Forgot Password</h2>
    <form className='sign-up-form' onSubmit={handleSubmit}>

        <label htmlFor="email">Email </label>
        <input type="email" autoComplete='off' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

        <button type='submit' disabled={loading}>
            {loading ? <FaSpinner className="icon-spin" /> : 'Send'}
        </button>
        <p><Link to='/login'>Back to Login</Link></p>
    </form>
</div>
</div>
  )
}

export default ForgotPassword