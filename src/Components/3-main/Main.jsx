import React, { useState } from "react";
import "./main.css";
import { myProjects } from "./myProjects";
import { motion, AnimatePresence } from "framer-motion";


function Main() {
  const [currentActive, setCurrentActive] = useState("all");
  const [arr, setArr] = useState(myProjects);

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
          initial={{transform:"scale(0)"}}
          animate={{transform:"scale(1)"}}
          transition={{type:"spring" , damping:8 , stiffness:50 }}
          key={item.imgPath} className="card">
            <img width={266} src={item.imgPath} alt={item.projectTitle} />
            <div style={{ width: "266px" }} className="box">
              <h1 className="title">{item.projectTitle}</h1>
              <p className="sub-title">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Odio!
              </p>
              <div className="flex icons">
                <div style={{ gap: "11px" }} className="flex ">
                  <div className="icon-link"></div>
                  <div className="icon-github"></div>
                </div>
                <a href="/" className="link flex">
                  more{" "}
                  <span
                    style={{ alignSelf: "end", marginBottom: "1.8px" }}
                    className="icon-arrow-right"
                  ></span>
                </a>
              </div>
            </div>
          </motion.article>
        ))}
        </AnimatePresence>
      </section>
    </main>
  );
}

export default Main;
