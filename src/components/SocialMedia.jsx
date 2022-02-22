import React from "react";
import { BsTwitter, BsLinkedin, BsGithub } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="app__social">
      <div>
        <a href="https://twitter.com/CodeLawd" target="_blank" rel="noreferrer">
          <BsTwitter />
        </a>
      </div>

      <div>
        <a
          href="https://www.linkedin.com/in/codelawd/"
          target="_blank"
          rel="noreferrer"
        >
          <BsLinkedin />
        </a>
      </div>

      <div>
        <a href="https://github.com/CodeLawd" target="_blank" rel="noreferrer">
          <BsGithub />
        </a>
      </div>

      <div>
        <a
          href="https://facebook.com/osuya.joshua.33"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookF />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
