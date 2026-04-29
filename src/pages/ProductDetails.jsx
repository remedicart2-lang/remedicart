import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleInquiry = () => {
    const subject = encodeURIComponent(`Inquiry about ${product.name}`);
    const body = encodeURIComponent(
      `Hello,\n\nI would like to know more about ${product.name}.\n\nThank you.`
    );

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=medclickpharma@gmail.com&su=${subject}&body=${body}`;
    const mailtoLink = `mailto:medclickpharma@gmail.com?subject=${subject}&body=${body}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    window.open(isMobile ? mailtoLink : gmailLink, "_blank");
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
              src={product.imageUrl || 'https://placehold.co/600x500/e2e8f0/64748b?text=No+Image'}
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
            <p className="product-details__desc">{product.description}</p>
            <div className="product-details__actions">
              <button
                onClick={handleInquiry}
                className="btn btn-primary"
                style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}
              >
                📩 Inquire Now
              </button>
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
