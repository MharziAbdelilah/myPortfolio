import { useEffect, useState } from "react";
import Header from "./Components/1-header/Header";
import Hero from "./Components/2-hero/Hero";
import News from "./Components/2.0 news/new";
// import Main from "./Components/3-main/Main";
import Contact from "./Components/4-contact/Contact";
import Footer from "./Components/5-footer/Footer";
import Services from "./Components/3.5-services/Services";
import { css } from '@emotion/react';
import { LanguageProvider } from './contexts/LanguageContext';
import Projects from "./Components/3.75-projects/Projects";
import ContentUseful from './Components/4-content-useful/ContentUseful';



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
              {/* <div className="divder" />
              <Main /> */}
              <div className="divder" />
              <Services />
              <div className="divder" />
              <Projects />
              <div className="divder" />
              <ContentUseful />
              <div className="divder" />
              <Contact />
              <div className="divder" />
              <Footer />
            
          </>
      </div>
    </LanguageProvider>
  );
}

export default App;
