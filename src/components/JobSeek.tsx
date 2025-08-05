import React from "react";

import vacResFields2 from "../assets/imgs/vac_res_fields.png";

const JobSeek: React.FC = () => {
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
            <div className="dash-frame-inner"></div>
          </div>
          JobSeek
        </div>
      </div>
    </>
  );
};

export default JobSeek;
