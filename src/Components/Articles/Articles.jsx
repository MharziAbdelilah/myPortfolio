import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ArticleCard from './components/ArticleCard';
import SearchBar from './components/SearchBar';
import articlesData from './data/articles.json';
import './articles.css';

const Articles = () => {
  const { currentLang } = useLanguage();
  const isArabic = currentLang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articlesData.articles.filter(article => {
    const searchText = searchQuery.toLowerCase();
    const title = isArabic ? article.title.ar : article.title.en;
    const description = isArabic ? article.description.ar : article.description.en;
    
    return (
      title.toLowerCase().includes(searchText) ||
      description.toLowerCase().includes(searchText)
    );
  });

  return (
    <section className={`articles__component ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="articles-section">
        <div className="container">
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isArabic={isArabic}
          />
          <div className="articles-grid">
            {filteredArticles.map((article, index) => (
              <ArticleCard 
                key={index}
                article={article}
                isArabic={isArabic}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;
