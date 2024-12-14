import React from 'react';
import './WhyNow.css';
import { useLanguage } from '../../../context/LanguageContext';

const WhyNow = () => {
  const { currentLang } = useLanguage();
  const isRTL = currentLang === 'ar';
  
  return (
    <div className="whynow-container">
      <div className={`whynow-content ${isRTL ? 'rtl' : ''}`}>
        <div className="text-content">
          {currentLang === 'en' ? (
            <>
              <h1 className="whynow-title">
                Why Now Is The Perfect Time
              </h1>
              <div className="whynow-description">
                <p>
                  The tech industry is evolving at an unprecedented pace, creating endless opportunities for innovation and growth.
                </p>
                <p>
                  With the rise of AI, cloud computing, and digital transformation, there has never been a better time to be in software development.
                </p>
                <p>
                  I'm positioned at the intersection of these emerging technologies, ready to contribute to the next wave of digital innovation.
                </p>
              </div>
            </>
          ) : (
            <>
              <h1 className="whynow-title">
                لماذا الآن هو الوقت المثالي
              </h1>
              <div className="whynow-description">
                <p>
                  تتطور صناعة التكنولوجيا بوتيرة غير مسبوقة، مما يخلق فرصًا لا حصر لها للابتكار والنمو.
                </p>
                <p>
                  مع صعود الذكاء الاصطناعي والحوسبة السحابية والتحول الرقمي، لم يكن هناك وقت أفضل للعمل في تطوير البرمجيات.
                </p>
                <p>
                  أنا موجود في نقطة تقاطع هذه التقنيات الناشئة، مستعد للمساهمة في الموجة القادمة من الابتكار الرقمي.
                </p>
              </div>
            </>
          )}
        </div>
        <div className="image-section">
          {/* Add your image here */}
          <img src="https://picsum.photos/100/400" alt="Why now" />
        </div>
      </div>
    </div>
  );
};

export default WhyNow;
