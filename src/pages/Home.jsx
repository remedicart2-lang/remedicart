import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';
import heroBg from '../assets/hero1.jpg';
import pillsBg from '../assets/pills-bg.jpg';
import './Home.css';

const FEATURES = [
  { icon: '🚚', title: 'Fast Delivery', desc: 'Same-day delivery available in select cities' },
  { icon: '✅', title: 'Genuine Products', desc: '100% authentic medicines from verified suppliers' },
];

const LATEST_PRODUCTS = [
  {
    id: 'l1',
    name: 'Medical Infrared Thermometer Non-Contact',
    price: 13.00,
    old_price: 17.00,
    imageUrl: 'https://images.unsplash.com/photo-1688224821110-e0e45cb718d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bm9uJTIwY29udGFjdCUyMHRoZXJtb21ldGVyfGVufDB8fDB8fHww',
    category: 'Equipment'
  },

  {
    id: 'l2',
    name: 'Digital IR Thermometer Forehead Ear',
    price: 13.00,
    old_price: 17.00,
    imageUrl: 'https://images.unsplash.com/photo-1583947581879-41e4c88394c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fERpZ2l0YWwlMjBJUiUyMFRoZXJtb21ldGVyfGVufDB8fDB8fHww',
    category: 'Equipment'
  },
  {
    id: 'l3',
    name: 'Premium KN95 Health Carbon Filter Mask',
    price: 70.00,
    old_price: 75.00,
    imageUrl: 'https://images.unsplash.com/photo-1614599467460-3c186483e2b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UHJlbWl1bSUyMEtOOTUlMjBIZWFsdGglMjBDYXJib24lMjBGaWx0ZXIlMjBNYXNrfGVufDB8fDB8fHww',
    category: 'Vitals'
  },
  {
    id: 'l4',
    name: 'KN95 Health Carbon Filter Mask Color 50 Pack',
    price: 70.00,
    old_price: 75.00,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1670793333263-387b9e2a340b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Tjk1JTIwSGVhbHRoJTIwQ2FyYm9uJTIwRmlsdGVyJTIwTWFzayUyMENvbG9yJTIwNTAlMjBQYWNrfGVufDB8fDB8fHww',
    category: 'Vitals'
  },
  {
    id: 'l2',
    name: 'Digital IR Thermometer Forehead Ear',
    price: 13.00,
    old_price: 17.00,
    imageUrl: 'https://images.unsplash.com/photo-1583947581879-41e4c88394c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fERpZ2l0YWwlMjBJUiUyMFRoZXJtb21ldGVyfGVufDB8fDB8fHww',
    category: 'Equipment'
  },
  {
    id: 'l3',
    name: 'Premium KN95 Health Carbon Filter Mask',
    price: 70.00,
    old_price: 75.00,
    imageUrl: 'https://images.unsplash.com/photo-1614599467460-3c186483e2b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UHJlbWl1bSUyMEtOOTUlMjBIZWFsdGglMjBDYXJib24lMjBGaWx0ZXIlMjBNYXNrfGVufDB8fDB8fHww',
    category: 'Vitals'
  },
  {
    id: 'l4',
    name: 'KN95 Health Carbon Filter Mask Color 50 Pack',
    price: 70.00,
    old_price: 75.00,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1670793333263-387b9e2a340b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Tjk1JTIwSGVhbHRoJTIwQ2FyYm9uJTIwRmlsdGVyJTIwTWFzayUyMENvbG9yJTIwNTAlMjBQYWNrfGVufDB8fDB8fHww',
    category: 'Vitals'
  },
  {
    id: 'l5',
    name: 'Hand Sanitizer Gel 500ml',
    price: 35.00,
    old_price: 39.00,
    imageUrl: 'https://images.unsplash.com/photo-1599210822756-5c4f400b90ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8SGFuZCUyMFNhbml0aXplciUyMEdlbCUyMDUwMG1sfGVufDB8fDB8fHww',
    category: 'Care'
  }
];

const TESTIMONIALS = [
  {
    name: 'Harvey Powell',
    role: 'Business Manager',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
    avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Maria Collins',
    role: 'Business Manager',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Livia Reynolds',
    role: 'Business Manager',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }
];

