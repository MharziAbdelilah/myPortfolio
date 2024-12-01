import React from "react";
import "./contact.css";
import { motion } from "framer-motion";
import { useLanguage } from '../../context/LanguageContext';
import { contactTranslations } from './translations';
import { 
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function Contact() {
  const { currentLang } = useLanguage();
  const translations = contactTranslations[currentLang];

  const InfoCard = ({ icon: Icon, title, value, href }) => (
    <motion.a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="info-card"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="card-icon">
        <Icon className="info-icon" />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </motion.a>
  );

  return (
    <section className={`contact-section ${currentLang === 'ar' ? 'rtl' : ''}`}>
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
          <h2>{translations.title}</h2>
          <p>{translations.subtitle}</p>
        </motion.div>

        <motion.div 
          className="contact-info-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="info-cards">
            <InfoCard 
              icon={MdEmail}
              title={translations.contactInfo.email.title}
              value={translations.contactInfo.email.value}
              href={translations.contactInfo.email.href}
            />

            <InfoCard 
              icon={FaMapMarkerAlt}
              title={translations.contactInfo.location.title}
              value={translations.contactInfo.location.value}
              href={translations.contactInfo.location.href}
            />

            <InfoCard 
              icon={FaPhoneAlt}
              title={translations.contactInfo.phone.title}
              value={translations.contactInfo.phone.value}
              href={translations.contactInfo.phone.href}
            />

            <InfoCard 
              icon={FaWhatsapp}
              title={translations.contactInfo.whatsapp.title}
              value={translations.contactInfo.whatsapp.value}
              href={translations.contactInfo.whatsapp.href}
            />
          </div>

          <div className="social-links-container">
            <h3>{translations.socialTitle}</h3>
            <div className="social-links">
              <motion.a 
                href={translations.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaGithub className="social-icon" />
              </motion.a>
              <motion.a 
                href={translations.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaLinkedin className="social-icon" />
              </motion.a>
              <motion.a 
                href={translations.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaTwitter className="social-icon" />
              </motion.a>
              <motion.a 
                href={translations.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaInstagram className="social-icon" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
