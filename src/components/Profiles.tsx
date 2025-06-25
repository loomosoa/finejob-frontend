import React from "react";

const Profiles = () => {
  return (
    <div className="wrapper">
      <header className="main-header">
        <h1>ТЕХНОЛОГИЧЕСКИЙ СТЕК</h1>
        <div className="filters">
          <div className="dropdown">
            <select name="popularity" id="popularity-select">
              <option value="">--Популярность--</option>
              <option value="more-popular">Сначала популярные</option>
              <option value="less-popular">Сначала непопулярные</option>
            </select>
          </div>
          <div className="dropdown">
            <select name="income" id="income-select">
              <option value="">--Доход--</option>
              <option value="more-income">Сначала выше</option>
              <option value="less-income">Сначала ниже</option>
            </select>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="options" name="options" />
            <label htmlFor="options">Опции</label>
          </div>
          <div className="dropdown">
            <button className="dropdown-btn">Страна компании ▼</button>
          </div>
          <div className="dropdown">
            <button className="dropdown-btn">Язык общения ▼</button>
          </div>
        </div>
      </header>

      <main className="content-grid">
        <div className="grid-column">
          <h2>ЯЗЫКИ ПРОГРАММИРОВАНИЯ</h2>
          <ul>
            <li>Golang</li>
            <li>PHP</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>Python</li>
          </ul>
        </div>
        <div className="grid-column">
          <h2>ТЕХНОЛОГИИ</h2>
          <ul>
            <li>Docker</li>
            <li>Kubernetes</li>
            <li>Redis</li>
            <li>Kafka</li>
            <li>RabbitMQ</li>
            <li>MySQL</li>
            <li>PostgreSQL</li>
            <li>GraphQL</li>
            <li>MongoDB</li>
            <li>ELK</li>
            <li>ClickHouse</li>
          </ul>
        </div>
        <div className="grid-column">
          <h2>ФРЕЙМВОРКИ</h2>
          <ul>
            <li>ReactJS</li>
            <li>Gin</li>
            <li>Laravel</li>
            <li>ExpressJS</li>
            <li>NodeJS</li>
            <li>Tensorflow</li>
            <li>Pytorch</li>
            <li>NextJS</li>
            <li>Flask</li>
          </ul>
        </div>
        <aside className="salary-card">
          <h3>СРЕДНЯЯ ОПЛАТА В МЕСЯЦ</h3>
          <div className="salary-value">
            <span>2 235</span>
            <div className="dropdown">
              <button className="dropdown-btn-small">USD ▼</button>
            </div>
          </div>
        </aside>
      </main>
      <nav className="pagination">
        <a href="#">‹</a>
        <a href="#">1</a>
        <a href="#" className="active">
          2
        </a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">›</a>
      </nav>
    </div>
  );
};

export default Profiles;
