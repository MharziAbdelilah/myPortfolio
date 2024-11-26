import React, { useRef, useState, useEffect } from 'react';
import './projects.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projectsData } from './projectsData';
import { Tilt } from 'react-tilt';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import ProjectModal from './ProjectModal/ProjectModal';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Projects() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Add useEffect to handle body scroll
  useEffect(() => {
    if (selectedProject) {
      // Store current scroll position when opening modal
      setScrollPosition(window.scrollY);
      // Disable scroll on body when modal is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Re-enable scroll and restore position when modal is closed
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      
      // Restore to the previous scroll position
      window.scrollTo({
        top: scrollPosition,
        behavior: "instant" // Use "instant" to prevent smooth scrolling
      });
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [selectedProject, scrollPosition]);

  return (
    <section className="projects-section" ref={sectionRef}>
      <div className="projects-background">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
      </div>

      <motion.div 
        className="projects-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="title">Featured Projects</h2>
        <p className="subtitle">Explore my latest works and creative endeavors</p>
      </motion.div>

      <div className="projects-swiper-container">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          spaceBetween={20}
          loop={true}
          loopFillGroupWithBlank={true}
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 250,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 1.5,
              spaceBetween: 20
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 30
            }
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="projects-swiper"
        >
          {projectsData.map((project, index) => (
            <SwiperSlide key={project.id}>
              <Tilt
                options={{
                  max: 15,
                  scale: 1.02,
                  speed: 1500,
                  glare: true,
                  "max-glare": 0.3,
                  perspective: 1500,
                }}
              >
                <motion.div
                  className="project-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-image-container">
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      whileHover={{ scale: 1.03 }}
                      transition={{ 
                        duration: 0.6,
                        ease: "easeOut"
                      }}
                    />
                    <motion.div 
                      className="project-overlay"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="tech-stack">
                        {project.technologies.map((tech, idx) => (
                          <motion.span 
                            key={idx} 
                            className="tech-tag"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    
                    <div className="project-links">
                      <motion.a 
                        href={project.liveDemo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="demo-link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Live Demo
                        <span className="icon-external-link"></span>
                      </motion.a>
                      <motion.a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="github-link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        GitHub
                        <span className="icon-github"></span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

export default Projects; 