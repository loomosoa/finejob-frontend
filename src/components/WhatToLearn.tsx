import React from "react";

const WhatToLearn = () => {
  return (
    <>
      <div className="learn-section">
        <h2 className="section-title">Что учить?</h2>
        <div className="learn-content-wrapper">
          <div className="learn-main-content">
            <div className="learn-row">
              <div className="learn-category">ЯЗЫКИ ПРОГРАММИРОВАНИЯ</div>
              <div className="tech-group">
                <a href="#" className="tech-tag">
                  GOLANG
                </a>
                <a href="#" className="tech-tag">
                  C++
                </a>
                <a href="#" className="tech-tag">
                  RUST
                </a>
                <a href="#" className="tech-tag">
                  JAVA
                </a>
                <a href="#" className="tech-tag">
                  PYTHON
                </a>
                <a href="#" className="tech-tag active-tech">
                  JAVASCRIPT
                </a>
              </div>
            </div>
            <div className="learn-row">
              <div className="learn-category">ТЕХНОЛОГИИ</div>
              <div className="tech-group">
                <a href="#" className="tech-tag">
                  DOCKER
                </a>
                <a href="#" className="tech-tag">
                  KUBERNETES
                </a>
                <a href="#" className="tech-tag">
                  REDIS
                </a>
                <a href="#" className="tech-tag">
                  KAFKA
                </a>
                <a href="#" className="tech-tag">
                  RABBITMQ
                </a>
                <a href="#" className="tech-tag">
                  MYSQL
                </a>
                <a href="#" className="tech-tag active-tech">
                  POSTGRESQL
                </a>
              </div>
            </div>
            <div className="learn-row">
              <div className="learn-category">ФРЕЙМВОРКИ</div>
              <div className="tech-group">
                <a href="#" className="tech-tag active-tech">
                  REACT
                </a>
                <a href="#" className="tech-tag">
                  GIN
                </a>
                <a href="#" className="tech-tag">
                  VUE.JS
                </a>
                <a href="#" className="tech-tag">
                  DJANGO
                </a>
                <a href="#" className="tech-tag">
                  SPRING
                </a>
                <a href="#" className="tech-tag">
                  LARAVEL
                </a>
                <a href="#" className="tech-tag">
                  FLUTTER
                </a>
              </div>
            </div>
          </div>
          <aside className="salary-card learn-salary-card">
            <h3>СРЕДНЯЯ ОПЛАТА В МЕСЯЦ</h3>
            <div className="salary-value">
              <span>2 254</span>
              <div className="dropdown">
                <button className="dropdown-btn-small">USD ▼</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default WhatToLearn;
