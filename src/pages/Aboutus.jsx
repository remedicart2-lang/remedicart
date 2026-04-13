import React from 'react';

const Aboutus = () => {
  return (
    <div className="about-page">
      <section className="page-header" style={{ background: 'var(--color-primary)', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>About us</h1>
          <p style={{ opacity: '0.8', maxWidth: '600px', margin: '1rem auto 0' }}>Learn more about our mission to provide world-class healthcare accessibility.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>Our Story</h2>
          <p style={{ maxWidth: '800px', margin: '2rem auto', lineHeight: '1.8' }}>
            Remedicart was founded with a simple vision: to make healthcare accessible, affordable, and transparent for everyone. 
            We combine clinical expertise with cutting-edge technology to deliver genuine medicines right to your doorstep.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
