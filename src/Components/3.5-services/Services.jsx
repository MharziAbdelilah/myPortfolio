import React, { useRef, useState, useEffect } from 'react';
import './services.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import { servicesData } from './servicesData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { translations } from './translations';
import { useLanguage } from '../../context/LanguageContext';

function Services() {
  const sectionRef = useRef(null);
  const { currentLang } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
    <section className="services-section" ref={sectionRef} aria-label="Services">
      <div className="animated-background" aria-hidden="true" />
      
      <motion.div 
        className="services-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="header-content">
          <motion.h2 
            className="title"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            lang={currentLang}
          >
            {translations[currentLang].title}
          </motion.h2>
          <p className="sub-title" lang={currentLang}>{translations[currentLang].subtitle}</p>
        </div>
      </motion.div>

      <div className="services-swiper-container">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          spaceBetween={30}
          loop={true}
          loopFillGroupWithBlank={true}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            480: {
              slidesPerView: 1.5,
              spaceBetween: 30
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40
            }
          }}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          className="services-swiper"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation
        >
          {servicesData[currentLang].map((service, index) => (
            <SwiperSlide key={service.id}>
              <motion.div
                className={`service-card ${isLoading ? 'loading' : ''}`}
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
                tabIndex={0}
                role="article"
                aria-label={service.title}
              >
                <div className="service-content">
                  <motion.div 
                    className="service-icon-wrapper"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    aria-hidden="true"
                  >
                    <div className="service-icon">{service.icon}</div>
                    <div className="icon-glow"></div>
                    <div className="icon-ring"></div>
                  </motion.div>
                  
                  <motion.h3 
                    className="service-title"
                    whileHover={{ scale: 1.05, color: '#8751f5' }}
                    lang={currentLang}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <p className="service-description" lang={currentLang}>{service.description}</p>
                  
                  <ul 
                    className={`service-features ${currentLang === 'ar' ? 'rtl-features' : ''}`}
                    role="list"
                  >
                    {service.features.map((feature, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: currentLang === 'ar' ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ 
                          x: currentLang === 'ar' ? -10 : 10,
                          backgroundColor: 'rgba(135, 81, 245, 0.15)',
                          scale: 1.02
                        }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        tabIndex={0}
                        lang={currentLang}
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