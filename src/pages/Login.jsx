import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/users/login', { email, password });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            window.dispatchEvent(new Event('authchange'));

            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="login-page">
            <form className="login-card" onSubmit={handleSubmit}>
                <h1>Log in</h1>
                <p className="login-subtitle">Welcome back to airbnb</p>

                {error && <p className="login-error">{error}</p>}

                <label className="login-field">
                    <span>Email</span>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    />
                </label>
                <label className="login-field">
                    <span>Password</span>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    />
                </label>

                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );

}

export default Login;