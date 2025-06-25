import React from "react";

import "./scss/app.scss";
import Profiles from "./components/Profiles";
import WhatToLearn from "./components/WhatToLearn";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="container">
      <Profiles />
      <WhatToLearn />
      <Footer />
    </div>
  );
};

export default App;
