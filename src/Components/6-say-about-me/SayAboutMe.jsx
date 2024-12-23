import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { testimonialService } from '../../firebase/testimonialService';
import './SayAboutMe.css';

const SayAboutMe = () => {
  const { currentLang } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile] = useState(window.innerWidth <= 768);
  const dragThreshold = 5;
  const [dragDistance, setDragDistance] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialService.getAll();
        setTestimonials(data);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setTestimonials([]);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const handleDragStart = (e) => {
    setIsDragging(true);
    const container = containerRef.current;
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
    container.style.animationPlayState = 'paused';
    
    const clientX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    setStartX(clientX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
    setDragDistance(0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const container = containerRef.current;
    if (!container) return;
    
    container.style.cursor = 'grab';
    container.style.removeProperty('user-select');
    container.style.animationPlayState = 'running';
  };

  const handleDragMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const container = containerRef.current;
    const clientX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const x = clientX - container.offsetLeft;
    const walk = (x - startX) * 2;
    
    setDragDistance(Math.abs(walk));
    
    requestAnimationFrame(() => {
      if (container) {
        container.scrollLeft = scrollLeft - walk;
      }
    });
  };

  const handleCardClick = (testimonial, e) => {
    if (dragDistance < dragThreshold && testimonial.socialLink) {
      window.open(testimonial.socialLink, '_blank');
    }
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="section-title">
          {currentLang === 'en' ? 'What People Say About Me' : 'ماذا يقول الناس عني'}
        </h2>
      </div>

      <div 
        ref={containerRef}
        className={`testimonials-container ${isMobile ? 'mobile' : ''}`}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseMove={handleDragMove}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onTouchMove={handleDragMove}
      >
        {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
          <div 
            key={`${testimonial.name}-${index}`} 
            className="testimonial-card"
            onClick={(e) => handleCardClick(testimonial, e)}
            style={{ 
              cursor: testimonial.socialLink ? 'pointer' : 'default',
              touchAction: 'pan-y pinch-zoom'
            }}
            title={testimonial.socialLink ? `Visit ${testimonial.name}'s profile` : ''}
          >
            <div className="testimonial-header">
              <div className="testimonial-image">
                <img src={testimonial.image} alt={testimonial.name} />
              </div>
              <div className="testimonial-info">
                <h3 className="testimonial-name">{testimonial.name}</h3>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
            {testimonial.socialLink && (
              <div className="testimonial-social-link">
                <i className="ri-external-link-line"></i>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SayAboutMe;