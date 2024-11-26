import React, { useState, useEffect } from 'react';
import './hero.css';
import Lottie from 'lottie-react';

import { motion, AnimatePresence } from "framer-motion"
import { FaBullseye, FaChartLine, FaLaptopCode, FaMoneyBillWave, FaRocket } from 'react-icons/fa';

function Hero() {
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

  const orbitingElements = [
    {
      icon: <FaLaptopCode />,
      text: 'Development',
      color: '#864ff5', 
      delay: 0
    },
    {
      icon: <FaChartLine />,
      text: 'Marketing',
      color: '#4a9eff',
      delay: 0.2
    },
    {
      icon: <FaMoneyBillWave />,
      text: 'Sales', 
      color: '#ff6b6b',
      delay: 0.4
    },
    {
      icon: <FaRocket />,
      text: 'Business',
      color: '#4acf8c',
      delay: 0.6
    }
  ];

  return (
    <>
      <section className='hero flex'>
        <div className='left-section'>
          <div className="parent-avatar flex">
            <motion.img
              initial={{ transform: "scale(0)" }}
              animate={{ transform: "scale(1)" }}
              transition={{ damping: 6, type: "spring", stiffness: 100 }}
              src="./1.png"
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
            >
              MHARZI Abdelilah
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='title'
            >
              I'm a Software Engineer
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='sub-title'
            >
              Passionate about creating elegant solutions through code. 
              Specialized in building modern web applications with cutting-edge technologies.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="allicons flex"
            >
              <div className="icon icon-linkedin-square" title="LinkedIn"></div>
              <div className="icon icon-instagram" title="Instagram"></div>
              <div className="icon icon-github" title="GitHub"></div>
            </motion.div>
          </div>
        </div>

        <div className='right-section'>
          {isMobile && (
            <div className="orbit-wrapper">
              <motion.div 
                className="orbit-center"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 20px rgba(134, 79, 245, 0.2)",
                    "0 0 40px rgba(134, 79, 245, 0.4)",
                    "0 0 20px rgba(134, 79, 245, 0.2)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="center-icon"><FaBullseye /></span>
                <span className="center-text">Success</span>
              </motion.div>

              <div className="orbit-container">
                {orbitingElements.map((element, index) => (
                  <motion.div
                    key={index}
                    className="orbit-item"
                    style={{
                      '--orbit-color': element.color,
                      '--orbit-delay': `${index * -2}s`
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: element.delay }}
                  >
                    <div className="orbit-content">
                      <span className="orbit-icon">{element.icon}</span>
                      <span className="orbit-text">{element.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {isProfileEnlarged && (
        <>
          <div className="backdrop" onClick={handleCloseClick}></div>
          <img src="./1.png" className="enlarged-profile" alt="Enlarged Profile" />
          <div className="icon-close" onClick={handleCloseClick}></div>
        </>
      )}
    </>
  );
}

export default Hero;
