import React, { useState } from 'react';
import './new.css';
import { useLanguage } from '../../context/LanguageContext';
import { newsTranslations } from './translations';

const News = () => {
  const [email, setEmail] = useState('');
  const { currentLang } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <section className={`news-section ${currentLang === 'ar' ? 'rtl' : ''}`}>
      <div className="news-container">
        <div className="news-icon">
          <i className="icon-newspaper"></i>
        </div>
        <h2 className="news-title">
          {newsTranslations[currentLang].title}
        </h2>
        <p className="news-description">
          {newsTranslations[currentLang].description}
        </p>
        <form className="subscription-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={newsTranslations[currentLang].inputPlaceholder}
              required
              className="subscribe-input"
            />
            <button type="submit" className="subscribe-button">
              {newsTranslations[currentLang].buttonText} 
              <i className={`icon-arrow-${currentLang === 'ar' ? 'left' : 'right'}`}></i>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default News;
