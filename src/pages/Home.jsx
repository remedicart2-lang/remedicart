import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';
import heroBg from '../assets/hero1.jpg';
import logo from '../assets/logo.png';
import './Home.css';

const FEATURES = [
  { icon: '🚚', title: 'Fast Delivery', desc: 'Same-day delivery available in select cities' },
  { icon: '✅', title: 'Genuine Products', desc: '100% authentic medicines from verified suppliers' },
  { icon: '🔒', title: 'Secure Payments', desc: 'Multiple secure payment options available' },
  { icon: '💬', title: '24/7 Support', desc: 'Expert pharmacist support round the clock' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setFeatured(data.slice(0, 4)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section 
        className="hero" 
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero__overlay"></div>
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__badge">WELCOME TO REMEDICART</div>
            <h1 className="hero__title">
              Our only priority is to<br />keep you healthy.
            </h1>
            <p className="hero__subtitle">
              Order medicines, vitamins, and healthcare products from the comfort of your home.
              Genuine products. Quick delivery. Expert care.
            </p>
            <div className="hero__cta">
              <Link to="/products" className="btn btn-white btn-lg" id="hero-shop-btn" style={{ background: 'white', color: 'var(--color-primary)' }}>Discover more</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features section">
        <div className="container">
          <div className="features__grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <span className="feature-card__icon">{f.icon}</span>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Top picks from our catalogue</p>
            </div>
            <Link to="/products" className="btn btn-outline btn-sm" id="view-all-products-btn">View All →</Link>
          </div>
          {loading ? (
            <div className="loading-wrapper"><div className="spinner" /></div>
          ) : featured.length > 0 ? (
            <div className="grid grid-4">
              {featured.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="home__empty">
              <p>No products yet. <Link to="/admin">Add products from the Admin Panel →</Link></p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2 className="cta-banner__title">Ready to get started?</h2>
            <p className="cta-banner__sub">Join thousands of customers who trust Remedicart for their health needs.</p>
          </div>
          <Link to="/auth?mode=register" className="btn btn-white btn-lg" id="cta-register-btn" style={{color: 'var(--color-primary)', background: 'white'}}>Register Now →</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
