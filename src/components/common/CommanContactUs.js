import React from "react";
import Header from './Header';
import Footer from './Footer';


const CommanContactUs = () => {
  return (
    <><Header />
    <div>
      
      <div className="container mt-5">
        <h2>Contact Us</h2>
        <p>
          Feel free to get in touch with us for any queries or assistance. Our
          dedicated customer support team is here to help you.
        </p>
        <p>Address: Hankin RD Street, Haifa city, Israel Country</p>
        <p>Phone: +(972) 54-313-3603</p>
        <p>Email: sultannassar11@gmail.com</p>
        <p>We look forward to hearing from you!</p>
        <div style={{ height: "400px", width: "100%" }}>
          {/* Google Maps Embed API */}
          <iframe
            title="Haifa Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33858.60233681378!2d34.9896!3d32.794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4cafe3a3a185%3A0x7d066ae76fcbf86e!2sHaifa!5e0!3m2!1sen!2sil!4v1623689999999!5m2!1sen!2sil"
            width="800"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>     
    </div>
     <Footer />
     </>
  );
};

export default CommanContactUs;
