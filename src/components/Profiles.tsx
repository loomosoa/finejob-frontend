import React from "react";
import axios from "axios";

import Sort from "./Sort";
import Pagination from "./Pagination";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { filterSelector, setTotalPages } from "../redux/slices/filterSlice";

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

  const { currentPage, totalPages, sort } = useSelector(filterSelector);

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

  return (
    <div className="wrapper">
      <header className="main-header">
        <h1>ТЕХНОЛОГИЧЕСКИЙ СТЕК</h1>
        <Sort />
      </header>

      <main className="content-grid">
        <div className="grid-column">
          <h2>ЯЗЫКИ ПРОГРАММИРОВАНИЯ</h2>
          <ul>
            {profile?.prog_langs.map((lang, i) => (
              <li key={i}>
                <span className={`${i === 0 ? "strong-span" : ""}`}>
                  {lang.skill}
                </span>{" "}
                {i === 0 && `(${profile?.core_lang_vacancy_count})`}
                {i != 0 && `(${lang.skillCount}%)`}
                {/* {lang.skillCount} */}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid-column">
          <h2>ТЕХНОЛОГИИ</h2>
          <ul>
            {profile?.technologies.map((tech, i) => (
              <li key={i}>
                {tech.skill} ({tech.skillCount}%)
              </li>
            ))}
          </ul>
        </div>
        <div className="grid-column">
          <h2>ФРЕЙМВОРКИ</h2>
          <ul>
            {profile?.frameworks.map((framework, i) => (
              <li key={i}>
                {framework.skill} ({framework.skillCount}%)
              </li>
            ))}
          </ul>
        </div>
        <div className="grid-column">
          <h2>ДРУГИЕ НАВЫКИ</h2>
          <ul>
            {profile?.other_skills.map((skill, i) => (
              <li key={i}>
                {skill.skill} ({skill.skillCount}%)
              </li>
            ))}
          </ul>
        </div>
        <aside id="first-card" className="salary-card">
          <h3>СРЕДНЯЯ ОПЛАТА В МЕСЯЦ</h3>
          <div className="salary-value">
            <span>{profile?.profile_revenue[0].amount}</span>
            <div className="dropdown">
              <div className="currency">
                {profile?.profile_revenue[0].currency}
              </div>
            </div>
          </div>
        </aside>
      </main>
      <nav className="pagination">
        <Pagination totalPages={totalPages} />
      </nav>
    </div>
  );
};

export default Profiles;
