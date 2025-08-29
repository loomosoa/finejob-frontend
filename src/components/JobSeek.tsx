import React from "react";

// import vacResFields2 from "../assets/imgs/vac_res_fields.png";
import vacResArrow from "../assets/imgs/vac_res_arrow.svg";
import selectImg from "../assets/imgs/select_img.svg";
import paymentTypeArrow from "../assets/imgs/payment_type_arrow.svg";
import paymentSelectionArrow from "../assets/imgs/payment_selection_arrow.svg";
import skillCheckedImg from "../assets/imgs/skill_checked.png";
import greenCheckmark from "../assets/imgs/green-checkmark.svg";
import redX from "../assets/imgs/red-x.svg";

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
  const vacResDivRef = React.useRef<HTMLDivElement>(null);

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
  const [otherSkills, setOtherSkills] = React.useState<any[]>([]);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [requestMessages, setRequestMessages] = React.useState<string[]>([]);

  /*
    #########################
    #########################
    Skills local search start
    #########################
    #########################
  */

  // Добавить состояние для строки поиска
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  // Обработчик изменения поля поиска
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  // Фильтрация языков на основе введенного запроса
  const filteredLangs = langs.filter((lang: string) =>
    lang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [techSearchQuery, setTechSearchQuery] = React.useState<string>("");

  const handleTechSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechSearchQuery(e.target.value);
  };

  const filteredTechs = techs.filter((tech: string) =>
    tech.toLowerCase().includes(techSearchQuery.toLowerCase())
  );

  const [frameworksSearchQuery, setFrameworksSearchQuery] =
    React.useState<string>("");

  const handleFrameworksSearchInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFrameworksSearchQuery(e.target.value);
  };

  const filteredFrameworks = frameworks.filter((framework: string) =>
    framework.toLowerCase().includes(frameworksSearchQuery.toLowerCase())
  );

  const [otherSkillsSearchQuery, setOtherSkillsSearchQuery] =
    React.useState<string>("");
  const handleOtherSkillsSearchInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherSkillsSearchQuery(e.target.value);
  };
  const filteredOtherSkills = otherSkills.filter((otherSkill: string) =>
    otherSkill.toLowerCase().includes(otherSkillsSearchQuery.toLowerCase())
  );

  /*
    Skills local search end
  */

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
  // Selected other skills
  const [selectedOtherSkills, setSelectedOtherSkills] = React.useState<
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

  const toggleOtherSkills = (otherSkill: string) => {
    setSelectedOtherSkills((prev) => {
      const next = new Set(prev);
      if (next.has(otherSkill)) {
        next.delete(otherSkill);
      } else {
        next.add(otherSkill);
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
          setError("Server format error");
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
          setError("Server format error");
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
          setError("Server format error");
        }

        const otherSkillsObject = data.data?.[3]?.other_skills;
        if (
          typeof otherSkillsObject === "object" &&
          otherSkillsObject !== null
        ) {
          const flattenedOtherSkills = Object.values(otherSkillsObject).flat();
          setOtherSkills(flattenedOtherSkills);
        } else {
          console.error(
            "API response for other skills is not an object:",
            otherSkillsObject
          );
          setError("Server format error");
        }
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("It was not possible to load skills");
      } finally {
        setLoading(false);
      }
    };

    getSkills();
  }, []);

  // Allow only digits in numeric inputs (positive integers)
  const handleNumericInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    // remove non-digits
    input.value = input.value.replace(/[^0-9]/g, "");
  };

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

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const current = vacResDivRef.current;
      const path = e.composedPath();

      if (current && !path.includes(current)) {
        setVacResDropdown(false);
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

    const validationErrors: string[] = [];

    // Validate 'Создать' (vacancy or resume) selection
    if (vacResRef.current !== "vacancy" && vacResRef.current !== "resume") {
      validationErrors.push("Select the value in the 'Create' field");
    }

    const title = ((fd.get("title") as string) || "").trim();
    const description = ((fd.get("description") as string) || "").trim();
    const junior = fd.get("junior");
    const middle = fd.get("middle");
    const senior = fd.get("senior");
    const paymentFrom = ((fd.get("payment-from") as string) || "").trim();
    const paymentTo = ((fd.get("payment-to") as string) || "").trim();
    const email = ((fd.get("email") as string) || "").trim();

    // Title/Description emptiness
    if (!title) {
      validationErrors.push("Fill out the field 'headline'");
    }
    if (!description) {
      validationErrors.push("Fill the field 'Description'");
    }

    // Title and Description length
    if (title.length > 140) {
      validationErrors.push(
        "The title should be no longer than 140 characters"
      );
    }
    if (description.length > 280) {
      validationErrors.push(
        "The description should be no longer than 280 characters"
      );
    }

    // Grade: at least one
    if (!junior && !middle && !senior) {
      validationErrors.push("Select at least one grade");
    }

    // Skills: at least one in each group
    if (selectedLangs.size === 0) {
      validationErrors.push("Select at least one language");
    }
    if (selectedTechs.size === 0) {
      validationErrors.push("Select at least one technology");
    }
    if (selectedFrameworks.size === 0) {
      validationErrors.push("Select at least one framework");
    }

    // Payment From/To: only positive integers if provided
    const posIntRe = /^[1-9]\d*$/;
    if (paymentFrom && !posIntRe.test(paymentFrom)) {
      validationErrors.push(
        "Field 'payment from' should contain only positive integers"
      );
    }
    if (paymentTo && !posIntRe.test(paymentTo)) {
      validationErrors.push(
        "Field 'payment to' should contain only positive integers"
      );
    }

    // Email: required and must be valid
    if (!email) {
      validationErrors.push("Specify e-mail");
    } else {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        validationErrors.push("Specify correct e-mail");
      }
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setRequestMessages([]);
      return;
    } else {
      setErrors([]);
    }

    const payload = {
      vacancyOrResume: vacResRef.current,
      title: title,
      description: description,
      type: {
        fulltime: (fd.get("fulltime") as string) || "",
        parttime: (fd.get("parttime") as string) || "",
      },
      grade: {
        junior: (fd.get("junior") as string) || "",
        middle: (fd.get("middle") as string) || "",
        senior: (fd.get("senior") as string) || "",
      },
      // middle: ,
      // senior: (fd.get("senior") as string) || "",
      selectedLangs: Array.from(selectedLangs),
      selectedTech: Array.from(selectedTechs),
      selectedFrameworks: Array.from(selectedFrameworks),
      selectedOtherSkills: Array.from(selectedOtherSkills),
      paymentFrom: paymentFrom,
      paymentTo: paymentTo,
      paymentPeriod,
      paymentType,
      paymentCurrency,
      email: email,
    };

    try {
      await axios.post(
        "http://finejob-api.local/api/v1/vac-res-data",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      let msg = vacResRef.current + " submitted successfully";
      console.log(msg, payload);
      const requestMsgArr: string[] = [];
      requestMsgArr.push(msg);
      setRequestMessages(requestMsgArr);
      // Reset form fields and UI state after successful submit
      form.reset();
      setSelectedLangs(new Set());
      setSelectedTechs(new Set());
      setSelectedFrameworks(new Set());
      setSelectedOtherSkills(new Set());
      setSearchQuery("");
      setTechSearchQuery("");
      setFrameworksSearchQuery("");
      // Reset dropdown redux values to initial defaults
      dispatch(setPaymentPeriod("month"));
      dispatch(setPaymentType("net"));
      dispatch(setPaymentCurrency("USD"));
      // Reset the vacancy/resume selector to placeholder
      vacResRef.current = "vacancy|resume";
      // Close any open dropdowns
      setVacResDropdown(false);
      setPaymentPeriodsDropdown(false);
      setPaymentTypesDropdown(false);
      setPaymentCurrenciesDropdown(false);
      // Clear any previous errors
      setErrors([]);
    } catch (err) {
      // validationErrors.push(err);
      validationErrors.push(err.response.data.message);
      setErrors(validationErrors);
      setRequestMessages([]);
      // console.log(validationErrors);

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

  const [submitPlaceholderText, setSubmitPlaceholderText] = React.useState("");

  const getPlaceholder = (width: number) => {
    if (width < 1015) {
      return "e-mail for responses";
    } else {
      return "Add e-mail for responses";
    }
  };

  React.useEffect(() => {
    const handleResize = () => {
      setSubmitPlaceholderText(getPlaceholder(window.innerWidth));
    };

    // Set initial placeholder on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
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
            <form id="vacResForm" action="" noValidate onSubmit={handleSubmit}>
              <div className="dash-frame-inner">
                <div className="dash-field">
                  <div className="title-wrapper">
                    <div className="title">{t("Create")}</div>
                  </div>
                  <div
                    ref={vacResDivRef}
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
                    <div className="title">{t("Title")}</div>
                  </div>
                  <div className="field-wrapper">
                    <input className="field" name="title" maxLength={140} />
                    <div className="under-label">140 {t("characters")}</div>
                  </div>
                </div>
                <div id="vas-res-description" className="dash-field">
                  <div className="title-wrapper">
                    <div className="title">{t("Description")}</div>
                  </div>
                  <div className="field-wrapper">
                    <textarea
                      className="field"
                      name="description"
                      maxLength={280}
                    />
                    <div className="under-label">280 {t("characters")}</div>
                  </div>
                </div>
                <div className="dash-field" id="type-of-employment-field">
                  <div id="type_of_employment" className="title-wrapper">
                    <div className="title">{t("Type")}</div>
                  </div>
                  <div className="field-wrapper checkbox">
                    <div className="checkbox-wrapper">
                      <div className="checkbox-item">
                        <label className="container">
                          <span className="checkbox-first-letter"></span>
                          Full-Time
                          <input
                            type="checkbox"
                            name="fulltime"
                            value="fulltime"
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <span>|</span>
                      <div className="checkbox-item">
                        <label className="container">
                          <span className="checkbox-first-letter"></span>
                          Part-Time
                          <input
                            type="checkbox"
                            name="parttime"
                            value="parttime"
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dash-field">
                  <div className="title-wrapper">
                    <div className="title">{t("Grade")}</div>
                  </div>
                  <div className="field-wrapper checkbox">
                    <div className="checkbox-wrapper">
                      <div className="checkbox-item">
                        <label className="container">
                          <span className="checkbox-first-letter">J</span>unior
                          <input type="checkbox" name="junior" value="junior" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <span>|</span>
                      <div className="checkbox-item">
                        <label className="container">
                          <span className="checkbox-first-letter">M</span>iddle
                          <input type="checkbox" name="middle" value="middle" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <span>|</span>
                      <div className="checkbox-item">
                        <label className="container">
                          <span className="checkbox-first-letter">S</span>enior
                          <input type="checkbox" name="senior" value="senior" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="vac-res-skills" className="dash-field">
                  <div className="title-wrapper">
                    <div className="title">{t("Skills")}</div>
                  </div>
                </div>
                <div className="info"></div>
                <div className="skills-container collapsible">
                  <div className="title">
                    <span className="skills-type">{t("Languages")}</span>
                    <input
                      className="skills-search"
                      type="text"
                      placeholder={t("Search...")}
                      value={searchQuery}
                      onChange={handleSearchInput}
                    />
                  </div>
                  <div className="skills-grid">
                    {loading && <p>{t("Loading")}...</p>}
                    {error && <p>{t(error)}</p>}
                    {filteredLangs.length > 0
                      ? filteredLangs.map((lang: string) => (
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
                          </div>
                        ))
                      : !loading && <p>{t("Languages ​​are not found")}</p>}
                  </div>
                </div>

                <div className="skills-container collapsible">
                  <div className="title">
                    <span className="skills-type">{t("Technologies")}</span>
                    <input
                      className="skills-search"
                      type="text"
                      placeholder={t("Search...")}
                      value={techSearchQuery}
                      onChange={handleTechSearchInput}
                    />
                  </div>
                  <div className="skills-grid">
                    {loading && <p>{t("Loading")}...</p>}
                    {error && <p>{t(error)}</p>}
                    {filteredTechs.length > 0
                      ? filteredTechs.map((tech: string) => (
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
                          </div>
                        ))
                      : !loading && <p>{t("Technologies are not found")}</p>}
                  </div>
                </div>

                <div className="skills-container collapsible">
                  <div className="title">
                    <span className="skills-type">{t("Frameworks")}</span>
                    <input
                      className="skills-search"
                      type="text"
                      placeholder={t("Search...")}
                      value={frameworksSearchQuery}
                      onChange={handleFrameworksSearchInput}
                    />
                  </div>
                  <div className="skills-grid">
                    {loading && <p>{t("Loading")}...</p>}
                    {error && <p>{t(error)}</p>}
                    {filteredFrameworks.length > 0
                      ? filteredFrameworks.map((framework: string) => (
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
                          </div>
                        ))
                      : !loading && <p>{t("Frameworks are not found")}</p>}
                  </div>
                </div>
                <div className="skills-container collapsible">
                  <div className="title">
                    <span className="skills-type">{t("Other skills")}</span>
                    <input
                      className="skills-search"
                      type="text"
                      placeholder={t("Search...")}
                      value={otherSkillsSearchQuery}
                      onChange={handleOtherSkillsSearchInput}
                    />
                  </div>
                  <div className="skills-grid">
                    {loading && <p>{t("Loading")}...</p>}
                    {error && <p>{t(error)}</p>}
                    {filteredOtherSkills.length > 0
                      ? filteredOtherSkills.map((otherSkill: string) => (
                          <div className="item" key={otherSkill}>
                            <div
                              className="item-clickable"
                              onClick={() => toggleOtherSkills(otherSkill)}
                            >
                              <div className="checkbox">
                                {selectedOtherSkills.has(otherSkill) && (
                                  <img
                                    src={skillCheckedImg}
                                    className="skill-checked"
                                  />
                                )}
                                <img src={selectImg} className="skill-select" />
                              </div>
                              <div className="element">{otherSkill}</div>
                            </div>
                          </div>
                        ))
                      : !loading && <p>{t("Other skills are not found")}</p>}
                  </div>
                </div>

                <div className="vac-res-payment-container">
                  <div className="pc-first-block">
                    <span className="payment-title">{t("Payment")}</span>
                    <span className="title-from-to">{t("From")}</span>
                    <input
                      name="payment-from"
                      className="input-from-to"
                      inputMode="numeric"
                      pattern="^[1-9]\\d*$"
                      onInput={handleNumericInput}
                    />
                    <span className="title-from-to title-to">{t("To")}</span>
                    <input
                      name="payment-to"
                      className="input-from-to"
                      inputMode="numeric"
                      pattern="^[1-9]\\d*$"
                      onInput={handleNumericInput}
                    />
                  </div>
                  <div className="pc-second-block">
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
                              onClick={() =>
                                selectPaymentPeriodDropdown(period)
                              }
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
                </div>
                <div className="payment-submit-container">
                  <button type="submit" className="submit-btn">
                    submit
                  </button>
                  <input
                    className="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t(submitPlaceholderText)}
                  />
                </div>
                {errors.length > 0 && (
                  <div className="form-errors form-message">
                    <img src={redX} className="message-icon" />
                    <ul>
                      {errors.map((er, idx) => (
                        <li key={idx}>{t(er)}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {requestMessages.length > 0 && (
                  <div className="form-msg form-message">
                    <img src={greenCheckmark} className="message-icon" />
                    <ul>
                      {requestMessages.map((msg, idx) => (
                        <li key={idx}>{t(msg)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSeek;
