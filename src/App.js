import { useEffect, useState } from "react";
import Header from "./Components/1-header/Header";
import Hero from "./Components/2-hero/Hero";
import News from "./Components/2.0 news/new";
import Main from "./Components/3-main/Main";
import Contact from "./Components/4-contact/Contact";
import Footer from "./Components/5-footer/Footer";
import { css } from '@emotion/react';
import { LanguageProvider } from './contexts/LanguageContext';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function App() {
    const [scrollUpBtn , setScrollUpBtn] = useState(true);

    useEffect(() => {
      const handleScroll = () => {
          if (window.scrollY > 300) {
              setScrollUpBtn(true);
          } else {
              setScrollUpBtn(false);
          }
      };

      window.addEventListener("scroll", handleScroll);

  }, []);

  return (
    <LanguageProvider>
      <div id="up" className="container">
          <>
              <Header />
              <Hero />
              <div className="divder" />
              <News />
              <div className="divder" />
              <Main />
              <div className="divder" />
              <Contact />
              <div className="divder" />
              <Footer />
              <a href="#up" style={{ opacity: scrollUpBtn ? 1 : 0, transition: "0.6s" }}>
                  <button className="icon-keyboard_arrow_up scroll2Top"></button>
              </a>
          </>
      </div>
    </LanguageProvider>
  );
}

export default App;
