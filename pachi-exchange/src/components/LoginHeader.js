import React, { useState, useRef, useEffect } from "react";
import "../styles/LoginHeader.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as assets from "../assets";

// Styled components moved outside the functional component
const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #3f3f41;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  height: 100%;
  width: 250px;
  text-align: left;
  padding: 2rem;
  position: ${({ open }) => (open ? "fixed" : "relative")};
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 1;

  @media (min-width: 769px) {
    height: 92px;
    background: ${({ open }) => (open ? "#3F3F41" : "transparent")};
    .loginNav {
      position: absolute;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
    }
  }
  @media (min-width: 481px) and (max-width: 768px) {
    margin-right: 0px;
    opacity: 95%;
    background: ${({ open }) => (open ? "#3F3F41" : "transparent")};
    .loginNav {
      display: ${({ open }) => (open ? "block" : "none")};
      background: #3f3f41;
      left: 0;
      margin-left: 0;
      z-index: 1;
    }
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin-right: 0px;
    opacity: 95%;
    background: ${({ open }) => (open ? "#3F3F41" : "transparent")};
    .loginNav {
      display: ${({ open }) => (open ? "block" : "none")};
      background: #3f3f41;
      left: 0;
      margin-left: 0;
    }
  }
`;

const StyledBurger = styled.button`
  position: ${({ open }) => (open ? "fixed" : "absolute")};
  top: 1.8rem;
  right: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2.5rem;
  margin-top: -15px;
  height: 2.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: ${({ open }) => (open ? "1000" : "10")}; // Higher z-index when open

  &:focus {
    outline: none;
  }

  @media (min-width: 769px) {
    display: none;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin-right: -20px;
    z-index: 100;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    margin-right: -20px;
    margin-top: -5px;
    z-index: 100;
  }
  div {
    width: 2.5rem;
    height: 0.3rem;
    background: ${({ open }) => (open ? "#e4f1fd" : "#3fa2f7")};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    z-index: 1000;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

function LoginHeader() {
  const [open, setOpen] = useState(false);
  const node = useRef();

  // Hook for handling clicks outside of the header
  useEffect(() => {
    function handleClickOutside(event) {
      if (node.current && !node.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [node]);

  return (
    <div className="loginHeader_container" ref={node}>
      <div className="login_header">
        <Link
          className="landingPage_link"
          to="/"
          style={{ textDecoration: "none" }}
        >
          <img className="pachi_logo" src={assets.pachi_logo} alt="" />
        </Link>
        <StyledBurger open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </StyledBurger>
        <StyledMenu open={open}>
          <div className="loginNav">
            <Link
              className="landingPage_link"
              to="/"
              style={{ textDecoration: "none" }}
            >
              <div>
                <h3 className="home_buttons">Home</h3>
              </div>
            </Link>
          </div>
        </StyledMenu>
      </div>
    </div>
  );
}

export default LoginHeader;
