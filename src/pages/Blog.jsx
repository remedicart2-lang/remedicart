import React from 'react';

const Blog = () => {
  return (
    <div className="blog-page">
      <section className="page-header" style={{ background: 'var(--color-primary)', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>Our Blog</h1>
          <p style={{ opacity: '0.8', maxWidth: '600px', margin: '1rem auto 0' }}>Latest news, health tips, and medical insights from our experts.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
          <h2 style={{ color: 'var(--color-text-muted)' }}>Blog content coming soon...</h2>
          <p>We're curating the best health information for you. Stay tuned!</p>
        </div>
      </section>
    </div>
  );
};

export default Blog;
