import React, { useState, useForm } from "react";
import { client } from "../../client";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";

import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [validateField, setValidateField] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    if (name === "" || email === "" || message === "") {
      setIsFormSubmitted(false);
      setValidateField(true);
      setLoading(false);
      return false;
    } else if (name !== "" || email !== "" || message !== "") {
      setValidateField(false);
    }

    client.create(contact).then(() => {
      setValidateField(false);
      setLoading(false);
      setIsFormSubmitted(true);
    });

    setTimeout(() => {
      setIsFormSubmitted(false);
    }, 7000);
  };

  return (
    <>
      <h2 className="head-text">Take a coffee ☕ and chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto: alexander.joshua2018@gmail.com" className="p-text">
            Send me a mail
          </a>
        </div>

        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +234 (814) 4617 911" className="p-text">
            +234 (814) 4617 911
          </a>
        </div>
      </div>

      <div className="app__footer-form app__flex">
        <div className="app__flex">
          <input
            type="text"
            className="p-text"
            placeholder="Your Name"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
        </div>

        <div className="app__flex">
          <input
            type="email"
            className="p-text"
            placeholder="Your Email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Your Message"
            className="p-text"
            onChange={handleChangeInput}
            value={message}
          ></textarea>
        </div>

        {isFormSubmitted && (
          <div className="submitted">
            <p>
              Great! I just received your message. I will get back to you soon.
            </p>
          </div>
        )}

        {validateField && (
          <p style={{ color: "red" }}>Please fill in all fields</p>
        )}

        <button
          className="p-text"
          style={{ backgroundColor: loading && "green" }}
          onClick={handleSubmit}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
