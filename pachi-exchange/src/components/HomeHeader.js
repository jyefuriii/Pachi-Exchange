import React, { useState, useRef, useEffect, useContext } from "react";
import "../styles/HomeHeader.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import pachi_logo from "../assets/pachi_logo.png";
import AuthContext from "../context/AuthContext";
import * as assets from "../assets";

// Styled components
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
    .pageNav {
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
    .pageNav {
      display: ${({ open }) => (open ? "block" : "none")};
      background: #3f3f41;
      left: 0;
      margin-left: 0;
      z-index: 1000;
    }
  }

  @media (min-width: 320px) and (max-width: 480px) {
    margin-right: 0px;
    opacity: 95%;
    background: ${({ open }) => (open ? "#3F3F41" : "transparent")};
    .pageNav {
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

function HomeHeader() {
  const { getLoggedIn } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState({});
  const [avatar, setAvatar] = useState("");
  const node = useRef();

  // Hook for handling clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (node.current && !node.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [node]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRes = await axios.get("http://localhost:8001/auth/login");
        setUsers(usersRes.data);
        setAvatar(
          usersRes.data.gender === "Male"
            ? assets.avatar_fred
            : assets.avatar_ginger
        );
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  const logOut = async () => {
    try {
      await axios.get("http://localhost:8001/auth/logout");
      await getLoggedIn();
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  const Menu = ({ open }) => (
    <StyledMenu open={open}>
      <div className="pageNav">
        <Link className="nav_link" to="/Homepage">
          <h3 className="home_button">Home</h3>
        </Link>
        <Link className="nav_link" to="/Shop">
          <h3 className="shop_button">Shop</h3>
        </Link>
        <Link className="nav_link" to="/Sweepstakes">
          <h3 className="sweepstakes_button">Sweepstakes</h3>
        </Link>
        <Link className="nav_link" to="/MyAccount">
          <div className="account_name">
            <h3 className="account_button">{users.username}</h3>
            <img className="home_avatar" src={avatar} alt="Avatar" />
          </div>
        </Link>
        <Link className="logout_link" to="/">
          <button className="logout_button" onClick={logOut}>
            Log Out
          </button>
        </Link>
      </div>
    </StyledMenu>
  );

  const Burger = ({ open, setOpen }) => (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );

  return (
    <div className="homeHeader_container">
      <div className="home_header" ref={node}>
        <img className="pachiLogo" src={pachi_logo} alt="Pachi Logo" />
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} />
      </div>
    </div>
  );
}

export default HomeHeader;
