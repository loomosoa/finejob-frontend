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

  return (
    <>
      {/* ################ */}
      <hr />
      <div className="learn-section">
        <h2 className="section-title">Что учить?</h2>
        <div className="learn-content-wrapper">
          <div className="learn-main-content">
            <div className="learn-row">
              <div className="learn-category">ЯЗЫКИ ПРОГРАММИРОВАНИЯ</div>
              <div className="tech-group">
                {ProgLangs.map((lang, i) => (
                  <span
                    className={`tech-tag learning-item ${
                      ifSkillsContainSkill(lang) ? "active-tech" : ""
                    }`}
                    onClick={() => toggleSkill(lang)}
                    key={i}
                  >
                    {lang.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
            <div className="learn-row">
              <div className="learn-category">ТЕХНОЛОГИИ</div>
              <div className="tech-group">
                {Technologies.map((technology, i) => (
                  <span
                    className={`tech-tag learning-item ${
                      ifSkillsContainSkill(technology) ? "active-tech" : ""
                    }`}
                    onClick={() => toggleSkill(technology)}
                    key={i}
                  >
                    {technology.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
            <div className="learn-row">
              <div className="learn-category">ФРЕЙМВОРКИ</div>
              <div className="tech-group">
                {Frameworks.map((framework, i) => (
                  <span
                    className={`tech-tag learning-item ${
                      ifSkillsContainSkill(framework) ? "active-tech" : ""
                    }`}
                    onClick={() => toggleSkill(framework)}
                    key={i}
                  >
                    {framework.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <aside className="salary-card learn-salary-card">
            <h3>СРЕДНЯЯ ОПЛАТА В МЕСЯЦ</h3>
            <div className="salary-value">
              <span>{skillRevenue}</span>
              <div className="dropdown">
                <div className="currency">USD</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default WhatToLearn;
