import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../services/orderService';
import { useState } from 'react';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePlaceOrder = async () => {
    if (!user) return;
    setPlacing(true);
    setError('');
    try {
      for (const item of cartItems) {
        await placeOrder({
          user_id: user.id,
          product_id: item.id,
          quantity: item.quantity,
          status: 'pending',
        });
      }
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error(err);
    } finally {
      setPlacing(false);
    }
  };

  if (success) {
    return (
      <div className="page-wrapper">
        <div className="container cart-success">
          <div className="cart-success__icon">✅</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with Remedicart. Your order is being processed.</p>
          <Link to="/products" className="btn btn-primary btn-lg" id="cart-continue-btn">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="container cart-empty">
          <div className="cart-empty__icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products yet.</p>
          <Link to="/products" className="btn btn-primary btn-lg" id="cart-shop-btn">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="section-title" style={{marginBottom:'1.5rem', paddingTop:'1rem'}}>My Cart</h1>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item" id={`cart-item-${item.id}`}>
                <img
                  src={item.imageUrl || 'https://placehold.co/80x80/e2e8f0/64748b?text=Rx'}
                  alt={item.name}
                  className="cart-item__image"
                />
                <div className="cart-item__info">
                  <Link to={`/products/${item.id}`} className="cart-item__name">{item.name}</Link>
                  {item.category && <span className="badge badge-teal">{item.category}</span>}
                  <p className="cart-item__unit-price">₹{parseFloat(item.price).toFixed(2)} each</p>
                </div>
                <div className="cart-item__controls">
                  <div className="qty-control">
                    <button className="qty-control__btn" onClick={() => updateQuantity(item.id, item.quantity - 1)} id={`cart-dec-${item.id}`}>−</button>
                    <span className="qty-control__val">{item.quantity}</span>
                    <button className="qty-control__btn" onClick={() => updateQuantity(item.id, item.quantity + 1)} id={`cart-inc-${item.id}`}>+</button>
                  </div>
                  <p className="cart-item__subtotal">₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.id)} id={`cart-remove-${item.id}`}>🗑 Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3 className="cart-summary__title">Order Summary</h3>
            <div className="cart-summary__rows">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-summary__row">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="cart-summary__total">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {user ? (
              <button
                className="btn btn-primary btn-lg cart-summary__checkout-btn"
                onClick={handlePlaceOrder}
                disabled={placing}
                id="cart-checkout-btn"
              >
                {placing ? 'Placing Order…' : 'Place Order'}
              </button>
            ) : (
              <Link to="/auth" className="btn btn-primary btn-lg cart-summary__checkout-btn" id="cart-login-to-checkout-btn">
                Sign In to Checkout
              </Link>
            )}

            <button className="cart-summary__clear-btn" onClick={clearCart} id="cart-clear-btn">Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
