import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { testimonialService } from '../../firebase/testimonialService';
import './SayAboutMe.css';

const SayAboutMe = () => {
  const { currentLang } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);

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

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="section-title">
          {currentLang === 'en' ? 'What People Say About Me' : 'ماذا يقول الناس عني'}
        </h2>
      </div>

      <div className="testimonials-container">
        {[...testimonials].map((testimonial, index) => (
          <div key={index} className="testimonial-card">
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default SayAboutMe;