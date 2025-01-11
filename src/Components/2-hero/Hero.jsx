import React, { useState, useEffect } from 'react';
import './hero.css';
import { motion, AnimatePresence } from "framer-motion";
import { FaBullseye, FaChartLine, FaLaptopCode, FaMoneyBillWave, FaRocket } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useLanguage } from '../../context/LanguageContext';
import { heroTranslations } from './translations';

function Hero() {
  const { currentLang } = useLanguage();  
  const [isProfileEnlarged, setIsProfileEnlarged] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleProfileClick = () => {
    setIsProfileEnlarged(true);
    document.body.classList.add('blurred');
  };

  const handleCloseClick = () => {
    setIsProfileEnlarged(false);
    document.body.classList.remove('blurred');
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove('blurred');
    };
  }, []);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360); 
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const calculatePosition = (angle, index) => {
    const baseRadius = isMobile ? 110 : 150; 
    const radius = hoveredIndex === index ? baseRadius * 1.1 : baseRadius; 
    const radian = ((angle + rotation) * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius
    };
  };

  const orbitingElements = [
    {
      icon: <FaBullseye />,
      text: "Success",
      color: '#ffd700',
      isCenter: true,
      scale: 1.2
    },
    {
      icon: <FaLaptopCode />,
      text: heroTranslations[currentLang].orbitElements[0].text,
      color: '#864ff5',
      angle: 0,
      scale: 1
    },
    {
      icon: <FaChartLine />,
      text: heroTranslations[currentLang].orbitElements[1].text,
      color: '#4a9eff',
      angle: 90,
      scale: 1
    },
    {
      icon: <FaMoneyBillWave />,
      text: heroTranslations[currentLang].orbitElements[2].text,
      color: '#ff6b6b',
      angle: 180,
      scale: 1
    },
    {
      icon: <FaRocket />,
      text: heroTranslations[currentLang].orbitElements[3].text,
      color: '#4acf8c',
      angle: 270,
      scale: 1
    }
  ];

  return (
    <>
      <section className={`hero flex ${currentLang === 'ar' ? 'rtl' : ''}`}>
        <div className='left-section'>
          <div className="parent-avatar flex">
            <motion.img
              initial={{ transform: "scale(0)" }}
              animate={{ transform: "scale(1)" }}
              transition={{ damping: 6, type: "spring", stiffness: 100 }}
              src="./img/Abdelilah mharzi.avif"
              className='avatar'
              alt="Profile"
              onClick={handleProfileClick}
            />
            <div className='icon-verified'></div>
          </div>

          <div className='text-container'>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='name-text'
              lang={currentLang}
            >
              {heroTranslations[currentLang].name}
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='title'
              lang={currentLang}
            >
              {heroTranslations[currentLang].title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='sub-title'
              lang={currentLang}
            >
              {heroTranslations[currentLang].subtitle}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="allicons flex"
            >
              <a href="https://www.linkedin.com/in/abdelilah-mharzi/" target="_blank" rel="noopener noreferrer">
                <div className="icon icon-linkedin-square" title="LinkedIn"></div>
              </a>
              <a href="https://www.instagram.com/abdelillah.mh3" target="_blank" rel="noopener noreferrer">
                <div className="icon icon-instagram" title="Instagram"></div>
              </a>
              <a href="https://x.com/MhAbdel0" target="_blank" rel="noopener noreferrer">
                <div className="icon icon-x">
                  <FaXTwitter title="X" />
                </div>
              </a>
            </motion.div>
          </div>
        </div>

        <div className='right-section'>
          {isMobile && (
            <div className="orbit-container">
              {orbitingElements.map((element, index) => {
                if (element.isCenter) {
                  return (
                    <motion.div
                      key="center"
                      className="orbit-element center-element"
                      style={{
                        backgroundColor: element.color,
                      }}
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: element.scale,
                        rotate: rotation * -1 
                      }}
                      transition={{ 
                        scale: { duration: 0.5 },
                        rotate: { duration: 0.1, ease: "linear" }
                      }}
                    >
                      {element.icon}
                      <span>{element.text}</span>
                    </motion.div>
                  );
                }

                const position = calculatePosition(element.angle, index);
                return (
                  <motion.div
                    key={index}
                    className="orbit-element"
                    style={{
                      backgroundColor: element.color,
                    }}
                    animate={{
                      x: position.x,
                      y: position.y,
                      scale: hoveredIndex === index ? 1.15 : 1,
                      rotate: rotation * -1 
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "linear"
                    }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    whileHover={{ 
                      zIndex: 20,
                    }}
                  >
                    {element.icon}
                    <span>{element.text}</span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {isProfileEnlarged && (
        <>
          <div className="backdrop" onClick={handleCloseClick}></div>
          <img src="./img/Abdelilah mharzi.avif" className="enlarged-profile" alt="Enlarged Profile" />
          <div className="icon-close" onClick={handleCloseClick}></div>
        </>
      )}
    </>
  );
}

export default Hero;
