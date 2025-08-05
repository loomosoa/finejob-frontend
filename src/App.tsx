import React, { Suspense } from "react";

import "./scss/app.scss";
import Profiles from "./components/Profiles";
import WhatToLearn from "./components/WhatToLearn";
import JobSeek from "./components/JobSeek";

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div className="fallback">Loading...</div>}>
        <Profiles />
        <JobSeek />
        <WhatToLearn />
      </Suspense>
    </>
  );
};

export default App;
