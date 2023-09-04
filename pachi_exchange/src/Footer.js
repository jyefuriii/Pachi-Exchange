import React, { useState } from "react";
import "./Footer.css";

function Footer() {
  const [language, setLanguage] = useState("");
  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="footer_container">
      <img className="gap_logo" src="/gap_logo.png" alt="" />
      <div id="selected-language" className="language_col">
        <label>Language</label>
        <div className="dropdown_container">
          <select
            style={{ border: "2px", borderColor: "#297fca", width: "120px" }}
            id="lang_select"
            value={language}
            onChange={handleChange}
          >
            <option value="en-US">English</option>
            <option value="zh-CN">Chinese</option>
            <option value="fil">Filipino</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
          </select>
        </div>
        <a href="http://knowledgebase.pachiplus.com/" target="blank">
          Help Center
        </a>
      </div>
    </div>
  );
}

export default Footer;
