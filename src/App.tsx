import React, { Suspense } from "react";

import "./scss/app.scss";
import Profiles from "./components/Profiles";
import WhatToLearn from "./components/WhatToLearn";

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback="Loading...">
        <Profiles />
        <WhatToLearn />
      </Suspense>
    </>
  );
};

export default App;
