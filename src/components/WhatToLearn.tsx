import React from "react";

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
} from "../redux/slices/skillsSlice";

import progLangSq from "../assets/imgs/prog_lang_fr.svg";
import techsSq from "../assets/imgs/techs-fr.svg";
import frameworksSq from "../assets/imgs/framewrks-fr.svg";
import framesSeparator from "../assets/imgs/frames_separator.svg";
import framesOptions from "../assets/imgs/frames_options.svg";
import arrowCurrency from "../assets/imgs/arrow_currency.svg";
import beInTouch from "../assets/imgs/be_in_touch.png";
import xCom from "../assets/imgs/xcom.png";
import telegramImg from "../assets/imgs/telegram.png";

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
    //   const newProfile = { ...profile };
    //   newProfile.profile_revenue[0].currency = currency;
    //   setProfile(newProfile);
    // }
    revenueCurrency.current = currency;
    setCurrencyDropdownOpen(false);
  };

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

      getSkillsRevenue();
    }

    setIsMounted(true);
    // const onClickskill = () => {
    //   getSkillsRevenue();
    // };
  }, [skills]);

  const formatter = new Intl.NumberFormat("en-US");

  return (
    <>
      <div className="second-wrapper">
        <div className="second-container">
          <div className="row-1">
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
                  <img className="frames-options" src={framesOptions} />
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
                        {/* <div className="left-frame">{skillRevenue}</div> */}
                        {/* <div className="right-frame">
                          <span className="currency">USD</span>
                          <img
                            className="arrow_currency currency"
                            src={arrowCurrency}
                          />
                        </div> */}
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
          </div>
          <div className="footer">
            <div className="banner">ads banner</div>
            <div className="subscription">
              <img className="be-in-touch" src={beInTouch} />
              {/* <!-- <span>Оставаться в курсе</span> --> */}
              <div className="input-container">
                <div className="back-frame">
                  <input
                    type="text"
                    placeholder="email"
                    name="email"
                    // autoComplete="off"
                  />
                </div>
                <button className="subscribe-btn">Подписаться</button>
              </div>
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
