import React from "react";

import "./scss/app.scss";
import Profiles from "./components/Profiles";
import WhatToLearn from "./components/WhatToLearn";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <>
      <Profiles />
      <WhatToLearn />
      <Footer />
    </>
  );
};

export default App;
