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
import arrowOpenMore from "../assets/imgs/arrow_down.svg";

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

const Profiles = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = React.useState<TProfile>();
  // const [isOpen, setIsOpen] = React.useState(false);
  // const [height, setHeight] = React.useState(340);
  // const contentRef = React.useRef<HTMLDivElement>(null);

  const [isCurrencyDropdownOpen, setCurrencyDropdownOpen] =
    React.useState(false);

  const revenueCurrency = React.useRef<string>("RUB");
  const currencyRef = React.useRef<HTMLDivElement>(null);

  const currencies = ["USD", "RUB", "EUR"];

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

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="page-header">
            <h1 className="header-title">FJ</h1>
            <hr />
            <p className="header-txt-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="header-txt-cont">
              <p className="header-txt-2">
                Ljsse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
          <div className="dash-container">
            <div className="dash">
              <div className="dash-header">
                <Sort />
                <div className="tech-stack">Технологический стек</div>
                <div className="skills-profiles">&Профили навыков</div>
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
                        Языки <br />
                        программирования
                      </span>
                    </div>
                    <div className="column-body">
                      <ul>
                        {profile?.prog_langs.map((lang, i) => (
                          <li key={i}>
                            <span className={`${i === 0 ? "main-lang" : ""}`}>
                              {lang.skill}
                            </span>{" "}
                            {i === 0 && `(${profile?.core_lang_vacancy_count})`}
                            {i != 0 && `(${lang.skillCount}%)`}
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
                        {" "}
                        Технологии <br />
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
                      <span className="title"> Фреймворки</span>
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
                      <span className="title"> Другие навыки</span>
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
                      <div className="intro-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt
                      </div>
                      <img className="rocket" src={rocket} />
                    </div>
                    <div className="card">
                      <div className="card-wrapper">
                        <div className="title">
                          Средняя оплата <br />в месяц
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
                              {" "}
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
    </>
  );
};

export default Profiles;
