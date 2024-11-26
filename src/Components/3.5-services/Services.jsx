import React, { useRef } from 'react';
import './services.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import { servicesData } from './servicesData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Services() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="services-section" ref={sectionRef}>
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
        <div className="gradient-blob blob-4"></div>
      </div>

      <motion.div 
        className="services-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2 
          className="title"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          My Services
        </motion.h2>
        <p className="sub-title">Specialized solutions to empower your digital presence</p>
      </motion.div>

      <div className="services-swiper-container">
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
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            480: {
              slidesPerView: 1.5,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 30
            }
          }}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          className="services-swiper"
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation
        >
          {servicesData.map((service, index) => (
            <SwiperSlide key={service.id}>
              <motion.div
                className="service-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="service-content">
                  <motion.div 
                    className="service-icon-wrapper"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="service-icon">{service.icon}</div>
                    <div className="icon-glow"></div>
                    <div className="icon-ring"></div>
                  </motion.div>
                  
                  <motion.h3 
                    className="service-title"
                    whileHover={{ scale: 1.05, color: '#8751f5' }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <p className="service-description">{service.description}</p>
                  
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ 
                          x: 10, 
                          backgroundColor: 'rgba(135, 81, 245, 0.15)',
                          scale: 1.02
                        }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                      >
                        <span className="icon-verified feature-icon"></span>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Services; 