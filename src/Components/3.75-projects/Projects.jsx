import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './projects.css';
import { projectsData } from './projectsData';
import googleLogo from '../../assets/logos/google-logo-hq.svg';
import staticBarber from '../../assets/logos/static-barber.svg';
import githubIcon from '../../assets/logos/github.svg';
import liveViewIcon from '../../assets/logos/live-view.svg';

// Import all barbershop images
import allViewbarber from '../../assets/project-images/barbershop/allViewbarber.webp';
import viewDashboard from '../../assets/project-images/barbershop/view dashbord.webp';
import dashboardJalal from '../../assets/project-images/barbershop/dashbord jalalbarber.webp';
import reservationJalal from '../../assets/project-images/barbershop/reservation jalalbarber.webp';
import confirmationWhatsapp from '../../assets/project-images/barbershop/confirmation whatssap.webp';
import animationReservation from '../../assets/project-images/barbershop/annumationReservation.webp';
import canceledReservation from '../../assets/project-images/barbershop/cancled reservation.webp';
import closedApp from '../../assets/project-images/barbershop/closed app.webp';
import loginJalal from '../../assets/project-images/barbershop/login jalalbarber.PNG';
import registerJalal from '../../assets/project-images/barbershop/register jalalbarber.PNG';

// Update projectsData with imported images in the new order
const projectImages = [
  loginJalal,            // 1. Login (Main image)
  registerJalal,         // 2. Register
  reservationJalal,      // 3. Reservation
  dashboardJalal,        // 4. Dashboard
  confirmationWhatsapp,  // 5. Confirmation
  animationReservation,  // 6. Animation
  canceledReservation,   // 7. Canceled
  viewDashboard,         // 8. View Dashboard
  allViewbarber,         // 9. All View
  closedApp             // 10. Closed App
];

const projectIcons = {
  react: staticBarber,
  javascript: googleLogo,
  html: googleLogo,
  tailwind: googleLogo,
  nextjs: googleLogo,
  firebase: googleLogo,
  webpack: googleLogo,
  vite: googleLogo,
  typescript: googleLogo,
  python: googleLogo,
  nodejs: googleLogo,
  vue: googleLogo,
  web: googleLogo,
  project: googleLogo,
  package: googleLogo,
  code: googleLogo,
  default: googleLogo
};

const Projects = () => {
  const { currentLang } = useLanguage();
  const [activeProject, setActiveProject] = useState(0);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showTechnical, setShowTechnical] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);

  const handleProjectClick = (index) => {
    setActiveProject(index);
  };

  const toggleDescription = (index) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getIconComponent = (iconName) => {
    const isBarberIcon = iconName?.toLowerCase() === 'react';
    return <img 
      src={projectIcons[iconName?.toLowerCase()] || projectIcons.default} 
      alt="Project Icon" 
      className={`project-icon ${isBarberIcon ? 'barber-icon' : ''}`}
      style={{ 
        width: isBarberIcon ? '32px' : '24px', 
        height: isBarberIcon ? '32px' : '24px', 
        objectFit: 'contain',
        filter: isBarberIcon ? 'var(--icon-filter, brightness(1))' : 'none'
      }} 
    />;
  };

  const renderDescription = (content) => {
    return (
      <div 
        dangerouslySetInnerHTML={{ 
          __html: content 
        }} 
      />
    );
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <h2 className="section-title" lang={currentLang}>
          {currentLang === 'en' ? 'Work & Projects' : 'عمل ومشاريع'}
        </h2>

        <div className="project-frame">
          <div className="timeline">
            <div className="timeline-icons">
              {projectsData.slice(0, 5).map((project, index) => (
              <motion.div
                  key={project.id}
                  className={`timeline-icon ${activeProject === index ? 'active' : ''}`}
                  onClick={() => handleProjectClick(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                  {getIconComponent(project.tags[0])}
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
              <div className="project-image-container" onClick={() => setShowCarousel(true)}>
                <img
                  src={projectImages[0]} // Always show login image
                  alt="Project main screenshot"
                  className="project-image"
                  loading="lazy"
                />
                <div className="image-overlay">
                  <span className="view-all">View Gallery</span>
                </div>
              </div>

              <div className="project-details">
                <div className="project-header">
                  <h3 className="project-title" lang={currentLang}>
                    {projectsData[activeProject].title}
                  </h3>
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

                <div className="project-description" lang={currentLang}>
                  <div className={`description-content ${expandedDescriptions[activeProject] ? 'expanded' : ''}`}>
                    {currentLang === 'en' 
                      ? renderDescription(showTechnical 
                          ? projectsData[activeProject].technical?.en || projectsData[activeProject].overview.en 
                          : projectsData[activeProject].overview.en)
                      : renderDescription(showTechnical 
                          ? projectsData[activeProject].technical?.ar || projectsData[activeProject].overview.ar 
                          : projectsData[activeProject].overview.ar)}
                  </div>
                  
                  <button 
                    onClick={() => toggleDescription(activeProject)}
                    className="read-more-btn"
                  >
                    {expandedDescriptions[activeProject] 
                      ? (currentLang === 'en' ? 'Read Less' : 'عرض أقل') 
                      : (currentLang === 'en' ? 'Read More' : 'اقرأ المزيد')}
                  </button>
                </div>

                <div className="project-footer">
                  <div className="project-links">
                    {projectsData[activeProject].demo && (
                      <a
                        href={projectsData[activeProject].demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        title={currentLang === 'en' ? 'View Live Demo' : 'عرض العرض المباشر'}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    )}
                    {projectsData[activeProject].source_code && (
                      <a
                        href={projectsData[activeProject].source_code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        title={currentLang === 'en' ? 'View Source Code' : 'عرض الكود المصدري'}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Modal with Carousel */}
      <AnimatePresence>
        {showCarousel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="carousel-modal"
            onClick={() => setShowCarousel(false)}
          >
            <motion.div
              className="modal-content"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <button className="close-modal" onClick={() => setShowCarousel(false)}>×</button>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                className="modal-swiper"
              >
                {projectImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Project screenshot ${index + 1}`}
                      className="modal-image"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;