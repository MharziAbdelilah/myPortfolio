import "./header.css";
import React, { useEffect, useState } from "react";
import ChatBot from "../ChatBot/ChatBot";

function Header() {
  const [showModal, setShowModel] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("currentMode") ?? "dark"
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

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
    >
      {theme === "dark" ? (
        <span className="icon-moon-o"></span>
      ) : (
        <span className="icon-sun"></span>
      )}
    </button>
  );

  const MenuButton = () => (
    <button
      onClick={() => setShowModel(true)}
      className="menu-button icon-menu flex"
    />
  );

  return (
    <>
      <header className="flex">
        {isMobile && !isScrolled && <MenuButton />}
        <div />
        <nav>
          <ul className="flex">
            <li><a href="">About</a></li>
            <li><a href="">Articles</a></li>
            <li><a href="">Projects</a></li>
            <li><a href="">Speaking</a></li>
            <li><a href="">Contact</a></li>
          </ul>
        </nav>

        {!isScrolled && <ThemeToggleButton />}

        {showModal && (
          <div className="fixed">
            <ul className="modal">
              <li>
                <button
                  className="icon-close"
                  onClick={() => setShowModel(false)}
                />
              </li>
              <li><a href="">About</a></li>
              <li><a href="">Articles</a></li>
              <li><a href="">Projects</a></li>
              <li><a href="">Speaking</a></li>
              <li><a href="">Uses</a></li>
            </ul>
          </div>
        )}
      </header>
      
      {isScrolled && (
        <div className="theme-toggle-fixed">
          <MenuButton />
          <ThemeToggleButton />
        </div>
      )}

      <ChatBot />
    </>
  );
}

export default Header;
