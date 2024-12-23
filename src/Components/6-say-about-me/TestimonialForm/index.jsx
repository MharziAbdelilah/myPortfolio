import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { testimonialService } from '../../../firebase/testimonialService';
import './TestimonialForm.css';

const TestimonialForm = () => {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    image: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add new testimonial
    const newTestimonial = {
      ...formData,
      date: new Date().toISOString(),
      image: formData.image || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 10)}.jpg`
    };
    
    try {
      // Save to Firebase
      await testimonialService.add(newTestimonial);
      
      // Show success message
      setShowSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error adding testimonial:', error);
      alert(currentLang === 'en' 
        ? 'Error submitting testimonial. Please try again.' 
        : 'خطأ في إرسال التقييم. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="testimonial-page">
      <Link to="/" className="testimonial-back-btn">
        {currentLang === 'en' ? '← Back to Home' : 'العودة للرئيسية ←'}
      </Link>
      
      <div className="testimonial-form-wrapper">
        <h2 className="testimonial-heading">
          {currentLang === 'en' ? 'Leave Your Review' : 'اترك تقييمك'}
        </h2>
        
        {showSuccess && (
          <div className="testimonial-success">
            {currentLang === 'en' 
              ? 'Thank you for your review! Redirecting...'
              : 'شكراً لتقييمك! جاري التحويل...'
            }
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="testimonial-form">
          <div className="testimonial-input-group">
            <label htmlFor="name" className="testimonial-label">
              {currentLang === 'en' ? 'Full Name' : 'الاسم الكامل'}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="testimonial-input"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={50}
            />
          </div>

          <div className="testimonial-input-group">
            <label htmlFor="role" className="testimonial-label">
              {currentLang === 'en' ? 'Your Role/Position' : 'المسمى الوظيفي'}
            </label>
            <input
              type="text"
              id="role"
              name="role"
              className="testimonial-input"
              value={formData.role}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
            />
          </div>

          <div className="testimonial-input-group">
            <label htmlFor="image" className="testimonial-label">
              {currentLang === 'en' ? 'Profile Picture URL (Optional)' : 'رابط الصورة الشخصية (اختياري)'}
            </label>
            <input
              type="url"
              id="image"
              name="image"
              className="testimonial-input"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="testimonial-input-group">
            <label htmlFor="text" className="testimonial-label">
              {currentLang === 'en' ? 'Your Review' : 'تقييمك'}
            </label>
            <textarea
              id="text"
              name="text"
              className="testimonial-textarea"
              value={formData.text}
              onChange={handleChange}
              required
              rows="4"
              minLength={10}
              maxLength={500}
              placeholder={currentLang === 'en' 
                ? 'Share your experience working with me...'
                : 'شاركنا تجربتك في العمل معي...'
              }
            />
          </div>

          <button type="submit" className="testimonial-submit-btn" disabled={showSuccess}>
            {currentLang === 'en' ? 'Submit Review' : 'إرسال التقييم'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;