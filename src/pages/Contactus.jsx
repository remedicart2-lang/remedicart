import React from 'react';
import './Contactus.css';

const Contactus = () => {
  return (
    <div className="contact-page">
      {/* Header Section */}
      <header className="contact-header">
        <div className="contact-header__badge">
          <span>✦</span> CONNECT WITH US <span>✦</span>
        </div>
        <h1 className="contact-header__title">Let's Connect</h1>
        <p className="contact-header__subtitle">
          We're here to help. Reach out to the RemediCart team for any medical inquiries, support, or partnership opportunities.
        </p>
      </header>

      {/* Main Content Container */}
      <div className="contact-container">
        {/* Reach Us Information Column */}
        <aside className="contact-info">
          <h2 className="contact-info__title">Reach Us</h2>

          <div className="info-item">
            <div className="info-item__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div className="info-item__content">
              <span className="info-item__label">Phone</span>
              <span className="info-item__value"> +91 91 72237 145</span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-item__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div className="info-item__content">
              <span className="info-item__label">Email</span>
              <span className="info-item__value">remedicart@gmail.com</span>
            </div>
          </div>

          <div className="info-item">
            <div className="info-item__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div className="info-item__content">
              <span className="info-item__label">Location</span>
              <span className="info-item__value">Mumbai, Maharashtra, India</span>
            </div>
          </div>
        </aside>

        {/* Send Message Form Column */}
        <section className="contact-form-container">
          <h2 className="contact-form__title">Send Us a Message</h2>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-grid">
              <div className="form-group">
                <input type="text" placeholder="Full Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Phone" />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Location" />
              </div>
            </div>
            <div className="form-group">
              <textarea placeholder="Write your message here..." required></textarea>
            </div>
            <button type="submit" className="btn-submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              Send Inquiry
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contactus;
