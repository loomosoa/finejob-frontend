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

  // FSC: FirstSkillsContainer
  const [isFSCOpen, setFSCOpen] = React.useState<boolean>(false);
  const [FSCHeight, setFSCHeight] = React.useState<number>(365);
  const FSCContentRef = React.useRef<HTMLDivElement>(null);

  //SSC: SecondSkillsContainer
  const [isSSCOpen, setSSCOpen] = React.useState<boolean>(false);
  const [SSCHeight, setSSCHeight] = React.useState<number>(380);
  const SSCContentRef = React.useRef<HTMLDivElement>(null);

  //TSC: ThirdSkillsContainer
  const [isTSCOpen, setTSCOpen] = React.useState<boolean>(false);
  const [TSCHeight, setTSCHeight] = React.useState<number>(360);
  const TSCContentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (FSCContentRef.current) {
      setFSCHeight(FSCContentRef.current.scrollHeight); // Вычисляем высоту содержимого
    }
  }, [isFSCOpen]);

  React.useEffect(() => {
    if (SSCContentRef.current) {
      setSSCHeight(SSCContentRef.current.scrollHeight); // Вычисляем высоту содержимого
    }
  }, [isSSCOpen]);

  React.useEffect(() => {
    if (TSCContentRef.current) {
      setTSCHeight(TSCContentRef.current.scrollHeight); // Вычисляем высоту содержимого
    }
  }, [isTSCOpen]);

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
              <div className="info"></div>
              <div
                ref={FSCContentRef}
                className="skills-container collapsible"
                style={{
                  height: isFSCOpen ? `${FSCHeight}px` : "365px",
                  opacity: isFSCOpen ? 1 : 1,
                  overflow: "hidden",
                  transition: "height 0.3s ease-out, opacity 1s ease-out",
                }}
              >
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
                        <div className="checkbox">
                          <img
                            src={skillCheckedImg}
                            className="skill-checked"
                          />
                          <img src={selectImg} className="skill-select" />
                        </div>
                        <div className="element">{lang}</div>
                        <div className="grade">Any</div>
                      </div>
                    ))}
                </div>
              </div>
              <div onClick={() => setFSCOpen(!isFSCOpen)} className="open-more">
                <span>{isFSCOpen ? "Close" : "Open more"}</span>
              </div>
              <div
                ref={SSCContentRef}
                className="skills-container collapsible"
                style={{
                  height: isSSCOpen ? `${SSCHeight}px` : "380px",
                  opacity: isSSCOpen ? 1 : 1,
                  overflow: "hidden",
                  transition: "height 0.5s ease-out, opacity 1s ease-out",
                }}
              >
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
                        <div className="checkbox">
                          <img src={selectImg} />
                        </div>
                        <div className="element">{tech}</div>
                        <div className="grade">Any</div>
                      </div>
                    ))}
                </div>
              </div>
              <div onClick={() => setSSCOpen(!isSSCOpen)} className="open-more">
                <span>{isSSCOpen ? "Close" : "Open more"}</span>
              </div>
              <div
                ref={TSCContentRef}
                className="skills-container collapsible"
                style={{
                  height: isTSCOpen ? `${TSCHeight}px` : "360px",
                  opacity: isTSCOpen ? 1 : 1,
                  overflow: "hidden",
                  transition: "height 0.5s ease-out, opacity 1s ease-out",
                }}
              >
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
                        <div className="checkbox">
                          <img src={selectImg} />
                        </div>
                        <div className="element">{framework}</div>
                        <div className="grade">Any</div>
                      </div>
                    ))}
                </div>
              </div>
              <div onClick={() => setTSCOpen(!isTSCOpen)} className="open-more">
                <span>{isTSCOpen ? "Close" : "Open more"}</span>
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
