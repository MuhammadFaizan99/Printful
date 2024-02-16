import React, { useEffect, useRef, useState } from 'react';
import './Services.css';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const servicesRef = useRef(null);

  // Function to check if the element is in the viewport
  const isElementInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  // Function to handle scroll events
  const handleScroll = () => {
    if (isElementInViewport(servicesRef.current)) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`services-section ${isVisible ? 'transition-entered' : ''}`}
      ref={servicesRef}
    >
      <h1><i className="fas fa-concierge-bell"></i> Our Services</h1>
      <div className="services-container">
        <div className="service-card">
          <i className="fas fa-tshirt"></i>
          <h3>T-Shirt Printing</h3>
          <p>Create and print customized t-shirts for your brand or events. Choose from a variety of styles and materials.</p>
        </div>
        <div className="service-card">
          <i className="fas fa-mug-hot"></i>
          <h3>Mug Printing</h3>
          <p>Design and personalize coffee mugs with your own artwork or logos. Perfect for promotional giveaways.</p>
        </div>
        <div className="service-card">
          <i className="fas fa-phone"></i>
          <h3>Phone Case Printing</h3>
          <p>Customize phone cases with unique designs. Protect your device in style with high-quality prints.</p>
        </div>
        <div className="service-card">
          <i className="fas fa-print"></i>
          <h3>Poster Printing</h3>
          <p>Print posters for your business, events, or home decor. Choose from various sizes and finishes.</p>
        </div>
        <div className="service-card">
          <i className="fas fa-hat-wizard"></i>
          <h3>Hat Embroidery</h3>
          <p>Add your brand's logo or designs to hats and caps through high-quality embroidery services.</p>
        </div>
        <div className="service-card">
          <i className="fas fa-pen"></i>
          <h3>Custom Merchandise</h3>
          <p>Create a wide range of custom merchandise items, including apparel, accessories, and promotional products.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;