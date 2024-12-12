import React from 'react';

const ArticleCard = ({ article, isRTL }) => {
  return (
    <article className="article-card">
      <div className="article-left-section">
        <div className="article-date">
          {isRTL ? article.date.ar : article.date.en}
        </div>
        <div className="vertical-line"></div>
      </div>
      
      <div className="article-content">
        <h2 className="article-title">
          {isRTL ? article.title.ar : article.title.en}
        </h2>
        <p className="article-description">
          {isRTL ? article.description.ar : article.description.en}
        </p>
        <div className="article-link">
          <a href="#">
            {isRTL ? 'اقرأ المقال ←' : 'Read article →'}
          </a>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
