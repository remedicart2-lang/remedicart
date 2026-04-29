import { Navigate, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, profile, isAdmin, loading, logout } = useAuth();

  if (loading) return <div className="loading-wrapper"><div className="spinner" /></div>;
  
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return (
    <div className="admin-unauthorized">
      <h2>🔒 Access Denied</h2>
      <p>You need admin privileges to access this panel.</p>
    </div>
  );

  return (
    <div className="admin-workspace">
      {/* Top Header */}
      <header className="admin-header">
        <div className="container admin-header__inner">
          <div className="admin-header__left">
            <Link to="/admin" className="admin-logo">
              Admin Panel
            </Link>
          </div>
          <div className="admin-header__right">
            <div className="admin-profile">
              <div className="admin-profile__status">
                <span className="admin-profile__icon">👤</span>
                <div className="admin-profile__info">
                  <span className="admin-profile__name">{user?.email?.split('@')[0] || 'Admin'}</span>
                  <span className="admin-profile__online">Online</span>
                </div>
              </div>
              <Link to="/logout" className="btn logout-btn" id="admin-logout-btn">
                <span>↪</span> Logout
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="admin-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
