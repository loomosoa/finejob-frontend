import React from "react";

import "./scss/app.scss";
import Profiles from "./components/Profiles";
import WhatToLearn from "./components/WhatToLearn";

const App: React.FC = () => {
  return (
    <>
      <Profiles />
      <WhatToLearn />
    </>
  );
};

export default App;
