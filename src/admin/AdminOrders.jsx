import { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../services/orderService';

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const STATUS_COLORS = {
  pending: 'badge-primary',
  processing: 'badge-teal',
  shipped: 'badge-teal',
  delivered: 'badge-teal',
  cancelled: 'badge-coral',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .catch(() => setError('Failed to load orders.'))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    } catch {
      setError('Failed to update order status.');
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">Orders</h1>
      <p className="admin-page-sub">View and manage all customer orders</p>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-wrapper"><div className="spinner" /></div>
      ) : orders.length === 0 ? (
        <div className="admin-empty">No orders placed yet.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>User</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} id={`admin-order-row-${order.id}`}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    #{order.id.slice(0, 8)}
                  </td>
                  <td>{order.products?.name || '—'}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {order.users?.email || order.user_id?.slice(0, 12) + '…'}
                  </td>
                  <td>{order.quantity}</td>
                  <td style={{ fontWeight: 700, color: 'var(--color-teal)' }}>
                    ₹{((order.products?.price || 0) * order.quantity).toFixed(2)}
                  </td>
                  <td>
                    <select
                      className="form-input"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      id={`order-status-${order.id}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {new Date(order.created_at).toLocaleDateString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
