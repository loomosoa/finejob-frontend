import React from "react";

import vacResFields2 from "../assets/imgs/vac_res_fields.png";
import vacResArrow from "../assets/imgs/vac_res_arrow.svg";

const JobSeek: React.FC = () => {
  return (
    <>
      {/* <img src={vacResFields2} id="vacResFields" /> */}
      <div className="jobseek-main">
        <div className="jobseek-background"></div>
        <div className="black-break"></div>
      </div>
      <div className="jobseek-wrapper">
        <div className="container">
          <div className="dash-frame">
            <div className="dash-frame-inner">
              <div className="dash-field">
                <div className="title-wrapper">
                  <div className="title">Создать</div>
                </div>
                <div id="selectVacRes" className="field">
                  Вакансию | Резюме{" "}
                  <img className="vac-res-arrow" src={vacResArrow} />
                </div>
              </div>
              <div className="dash-field">
                <div className="title-wrapper">
                  <div className="title">Заголовок</div>
                </div>
                <div className="field-wrapper">
                  <input className="field" name="title" />
                  <div className="under-label">140 символов</div>
                </div>
              </div>
              <div id="vas-res-description" className="dash-field">
                <div className="title-wrapper">
                  <div className="title">Описание</div>
                </div>
                <div className="field-wrapper">
                  <textarea className="field" name="title" />
                  <div className="under-label">280 символов</div>
                </div>
              </div>
              <div id="vac-res-skills" className="dash-field">
                <div className="title-wrapper">
                  <div className="title">Навыки</div>
                </div>
              </div>
              <div className="skills-container">
                <div className="title">
                  <span className="skills-type">Languages</span>
                  <span className="search">Поиск</span>
                </div>
                <div className="skills-grid">
                  <div className="item">
                    <div className="checkbox"></div>
                    <div className="element">PHP</div>
                    <div className="grade">Any</div>
                  </div>
                  <div className="item">
                    <div className="checkbox"></div>
                    <div className="element">JavaScript</div>
                    <div className="grade">Any</div>
                  </div>
                  <div className="item">
                    <div className="checkbox"></div>
                    <div className="element">Rust</div>
                    <div className="grade">Any</div>
                  </div>
                  <div className="item">
                    <div className="checkbox"></div>
                    <div className="element">Python</div>
                    <div className="grade">Any</div>
                  </div>
                  <div className="item">
                    <div className="checkbox"></div>
                    <div className="element">TypeScript</div>
                    <div className="grade">Any</div>
                  </div>
                  <div className="item">
                    <div className="checkbox"></div>
                    <div className="element">SQL</div>
                    <div className="grade">Any</div>
                  </div>
                  <div className="item">
                    <div className="checkbox"></div>
                    <div className="element">Java</div>
                    <div className="grade">Any</div>
                  </div>
                  <div className="item">
                    <div className="checkbox"></div>
                    <div className="element">C#</div>
                    <div className="grade">Any</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          JobSeek
        </div>
      </div>
    </>
  );
};

export default JobSeek;
