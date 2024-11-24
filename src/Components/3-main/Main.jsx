import React, { useState } from "react";
import "./main.css";
import { myProjects } from "./myProjects";
import { motion, AnimatePresence } from "framer-motion";
import ProjectModal from './ProjectModal/ProjectModal';


function Main() {
  const [currentActive, setCurrentActive] = useState("all");
  const [arr, setArr] = useState(myProjects);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleClick = (buttonClick) => {
    setCurrentActive(buttonClick);
    if (buttonClick === "all") {
      setArr(myProjects);
    } else {
      const newArr = myProjects.filter((item) => item.category.includes(buttonClick));
      setArr(newArr);
    }
  };

  return (
    <main className="flex">
      <section className="flex left-section">
        <button
          onClick={() => handleClick("all")}
          className={currentActive === "all" ? "active" : ""}
        >
          All Project
        </button>
        <button
          onClick={() => handleClick("css")}
          className={currentActive === "css" ? "active" : ""}
        >
          HTML & CSS
        </button>
        <button
          onClick={() => handleClick("js")}
          className={currentActive === "js" ? "active" : ""}
        >
          Javascript
        </button>
        <button
          onClick={() => handleClick("react")}
          className={currentActive === "react" ? "active" : ""}
        >
          ReactJs & MUI
        </button>
        <button
          onClick={() => handleClick("node")}
          className={currentActive === "node" ? "active" : ""}
        >
          Node & Express
        </button>
      </section>

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
              <img width={266} src={item.imgPath} alt={item.projectTitle} />
              <div style={{ width: "266px" }} className="box">
                <h1 className="title">{item.projectTitle}</h1>
                <p className="sub-title">{item.shortDescription}</p>
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

      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}

export default Main;
