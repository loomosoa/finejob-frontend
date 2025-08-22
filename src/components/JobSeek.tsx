import React from "react";

// import vacResFields2 from "../assets/imgs/vac_res_fields.png";
import vacResArrow from "../assets/imgs/vac_res_arrow.svg";
import selectImg from "../assets/imgs/select_img.svg";
import paymentTypeArrow from "../assets/imgs/payment_type_arrow.svg";
import paymentSelectionArrow from "../assets/imgs/payment_selection_arrow.svg";
import skillCheckedImg from "../assets/imgs/skill_checked.png";

import { useSelector, useDispatch } from "react-redux";

import {
  vacResSelector,
  setPaymentPeriod,
  setPaymentType,
  setPaymentCurrency,
} from "../redux/slices/vacResSlice";

import axios from "axios";

import { useTranslation } from "react-i18next";

const JobSeek: React.FC = () => {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const vacResItems = ["vacancy", "resume"];
  const vacResRef = React.useRef<string>("vacancy|resume");

  const [isVacResDropdownOpen, setVacResDropdown] =
    React.useState<boolean>(false);

  const toggleVacResDropdown = () => {
    setVacResDropdown(!isVacResDropdownOpen);
  };

  const handleVacResSelect = (item: string) => {
    vacResRef.current = item;
    setVacResDropdown(false);
  };

  const { paymentPeriod, paymentType, paymentCurrency } =
    useSelector(vacResSelector);

  //Payment Periods
  const paymentPeriods = ["month", "year", "hour"];

  const [isPaymentPeriodsDropdownOpen, setPaymentPeriodsDropdown] =
    React.useState<boolean>(false);

  const togglePaymentPeriodsDropdown = () => {
    setPaymentPeriodsDropdown(!isPaymentPeriodsDropdownOpen);
  };

  const selectPaymentPeriodDropdown = (period: string) => {
    dispatch(setPaymentPeriod(period));
    setPaymentPeriodsDropdown(false);
  };

  const paymentPeriodsRef = React.useRef<HTMLDivElement>(null);

  //Payment Type
  const paymentTypes = ["gross", "net"];

  const [isPaymentTypesDropdownOpen, setPaymentTypesDropdown] =
    React.useState<boolean>(false);

  const togglePaymentTypesDropdown = () => {
    setPaymentTypesDropdown(!isPaymentTypesDropdownOpen);
  };

  const selectPaymentTypeDropdown = (type: string) => {
    dispatch(setPaymentType(type));
    setPaymentTypesDropdown(false);
  };

  const paymentTypesRef = React.useRef<HTMLDivElement>(null);

  //Payment Currency
  const paymentCurrencies = ["USD", "RUB", "EUR"];

  const [isPaymentCurrenciesDropdownOpen, setPaymentCurrenciesDropdown] =
    React.useState<boolean>(false);

  const togglePaymentCurrenciesDropdown = () => {
    setPaymentCurrenciesDropdown(!isPaymentCurrenciesDropdownOpen);
  };

  const selectPaymentCurrencyDropdown = (currency: string) => {
    dispatch(setPaymentCurrency(currency));
    setPaymentCurrenciesDropdown(false);
  };

  const paymentCurrenciesRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const current = paymentPeriodsRef.current;
      const path = e.composedPath();

      if (current && !path.includes(current)) {
        setPaymentPeriodsDropdown(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      vacResRef: vacResRef.current,
      title: (fd.get("title") as string) || "",
      description: (fd.get("description") as string) || "",
      selectedLangs: Array.from(selectedLangs),
      selectedTech: Array.from(selectedTechs),
      selectedFrameworks: Array.from(selectedFrameworks),
      ["payment-from"]: (fd.get("payment-from") as string) || "",
      ["payment-to"]: (fd.get("payment-to") as string) || "",
      paymentPeriod,
      paymentType,
      paymentCurrency,
      email: (fd.get("email") as string) || "",
    };

    try {
      await axios.post(
        "http://finejob-api.local/api/v1/vac-res-data",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Form submitted successfully", payload);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const current = paymentTypesRef.current;
      const path = e.composedPath();

      if (current && !path.includes(current)) {
        setPaymentTypesDropdown(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const current = paymentCurrenciesRef.current;
      const path = e.composedPath();

      if (current && !path.includes(current)) {
        setPaymentCurrenciesDropdown(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
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
            <form id="vacResForm" action="" onSubmit={handleSubmit}>
              <div className="dash-frame-inner">
                <div className="dash-field">
                  <div className="title-wrapper">
                    <div className="title">Создать</div>
                  </div>
                  <div
                    id="selectVacRes"
                    onClick={() => toggleVacResDropdown()}
                    className="field"
                  >
                    {t(vacResRef.current)}
                    <img className="vac-res-arrow" src={vacResArrow} />
                  </div>
                  {isVacResDropdownOpen && (
                    <div className="vacResDropdown field">
                      {vacResItems.map((item) => (
                        <li key={item} onClick={() => handleVacResSelect(item)}>
                          {t(item)}
                        </li>
                      ))}
                    </div>
                  )}
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
                    <textarea className="field" name="description" />
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
                  {/* <img src={paymentTypeArrow} className="payment-type-arrow" /> */}
                  <div
                    ref={paymentPeriodsRef}
                    onClick={() => togglePaymentPeriodsDropdown()}
                    className="first-ps payment-selection"
                  >
                    {t(paymentPeriod)}
                    <img
                      src={paymentSelectionArrow}
                      className="payment-selection-arrow"
                    />
                    {isPaymentPeriodsDropdownOpen && (
                      <div className="payment-area-dropdown payment-selection">
                        {paymentPeriods.map((period) => (
                          <li
                            key={period}
                            onClick={() => selectPaymentPeriodDropdown(period)}
                          >
                            {t(period)}
                          </li>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    ref={paymentTypesRef}
                    onClick={() => togglePaymentTypesDropdown()}
                    className="payment-selection"
                  >
                    {t(paymentType)}
                    <img
                      src={paymentSelectionArrow}
                      className="payment-selection-arrow"
                    />
                    {isPaymentTypesDropdownOpen && (
                      <div className="payment-area-dropdown payment-selection">
                        {paymentTypes.map((type) => (
                          <li
                            key={type}
                            onClick={() => selectPaymentTypeDropdown(type)}
                          >
                            {t(type)}
                          </li>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    ref={paymentCurrenciesRef}
                    onClick={() => togglePaymentCurrenciesDropdown()}
                    className="payment-selection"
                  >
                    {t(paymentCurrency)}
                    <img
                      src={paymentSelectionArrow}
                      className="payment-selection-arrow"
                    />
                    {isPaymentCurrenciesDropdownOpen && (
                      <div className="payment-area-dropdown payment-selection">
                        {paymentCurrencies.map((currency) => (
                          <li
                            key={currency}
                            onClick={() =>
                              selectPaymentCurrencyDropdown(currency)
                            }
                          >
                            {t(currency)}
                          </li>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="payment-submit-container">
                  <button type="submit" className="submit-btn">
                    submit
                  </button>
                  <input
                    className="email"
                    name="email"
                    placeholder="Добавить e-mail для откликов"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSeek;
