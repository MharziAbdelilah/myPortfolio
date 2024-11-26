import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import './ProjectModal.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('non-technical');

  // Use project images array or fallback to single image
  const projectImages = project?.images || [project?.image];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>×</button>

            <div className="modal-image-gallery">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                className="modal-swiper"
              >
                {projectImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <motion.div 
                      className="gallery-image-container"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <img src={image} alt={`${project.title} - View ${index + 1}`} />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="modal-scroll-content">
              <div className="modal-info">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="modal-title"
                >
                  {project.title}
                </motion.h2>

                <div className="tab-buttons">
                  <button 
                    className={`tab-button ${activeTab === 'non-technical' ? 'active' : ''}`}
                    onClick={() => setActiveTab('non-technical')}
                  >
                    General Overview
                  </button>
                  <button 
                    className={`tab-button ${activeTab === 'technical' ? 'active' : ''}`}
                    onClick={() => setActiveTab('technical')}
                  >
                    Technical Details
                  </button>
                </div>

                <motion.div 
                  className="tab-content"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {activeTab === 'non-technical' ? (
                    <div className="non-technical-content">
                      <p>{project.nonTechnicalDescription || project.description}</p>
                      <div className="project-impact">
                        <h3>Key Features</h3>
                        <ul>
                          {project.keyFeatures?.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="technical-content">
                      <div className="tech-stack-detailed">
                        <h3>Technology Stack</h3>
                        <div className="tech-tags">
                          {project.technologies.map((tech, index) => (
                            <span key={index} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                      <div className="technical-details">
                        <h3>Technical Implementation</h3>
                        <p>{project.technicalDescription}</p>
                      </div>
                    </div>
                  )}
                </motion.div>

                <div className="modal-actions">
                  <a 
                    href={project.liveDemo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="demo-link"
                  >
                    View Live Demo
                  </a>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    View Source Code
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal; 