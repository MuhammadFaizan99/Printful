import React from 'react';
import { Transition } from 'react-transition-group'; // Import Transition
import './About.css';

function About() {
  return (
    <Transition in={true} appear={true} timeout={500}>
      {(state) => (
        <div className={`about-page transition-${state}`}>
          <section className="about-rozi">
            <div className="rozi-content">
              <h2><i className="fas fa-print"></i> Printful Services</h2>
              <p>
                <i className="fas fa-university"></i> Rozi Academy is a leading educational institution dedicated to providing high-quality training and services in the field of printful services.
              </p>
              <p>
                <i className="fas fa-graduation-cap"></i> Our mission is to empower individuals and businesses to succeed in the world of printful services by offering comprehensive courses, expert guidance, and state-of-the-art resources.
              </p>
              {/* Added points with descriptions */}
              <p>
                <i className="fas fa-cogs"></i> We provide cutting-edge technology and tools for seamless printful operations. Our advanced machinery and software ensure high-quality printing and efficient order fulfillment.
              </p>
              <p>
                <i className="fas fa-users"></i> Our team of experienced professionals is dedicated to helping you achieve your printful goals. We offer personalized support, mentoring, and consultancy services to assist you in every step of your printful journey.
              </p>
            </div>
          </section>
        </div>
      )}
    </Transition>
  );
}

export default About;