import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (fullscreenImage) {
          setFullscreenImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [fullscreenImage, onClose]);

  if (!project) return null;

  const handleImageClick = (image, index) => {
    setFullscreenImage(image);
    setCurrentImageIndex(index);
  };

  const navigateFullscreen = (direction) => {
    const images = project.images || [];
    const newIndex = direction === 'next'
      ? (currentImageIndex + 1) % images.length
      : (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setFullscreenImage(images[newIndex]);
  };

  const images = project.images || [];

  return (
    <div className="modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-content-fullsize">
        <button className="modal-close" onClick={onClose}>×</button>
        
        {images.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Keyboard]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            loop={images.length > 1}
            className="modal-swiper-fullsize"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div 
                  className="gallery-image-container-fullsize"
                  onClick={() => handleImageClick(image, index)}
                >
                  <img src={image} alt={`View ${index + 1}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="no-images-message">No images available</div>
        )}
      </div>

      {fullscreenImage && (
        <div className="fullscreen-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setFullscreenImage(null);
        }}>
          <div className="fullscreen-image-container">
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="fullscreen-image"
            />
            {images.length > 1 && (
              <>
                <button
                  className="fullscreen-nav prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateFullscreen('prev');
                  }}
                >
                  ‹
                </button>
                <button
                  className="fullscreen-nav next"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateFullscreen('next');
                  }}
                >
                  ›
                </button>
              </>
            )}
            <button
              className="fullscreen-close"
              onClick={() => setFullscreenImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectModal; 