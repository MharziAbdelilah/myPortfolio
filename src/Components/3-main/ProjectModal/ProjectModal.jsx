import React, { useState } from 'react';
import './ProjectModal.css';
import { motion } from 'framer-motion';

const ProjectModal = ({ project, onClose, isOpen }) => {
  const [viewMode, setViewMode] = useState('technical'); // 'technical' or 'simple'

  if (!isOpen || !project) return null;

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
          <div className="project-images">
            {project.images?.length > 0 ? (
              project.images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${project.projectTitle} screenshot ${index + 1}`} 
                />
              ))
            ) : (
              <img 
                src={project.imgPath} 
                alt={project.projectTitle} 
              />
            )}
          </div>
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