import React, { useState } from 'react';
import './new.css';

const News = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <section className="news-section">
      <div className="news-container">
        <div className="news-icon">
          <i className="icon-newspaper"></i>
        </div>
        <h2 className="news-title">
          Stay Updated
        </h2>
        <p className="news-description">
          Subscribe to our newsletter for the latest updates and exclusive content.
        </p>
        <form className="subscription-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="subscribe-input"
            />
            <button type="submit" className="subscribe-button">
              Subscribe <i className="icon-arrow-right"></i>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default News;
