import React from 'react';

const FAQ = () => {
  return (
    <div className="faq-page">
      <section className="page-header" style={{ background: 'var(--color-primary)', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>FAQ</h1>
          <p style={{ opacity: '0.8', maxWidth: '600px', margin: '1rem auto 0' }}>Frequently Asked Questions about our services and delivery.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
          <h2 style={{ color: 'var(--color-text-muted)' }}>FAQ content coming soon...</h2>
          <p>We're compiling the most common questions to help you better.</p>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
