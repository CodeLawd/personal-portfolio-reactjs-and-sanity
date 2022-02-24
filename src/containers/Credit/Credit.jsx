import React from "react";
import { SocialMedia } from "../../components";
import { MotionWrap } from "../../wrapper";

import "./Credit.scss";

const Credit = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="app__credit">
      <p className="p-text">&copy; {date} CodeLawd. All Right Reserved</p>
      <div>
        <SocialMedia />
      </div>
    </footer>
  );
};

export default MotionWrap(Credit, "app__credit");
