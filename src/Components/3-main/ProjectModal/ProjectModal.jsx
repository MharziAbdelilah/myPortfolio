import React, { useState, useRef, useEffect } from 'react';
import './ProjectModal.css';
import { motion } from 'framer-motion';

const ProjectModal = ({ project, onClose, isOpen }) => {
  const [viewMode, setViewMode] = useState('technical');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imagesRef = useRef(null);
  const scrollPosition = useRef(0);

  // Get images array safely
  const getImages = () => {
    if (!project) return [];
    return project.images?.length > 0 ? project.images : [project.imgPath];
  };

  // Lock body scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      scrollPosition.current = window.pageYOffset;
      document.body.classList.add('modal-open');
      document.body.style.top = `-${scrollPosition.current}px`;
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
      window.scrollTo(0, scrollPosition.current);
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
    };
  }, [isOpen]);

  // Updated image scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (imagesRef.current) {
        const container = imagesRef.current;
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        
        // Calculate current image index based on scroll position
        const currentIndex = Math.min(
          Math.floor((scrollLeft + containerWidth / 2) / containerWidth),
          getImages().length - 1
        );
        
        setCurrentImageIndex(currentIndex);
      }
    };

    const imagesContainer = imagesRef.current;
    if (imagesContainer) {
      imagesContainer.addEventListener('scroll', handleScroll);
      
      // Use 'scrollend' event with fallback
      if ('onscrollend' in window) {
        imagesContainer.addEventListener('scrollend', handleScroll);
      }

      return () => {
        imagesContainer.removeEventListener('scroll', handleScroll);
        if ('onscrollend' in window) {
          imagesContainer.removeEventListener('scrollend', handleScroll);
        }
      };
    }
  }, [project]); // Changed dependency to project

  // Updated scrollToImage function
  const scrollToImage = (index) => {
    if (imagesRef.current) {
      const imageWidth = imagesRef.current.offsetWidth;
      imagesRef.current.scrollTo({
        left: imageWidth * index,
        behavior: 'smooth'
      });
      setCurrentImageIndex(index);
    }
  };

  if (!isOpen || !project) return null;

  const images = getImages();

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.5 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-left">
          <div 
            className="project-images" 
            ref={imagesRef}
            onTouchStart={() => {}}
          >
            {images.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`${project.projectTitle} screenshot ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                onLoad={() => {
                  if (index === currentImageIndex) {
                    setCurrentImageIndex(index);
                  }
                }}
              />
            ))}
          </div>
          {images.length > 0 && (
            <>
              <div className="image-counter">
                {currentImageIndex + 1} / {images.length}
              </div>
              <div className="image-dots">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                    onClick={() => scrollToImage(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="modal-right">
          <h2>{project.projectTitle}</h2>
          
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'technical' ? 'active' : ''}`}
              onClick={() => setViewMode('technical')}
            >
              Technical View
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'simple' ? 'active' : ''}`}
              onClick={() => setViewMode('simple')}
            >
              Simple View
            </button>
          </div>

          <div className="description-content">
            {viewMode === 'technical' ? (
              <>
                <p className="project-description">
                  {project.technicalDescription || project.description}
                </p>
                {project.technologies?.length > 0 && (
                  <div className="project-tech-stack">
                    <h3>Technologies Used:</h3>
                    <div className="tech-tags">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
                {project.technicalFeatures && (
                  <div className="technical-features">
                    <h3>Key Technical Features:</h3>
                    <ul>
                      {project.technicalFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="simple-view">
                <p className="project-description">
                  {project.simpleDescription || project.shortDescription}
                </p>
                {project.keyFeatures && (
                  <div className="key-features">
                    <h3>Main Features:</h3>
                    <ul>
                      {project.keyFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="modal-buttons">
            {project.liveDemo && (
              <button 
                className="modal-btn primary" 
                onClick={() => window.open(project.liveDemo, '_blank')}
              >
                Live Demo
              </button>
            )}
            {project.sourceCode && (
              <button 
                className="modal-btn secondary" 
                onClick={() => window.open(project.sourceCode, '_blank')}
              >
                Source Code
              </button>
            )}
          </div>
          
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal; 