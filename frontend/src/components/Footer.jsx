import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleInputChange = (field, value) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus(data.message || 'Feedback sent successfully!');
        setContactForm({ name: '', email: '', message: '' });
      } else {
        setStatus(data.error || 'Failed to send feedback.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Server error. Please try again later.');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Contact Form */}
          <div className="contact-section">
            <h3>Get in Touch</h3>
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your Name"
                  className="contact-input"
                  required
                />
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Your Email"
                  className="contact-input"
                  required
                />
                <textarea
                  value={contactForm.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Your Message"
                  rows={4}
                  className="contact-textarea"
                  required
                />
                <button type="submit" className="contact-submit">Send Message</button>
              </form>
              {status && <p style={{ marginTop: '8px', color: 'white' }}>{status}</p>}
            </div>
          </div>

          {/* About Section */}
          <div className="about-section">
            <h3>About Us</h3>
            <div className="about-content">
              <p className="about-text">
                TravelPlan is your intelligent travel companion, designed to make trip planning effortless and enjoyable. 
                We combine AI technology with local expertise to create personalized itineraries.<br></br><br></br>
              
                Our mission is to help travelers discover amazing destinations while reducing the stress of planning. 
                From solo adventures to family vacations, we've got you covered. 
              </p>

              {/* Social Media */}
              <div className="social-media">
                <a href="#" className="social-link"><Facebook className="social-icon" /></a>
                <a href="#" className="social-link"><Twitter className="social-icon" /></a>
                <a href="#" className="social-link"><Instagram className="social-icon" /></a>
                <a href="#" className="social-link"><Youtube className="social-icon" /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2025 TravelPlan. All rights reserved. Made with ❤️ for travelers worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
