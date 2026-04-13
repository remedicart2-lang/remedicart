import React from 'react';

const Contactus = () => {
  return (
    <div className="contact-page">
      <section className="page-header" style={{ background: 'var(--color-primary)', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>Contact us</h1>
          <p style={{ opacity: '0.8', maxWidth: '600px', margin: '1rem auto 0' }}>We're here to help. Reach out to us for any queries or support.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="contact-card" style={{ padding: '2rem', background: '#f9fafb', borderRadius: '12px' }}>
              <h3>Support Email</h3>
              <p>support@remedicart.tld</p>
            </div>
            <div className="contact-card" style={{ padding: '2rem', background: '#f9fafb', borderRadius: '12px' }}>
              <h3>Phone Number</h3>
              <p>+6221.2002.2012</p>
            </div>
            <div className="contact-card" style={{ padding: '2rem', background: '#f9fafb', borderRadius: '12px' }}>
              <h3>Office Address</h3>
              <p>123 Medical Avenue, Healthy City</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contactus;
