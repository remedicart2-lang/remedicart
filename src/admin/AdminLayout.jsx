import { Navigate, Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div className="loading-wrapper"><div className="spinner" /></div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return (
    <div className="admin-unauthorized">
      <h2>🔒 Access Denied</h2>
      <p>You need admin privileges to access this panel.</p>
    </div>
  );

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span>⚕️</span>
          <span>Admin Panel</span>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`} id="admin-nav-dashboard">
            📊 Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`} id="admin-nav-products">
            💊 Products
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`} id="admin-nav-orders">
            📦 Orders
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`} id="admin-nav-users">
            👥 Users
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
