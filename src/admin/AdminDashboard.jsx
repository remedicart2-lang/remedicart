import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import { getAllOrders } from '../services/orderService';
import { getAllUsers } from '../services/userService';
import './AdminDashboard.css';

const StatCard = ({ label, value, icon, color }) => (
  <div className="stat-card" style={{ '--stat-color': color }}>
    <div className="stat-card__icon">{icon}</div>
    <div className="stat-card__info">
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__label">{label}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getAllOrders(), getAllUsers()])
      .then(([products, orders, users]) => {
        const revenue = orders.reduce((sum, o) => {
          const price = o.products?.price || 0;
          return sum + price * o.quantity;
        }, 0);
        setStats({ products: products.length, orders: orders.length, users: users.length, revenue });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-wrapper"><div className="spinner" /></div>;

  return (
    <div className="admin-dashboard">
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-sub">Welcome to the Remedicart Admin Panel</p>

      <div className="stats-grid">
        <StatCard label="Total Products" value={stats.products} icon="💊" color="var(--color-teal)" />
        <StatCard label="Total Orders" value={stats.orders} icon="📦" color="var(--color-coral)" />
        <StatCard label="Registered Users" value={stats.users} icon="👥" color="var(--color-orange)" />
        <StatCard label="Total Revenue" value={`₹${stats.revenue.toFixed(2)}`} icon="💰" color="var(--color-primary)" />
      </div>
    </div>
  );
};

export default AdminDashboard;
