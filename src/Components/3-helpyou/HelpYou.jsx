import React from 'react';
import './helpyou.css';

import { motion } from 'framer-motion';

import { useLanguage } from '../../context/LanguageContext';

import { helpYouTranslations } from './translations';

import { FaArrowRight, FaArrowLeft, FaLaptopCode, FaPalette, FaRocket } from 'react-icons/fa';


function HelpYou() {

  const { currentLang } = useLanguage();

  const translations = helpYouTranslations[currentLang];

  const Arrow = currentLang === 'ar' ? FaArrowLeft : FaArrowRight;



  const icons = [FaLaptopCode, FaPalette, FaRocket];


  const containerVariants = {

    hidden: { opacity: 0 },

    visible: {

      opacity: 1,

      transition: {

        staggerChildren: 0.3

      }

    }

  };


  const itemVariants = {

    hidden: { opacity: 0, y: 20 },

    visible: {

      opacity: 1,

      y: 0,

      transition: {

        duration: 0.5,

        ease: "easeOut"

      }

    }

  };


  return (

    <section className={`help-you ${currentLang === 'ar' ? 'rtl' : ''}`}>

      <div className="background-pattern"></div>

      <motion.div

        className="help-you-container"

        variants={containerVariants}

        initial="hidden"

        whileInView="visible"

        viewport={{ once: true }}

      >

        <motion.div className="header-section" variants={itemVariants}>

          <h2 className="main-title">

            {translations.title}

            <span className="title-underline"></span>

          </h2>

          <p className="subtitle">{translations.subtitle}</p>

        </motion.div>


        <motion.h3 className="work-title" variants={itemVariants}>

          {translations.workTitle}

        </motion.h3>


        <div className="cards-container">

          {translations.cards.map((card, index) => (

            <React.Fragment key={index}>

              <motion.div 

                className="card"

                variants={itemVariants}

                whileHover={{ 

                  scale: 1.03,

                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)"

                }}

              >

                <div className="card-icon">

                  {React.createElement(icons[index], { className: 'icon' })}

                </div>

                <p>{card}</p>

              </motion.div>

              {index < translations.cards.length - 1 && (

                <motion.div 

                  className="arrow-container"

                  variants={itemVariants}

                >

                  <Arrow className="arrow-icon" />

                </motion.div>

              )}

            </React.Fragment>

          ))}

        </div>


        <motion.div 
          className="cta-container"
          variants={itemVariants}
        >
          <motion.p 
            className="cta-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {translations.callToAction}
          </motion.p>
          <motion.button 
            className="cta-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentLang === 'ar' ? ' دع موقعك يروي قصتك' : 'Let your website tell your story'}
            {currentLang === 'ar' ? <FaArrowLeft className="button-icon" /> : <FaArrowRight className="button-icon" />}
          </motion.button>
        </motion.div>

      </motion.div>

    </section>

  );

}


export default HelpYou;