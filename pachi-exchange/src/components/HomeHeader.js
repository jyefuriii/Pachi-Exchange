import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/HomeHeader.css";
import pachi_logo from "../assets/pachi_logo.png";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styled from "styled-components";
import * as assets from "../assets";

function HomeHeader() {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [open, setOpen] = useState(false);
  const node = useRef();

  async function getUsers() {
    const usersRes = await axios.get("http://localhost:8001/auth/login");
    setUsers(usersRes.data);
  }

  useEffect(() => {
    getUsers();
    if (users.gender === "Male") {
      setAvatar(assets.avatar_fred);
    } else if (users.gender === "Female") {
      setAvatar(assets.avatar_ginger);
    } else {
      setAvatar(assets.avatar_fred);
    }
  }, [users]);

  async function logOut() {
    await axios.get("http://localhost:8001/auth/logout");
    await getLoggedIn();
    history.push("/");
  }

  const Menu = ({ open }) => {
    return (
      <StyledMenu open={open}>
        <div className="pageNav">
          <Link
            className="nav_link"
            to="/Homepage"
            style={{ textDecoration: "none" }}
          >
            <div>
              <h3 className="home_button">Home</h3>
            </div>
          </Link>
          <Link
            className="nav_link"
            to="/Shop"
            style={{ textDecoration: "none" }}
          >
            <div>
              <h3 className="shop_button">Shop</h3>
            </div>
          </Link>
          <Link
            className="nav_link"
            to="/Sweepstakes"
            style={{ textDecoration: "none" }}
          >
            <div>
              <h3 className="sweepstakes_button">Sweepstakes</h3>
            </div>
          </Link>
          <Link
            className="nav_link"
            to="/MyAccount"
            style={{ textDecoration: "none" }}
          >
            <div className="account_name">
              <h3 className="account_button">{users.username}</h3>
              <img className="home_avatar" src={avatar} alt="" />
            </div>
          </Link>
          <Link className="logout_link" to="/">
            <div>
              <button className="logout_button" onClick={logOut}>
                Log Out
              </button>
            </div>
          </Link>
        </div>
      </StyledMenu>
    );
  };

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

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  background: #3f3f41;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease;
  height: 100%;
  width: 250px;
  position: ${({ open }) => (open ? "fixed" : "absolute")};
  top: 0;
  right: 0;
  z-index: 1;

  @media (min-width: 769px) {
    height: 92px;
    width: 100%;
    background: #e4f1fd;
    position: relative;
    transform: none;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledBurger = styled.button`
  position: ${({ open }) => (open ? "fixed" : "absolute")};
  top: 1.8rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2.5rem;
  height: 2.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 20;

  &:focus {
    outline: none;
  }

  @media (min-width: 769px) {
    display: none;
  }

  div {
    width: 2.5rem;
    height: 0.3rem;
    background: ${({ open }) => (open ? "#e4f1fd" : "#3fa2f7")};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

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

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default HomeHeader;
