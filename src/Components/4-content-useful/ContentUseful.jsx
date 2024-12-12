import React from 'react';
import { motion } from 'framer-motion';
import './ContentUseful.css';
import { contentData } from './contentData';
import { contentTranslations } from './translations';
import { useLanguage } from '../../context/LanguageContext';

const ContentUseful = () => {
  const { currentLang } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section  className={`content-useful ${currentLang === 'ar' ? 'rtl' : ''}`} id="content-useful">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="content-useful__container"
      >
        <motion.h2 
          className="section__title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {contentTranslations[currentLang].title}
        </motion.h2>
        <motion.span 
          className="section__subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {contentTranslations[currentLang].subtitle}
        </motion.span>

        <motion.div 
          className="content-useful__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contentData[currentLang].map((content) => (
            <motion.div
              key={content.id}
              className="content-card"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              style={{
                '--card-color': content.color
              }}
            >
              <div className="content-card__header">
                <div className="content-card__icon-wrapper">
                  <content.Icon className="content-card__icon" />
                </div>
                <span className="content-card__category">{content.category}</span>
              </div>
              
              <h3 className="content-card__title">{content.title}</h3>
              <p className="content-card__description">{content.description}</p>
              
              <motion.button 
                className="content-card__button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  console.log(`Learn more about ${content.title}`);
                }}
              >
                {contentTranslations[currentLang].buttonText}
                <i className={`bx bx-${currentLang === 'ar' ? 'left' : 'right'}-arrow-alt content-card__button-icon`}></i>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContentUseful; 