import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from './Blog';
import './BlogDetails.css';

const BlogDetails = () => {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.id === parseInt(id)) || BLOG_POSTS[0];

  return (
    <div className="blog-details-page">
      <div className="blog-details-hero">
        <img src={post.image} alt={post.title} />
      </div>

      <article className="blog-details-container">
        <Link to="/blog" className="back-to-blog">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Blog
        </Link>

        <div className="blog-details-meta">
          <span className="blog-details-category">{post.category}</span>
          <span className="blog-details-date">May 15, 2026 • 5 min read</span>
        </div>

        <h1 className="blog-details-title">{post.title}</h1>

        <div className="blog-details-content">
          <p>
            Healthcare is one of the most important aspects of our lives, yet it often remains one of the most complex to navigate. 
            At RemediCart, our goal is to simplify this journey. In this article, we dive deep into {post.title.toLowerCase()}, 
            providing you with actionable insights and professional guidance.
          </p>

          <h2>Why This Matters</h2>
          <p>
            Understanding {post.category.toLowerCase()} is crucial for maintaining long-term health. Many people overlook the 
            subtle signs and symptoms that can lead to more significant issues if left unaddressed. By staying informed, 
            you take the first step towards proactive wellness.
          </p>

          <blockquote>
            "Knowledge is the first medicine for any illness." — RemediCart Health Team
          </blockquote>

          <h2>Our Recommendations</h2>
          <p>
            Based on current medical research and best practices, we recommend focusing on consistency and quality. 
            Whether it's following a specific medication schedule or adopting new wellness habits, the key is 
            to start small and stay dedicated.
          </p>

          <p>
            {post.desc}
          </p>

          <p>
            Stay tuned for more updates and in-depth guides from the RemediCart team. Your health is our priority, 
            and we're here to support you every step of the way.
          </p>
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;
