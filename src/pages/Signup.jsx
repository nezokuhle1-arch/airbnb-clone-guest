import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import './Login.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mirror the backend rule so the visitor gets instant feedback
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        try {
            const response = await api.post('/users/register', { username, email, password });

            // Same storage as login, so the visitor is logged in immediately
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
                <h1>Sign up</h1>
                <p className="login-subtitle">Create your airbnb account</p>

                {error && <p className="login-error">{error}</p>}

                <label className="login-field">
                    <span>Username</span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                </label>
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
                        placeholder="At least 8 characters"
                        required
                    />
                </label>

                <button type="submit" className="login-button">Create account</button>
                <p className="login-switch">Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}

export default Signup;