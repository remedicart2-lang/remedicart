import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
      } catch (err) {
        console.error('Logout error:', err);
      } finally {
        // Fallback: Ensure we always end up at login even if signout fails
        window.location.href = '/login';
      }
    };
    performLogout();
  }, [logout]);

  return (
    <div className="loading-wrapper">
      <div className="spinner"></div>
      <p style={{ marginTop: '1rem', color: 'var(--color-primary)' }}>Signing out...</p>
    </div>
  );
};

export default Logout;