const PROMOS = {
  main: {
    title: 'Save up to $15 on select Digital Thermometers',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://images.unsplash.com/photo-1615486511369-31ff08672204?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGlnaXRhbCUyMHRoZXJtb21ldGVyfGVufDB8fDB8fHww',
    bgColor: '#E0F2FE'
  },
  mask: {
    title: 'N95 Face Mask',
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit dolor',
    image: 'https://media.istockphoto.com/id/1210215333/photo/protection-factor-for-n95-covid-19-corona-virus-filtering-face-mask.webp?a=1&b=1&s=612x612&w=0&k=20&c=hW8LCYI6TjdS1oGbZHPDtexcJSbNRno8o1qQAxa7XbY='
  },
  routine: {
    title: 'Daily Routine for Good Health',
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit dolor',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D'
  },
  skincare: {
    title: 'Natural Anti-age skin foam',
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit dolor',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80'
  }
};

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force static preview data while disconnected from Supabase
    setFeatured(LATEST_PRODUCTS);
    setLoading(false);
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
              Erat litora dignissim consectetur sit mollis. Placerat gravida dolor integer mollis habitant felis consectetur lorem platea ac hendrerit. Vitae platea massa consectetuer tristique vivamus vulputate suspendisse blandit.
            </p>
          </div>

          <div className="about__visual">
            <img
              src="https://images.unsplash.com/photo-1550831107-1553da8c8464?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
            ) : featured.length > 0 ? (
              <div className="grid grid-4 editor-grid">
                {featured.map((p) => <ProductCard key={p.id} product={p} />)}
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
              <h4 className="trust-title">International\nShipment</h4>
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
              <h4 className="trust-title">Secure Payment</h4>
              <p className="trust-desc">Your payments are secure with our private security network.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Banner */}
      <section className="service-banner section" style={{ backgroundImage: `url(${pillsBg})` }}>
        <div className="service-banner__overlay"></div>
        <div className="container service-banner__content">
          <h2 className="service-banner__title">A pharmacy with world-class<br />service.</h2>
          <p className="service-banner__desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec<br />
            ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <div className="service-banner__cta">
            <Link to="/products" className="btn btn-primary btn-lg">Discover more</Link>
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="section latest-products-section">
        <div className="container">
          <div className="editor-header">
            <h2 className="editor-title">Latest Product</h2>
            <div className="editor-divider"></div>
          </div>
          <div className="grid grid-5 latest-grid">
            {LATEST_PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Promo Banners Grid */}
      <section className="section promo-section">
        <div className="container promo-grid">
          <div className="promo-item promo-item--large" style={{ backgroundColor: PROMOS.main.bgColor }}>
            <div className="promo-content">
              <span className="promo-badge">Promo</span>
              <h3 className="promo-title">{PROMOS.main.title}</h3>
              <p className="promo-desc">{PROMOS.main.desc}</p>
            </div>
            <img src={PROMOS.main.image} alt="Thermo" className="promo-img" />
          </div>

          <div className="promo-item promo-item--medium">
            <div className="promo-content">
              <h3 className="promo-title">{PROMOS.mask.title}</h3>
              <p className="promo-desc">{PROMOS.mask.desc}</p>
              <Link to="/products" className="btn btn-primary btn-sm">Shop now</Link>
            </div>
            <img src={PROMOS.mask.image} alt="Mask" className="promo-img" />
          </div>

          <div className="promo-item promo-item--medium promo-item--routine">
            <div className="promo-content">
              <h3 className="promo-title">{PROMOS.routine.title}</h3>
              <p className="promo-desc">{PROMOS.routine.desc}</p>
              <Link to="/products" className="btn btn-secondary btn-sm">Shop now</Link>
            </div>
            <img src={PROMOS.routine.image} alt="Routine" className="promo-img" />
          </div>

          <div className="promo-item promo-item--wide">
            <div className="promo-content">
              <h3 className="promo-title">{PROMOS.skincare.title}</h3>
              <p className="promo-desc">{PROMOS.skincare.desc}</p>
              <Link to="/products" className="btn btn-accent btn-sm">Shop now</Link>
            </div>
            <img src={PROMOS.skincare.image} alt="Skincare" className="promo-img" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-choose-us">
        <div className="container why-layout">
          <div className="why-content">
            <span className="why-label">WHY CHOOSE US</span>
            <h2 className="why-title">Best services available for the best customers</h2>
            <div className="why-visual">
              <img src="https://plus.unsplash.com/premium_photo-1661690006963-7c8868418ed6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVzdCUyMG1lZGljYWwlMjBzZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D" alt="Service illustration" className="why-img" />
            </div>
          </div>

          <div className="why-features">
            <div className="why-card">
              <div className="why-card__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" /><path d="M12 5v4M10 7h4" /></svg>
              </div>
              <div className="why-card__body">
                <h4>Honesty & transparency</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-card__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
              </div>
              <div className="why-card__body">
                <h4>Extra Discount</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-card__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>
              </div>
              <div className="why-card__body">
                <h4>24/7 Premium Support</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
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
          <p className="testimonials-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>

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
