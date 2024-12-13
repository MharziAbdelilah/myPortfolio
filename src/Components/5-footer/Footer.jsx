import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './footer.css'

function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'en';

  const content = {
    en: {
      library: "My Library",
      about: "About",
      newsletter: "Stay updated with my latest tech articles",
      emailPlaceholder: "Enter your email",
      madeWith: "Made with love by Abdelilah Mharzi ",
      quotes: [
        "Every line of code is crafted with passion, every project is built with dedication",
        "Turning coffee into code, and dreams into digital reality",
        "Creating tomorrow's solutions with today's code",
        "Where creativity meets functionality in every project",
        "Building digital experiences with love and precision",
        "Coding with heart, developing with purpose",
        "Transforming ideas into elegant solutions",
        "Every bug fixed is a lesson learned, every feature added is a dream achieved",
        "Passionate about clean code and beautiful design",
        "Writing code that makes a difference"
      ]
    },
    ar: {
      library: " ",
      about: " ",
      newsletter: " ",
      emailPlaceholder: " ",
      madeWith: " ",
      quotes: [
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " "
      ]
    }
  };

  const currentContent = content[language] || content['en']

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => 
        prevIndex === currentContent.quotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [language, currentContent.quotes.length]);

  return (
    <footer className='main-footer'>
      <div className='main-footer__content'>
        <div className='main-footer__wrapper'>
          <div className='main-footer__buttons'>
            <button className='main-footer__btn' onClick={() => navigate('/library')}>
              <i className="fas fa-book"></i>
              {currentContent.library}
            </button>
            <button className='main-footer__btn' onClick={() => navigate('/about')}>
              <i className="fas fa-user"></i>
              {currentContent.about}
            </button>
          </div>

          <div className='main-footer__newsletter'>
            <p className='main-footer__newsletter-text'>
              {currentContent.newsletter}
            </p>
            <form className='main-footer__form'>
              <input 
                type="email" 
                placeholder={currentContent.emailPlaceholder}
                className='main-footer__input'
              />
              <button type="submit" className='main-footer__submit'>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        <div className='main-footer__bottom'>
          <p className={`main-footer__quote ${language === 'ar' ? 'rtl' : ''}`}>
            "{currentContent.quotes[quoteIndex]}"
          </p>
          <p className='main-footer__copyright'>
            <span className='main-footer__heart'>❤</span> 
            <span className='main-footer__text'>{currentContent.madeWith} {currentYear}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer