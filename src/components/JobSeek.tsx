import React from "react";

// import vacResFields2 from "../assets/imgs/vac_res_fields.png";
import vacResArrow from "../assets/imgs/vac_res_arrow.svg";
import selectImg from "../assets/imgs/select_img.svg";
import paymentTypeArrow from "../assets/imgs/payment_type_arrow.svg";
import paymentSelectionArrow from "../assets/imgs/payment_selection_arrow.svg";
import skillCheckedImg from "../assets/imgs/skill_checked.png";

import axios from "axios";

const JobSeek: React.FC = () => {
  const [langs, setLangs] = React.useState<any[]>([]);
  const [techs, setTechs] = React.useState<any[]>([]);
  const [frameworks, setFrameworks] = React.useState<any[]>([]);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Selected languages (for toggling the skill-checked image)
  const [selectedLangs, setSelectedLangs] = React.useState<Set<string>>(
    new Set()
  );
  // Selected technologies
  const [selectedTechs, setSelectedTechs] = React.useState<Set<string>>(
    new Set()
  );
  // Selected frameworks
  const [selectedFrameworks, setSelectedFrameworks] = React.useState<
    Set<string>
  >(new Set());

  const toggleLang = (lang: string) => {
    setSelectedLangs((prev) => {
      const next = new Set(prev);
      if (next.has(lang)) {
        next.delete(lang);
      } else {
        next.add(lang);
      }
      return next;
    });
  };

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) => {
      const next = new Set(prev);
      if (next.has(tech)) {
        next.delete(tech);
      } else {
        next.add(tech);
      }
      return next;
    });
  };

  const toggleFramework = (fw: string) => {
    setSelectedFrameworks((prev) => {
      const next = new Set(prev);
      if (next.has(fw)) {
        next.delete(fw);
      } else {
        next.add(fw);
      }
      return next;
    });
  };

  React.useEffect(() => {
    const getSkills = async () => {
      try {
        const { data } = await axios.get(
          "http://finejob-api.local/api/v1/skills"
        );
        const languagesObject = data.data?.[0]?.languages;

        if (typeof languagesObject === "object" && languagesObject !== null) {
          const flattenedLanguages = Object.values(languagesObject).flat();
          setLangs(flattenedLanguages);
        } else {
          console.error(
            "API response for languages is not an object:",
            languagesObject
          );
          setError("Ошибка формата данных от сервера.");
        }

        const frameworksObject = data.data?.[2]?.frameworks;
        if (typeof frameworksObject === "object" && frameworksObject !== null) {
          const flattenedFW = Object.values(frameworksObject).flat();
          setFrameworks(flattenedFW);
        } else {
          console.error(
            "API response for frameworksObject is not an object:",
            frameworksObject
          );
          setError("Ошибка формата данных от сервера.");
        }

        const techsObject = data.data?.[1]?.technologies;

        if (typeof techsObject === "object" && techsObject !== null) {
          const flattenedTechs = Object.values(techsObject).flat();
          setTechs(flattenedTechs);
        } else {
          console.error(
            "API response for techs is not an object:",
            techsObject
          );
          setError("Ошибка формата данных от сервера.");
        }
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Не удалось загрузить навыки. Пожалуйста, попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    getSkills();
  }, []);

  return (
    <>
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
              <div className="info"></div>
              <div className="skills-container collapsible">
                <div className="title">
                  <span className="skills-type">Языки</span>
                  <span className="search">Поиск...</span>
                </div>
                <div className="skills-grid">
                  {loading && <p>Загрузка...</p>}
                  {error && <p>{error}</p>}
                  {langs &&
                    langs.map((lang: string) => (
                      <div className="item" key={lang}>
                        <div
                          className="item-clickable"
                          onClick={() => toggleLang(lang)}
                        >
                          <div className="checkbox">
                            {selectedLangs.has(lang) && (
                              <img
                                src={skillCheckedImg}
                                className="skill-checked"
                              />
                            )}
                            <img src={selectImg} className="skill-select" />
                          </div>
                          <div className="element">{lang}</div>
                        </div>
                        <div className="grade">Any</div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="skills-container collapsible">
                <div className="title">
                  <span className="skills-type">Технологии</span>
                  <span className="search">Поиск</span>
                </div>
                <div className="skills-grid">
                  {loading && <p>Загрузка...</p>}
                  {error && <p>{error}</p>}
                  {techs &&
                    techs.map((tech: string) => (
                      <div className="item" key={tech}>
                        <div
                          className="item-clickable"
                          onClick={() => toggleTech(tech)}
                        >
                          <div className="checkbox">
                            {selectedTechs.has(tech) && (
                              <img
                                src={skillCheckedImg}
                                className="skill-checked"
                              />
                            )}
                            <img src={selectImg} className="skill-select" />
                          </div>
                          <div className="element">{tech}</div>
                        </div>
                        <div className="grade">Any</div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="skills-container collapsible">
                <div className="title">
                  <span className="skills-type">Фреймворки</span>
                  <span className="search">Поиск</span>
                </div>
                <div className="skills-grid">
                  {loading && <p>Загрузка...</p>}
                  {error && <p>{error}</p>}
                  {frameworks &&
                    frameworks.map((framework: string) => (
                      <div className="item" key={framework}>
                        <div
                          className="item-clickable"
                          onClick={() => toggleFramework(framework)}
                        >
                          <div className="checkbox">
                            {selectedFrameworks.has(framework) && (
                              <img
                                src={skillCheckedImg}
                                className="skill-checked"
                              />
                            )}
                            <img src={selectImg} className="skill-select" />
                          </div>
                          <div className="element">{framework}</div>
                        </div>
                        <div className="grade">Any</div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="vac-res-payment-container">
                <span className="payment-title">Оплата</span>
                <span className="title-from-to">От</span>
                <input name="payment-from" className="input-from-to" />
                <span className="title-from-to title-to">До</span>
                <input name="payment-to" className="input-from-to" />
                <img src={paymentTypeArrow} className="payment-type-arrow" />
                <div className="first-ps payment-selection">
                  в месяц
                  <img
                    src={paymentSelectionArrow}
                    className="payment-selection-arrow"
                  />
                </div>
                <div className="payment-selection">
                  на руки
                  <img
                    src={paymentSelectionArrow}
                    className="payment-selection-arrow"
                  />
                </div>
                <div className="payment-selection">
                  валюта
                  <img
                    src={paymentSelectionArrow}
                    className="payment-selection-arrow"
                  />
                </div>
              </div>
              <div className="payment-submit-container">
                <div className="submit-btn">submit</div>
                <input
                  className="email"
                  name="ps-email"
                  placeholder="Добавить e-mail для откликов"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSeek;
