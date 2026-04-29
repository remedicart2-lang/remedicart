import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory } from '../services/productService';
import heroBg from '../assets/hero-bg-cropped.jpg';
import pillsBg from '../assets/pills-bg.jpg';
import aboutImg from '../assets/remedicart-img4.jpg.jpeg';
import vitBg from '../assets/vit.jpeg';
import bestImg from '../assets/best.jpeg';
import './Home.css';

const FEATURES = [
  { icon: '🚚', title: 'Fast Delivery', desc: 'Same-day delivery available in select cities' },
  { icon: '✅', title: 'Genuine Products', desc: '100% authentic medicines from verified suppliers' },
];



const TESTIMONIALS = [
  {
    name: 'Harvey Powell',
    role: 'Business Manager',
    quote: 'RemediCart has completely transformed how I manage my prescriptions. The fast delivery and genuine products give me total peace of mind.',
    avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Maria Collins',
    role: 'Teacher',
    quote: 'The customer service is outstanding. I had a question about my order, and their support team was incredibly helpful and responsive.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Livia Reynolds',
    role: 'Freelancer',
    quote: 'I love the convenience of ordering my family\'s healthcare essentials from one place. The quick international shipping is a game changer.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }
];



const Home = () => {
  const [editorsChoice, setEditorsChoice] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const editors = await getProductsByCategory("Editor's Choice");
        const latest = await getProductsByCategory("Latest Product");
        setEditorsChoice(editors);
        setLatestProducts(latest);
      } catch (err) {
        console.error('Error fetching home products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeProducts();
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
              Healing<br />Made<br />Simple
            </h1>
            <p className="hero__subtitle">
              Genuine medicines and expert care,<br />right to your doorstep.
            </p>
            <div className="hero__cta">
              <Link to="/products" className="btn btn-accent btn-lg" id="hero-shop-btn">Discover more</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section">
        <div className="container about__inner">
          <div className="about__content">
            <span className="about__label">WHO WE ARE</span>
            <h2 className="about__title">
              With us, expect more<br />than just a pharmacy.
            </h2>
            <p className="about__desc">
              We are dedicated to providing the best healthcare solutions for you and your family. Expect top quality medicines, exceptional customer care, and a commitment to your well-being.
            </p>
          </div>

          <div className="about__visual">
            <img
              src={aboutImg}
              alt="Pharmacists serving customer"
              className="about__img"
            />
          </div>

          <div className="about__stats">
            <div className="stat-box">
              <span className="stat-number" style={{ color: 'var(--color-teal)' }}>14K+</span>
              <span className="stat-text">Happy Customer</span>
            </div>
            <div className="stat-box">
              <span className="stat-number" style={{ color: 'var(--color-coral)' }}>27K+</span>
              <span className="stat-text">Product Sold</span>
            </div>
            <div className="stat-box">
              <span className="stat-number" style={{ color: 'var(--color-orange)' }}>15+</span>
              <span className="stat-text">Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editor's Choice */}
      <section className="section editor-section">
        <div className="container editor-layout">
          {/* Main Products Panel */}
          <div className="editor-main">
            <div className="editor-header">
              <h2 className="editor-title">Editor's Choice</h2>
              <div className="editor-divider"></div>
            </div>

            {loading ? (
              <div className="loading-wrapper"><div className="spinner" /></div>
            ) : editorsChoice.length > 0 ? (
              <div className="grid grid-4 editor-grid">
                {editorsChoice.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="home__empty">
                <p>No products yet. <Link to="/admin">Add products from the Admin Panel →</Link></p>
              </div>
            )}
          </div>

          {/* Right Sidebar Info Panel */}
          <div className="editor-sidebar">
            <div className="trust-item">
              <div className="trust-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
              </div>
              <h4 className="trust-title">International Shipment</h4>
              <p className="trust-desc">Your orders are shipped seamlessly between countries</p>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h4 className="trust-title">30 Days Warranty</h4>
              <p className="trust-desc">You have the right to return your orders within 30 days.</p>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
              </div>
              <h4 className="trust-title">Safe & Verified</h4>
              <p className="trust-desc">Every product is checked for quality and reliability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Banner */}
      <section className="service-banner section" style={{ backgroundImage: `url(${vitBg})` }}>
        <div className="service-banner__overlay"></div>
        <div className="container service-banner__content">
          <h2 className="service-banner__title">Modern healthcare, built around you.</h2>
          <p className="service-banner__desc">
            Access trusted medicines and healthcare essentials with ease, reliability, and complete peace of mind.
          </p>
          <div className="service-banner__cta">
            <Link to="/products" className="btn btn-primary btn-lg">Explore Products</Link>
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="section latest-products-section">
        <div className="container">
          <div className="latest-header">
            <div className="latest-header__text">
              <span className="latest-label">FRESH ARRIVALS</span>
              <h2 className="latest-title">Latest Products</h2>
            </div>
            <Link to="/products" className="latest-view-all">
              View All <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
          <div className="grid grid-5 latest-grid">
            {loading ? (
              <div className="loading-wrapper"><div className="spinner" /></div>
            ) : latestProducts.length > 0 ? (
              latestProducts.map(p => <ProductCard key={p.id} product={p} />)
            ) : (
              <div className="home__empty">
                <p>No latest products yet. <Link to="/admin">Add products from the Admin Panel →</Link></p>
              </div>
            )}
          </div>
        </div>
      </section>



      {/* Why Choose Us */}
      <section className="section why-choose-us">
        <div className="container why-layout">
          <div className="why-header">
            <span className="why-label">WHY CHOOSE US</span>
            <h2 className="why-title">Best services available for the best customers</h2>
          </div>
          
          <div className="why-visual">
            <img src={bestImg} alt="Service illustration" className="why-img" />
          </div>

          <div className="why-features">
            <div className="why-card">
              <div className="why-card__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" /><path d="M12 5v4M10 7h4" /></svg>
              </div>
              <div className="why-card__body">
                <h4>Honesty & transparency</h4>
                <p>We provide clear, upfront pricing and verified product sourcing so you always know exactly what you are getting.</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-card__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
              </div>
              <div className="why-card__body">
                <h4>Extra Discount</h4>
                <p>Enjoy exclusive deals and seasonal discounts to make your essential healthcare purchases more affordable.</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-card__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>
              </div>
              <div className="why-card__body">
                <h4>24/7 Premium Support</h4>
                <p>Our dedicated support team is available around the clock to assist you with your orders and healthcare inquiries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="testimonials-overlay"></div>
        <div className="container testimonials-content">
          <span className="testimonials-label">TESTIMONIAL</span>
          <h2 className="testimonials-title">What they say about us</h2>
          <p className="testimonials-subtitle">Discover why thousands of customers trust RemediCart for their daily healthcare needs and medical supplies.</p>

          <div className="grid grid-3 testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <p className="testimonial-text">"{t.quote}"</p>
                <div className="testimonial-user">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                  <div className="testimonial-meta">
                    <h5 className="testimonial-name">{t.name}</h5>
                    <span className="testimonial-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
