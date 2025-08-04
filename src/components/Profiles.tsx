import React from "react";
import axios from "axios";

import Sort from "./Sort";
import Pagination from "./Pagination";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { filterSelector, setTotalPages } from "../redux/slices/filterSlice";

import progLangSq from "../assets/imgs/prog_lang_sq.png";
import techsSq from "../assets/imgs/techs-sq.png";
import framewrksSq from "../assets/imgs/frameworks-sq.png";
import otherSkilsSq from "../assets/imgs/otherskills-sq.png";
import rocket from "../assets/imgs/rocket.png";
import arrowCurrency from "../assets/imgs/pc_arrow_currency.svg";
import dashColorsImg from "../assets/imgs/dash-content-bottom-img.png";
import changeLangImg from "../assets/imgs/change_lang_4.svg";
import infoIcon from "../assets/imgs/info2.svg";
import vacResFields2 from "../assets/imgs/vac_res_fields.png";

import { useTranslation } from "react-i18next";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

type TProfileRevenue = {
  amount: number;
  currency: string;
};

type TProfile = {
  id: number;
  core_lang_vacancy_count: number;
  prog_langs: { skill: string; skillCount: number }[];
  technologies: { skill: string; skillCount: number }[];
  frameworks: { skill: string; skillCount: number }[];
  other_skills: { skill: string; skillCount: number }[];
  profile_revenue: TProfileRevenue[];
};

