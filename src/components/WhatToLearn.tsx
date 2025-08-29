import React from "react";

import { Helmet } from "react-helmet";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import {
  FrameworksEnum,
  ProgLangsEnum,
  TechnologiesEnum,
} from "../redux/slices/skillsTypes";
import {
  skillsSelector,
  setSkills,
  pushSkill,
  pullSkill,
  clearAll,
} from "../redux/slices/skillsSlice";

import progLangSq from "../assets/imgs/prog_lang_fr.svg";
import techsSq from "../assets/imgs/techs-fr.svg";
import frameworksSq from "../assets/imgs/framewrks-fr.svg";
import framesSeparator from "../assets/imgs/frames_separator.svg";
import framesOptions from "../assets/imgs/frames_options.svg";
import arrowCurrency from "../assets/imgs/arrow_currency.svg";
import beInTouchRU from "../assets/imgs/be_in_touch_ru.png";
import beInTouchEN from "../assets/imgs/be_in_touch_en.png";
import xCom from "../assets/imgs/xcom.png";
import telegramImg from "../assets/imgs/telegram.png";
import greenCheckmark from "../assets/imgs/green-checkmark.svg";
import redX from "../assets/imgs/red-x.svg";

import { useTranslation } from "react-i18next";

/*
отрисовать
повесить событие - тогл выделения
при каждом тогле - добавлять или удалять элемент из списка
при тогле делать запрос на бэкенд - передавать аргументом массив, в ответ получать и отображать сумму
*/

export const ProgLangs = [
  ProgLangsEnum.JAVA,
  ProgLangsEnum.JAVASCRIPT,
  ProgLangsEnum.PYTHON,
  ProgLangsEnum.C,
  ProgLangsEnum.CPP,
  ProgLangsEnum.RUST,
  ProgLangsEnum.PHP,
  ProgLangsEnum.GO,
  ProgLangsEnum.CSHARP,
  ProgLangsEnum.FSHARP,
  ProgLangsEnum.SWIFT,
  ProgLangsEnum.DART,
  ProgLangsEnum.KOTLIN,
  ProgLangsEnum.SCALA,
  ProgLangsEnum.SOLIDITY,
  ProgLangsEnum.HASKEL,
  ProgLangsEnum.RUBY,
  ProgLangsEnum.LUA,
  ProgLangsEnum.JULIA,
  ProgLangsEnum.R,
  ProgLangsEnum.OBJECTIVEC,
  ProgLangsEnum.BASIC,
  ProgLangsEnum.DELPHI,
  ProgLangsEnum.FORTRAN,
];

export const Technologies = [
  TechnologiesEnum.DOCKER,
  TechnologiesEnum.CLICKHOUSE,
  TechnologiesEnum.ELK,
  TechnologiesEnum.GRAPHQL,
  TechnologiesEnum.KAFKA,
  TechnologiesEnum.KUBERNETES,
  TechnologiesEnum.MONGODB,
  TechnologiesEnum.MYSQL,
  TechnologiesEnum.POSTGRESQL,
  TechnologiesEnum.REDIS,
  TechnologiesEnum.RABBITMQ,
];

export const Frameworks = [
  FrameworksEnum.REACTJS,
  FrameworksEnum.VUEJS,
  FrameworksEnum.GIN,
  FrameworksEnum.LARAVEL,
  FrameworksEnum.SYMFONY,
  FrameworksEnum.EXPRESSJS,
  FrameworksEnum.NODEJS,
  FrameworksEnum.TENSORFLOW,
  FrameworksEnum.PYTORCH,
  FrameworksEnum.NEXTJS,
  FrameworksEnum.FLASK,
];

