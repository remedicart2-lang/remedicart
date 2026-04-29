import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

export const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Essential Health Tips for a Busy Lifestyle",
    desc: "Discover simple ways to maintain your well-being even when your schedule is packed with work and family commitments.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    category: "Health Tips"
  },
  {
    id: 2,
    title: "Understanding Common Cold vs. Flu Symptoms",
    desc: "Learn how to distinguish between these two seasonal illnesses and when it's time to consult a healthcare professional.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    category: "Medicines"
  },
  {
    id: 3,
    title: "The Importance of Regular Mental Wellness Checks",
    desc: "Mental health is just as important as physical health. Here's why you should prioritize your psychological well-being.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    category: "Wellness"
  },
  {
    id: 4,
    title: "How to Build a Complete First-Aid Kit at Home",
    desc: "Everything you need to keep in your home medical cabinet for emergencies and minor injuries.",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=80",
    category: "Medicines"
  },
  {
    id: 5,
    title: "Benefits of a Plant-Based Diet for Heart Health",
    desc: "Exploring how incorporating more greens and legumes into your meals can significantly improve cardiovascular health.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    category: "Health Tips"
  },
  {
    id: 6,
    title: "Sleep Hygiene: Tips for Better Rest Tonight",
    desc: "Improve your sleep quality with these expert-backed strategies for creating the perfect bedtime routine.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    category: "Wellness"
  }
];

const Blog = () => {
  const featured = BLOG_POSTS[0];
  const gridPosts = BLOG_POSTS.slice(1);

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <header className="blog-hero">
        <div className="container">
          <h1 className="blog-hero__title">Insights for Better Health</h1>
          <p className="blog-hero__subtext">
            Simple tips, guidance, and updates to help you make better healthcare choices for you and your family.
          </p>
        </div>
      </header>

      {/* Category Filter */}
      <nav className="blog-filter container">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Health Tips</button>
        <button className="filter-btn">Medicines</button>
        <button className="filter-btn">Wellness</button>
      </nav>

      {/* Featured Blog Section */}
      <section className="featured-blog">
        <div className="featured-card">
          <img src={featured.image} alt={featured.title} className="featured-card__image" />
          <div className="featured-card__content">
            <span className="featured-card__label">FEATURED POST</span>
            <h2 className="featured-card__title">{featured.title}</h2>
            <p className="featured-card__desc">{featured.desc}</p>
            <Link to={`/blog/${featured.id}`} className="read-more">
              Read More 
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="blog-grid-container">
        <div className="blog-grid">
          {gridPosts.map(post => (
            <article key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} className="blog-card__image" />
              <div className="blog-card__body">
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__desc">{post.desc}</p>
                <Link to={`/blog/${post.id}`} className="read-more">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
            </article>
          ))}
          {/* Adding one more to make it 6 total as requested (featured + 5 in grid, or 6 in grid?) 
              The prompt says "Display one large featured blog post" AND "Display 6 blog cards in grid layout". 
              So I'll add one more dummy post to the grid to make it 6 grid items + 1 featured. */}
          <article className="blog-card">
            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" alt="Healthcare Updates" className="blog-card__image" />
            <div className="blog-card__body">
              <h3 className="blog-card__title">New Breakthroughs in Chronic Pain Management</h3>
              <p className="blog-card__desc">How recent medical advancements are helping patients lead pain-free lives.</p>
              <Link to="/blog" className="read-more">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Blog;
