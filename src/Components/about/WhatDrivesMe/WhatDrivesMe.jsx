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
                What Drives Me Forward
              </h1>
              <div className="whatdrives-description">
                <p>
                  My passion for technology and innovation has been the driving force behind my journey in software development.
                </p>
                <p>
                  Every day, I wake up excited about the possibilities that lie ahead and the chance to create something meaningful.
                </p>
                <p>
                  I believe in the power of technology to transform lives and make the world a better place.
                </p>
              </div>
            </>
          ) : (
            <>
              <h1 className="whatdrives-title">
                ما الذي يدفعني للأمام
              </h1>
              <div className="whatdrives-description">
                <p>
                  كان شغفي بالتكنولوجيا والابتكار هو القوة الدافعة وراء رحلتي في تطوير البرمجيات.
                </p>
                <p>
                  في كل يوم، أستيقظ متحمسًا للإمكانيات التي تنتظرنا والفرصة لخلق شيء ذي معنى.
                </p>
                <p>
                  أؤمن بقوة التكنولوجيا في تغيير الحياة وجعل العالم مكانًا أفضل.
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
