import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import startupArticles from '../data/startup/articles.json';
import aiArticles from '../data/ai/articles.json';
import saasArticles from '../data/saas/articles.json';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShare, FaClock, FaFacebookF, FaTwitter, FaLinkedinIn, FaTags, FaArrowUp, FaBookmark, FaRegBookmark, FaArrowLeft } from 'react-icons/fa';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const isArabic = currentLang === 'ar';
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showTableOfContents, setShowTableOfContents] = useState(true);
  
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const sectionRefs = useRef({});

  // Combine all articles
  const allArticles = [
    ...startupArticles.articles,
    ...aiArticles.articles,
    ...saasArticles.articles
  ];

  const article = allArticles.find(a => a.id === id);

  useEffect(() => {
    if (article) {
      const related = allArticles
        .filter(a => a.category === article.category && a.id !== article.id)
        .slice(0, 3);
      setRelatedArticles(related);
    }
    window.scrollTo(0, 0);
    
    // Check if article is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarked(bookmarks.includes(id));
  }, [article, id]);

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 300);

      // Calculate reading progress
      if (contentRef.current) {
        const totalHeight = contentRef.current.clientHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / (totalHeight - windowHeight)) * 100;
        setReadingProgress(Math.min(Math.max(progress, 0), 100));
      }

      // Update active section
      if (sectionRefs.current) {
        const headerHeight = headerRef.current?.clientHeight || 0;
        const scrollPosition = window.scrollY + headerHeight + 50;

        for (const [id, ref] of Object.entries(sectionRefs.current)) {
          if (ref && ref.offsetTop <= scrollPosition) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const headerHeight = headerRef.current?.clientHeight || 0;
      const top = section.offsetTop - headerHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (bookmarked) {
      const newBookmarks = bookmarks.filter(b => b !== id);
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    } else {
      bookmarks.push(id);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    setBookmarked(!bookmarked);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = isArabic ? article.title.ar : article.title.en;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      default:
        break;
    }
  };

  const getTableOfContents = () => {
    if (!article) return [];
    return article.content
      .filter(item => item.type === 'subtitle')
      .map((item, index) => ({
        id: `section-${index}`,
        title: isArabic ? item.content.ar : item.content.en
      }));
  };

  const renderContent = (contentItem, index) => {
    switch (contentItem.type) {
      case 'text':
        return (
          <motion.p
            className="article-paragraph"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {isArabic ? contentItem.content.ar : contentItem.content.en}
          </motion.p>
        );
      case 'image':
        return (
          <motion.div
            className="article-image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <img 
              src={contentItem.url} 
              alt={isArabic ? contentItem.caption.ar : contentItem.caption.en}
              loading="lazy"
            />
            <p className="image-caption">
              {isArabic ? contentItem.caption.ar : contentItem.caption.en}
            </p>
          </motion.div>
        );
      case 'subtitle':
        return (
          <motion.h3
            ref={el => sectionRefs.current[`section-${index}`] = el}
            className="article-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {isArabic ? contentItem.content.ar : contentItem.content.en}
          </motion.h3>
        );
      case 'list':
        return (
          <motion.ul
            className="article-list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {contentItem.items.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index * 0.1) + (idx * 0.05) }}
              >
                {isArabic ? item.ar : item.en}
              </motion.li>
            ))}
          </motion.ul>
        );
      case 'code':
        return (
          <motion.div
            className="code-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SyntaxHighlighter
              language={contentItem.language}
              style={atomOneDark}
              showLineNumbers={true}
            >
              {contentItem.content}
            </SyntaxHighlighter>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (!article) {
    return (
      <div className="article-not-found">
        <h2>{isArabic ? 'المقال غير موجود' : 'Article not found'}</h2>
        <Link to="/articles" className="back-link">
          {isArabic ? 'العودة إلى المقالات' : 'Back to Articles'}
        </Link>
      </div>
    );
  }

  const tableOfContents = getTableOfContents();

  return (
    <article className={`article-page ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="article-container"
      >
        <button onClick={() => navigate('/articles')} className="back-button">
          <FaArrowLeft /> {currentLang === 'ar' ? 'المقالات' : 'Articles'}
        </button>

        <header ref={headerRef} className="article-header">
          <motion.h1
            className="article-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isArabic ? article.title.ar : article.title.en}
          </motion.h1>
          
          <div className="article-meta">
            <div className="meta-item">
              <FaClock />
              <span>{isArabic ? article.date.ar : article.date.en}</span>
            </div>
            <div className="meta-item">
              <FaTags />
              <span>{isArabic ? getCategoryName(article.category).ar : getCategoryName(article.category).en}</span>
            </div>
            <div className="meta-item">
              <button
                className="bookmark-button"
                onClick={toggleBookmark}
                aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
              </button>
            </div>
            <div className="meta-item share-wrapper">
              <button
                className="share-button"
                onClick={() => setShowShareMenu(!showShareMenu)}
                aria-label="Share article"
              >
                <FaShare />
                <span>{isArabic ? 'مشاركة' : 'Share'}</span>
              </button>
              
              <AnimatePresence>
                {showShareMenu && (
                  <motion.div
                    className="share-menu"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <button onClick={() => handleShare('facebook')}>
                      <FaFacebookF /> Facebook
                    </button>
                    <button onClick={() => handleShare('twitter')}>
                      <FaTwitter /> Twitter
                    </button>
                    <button onClick={() => handleShare('linkedin')}>
                      <FaLinkedinIn /> LinkedIn
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {tableOfContents.length > 0 && (
          <div className={`table-of-contents ${isArabic ? 'rtl' : ''}`}>
            <h3 className="toc-heading">
              {isArabic ? 'المحتويات' : 'Contents'}
            </h3>
            <nav className="toc-content">
              {tableOfContents.map((section) => (
                <button
                  key={section.id}
                  className={`toc-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        )}

        <div ref={contentRef} className="article-content">
          {article.content.map((contentItem, index) => (
            <div key={index}>
              {renderContent(contentItem, index)}
            </div>
          ))}
        </div>

        {relatedArticles.length > 0 && (
          <div className="related-articles">
            <h3>{isArabic ? 'مقالات ذات صلة' : 'Related Articles'}</h3>
            <div className="related-articles-grid">
              {relatedArticles.map((relatedArticle, index) => (
                <Link
                  key={index}
                  to={`/articles/${relatedArticle.id}`}
                  className="related-article-card"
                >
                  <h4>{isArabic ? relatedArticle.title.ar : relatedArticle.title.en}</h4>
                  <p>{isArabic ? relatedArticle.description.ar : relatedArticle.description.en}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </article>
  );
};

const getCategoryName = (category) => {
  const categories = {
    startup: {
      en: 'Startup',
      ar: 'الشركات الناشئة'
    },
    ai: {
      en: 'AI & Automation',
      ar: 'الذكاء الاصطناعي والأتمتة'
    },
    saas: {
      en: 'SaaS',
      ar: 'البرمجيات كخدمة'
    }
  };
  return categories[category] || { en: category, ar: category };
};

export default ArticlePage;
