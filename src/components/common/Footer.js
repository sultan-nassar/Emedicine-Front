

import React from 'react';
import './Footer.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
           <div className="container py-3">
             <div className="row">
             <div className="col-md-4 text-white">
             <img src="../logoMedicine.png" alt="Medicine Logo" className="footer-logo" />
            {/* <p className="text-white mt-3">
              &copy; {currentYear} EMedicine E-commerce. All rights reserved.
            </p> */}
          </div>

          {/* Pages */}
          <div className="col-md-3 text-white d-flex justify-content-between">
            <div>
              <h5>Pages</h5>
              <Link to="/" className="text-white mx-2">Home</Link>
              <Link to="/about" className="text-white mx-2">About Us</Link>
              <Link to="/contact" className="text-white mx-2">Contact Us</Link>
            </div>
          </div>

          {/* Follow Us */}
          <div className="col-md-5 text-white text-center d-flex justify-content-around">
            <div>
              <h5>Follow Us</h5>
              <a href="https://www.facebook.com" target='_blank' rel="noopener noreferrer" className="text-white mx-2"><i className="fab fa-facebook-f fa-lg"></i></a>
              <a href="https://www.youtube.com" target='_blank' rel="noopener noreferrer" className="text-white mx-2"><i className="fab fa-youtube fa-lg"></i></a>
              <a href="https://www.whatsapp.com" target='_blank' rel="noopener noreferrer" className="text-white mx-2"><i className="fab fa-whatsapp fa-lg"></i></a>
            </div>
          </div>

          <div className="col-md-12 text-center">
            <p className="text-white">
              &copy; {currentYear} EMedicine E-commerce. All rights reserved.
            </p>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