const WhatToLearn: React.FC = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { skills } = useSelector(skillsSelector);

  // <
  //   (ProgLangsEnum | TechnologiesEnum | FrameworksEnum)[]
  // >

  const [skillRevenue, setSkillRevenue] = React.useState(0);
  const [isMounted, setIsMounted] = React.useState(false);

  // const items: (
  //   | ProgrammingLanguagesEnum
  //   | TechnologiesEnum
  //   | FrameworksEnum
  // )[] = [
  //   ProgrammingLanguagesEnum.JAVA,
  //   TechnologiesEnum.DOCKER,
  //   FrameworksEnum.REACTJS,
  // ];

  // console.log(items);

  const toggleSkill = (
    skill: ProgLangsEnum | TechnologiesEnum | FrameworksEnum
  ): void => {
    if (ifSkillsContainSkill(skill)) {
      dispatch(pullSkill(skill));
    } else {
      dispatch(pushSkill(skill));
      // console.log("push skills", skills);
    }
  };

  const ifSkillsContainSkill = (
    skill: ProgLangsEnum | TechnologiesEnum | FrameworksEnum
  ): boolean => {
    return skills.includes(skill);
  };

  const [isCurrencyDropdownOpen, setCurrencyDropdownOpen] =
    React.useState(false);

  const revenueCurrency = React.useRef<string>("USD");

  const currencies = ["USD", "RUB", "EUR"];

  const toggleCurrencyDropdown = () => {
    setCurrencyDropdownOpen(!isCurrencyDropdownOpen);
  };

  const handleCurrencySelect = (currency: string) => {
    // if (profile) {

    revenueCurrency.current = currency;
    setCurrencyDropdownOpen(false);
  };

  const clearAllSkillItems = () => {
    dispatch(clearAll());
  };

  React.useEffect(() => {
    /*
    TODO: запрос к API курсов, их инициализация в список
    */
  }, []);

  //TODO: fix
  const USDtoRUB = 80;
  const USDtoEUR = 0.86;

  interface Dictionary<T> {
    [key: string]: T;
  }

  const revenueCurrenciesList: Dictionary<number> = {
    USD: 1,
    RUB: USDtoRUB,
    EUR: USDtoEUR,
  };

  React.useEffect(() => {
    if (isMounted) {
      const getSkillsRevenue = async () => {
        const { data } = await axios.post(
          `http://127.0.0.1:8000/api/v1/skills/revenue`,
          // `http://finejob-api.local/api/v1/skills/revenue`,
          JSON.stringify({
            skills: skills,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("skills", skills);

        setSkillRevenue(data.revenue.amount);
      };

      // getSkillsRevenue();
    }

    setIsMounted(true);
    // const onClickskill = () => {
    //   getSkillsRevenue();
    // };
  }, [skills]);

  const formatter = new Intl.NumberFormat("en-US");

  const [email, setEmail] = React.useState("");
  const [subscriptionError, setSubscriptionError] = React.useState("");
  const [subscriptionSuccess, setSubscriptionSuccess] = React.useState("");

  const getSendPulsApiToken = async () => {
    const requestBody = {
      "grant_type": "client_credentials",
      "client_id": "887f44ca4497b506b8cf6dcfa956c4b0",
      "client_secret": "f6f5969f0986e946347533f7a72bf1a1",
    };

    let response = "";
    try {
      response = await axios.post("/oauth/access_token", requestBody);
    } catch (err) {
      console.error("Network error details:", err);
    }

    return response.data.access_token;
  };

  const handleEmailSubscriptionSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    try {
      const bearerToken = await getSendPulsApiToken();

      const requestBody = {
        emails: [email], // Можно добавить другие поля, например, name
      };

      const customHeaders = {
        "Authorization": "Bearer " + bearerToken,
        "Content-Type": "application/json", // Often set automatically for JSON bodies
      };

      const response = await axios.post(
        "/addressbooks/379657/emails",
        requestBody,
        {
          headers: customHeaders,
        }
      );

      const data = await response.data;

      console.log("response data: ", data);

      if (data.result === true) {
        setSubscriptionSuccess("Subscription successful");
        setEmail("");
        setSubscriptionError("");
      } else {
        setSubscriptionError(
          // "Ошибка: " + (data.message || "Failed to send data")
          "Error: failed to send data"
        );
        setSubscriptionSuccess("");
      }
    } catch (err) {
      setSubscriptionError("Error: " + err.message);
      setSubscriptionSuccess("");
      console.error("Error:", err);
    }
  };

  return (
    <>
      {/* <Helmet>
        <script
          type="text/javascript"
          src="//web.webformscr.com/apps/fc3/build/default-handler.js?1751877883512"
        ></script>
      </Helmet> */}

      <div className="second-wrapper">
        <div className="second-container">
          {/* <div className="row-1">
            <div className="title">Что учить?</div>
            <div className="text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea
              </p>
              <p>Каждый выбранный пункт увеличивает “чек”</p>
            </div>
          </div>
          <div className="row-2">
            <div className="titles">
              <div className="title-container">
                <img className="title-img" src={progLangSq} />
                <span className="title">
                  Языки <br />
                  программирования
                </span>
              </div>
              <div className="title-container">
                <img className="title-img" src={techsSq} />
                <span className="title">
                  {" "}
                  Технологии <br />
                </span>
              </div>
              <div className="title-container">
                <img className="title-img" src={frameworksSq} />
                <span className="title"> Фреймворки</span>
              </div>
            </div>
            <div className="frame-container">
              <div className="frame">
                <div className="skills-frame">
                  <div className="skills-container">
                    {ProgLangs.map((lang, i) => (
                      <span
                        className={`${
                          ifSkillsContainSkill(lang) ? "selected" : ""
                        }`}
                        onClick={() => toggleSkill(lang)}
                        key={i}
                      >
                        {lang.toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <img src={framesSeparator} />
                  <div className="skills-container">
                    {Technologies.map((technology, i) => (
                      <span
                        className={`${
                          ifSkillsContainSkill(technology) ? "selected" : ""
                        }`}
                        onClick={() => toggleSkill(technology)}
                        key={i}
                      >
                        {technology.toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <img src={framesSeparator} />
                  <div className="skills-container">
                    {Frameworks.map((framework, i) => (
                      <span
                        className={`${
                          ifSkillsContainSkill(framework) ? "selected" : ""
                        }`}
                        onClick={() => toggleSkill(framework)}
                        key={i}
                      >
                        {framework.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card-frame">
                  <img
                    onClick={() => clearAllSkillItems()}
                    className="frames-options"
                    src={framesOptions}
                  />
                  <div className="card">
                    <div className="card-wrapper">
                      <div className="title">Средняя оплата в месяц</div>
                      <div className="frames">
                        <div className="left-frame">
                          {formatter.format(
                            skillRevenue *
                              revenueCurrenciesList[revenueCurrency.current]
                          )}
                        </div>
                        <div
                          className="right-frame"
                          onClick={toggleCurrencyDropdown}
                        >
                          <span className="currency">
                            {" "}
                            {revenueCurrency.current}
                          </span>
                          <img
                            className="arrow_currency currency"
                            src={arrowCurrency}
                          />
                        </div>
                      </div>
                    </div>
                    {isCurrencyDropdownOpen && (
                      <div className="currency-dropdown">
                        <ul>
                          {currencies.map((currency) => (
                            <li
                              key={currency}
                              onClick={() => handleCurrencySelect(currency)}
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
          </div> */}
          <div className="footer">
            <div className="banner">ads banner</div>
            <div className="subscription">
              <img
                className="be-in-touch"
                src={i18n.language === "ru" ? beInTouchRU : beInTouchEN}
              />
              {/* <!-- <span>Оставаться в курсе</span> --> */}
              <form onSubmit={handleEmailSubscriptionSubmit}>
                <div className="input-container">
                  <div className="back-frame">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email"
                      required
                      autoComplete="on"
                    />
                  </div>
                  <button type="submit" className="subscribe-btn">
                    {t("subscribe")}
                  </button>
                </div>
                {subscriptionSuccess && (
                  <div className="form-success subscription-message">
                    <img src={greenCheckmark} className="message-icon" />
                    <span>{t(subscriptionSuccess)}</span>
                  </div>
                )}
                {subscriptionError && (
                  <div className="form-error subscription-message">
                    <img src={redX} className="message-icon" />
                    <span>{t(subscriptionError)}</span>
                  </div>
                )}
              </form>
            </div>
            <div className="social-nets">
              <img src={xCom} />
              <img src={telegramImg} />
            </div>
            <div className="bottom-txt">Robust Technologies © 2025</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatToLearn;
