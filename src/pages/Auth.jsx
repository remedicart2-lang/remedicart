import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { signIn, signUp } from '../services/authService';
import { createUserProfile } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import './Auth.css';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const defaultMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      if (isAdmin) {
        setRedirecting(true);
        navigate('/admin/products');
      } else {
        setError('Access Denied: You do not have admin privileges.');
        setLoading(false);
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await signIn(email, password);
        // Redirect handled by useEffect
      } else {
        const { user: newUser } = await signUp(email, password);
        if (newUser) {
          await createUserProfile(newUser.id, newUser.email, 'user');
          setMessage('Account created! Sign in to continue.');
          setMode('login');
        } else {
          setMessage('Account created! Please check your email to confirm your address.');
        }
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__logo">
          <img src={logo} alt="Remedicart" />
        </div>

        <h1 className="auth-card__title">Admin Login</h1>
        <p className="auth-card__sub">Sign in to access the Remedicart Admin Panel</p>

        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="auth-email">Email address</label>
            <input
              id="auth-email"
              type="email"
              className="form-input"
              placeholder="admin@remedicart.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              className="form-input"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg auth-form__submit"
            disabled={loading}
            id="auth-submit-btn"
          >
            {loading || authLoading || redirecting ? 'Please wait…' : 'Sign In'}
          </button>
        </form>

        <Link to="/" className="auth-back-link" id="auth-back-home-link">← Back to Home</Link>
      </div>
    </div>
  );
};

export default Auth;
