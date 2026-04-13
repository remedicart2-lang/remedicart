import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../services/productService';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="loading-wrapper"><div className="spinner" /></div>;
  if (error) return (
    <div className="page-wrapper container">
      <div className="alert alert-error">{error}</div>
      <Link to="/products" className="btn btn-primary">← Back to Products</Link>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-details">
          {/* Image */}
          <div className="product-details__image-wrap">
            <img
              src={product.image_url || 'https://placehold.co/600x500/e2e8f0/64748b?text=No+Image'}
              alt={product.name}
              className="product-details__image"
            />
          </div>

          {/* Info */}
          <div className="product-details__info">
            {product.category && (
              <span className="badge badge-teal product-details__badge">{product.category}</span>
            )}
            <h1 className="product-details__name">{product.name}</h1>
            <p className="product-details__price">₹{parseFloat(product.price).toFixed(2)}</p>
            <p className="product-details__desc">{product.description}</p>

            {/* Quantity */}
            <div className="product-details__qty">
              <label className="form-label">Quantity</label>
              <div className="qty-control">
                <button className="qty-control__btn" onClick={() => setQuantity(q => Math.max(1, q - 1))} id="qty-dec-btn">−</button>
                <span className="qty-control__val">{quantity}</span>
                <button className="qty-control__btn" onClick={() => setQuantity(q => q + 1)} id="qty-inc-btn">+</button>
              </div>
            </div>

            <div className="product-details__actions">
              <button
                className={`btn btn-lg ${added ? 'btn-teal' : 'btn-primary'}`}
                onClick={handleAddToCart}
                id="product-add-to-cart-btn"
              >
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <Link to="/cart" className="btn btn-outline btn-lg" id="product-go-to-cart-btn">View Cart</Link>
            </div>

            <div className="product-details__meta">
              <div className="meta-item"><span>📦</span><span>In Stock</span></div>
              <div className="meta-item"><span>🚚</span><span>Fast Delivery Available</span></div>
              <div className="meta-item"><span>✅</span><span>100% Genuine Product</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
