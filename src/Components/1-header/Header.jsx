import "./header.css";
import React, { useEffect, useState } from "react";
import ChatBot from "../ChatBot/ChatBot";
import { useLanguage } from '../../context/LanguageContext';
import { headerTranslations } from './translations';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [showModal, setShowModel] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("currentMode") ?? "dark"
  );
  const { currentLang, setCurrentLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const ThemeToggleButton = () => (
    <button
      onClick={() => {
        localStorage.setItem("currentMode", theme === "dark" ? "light" : "dark");
        setTheme(localStorage.getItem("currentMode"));
      }}
      className="mode flex"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === "dark" ? (
        <span className="icon-moon-o"></span>
      ) : (
        <span className="icon-sun"></span>
      )}
    </button>
  );

  const LangToggleButton = () => (
    <button
      onClick={() => setCurrentLang(currentLang === 'en' ? 'ar' : 'en')}
      className="lang-toggle-btn"
      aria-label={`Switch to ${currentLang === 'en' ? 'Arabic' : 'English'} language`}
    >
      {currentLang === 'en' ? 'عربي' : 'English'}
    </button>
  );

  const MenuButton = () => (
    <button
      onClick={() => setShowModel(true)}
      className="menu-button icon-menu flex"
      aria-label="Open navigation menu"
    />
  );

  return (
    <>
      <header className={`flex ${currentLang === 'ar' ? 'rtl' : ''}`}>
        {isMobile && !isScrolled && <MenuButton />}
        <div />
        <nav>
          <ul className="flex">
            {headerTranslations[currentLang].menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.href}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-buttons flex">
          <LangToggleButton />
          {!isScrolled && <ThemeToggleButton />}
        </div>

        {showModal && (
          <div className="fixed">
            <ul className="modal">
              <li>
                <button
                  className="icon-close"
                  onClick={() => setShowModel(false)}
                />
              </li>
              {headerTranslations[currentLang].menuItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.href}>{item.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
      
      {isScrolled && (
        <div className={`theme-toggle-fixed ${currentLang === 'ar' ? 'rtl' : ''}`}>
          <MenuButton />
          <ThemeToggleButton />
          <LangToggleButton />
        </div>
      )}

      <ChatBot />
    </>
  );
}

export default Header;
