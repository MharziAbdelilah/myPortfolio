import React, { useState } from "react";
import "./main.css";
import { myProjects } from "./myProjects";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from './ProjectModal/ProjectModal';

function Main() {
  // ================ STATE MANAGEMENT ================
  const [currentActive, setCurrentActive] = useState("all");
  const [arr, setArr] = useState(myProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ================ FILTER OPTIONS CONFIG ================
  const filterOptions = [
    { id: "all", label: "All Project", icon: "💼" },    // Portfolio/All
    { id: "css", label: "HTML & CSS", icon: "🎨" },     // Design/Styling
    { id: "js", label: "Javascript", icon: "⚡" },      // JavaScript
    { id: "react", label: "ReactJs & MUI", icon: "💫" }, // React/UI
    { id: "node", label: "Node & Express", icon: "⚙️" }  // Backend
  ];

  // ================ EVENT HANDLERS ================
  const handleClick = (buttonClick) => {
    setCurrentActive(buttonClick);
    setIsFilterOpen(false);
    if (buttonClick === "all") {
      setArr(myProjects);
    } else {
      const newArr = myProjects.filter((item) => item.category.includes(buttonClick));
      setArr(newArr);
    }
  };

  return (
    <main className="flex">
      {/* ================ FILTER SECTION ================ */}
      <section className="flex left-section">
        <div className="filter-container">
          {/* Mobile Filter Toggle Button */}
          <button 
            className="mobile-filter-toggle"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span className="toggle-content">
              <span className="toggle-icon">
                {filterOptions.find(opt => opt.id === currentActive)?.icon}
              </span>
              <span className="toggle-label">
                {filterOptions.find(opt => opt.id === currentActive)?.label}
              </span>
            </span>
            <span className={`icon-arrow-down ${isFilterOpen ? 'open' : ''}`}></span>
          </button>

          {/* Filter Options Dropdown */}
          <div className={`filter-options ${isFilterOpen ? 'show' : ''}`}>
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleClick(option.id)}
                className={`filter-option ${currentActive === option.id ? "active" : ""}`}
              >
                <span className="option-icon">{option.icon}</span>
                <span className="option-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================ PROJECTS GRID SECTION ================ */}
      <section className="flex right-section">
        <AnimatePresence>
          {arr.map((item) => (
            <motion.article
              layout
              initial={{ transform: "scale(0)" }}
              animate={{ transform: "scale(1)" }}
              transition={{ type: "spring", damping: 8, stiffness: 50 }}
              key={item.imgPath}
              className="card"
              onClick={() => setSelectedProject(item)}
            >
              {/* Project Image */}
              <img width={266} src={item.imgPath} alt={item.projectTitle} />
              
              {/* Project Details */}
              <div style={{ width: "266px" }} className="box">
                <h1 className="title">{item.projectTitle}</h1>
                <p className="sub-title">{item.shortDescription}</p>
                
                {/* Project Links */}
                <div className="flex icons">
                  <div style={{ gap: "11px" }} className="flex">
                    <a 
                      href={item.liveDemo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="icon-link"
                    />
                    <a 
                      href={item.sourceCode} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="icon-github"
                    />
                  </div>
                  <button 
                    className="link flex"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(item);
                    }}
                  >
                    more{" "}
                    <span
                      style={{ alignSelf: "end", marginBottom: "1.8px" }}
                      className="icon-arrow-right"
                    />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </section>

      {/* ================ PROJECT MODAL ================ */}
      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}

export default Main;
