import React, { useState, useEffect } from 'react';
import './Hero.css'; // Import your CSS file

function Hero() {
  const [text, setText] = useState('');
  const fullText = 'Printful Services';

  const typeText = () => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          // Reset the text and start typing again
          setText('');
          typeText(); // Call the function again to restart typing
        }, 2000); // Adjust the delay as needed
      }
    }, 100); // Adjust the typing speed by changing the interval
  };

  useEffect(() => {
    typeText(); // Start typing animation on component mount
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-text">
        <h1>Welcome to Rozi Academy</h1>
        <p>
          <span>{text}</span>
          <span className="blinking-cursor">|</span>
        </p>
      </div>
      <div className="hero-image">
        <img src="../../../assets/hero-sect-image.png" alt="Hero Image" />
      </div>
    </div>
  );
}

export default Hero;
