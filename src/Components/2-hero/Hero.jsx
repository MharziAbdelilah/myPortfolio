import React, { useState, useEffect } from 'react';
import './hero.css';
import Lottie from 'lottie-react';
import pcAnimation from '../../animation/Pc.json';
import { motion } from "framer-motion"

function Hero() {
  const [isProfileEnlarged, setIsProfileEnlarged] = useState(false);

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
          <motion.div 
            className='animation'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Lottie animationData={pcAnimation} />
          </motion.div>
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
