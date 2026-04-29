import React from 'react';
import './Aboutus.css';
import heroImg from '../assets/hero1.jpg';
import splitImg from '../assets/health.jpeg';

const Aboutus = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section 
        className="about-hero" 
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="about-hero__overlay"></div>
        <div className="container">
          <div className="about-hero__content">
            <h1 className="about-hero__title">Your Trusted Partner in Everyday Healthcare</h1>
            <p className="about-hero__subtext">
              RemediCart is dedicated to making quality healthcare products accessible, reliable, and convenient for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="about-section who-we-are">
        <div className="container">
          <h2 className="section-title">Who We Are</h2>
          <p className="who-we-are__text">
            RemediCart is an innovative online platform designed to bridge the gap between people and essential healthcare services. 
            We specialize in providing a seamless way to browse, select, and receive genuine medicines and wellness products 
            without the hassle of traditional pharmacy visits. Our commitment is to your health and convenience.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>What We Offer</h2>
          <div className="what-we-offer__grid">
            <div className="offer-card">
              <span className="offer-card__icon">💊</span>
              <h3 className="offer-card__title">Wide range of medicines</h3>
              <p>Access a comprehensive inventory of prescription and over-the-counter medications.</p>
            </div>
            <div className="offer-card">
              <span className="offer-card__icon">📦</span>
              <h3 className="offer-card__title">Easy ordering experience</h3>
              <p>A simple, user-friendly interface that makes finding what you need effortless.</p>
            </div>
            <div className="offer-card">
              <span className="offer-card__icon">🛡️</span>
              <h3 className="offer-card__title">Trusted product sourcing</h3>
              <p>We partner only with verified suppliers to ensure every product is 100% authentic.</p>
            </div>
            <div className="offer-card">
              <span className="offer-card__icon">🤝</span>
              <h3 className="offer-card__title">Customer-focused service</h3>
              <p>Our team is dedicated to providing support and ensuring your satisfaction at every step.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="about-section our-mission">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>Our Mission</h2>
          <p className="mission-statement">
            "To empower every individual with immediate access to reliable healthcare essentials, 
            ensuring that quality care is never more than a click away."
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Why Choose Us</h2>
          <div className="why-choose-list">
            <div className="why-item">
              <h4 className="why-item__title">Trusted Products</h4>
              <p>Quality assurance on every single item delivered.</p>
            </div>
            <div className="why-item">
              <h4 className="why-item__title">Simple User Experience</h4>
              <p>Designed for ease of use across all age groups.</p>
            </div>
            <div className="why-item">
              <h4 className="why-item__title">Reliable Service</h4>
              <p>Consistent delivery times and professional handling.</p>
            </div>
            <div className="why-item">
              <h4 className="why-item__title">Customer Care</h4>
              <p>Compassionate support available when you need it most.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image + Text Section */}
      <section className="about-section">
        <div className="container image-text-split">
          <div className="split-visual">
            <img src={splitImg} alt="Pharmacy professionals" className="split-image" />
          </div>
          <div className="split-content">
            <h2 className="split-content__title">Making Healthcare Simple and Accessible</h2>
            <p>
              We believe that managing your health shouldn't be complicated. By leveraging modern technology 
              and a vast network of logistics, RemediCart brings the pharmacy to you. Whether it's chronic 
              medication or daily wellness supplements, we ensure that you have what you need to live 
              your healthiest life, delivered right to your doorstep with care.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
