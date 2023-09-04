import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import "./HomeHeader.css";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import styled from "styled-components";

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
  //useEffect
  useEffect(() => {
    getUsers();
    if (users.gender === "Male") {
      setAvatar("./avatar_fred.png");
    } else if (users.gender === "Female") {
      setAvatar("./avatar_ginger.png");
    } else {
      setAvatar("./avatar_fred.png");
    }
  }, [users]);

  async function logOut() {
    await axios.get("http://localhost:8001/auth/logout");
    //await axios.get(
    //  "https://mern-auth-template-tutorial.herokuapp.com/auth/logout"
    //);
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

  const StyledMenu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #3f3f41;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.3s ease;
    height: 100vh;
    width: 250px;
    text-align: left;
    padding: 2rem;
    position: ${({ open }) => (open ? "fixed" : "absolute")};
    top: 0;
    right: 0;
    z-index: 1;

    @media (min-width: 769px) {
      height: 92px;
      background: #e4f1fd;
      .pageNav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        margin-right: 30px;
        margin-top: 20px;
      }
      .home_avatar {
        margin-right: -10px;
        margin-left: 140px;
        margin-top: -60px;
      }
    }
    @media (min-width: 481px) and (max-width: 768px) {
      margin-right: 0px;
      opacity: 95%;
      background: ${({ open }) => (open ? "#3F3F41" : "transparent")};
      .pageNav {
        display: ${({ open }) => (open ? "block" : "none")};
        background: #3f3f41;
      }
      .home_avatar {
        margin-right: 0px;
        margin-left: 120px;
        padding-left: 20px;
        margin-top: -100px;
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
    margin-top: -15px;
    flex-direction: column;
    justify-content: space-around;
    width: 2.5rem;
    height: 2.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;

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
        transform: ${({ open }) =>
          open ? "translateX(20px)" : "translateX(0)"};
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
  return (
    <div className="homeHeader_container">
      <div className="home_header" ref={node}>
        <img className="pachi_logo" src="./pachi_logo.png" alt="" />
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default HomeHeader;
