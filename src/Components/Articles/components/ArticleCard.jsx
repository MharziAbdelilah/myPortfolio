import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article, isArabic }) => {
  return (
    <article className="article-card">
      <div className="article-left-section">
        <div className="article-date">
          {isArabic ? article.date.ar : article.date.en}
        </div>
        <div className="vertical-line"></div>
      </div>
      
      <div className="article-content">
        <h2 className="article-title">
          {isArabic ? article.title.ar : article.title.en}
        </h2>
        <p className="article-description">
          {isArabic ? article.description.ar : article.description.en}
        </p>
        <div className="article-link">
          <Link to={`/articles/${article.id}`}>
            {isArabic ? 'اقرأ المقال ←' : 'Read article →'}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
