import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Components/1-header/Header";
import Hero from "./Components/2-hero/Hero";
import News from "./Components/2.0 news/new";
import Contact from "./Components/4-contact/Contact";
import Footer from "./Components/5-footer/Footer";
import Services from "./Components/3.5-services/Services";
import Projects from "./Components/3.75-projects/Projects";
import ContentUseful from "./Components/4-content-useful/ContentUseful";
import { LanguageProvider } from './context/LanguageContext';
import SayAboutMe from "./Components/6-say-about-me/SayAboutMe";
import TestimonialForm from "./Components/6-say-about-me/TestimonialForm";
import HelpYou from "./Components/3-helpyou/HelpYou";
import About from "./Components/about/About";
import Articles from "./Components/Articles/Articles";
import ArticlePage from "./Components/Articles/pages/ArticlePage";

function App() {
  const [scrollUpBtn, setScrollUpBtn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrollUpBtn(true);
      } else {
        setScrollUpBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <LanguageProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div id="up" className="container">
                    <Hero />
                    <div className="divder" />
                    <HelpYou />
                    <div className="divder" />
                    <News />
                  </div>
                  <Services />             
                  <Projects />
                  <div id="up" className="container">
                    <div className="divder" />
                    <ContentUseful />
                    </div>
                    <SayAboutMe />
                    <div className="container">
                    <Contact />
                    </div>
                   

                  
                </>}
            />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
            <Route path="/sayaboutme" element={<TestimonialForm />} />
          </Routes>
          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
