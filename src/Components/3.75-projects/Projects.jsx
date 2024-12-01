import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import './projects.css';
import { projectsData } from './projectsData';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { 
  SiReact, 
  SiJavascript, 
  SiHtml5, 
  SiTailwindcss, 
  SiNextdotjs,
  SiFirebase
} from 'react-icons/si';
import { BsCodeSlash } from 'react-icons/bs';

const projectIcons = {
  react: SiReact,
  javascript: SiJavascript,
  html: SiHtml5,
  tailwind: SiTailwindcss,
  nextjs: SiNextdotjs,
  firebase: SiFirebase,
  default: BsCodeSlash
};

const Projects = () => {
  const { currentLang } = useLanguage();
  const [activeProject, setActiveProject] = useState(0);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showTechnical, setShowTechnical] = useState(false);

  const handleProjectClick = (index) => {
    setActiveProject(index);
  };

  const toggleDescription = (index) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleDescriptionType = () => {
    setShowTechnical(prev => !prev);
  };

  const getIconComponent = (iconName) => {
    const IconComponent = projectIcons[iconName?.toLowerCase()] || projectIcons.default;
    return <IconComponent size="100%" />;
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <h2 className="section-title">
          {currentLang === 'en' ? 'Timeline of Work' : 'مسار العمل'}
        </h2>

        <div className="project-frame">
          <div className="timeline">
            <div className="timeline-icons">
              {projectsData[currentLang].map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`timeline-icon ${activeProject === index ? 'active' : ''}`}
                  onClick={() => handleProjectClick(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getIconComponent(project.technology)}
                </motion.div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="project-content"
            >
              <div className="project-image-container">
                <img 
                  src={projectsData[currentLang][activeProject].image}
                  alt={projectsData[currentLang][activeProject].title}
                  className="project-image"
                />
              </div>

              <div className="project-details">
                <div className="project-header">
                  <h3 className="project-title">
                    {projectsData[currentLang][activeProject].title}
                  </h3>
                  <div className="project-date">
                    {projectsData[currentLang][activeProject].date || '2024'}
                  </div>
                </div>
                
                <div className="description-toggle">
                  <button 
                    className={`toggle-btn ${!showTechnical ? 'active' : ''}`}
                    onClick={() => setShowTechnical(false)}
                  >
                    {currentLang === 'en' ? 'Overview' : 'نظرة عامة'}
                  </button>
                  <button 
                    className={`toggle-btn ${showTechnical ? 'active' : ''}`}
                    onClick={() => setShowTechnical(true)}
                  >
                    {currentLang === 'en' ? 'Technical Details' : 'تفاصيل تقنية'}
                  </button>
                </div>

                <p className={`project-description ${expandedDescriptions[activeProject] ? 'expanded' : ''}`}>
                  {showTechnical 
                    ? (projectsData[currentLang][activeProject].technicalDescription || projectsData[currentLang][activeProject].description)
                    : (projectsData[currentLang][activeProject].description)}
                </p>
                
                <button 
                  onClick={() => toggleDescription(activeProject)}
                  className="read-more-btn"
                >
                  {expandedDescriptions[activeProject] 
                    ? (currentLang === 'en' ? 'Read Less' : 'عرض أقل') 
                    : (currentLang === 'en' ? 'Read More' : 'اقرأ المزيد')}
                </button>
                
                <div className="project-footer">
                  <div className="project-tech">
                    {projectsData[currentLang][activeProject].technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="project-links">
                    {projectsData[currentLang][activeProject].liveDemo && (
                      <a
                        href={projectsData[currentLang][activeProject].liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                    {projectsData[currentLang][activeProject].github && (
                      <a
                        href={projectsData[currentLang][activeProject].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FiGithub />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;