import React from "react";

// import vacResFields2 from "../assets/imgs/vac_res_fields.png";
import vacResArrow from "../assets/imgs/vac_res_arrow.svg";
import axios from "axios";

type TSkills = {};

const JobSeek: React.FC = () => {
  const [skills, setSkills] = React.useState([]);

  React.useEffect(() => {
    const getSkills = async () => {
      const { data } = await axios.get(
        `http://finejob-api.local/api/v1/skills`
      );

      setSkills(data.data);

      // console.log(data.data[0].languages);
    };

    getSkills();
    console.log(skills);
  }, []);

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
                  {/* {languages.map((lang, i) => (
                        <li
                          key={i}
                          onClick={() => changeLanguage(lang)}
                          className={i18n.language === lang ? "active" : ""}
                        >
                          {t(lang)}
                        </li>
                      ))} */}
                  {/* {skills?[0].map((lang, i) => ( 
                    <div>{lang}</div>
                  ))} */}
                  {/* {skills?.languages.map((lang, i) => (
                    <li key={i}>{lang}</li>
                  ))} */}
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
