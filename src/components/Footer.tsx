import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="main-footer-bottom">
        <h2>ОСТАВАТЬСЯ В КУРСЕ</h2>
        <form className="subscribe-form">
          <input type="email" placeholder="email" />
          <button type="submit">ПОДПИСАТЬСЯ</button>
        </form>
        <div className="social-links">
          <a href="#" className="social-icon">
            X
          </a>
          <a href="#" className="social-icon">
            ✉
          </a>
        </div>
        <p className="copyright">DeepJob Statistics © 2025</p>
      </footer>
    </>
  );
};

export default Footer;
