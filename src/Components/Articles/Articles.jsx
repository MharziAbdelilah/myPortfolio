import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import ArticleCard from './components/ArticleCard';
import SearchBar from './components/SearchBar';
import startupArticles from './data/startup/articles.json';
import aiArticles from './data/ai/articles.json';
import saasArticles from './data/saas/articles.json';
import { FaThLarge, FaList, FaSort, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import './articles.css';

const Articles = () => {
  const { currentLang } = useLanguage();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category');

  const isArabic = currentLang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [showSortOptions, setShowSortOptions] = useState(false);

  // Scroll to top when component mounts or category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory]);

  // Update category when URL parameter changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const categories = {
    all: {
      en: 'All Articles',
      ar: 'جميع المقالات',
      color: '#7765b9'
    },
    startup: {
      en: 'Startup',
      ar: 'الشركات الناشئة',
      color: '#FF6B6B'
    },
    ai: {
      en: 'AI & Automation',
      ar: 'الذكاء الاصطناعي والأتمتة',
      color: '#4ECDC4'
    },
    saas: {
      en: 'SaaS',
      ar: 'البرمجيات كخدمة',
      color: '#45B7D1'
    }
  };

  const sortOptions = {
    newest: { en: 'Newest First', ar: 'الأحدث أولاً' },
    oldest: { en: 'Oldest First', ar: 'الأقدم أولاً' },
    titleAsc: { en: 'Title (A-Z)', ar: 'العنوان (أ-ي)' },
    titleDesc: { en: 'Title (Z-A)', ar: 'العنوان (ي-أ)' }
  };

  // Combine all articles
  const allArticles = [
    ...startupArticles.articles,
    ...aiArticles.articles,
    ...saasArticles.articles
  ];

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const sortArticles = (articles) => {
    switch (sortBy) {
      case 'newest':
        return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'oldest':
        return [...articles].sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'titleAsc':
        return [...articles].sort((a, b) => {
          const titleA = isArabic ? a.title.ar : a.title.en;
          const titleB = isArabic ? b.title.ar : b.title.en;
          return titleA.localeCompare(titleB);
        });
      case 'titleDesc':
        return [...articles].sort((a, b) => {
          const titleA = isArabic ? a.title.ar : a.title.en;
          const titleB = isArabic ? b.title.ar : b.title.en;
          return titleB.localeCompare(titleA);
        });
      default:
        return articles;
    }
  };

  const filteredArticles = sortArticles(allArticles.filter(article => {
    const searchText = searchQuery.toLowerCase();
    const title = isArabic ? article.title.ar : article.title.en;
    const description = isArabic ? article.description.ar : article.description.en;
    const matchesSearch = title.toLowerCase().includes(searchText) ||
                         description.toLowerCase().includes(searchText);
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className={`articles__component ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="articles-section">
        <div className="container">
          <div className="articles-header">
            <div className="search-filter-container">
              <div className="search-wrapper">
                <SearchBar 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  isArabic={isArabic}
                />
                <div className="categories-filter">
                  {Object.entries(categories).map(([key, category]) => (
                    <motion.button
                      key={key}
                      className={`category-button ${selectedCategory === key ? 'active' : ''}`}
                      style={{
                        '--button-color': category.color,
                        backgroundColor: selectedCategory === key ? `${category.color}20` : 'transparent',
                        color: selectedCategory === key ? category.color : 'var(--text-color)'
                      }}
                      onClick={() => setSelectedCategory(key)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isArabic ? category.ar : category.en}
                      {selectedCategory === key && (
                        <motion.div
                          className="active-indicator"
                          layoutId="activeCategory"
                          style={{ backgroundColor: category.color }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="view-controls">
              <div className="sort-control">
                <button 
                  className="sort-button"
                  onClick={() => setShowSortOptions(!showSortOptions)}
                >
                  <FaSort />
                  <span>{isArabic ? sortOptions[sortBy].ar : sortOptions[sortBy].en}</span>
                </button>
                
                <AnimatePresence>
                  {showSortOptions && (
                    <motion.div 
                      className="sort-options"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {Object.entries(sortOptions).map(([key, value]) => (
                        <motion.button
                          key={key}
                          className={`sort-option ${sortBy === key ? 'active' : ''}`}
                          onClick={() => {
                            setSortBy(key);
                            setShowSortOptions(false);
                          }}
                          whileHover={{ x: 5 }}
                        >
                          {isArabic ? value.ar : value.en}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="view-mode-buttons">
                <motion.button 
                  className={`view-mode-button ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaThLarge />
                </motion.button>
                <motion.button 
                  className={`view-mode-button ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaList />
                </motion.button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                className="loading-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="loading-spinner"></div>
              </motion.div>
            ) : (
              <motion.div 
                className={`articles-${viewMode}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article, index) => (
                    <ArticleCard 
                      key={article.id || index}
                      article={article}
                      isArabic={isArabic}
                      viewMode={viewMode}
                    />
                  ))
                ) : (
                  <motion.div 
                    className="no-results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <img 
                      src="/path-to-your-no-results-image.svg" 
                      alt={isArabic ? "لا توجد نتائج" : "No results found"}
                    />
                    <h3>{isArabic ? "لا توجد نتائج" : "No results found"}</h3>
                    <p>
                      {isArabic 
                        ? "جرب البحث بكلمات مختلفة أو تصفية مختلفة" 
                        : "Try searching with different terms or filters"}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Articles;
