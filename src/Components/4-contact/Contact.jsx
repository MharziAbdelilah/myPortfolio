import React from "react";
import "./contact.css";
import { ValidationError, useForm } from "@formspree/react";
import Lottie from "lottie-react";
import doneAnimation from "../../animation/done.json";
import { motion } from "framer-motion";

function Contact() {
  const [state, handleSubmit] = useForm("mnnaadez");

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="contact-section">
      <div className="contact-background">
        <div className="contact-blob blob-1"></div>
        <div className="contact-blob blob-2"></div>
        <div className="contact-blob blob-3"></div>
      </div>

      <div className="contact-content">
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>
            <motion.div 
              className="header-icon"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="icon-envelope"></span>
            </motion.div>
            Let's Connect
          </h2>
          <p>Have a project in mind? Let's create something amazing together!</p>
        </motion.div>

        <div className="contact-container">
          <motion.form 
            onSubmit={handleSubmit}
            className="contact-form"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
          >
            <motion.div className="form-group" variants={itemVariants}>
              <div className="input-container">
                <span className="icon-user input-icon"></span>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>
            </motion.div>

            <motion.div className="form-group" variants={itemVariants}>
              <div className="input-container">
                <span className="icon-envelope input-icon"></span>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </motion.div>

            <motion.div className="form-group" variants={itemVariants}>
              <div className="input-container textarea-container">
                <span className="icon-message input-icon"></span>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows="5"
                ></textarea>
              </div>
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </motion.div>

            <motion.button
              type="submit"
              disabled={state.submitting}
              className="submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="btn-content">
                {state.submitting ? "Sending..." : "Send Message"}
                <span className="icon-arrow-right"></span>
              </span>
              <div className="btn-glow"></div>
            </motion.button>

            {state.succeeded && (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Lottie loop={false} style={{height: "50px"}} animationData={doneAnimation} />
                <p>Thanks for reaching out! I'll get back to you soon.</p>
              </motion.div>
            )}
          </motion.form>

          <motion.div 
            className="contact-info-section"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="info-cards">
              <motion.div 
                className="info-card"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="card-icon">
                  <span className="icon-envelope-open"></span>
                </div>
                <div className="card-content">
                  <h3>Email</h3>
                  <p>email@example.com</p>
                </div>
              </motion.div>

              <motion.div 
                className="info-card"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="card-icon">
                  <span className="icon-location"></span>
                </div>
                <div className="card-content">
                  <h3>Location</h3>
                  <p>City, Country</p>
                </div>
              </motion.div>

              <motion.div 
                className="info-card"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="card-icon">
                  <span className="icon-phone"></span>
                </div>
                <div className="card-content">
                  <h3>Phone</h3>
                  <p>+1234567890</p>
                </div>
              </motion.div>
            </div>

            <div className="social-links-container">
              <h3>Connect With Me</h3>
              <div className="social-links">
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="icon-github"></span>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="icon-linkedin-square"></span>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="icon-twitter"></span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
