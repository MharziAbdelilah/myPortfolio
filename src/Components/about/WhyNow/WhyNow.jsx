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
                Why Now?
              </h1>
              <div className="whynow-description">
                <p>
                  Waiting for perfection is an illusion that delays giving. I used to think that sharing required massive financial success, but the truth is that every step in our journey holds valuable lessons for others. Today, I choose to share and grow together, because the best time to start is now.
                </p>
              </div>
            </>
          ) : (
            <>
              <h1 className="whynow-title">
                لماذا الآن؟
              </h1>
              <div className="whynow-description">
                <p>
                  الانتظار حتى الكمال وهم يؤخر العطاء. كنت أعتقد أن المشاركة تحتاج إلى نجاح مالي هائل، لكن الحقيقة أن كل خطوة في رحلتنا تحمل دروساً قيّمة للآخرين. اليوم، أختار المشاركة والنمو معاً، لأن أفضل وقت للبدء هو الآن.
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
