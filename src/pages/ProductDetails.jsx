import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../services/productService';
import ProductCard from '../components/ProductCard';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then(async (data) => {
        setProduct(data);
        if (data.category) {
          const related = await getProductsByCategory(data.category);
          setRelatedProducts(related.filter(p => p.id !== data.id).slice(0, 4));
        }
      })
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleInquiry = () => {
    const subject = encodeURIComponent(`Inquiry about ${product.name}`);
    const body = encodeURIComponent(
      `Hello ,\n\nI am interested in ${product.name}.\n\nPlease provide more details regarding this product.\n\nMy Details:\nLocation/Country Code: \nPhone Number: \n\nThank you.`
    );
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=remedicart2@gmail.com&su=${subject}&body=${body}`;
    const mailtoLink = `mailto:remedicart2@gmail.com?subject=${subject}&body=${body}`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    window.open(isMobile ? mailtoLink : gmailLink, "_blank");
  };

  if (loading) return <div className="loading-wrapper"><div className="spinner" /></div>;
  if (error || !product) return (
    <div className="page-wrapper container">
      <div className="alert alert-error">{error || 'Product not found'}</div>
      <Link to="/products" className="btn btn-primary">← Back to Products</Link>
    </div>
  );

  return (
    <div className="product-details-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span>
          <Link to="/products">Products</Link> <span>/</span>
          <span>{product.name}</span>
        </nav>

        {/* Top Section */}
        <div className="product-main">
          <div className="product-main__image">
            <img src={product.imageUrl} alt={product.name} />
          </div>
          <div className="product-main__info">
            <h1 className="product-name">{product.name}</h1>

            <div className="info-row">
              <span className="info-label">Category:</span>
              <span className="category-badge">{product.category?.toUpperCase()}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Availability:</span>
              <span className={`stock-status ${product.stock ? 'in-stock' : 'out-of-stock'}`}>
                {product.stock ? '✔ In Stock' : '✖ Out of Stock'}
              </span>
            </div>

            <div className="info-row composition">
              <span className="info-label">Composition:</span>
              <p className="composition-text">{product.content || 'N/A'}</p>
            </div>

            <button className="btn-inquire-large" onClick={handleInquiry}>
              <span className="btn-icon">📩</span> Enquire Now
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="product-tabs-container">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              <span className="tab-icon">ℹ️</span> Description
            </button>
            <button
              className={`tab-btn ${activeTab === 'sideEffects' ? 'active' : ''}`}
              onClick={() => setActiveTab('sideEffects')}
            >
              <span className="tab-icon">❤️</span> Side Effects
            </button>
            <button
              className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              <span className="tab-icon">🔍</span> Content
            </button>
          </div>

          <div className="tab-content-box">
            {activeTab === 'description' && (
              <p className="tab-text">{product.description || 'No description available.'}</p>
            )}
            {activeTab === 'sideEffects' && (
              <p className="tab-text">{product.sideEffect || 'No side effects listed.'}</p>
            )}
            {activeTab === 'content' && (
              <p className="tab-text">{product.content}</p>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2 className="related-title">Related Products</h2>
            <div className="related-grid">
              {relatedProducts.map(item => (
                <div key={item.id} className="related-card">
                  <div className="related-card__image">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                  <div className="related-card__info">
                    <h4 className="related-card__name">{item.name}</h4>
                    <span className="related-card__category">{item.category}</span>
                    <Link to={`/products/${item.id}`} className="btn-view-details">View Details</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
