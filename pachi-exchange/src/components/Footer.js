import React, { useState, useRef, useEffect } from "react";
import "../styles/Footer.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import * as assets from "../assets";

function Footer() {
  const [language, setLanguage] = useState("English");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (event) => {
    setLanguage(event.target.textContent);
    setDropdownOpen(false); // Close dropdown when an option is selected
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="footer_container">
      <img className="gap_logo" src={assets.gapLogo} alt="" />
      <div id="selected-language" className="language_col">
        <label className="footer_lang_label">Language</label>
        <div className="dropdown_container" ref={dropdownRef}>
          <div
            className="dropdown_toggle"
            onClick={toggleDropdown}
            style={{ border: "2px solid #297fca", width: "120px" }}
          >
            <span>{language}</span>
            <ArrowForwardIosIcon
              style={{
                marginLeft: "10px",
                color: "#297fca",
                width:"15px",
                transform: dropdownOpen ? "rotate(90deg)" : "rotate(-90deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </div>
          {dropdownOpen && (
            <div className="dropdown_menu">
              <div className="dropdown_item" onClick={handleChange} value="en-US">
                English
              </div>
              <div className="dropdown_item" onClick={handleChange} value="zh-CN">
                Chinese
              </div>
              <div className="dropdown_item" onClick={handleChange} value="fil">
                Filipino
              </div>
              <div className="dropdown_item" onClick={handleChange} value="ja">
                Japanese
              </div>
              <div className="dropdown_item" onClick={handleChange} value="ko">
                Korean
              </div>
            </div>
          )}
        <a href="http://knowledgebase.pachiplus.com/" target="_blank" rel="noopener noreferrer">
          Help Center
        </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
