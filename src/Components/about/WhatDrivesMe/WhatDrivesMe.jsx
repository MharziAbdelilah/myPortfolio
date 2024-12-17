import React from 'react';
import './WhatDrivesMe.css';
import { useLanguage } from '../../../context/LanguageContext';

const WhatDrivesMe = () => {
  const { currentLang } = useLanguage();
  const isRTL = currentLang === 'ar';
  
  return (
    <div className="whatdrives-container">
      <div className={`whatdrives-content ${isRTL ? 'rtl' : ''}`}>
        <div className="whatdrives-image-section">
          <img src="https://picsum.photos/600/400" alt="What drives me" />
        </div>
        <div className="text-content">
          {currentLang === 'en' ? (
            <>
              <h1 className="whatdrives-title">
                What Drives Me
              </h1>
              <div className="whatdrives-description">
                <p>
                  Love of Learning
                </p>
                <p>
                  Love of Sharing
                </p>
                <p>
                  Love of Growth
                </p>
                <p>
                  Creating Something Valuable
                </p>
              </div>
            </>
          ) : (
            <>
              <h1 className="whatdrives-title">
                ما الذي يحركني
              </h1>
              <div className="whatdrives-description">
                <p>
                  حب التعلم
                </p>
                <p>
                  حب المشاركة
                </p>
                <p>
                  حب النمو
                </p>
                <p>
                  انتاج شيء ذو قيمة
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatDrivesMe;