const Profiles: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    revenueCurrency.current = lng === "ru" ? "RUB" : "USD";
    setLangListOpen(false);
  };

  const toggleLangs = () => {
    setLangListOpen(!isLangListOpen);
  };

  const dispatch = useDispatch();
  const [profile, setProfile] = React.useState<TProfile>();

  const [isLangListOpen, setLangListOpen] = React.useState<boolean>(false);

  // const [isOpen, setIsOpen] = React.useState(false);
  // const [height, setHeight] = React.useState(340);
  // const contentRef = React.useRef<HTMLDivElement>(null);

  const [isCurrencyDropdownOpen, setCurrencyDropdownOpen] =
    React.useState(false);

  const defaultCurrency = i18n.language === "ru" ? "RUB" : "USD";
  // console.log(i18n.language);

  const revenueCurrency = React.useRef<string>(defaultCurrency);
  const currencyRef = React.useRef<HTMLDivElement>(null);
  const changeLangRef = React.useRef<HTMLDivElement>(null);

  const currencies = ["USD", "RUB", "EUR"];

  const languages = ["en", "ru"];

  const toggleCurrencyDropdown = () => {
    setCurrencyDropdownOpen(!isCurrencyDropdownOpen);
  };

  const handleCurrencySelect = (currency: string) => {
    revenueCurrency.current = currency;
    setCurrencyDropdownOpen(false);
  };

  const { currentPage, totalPages, sort } = useSelector(filterSelector);

  // React.useEffect(() => {
  //   if (contentRef.current) {
  //     setHeight(contentRef.current.scrollHeight); // Вычисляем высоту содержимого
  //   }
  // }, [isOpen]);

  React.useEffect(() => {
    const getProfiles = async () => {
      const { data } = await axios.get(
        // `https://5d9704ac1962357f.mokky.dev/profiles?page=${currentPage}&limit=1&sortBy=${sort.type}`
        `http://finejob-api.local/api/v1/profiles?page=${currentPage}&limit=1&sortBy=${sort.type}`
      );

      setProfile(data.data[0]);
      dispatch(setTotalPages(data.meta.total));
    };

    getProfiles();
  }, [currentPage, sort]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const current = currencyRef.current;
      const path = e.composedPath();

      if (current && !path.includes(current)) {
        setCurrencyDropdownOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    const handleClickOutsideLang = (e: MouseEvent) => {
      const current = changeLangRef.current;
      const path = e.composedPath();

      if (current && !path.includes(current)) {
        setLangListOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutsideLang);

    return () => {
      document.body.removeEventListener("click", handleClickOutsideLang);
    };
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="page-header">
            <div className="top-cont">
              <h1 className="header-title">FJ</h1>
              <div id="lang_change" ref={changeLangRef}>
                <div className="lang_current" onClick={() => toggleLangs()}>
                  {/* {i18n.language} */}
                  <img id="change_lang_img" src={changeLangImg} />
                </div>
                {isLangListOpen && (
                  <div className="site_langs">
                    <ul>
                      {languages.map((lang, i) => (
                        <li
                          key={i}
                          onClick={() => changeLanguage(lang)}
                          className={i18n.language === lang ? "active" : ""}
                        >
                          {t(lang)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* <button onClick={() => changeLanguage("en")}>English</button>
                <button onClick={() => changeLanguage("ru")}>Русский</button> */}
              </div>
            </div>
            <hr />
            <p className="header-txt-1">{t("txt-1")}</p>
            <div className="header-txt-cont">
              <p className="header-txt-2">{t("txt-2")}</p>
            </div>
          </div>
          <div className="dash-container">
            <div className="dash">
              <div className="dash-header">
                <Sort />
                <div className="tech-stack">{t("tech_stack")}</div>
                <div className="skills-profiles">&{t("skills_profiles")}</div>
              </div>
              <div className="dash-content">
                <div
                  // ref={contentRef}
                  // className="info collapsible"
                  className="info"
                  // style={{
                  //   height: isOpen ? `${height}px` : "340px",
                  //   opacity: isOpen ? 1 : 1,
                  //   overflow: "hidden",
                  //   transition: "height 0.7s ease-out, opacity 1s ease-out",
                  // }}
                >
                  <div className="column">
                    <div className="column-header">
                      <img className="title-img" src={progLangSq} />
                      <span className="title">
                        {t("prog_l")} <br /> {t("p_langs")}
                      </span>
                    </div>
                    <div className="column-body">
                      <div id="main_prog_lang_tooltip"></div>
                      <ul>
                        {profile?.prog_langs.map((lang, i) => (
                          <li key={i}>
                            <span className={`${i === 0 ? "main-lang" : ""}`}>
                              {lang.skill}
                            </span>
                            {i === 0 && (
                              <>
                                {` (${profile?.core_lang_vacancy_count})`}
                                <Tippy content={t("main_prog_lang_tooltip")}>
                                  <img
                                    className="info_icon"
                                    src={infoIcon}
                                    alt="info"
                                    // style={{
                                    //   marginLeft: "5px",
                                    //   height: "1em",
                                    //   verticalAlign: "middle",
                                    // }}
                                  />
                                </Tippy>
                              </>
                            )}
                            {i != 0 && ` (${lang.skillCount}%)`}
                            {/* {lang.skillCount} */}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="column">
                    <div className="column-header">
                      <img className="title-img" src={techsSq} />
                      <span className="title">
                        {t("technologies")} <br />
                      </span>
                    </div>
                    <div className="column-body">
                      <ul>
                        {profile?.technologies.map((tech, i) => (
                          <li key={i}>
                            {tech.skill} ({tech.skillCount}%)
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="column">
                    <div className="column-header">
                      <img className="title-img" src={framewrksSq} />
                      <span className="title">{t("frameworks")}</span>
                    </div>
                    <div className="column-body">
                      <ul>
                        {profile?.frameworks.map((framework, i) => (
                          <li key={i}>
                            {framework.skill} ({framework.skillCount}%)
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="column other-skills">
                    <div className="column-header">
                      <img className="title-img" src={otherSkilsSq} />
                      <span className="title">{t("other_skills")}</span>
                    </div>
                    <div className="column-body">
                      <ul>
                        {profile?.other_skills.map((skill, i) => (
                          <li key={i}>
                            {skill.skill} ({skill.skillCount}%)
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="payment-card">
                    <div className="header">
                      <div className="intro-text">{t("txt-3")}</div>
                      <img className="rocket" src={rocket} />
                    </div>
                    <div className="card">
                      <div className="card-wrapper">
                        <div className="title">
                          {t("average_payment_1")} <br />
                          {t("average_payment_2")}
                        </div>
                        <div ref={currencyRef} className="frames">
                          <div className="left-frame">
                            {
                              profile?.profile_revenue[revenueCurrency.current]
                                .amount
                            }
                          </div>
                          <div
                            className="right-frame"
                            onClick={toggleCurrencyDropdown}
                          >
                            <span className="currency">
                              {revenueCurrency.current}
                            </span>
                            <img
                              className="arrow-currency currency"
                              src={arrowCurrency}
                            />
                          </div>
                          {isCurrencyDropdownOpen && (
                            <div className="currency-dropdown">
                              <ul>
                                {currencies.map((currency) => (
                                  <li
                                    key={currency}
                                    onClick={() =>
                                      handleCurrencySelect(currency)
                                    }
                                  >
                                    {currency}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div onClick={() => setIsOpen(!isOpen)} className="open-more">
                  <span>{isOpen ? "Свернуть" : "Открыть еще"}</span>
                  <img className="arrow" src={arrowOpenMore} />
                </div> */}

                <img id="dash_colors_bottom" src={dashColorsImg} />
                {/* <div className="bottom-img"></div> */}
              </div>
            </div>
            <nav className="pagination">
              <Pagination totalPages={totalPages} />
            </nav>
          </div>
        </div>
      </div>
      <img src={vacResFields2} id="vacResFields" />
    </>
  );
};

export default Profiles;
