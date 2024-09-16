import React, { useState } from "react";
import ReactPlayer from "react-player";
import "../styles/LandingPage.css";
import Carousel from "../components/Carousel";
import LandingHeader from "../components/LandingHeader";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as assets from "../assets";

function LandingPage() {
  const [checked, setChecked] = useState(false);

  const notChecked = () => {
    if (!checked) {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        title: "Required Field",
        showConfirmButton: false,
        html: `<span style="color: #3fa2f7; background: #fff; font-size: 18px;">
          Please confirm if you are 18 years old and above to signup.
        </span>`,
        customClass: {
          closeButton: "swalCloseButton",
          title: "swalTitle",
        },
      });
    }
  };

  return (
    <div className="landingPage">
      <LandingHeader />
      <div className="landingHeader_logo">
        <img
          className="pachiMobile_logo"
          src={assets.pachiMobile_logo}
          alt="Pachi Logo"
        />
        <h2>Your Pachi+ Rewards Hub</h2>
      </div>
      <div className="landingBackground">
        <img
          src={assets.landing_bg}
          alt="Landing Background"
          className="landing_bg"
        />
        <img
          src={assets.landingMobile_bg}
          alt="Landing Mobile Background"
          className="landingMobile_bg"
        />
        <Carousel className="carousel" />
      </div>
      <div className="banner_video">
        <div className="bannerHead_video">
          <h1>What is </h1>
          <img
            src={assets.bannerHead_img}
            className="bannerHead_img"
            alt="Banner Head"
          />
        </div>
        <div className="banner_content">
          <div className="banner_col1">
            <img
              src={assets.pachi888_img}
              className="pachi888_img"
              alt="Pachi 888"
            />
            <h3 className="bannerCol1_h3">
              A Pachinko game for both beginners and experienced players. Test
              your skills, face unique challenges, advance through various game
              levels and become number one on the Pachi+ leaderboard.
            </h3>
            <div>
              <a href="https://pachiplus.com/" target="blank">
                <button className="learnMore_button">LEARN MORE</button>
              </a>
            </div>
          </div>
          <div className="banner_col2">
            <ReactPlayer
              className="videoBanner_img"
              url="https://www.youtube.com/embed/u6Wikf3aKnI"
              width="100%"
              height="100%"
              playing
              loop
              controls
              muted
            />
          </div>
          <div className="banner_col3">
            <h2>The More You Play, The More Rewards!</h2>
            <h3>
              Every game you play in Pachi+ generates Pachi Tickets. Whether you
              win the game or not, you are guaranteed to win and accumulate
              Pachi Tickets in your account. There is literally no way you can
              lose in this game!
            </h3>
          </div>
        </div>
      </div>
      <div className="rewards_hub">
        <h1>Pachi+ Rewards Hub</h1>
        <h2>Pachi Exchange is the portal that handles your Pachi+ Tickets.</h2>
        <div className="landRewards_container">
          <div className="landRewards_col1">
            <img
              src={assets.landPachi_ticket}
              className="landPachi_ticket"
              alt="Pachi Ticket"
            />
            <p>
              Your earned Pachi Tickets from your game sessions will not be put
              to waste! Your Pachi Tickets can be converted to prizes and
              sweepstakes entries on Pachi Exchange, your Pachi+ rewards hub.
            </p>
          </div>
          <div className="landRewards_col2">
            <img
              src={assets.landGift_box}
              className="landGift_box"
              alt="Gift Box"
            />
            <p>
              Your Pachi+ account gives you access to Pachi Exchange. As you
              accumulate tickets while you play you are saving towards earning
              rewards through Pachi exchange.
            </p>
          </div>
        </div>
        <div className="landRewards_col3">
          <img src={assets.landArrow} className="landArrow" alt="Arrow" />
          <img
            src={assets.landArrowhead}
            className="landArrowhead"
            alt="Arrowhead"
          />
        </div>
      </div>
      <div className="landSignup_container">
        <img
          src={assets.landSignup_img}
          className="landSignup_img"
          alt="Signup"
        />
        <div className="landSignup_contents">
          <h1>Sign Up Now to Pachi Exchange</h1>
          <Link className="signup_link" to={checked ? "./Signup" : "/"}>
            <button
              type="submit"
              disabled={!checked}
              className="landSignup_button"
              onClick={notChecked}
            >
              SIGN ME UP
            </button>
          </Link>
          <div className="landSignup_checkbox">
            <input
              type="checkbox"
              className="signup_check"
              onClick={(e) => setChecked(!checked)}
              value={checked}
            />
            <label className="signup_label" htmlFor="signup_check">
              I am over 18
            </label>
          </div>
          <label className="login_label" htmlFor="signup_loginLink">
            Already have an account?{" "}
            <a href="http://localhost:3000/Login" className="landing_loginLink">
              Log In now
            </a>
          </label>
        </div>
        <div className="all_platforms">
          <h1>Pachi+ is Available on Mobile and Desktop</h1>
          <div className="platform_icons">
            <div className="platform_col1">
              <a
                href="https://apps.apple.com/ph/app/pachi/id1558332832"
                target="blank"
              >
                <div className="platform_links">
                  <img
                    src={assets.apple_icon}
                    className="apple_icon"
                    alt="Apple Icon"
                  />
                  <span>IOS</span>
                </div>
              </a>
            </div>
            <div className="platform_col2">
              <a
                href="https://play.google.com/store/apps/details?id=com.pachi.game&hl=en&gl=US"
                target="blank"
              >
                <div className="platform_links">
                  <img
                    src={assets.android_icon}
                    className="android_icon"
                    alt="Android Icon"
                  />
                  <span>ANDROID</span>
                </div>
              </a>
            </div>
            <div className="platform_col3">
              <a href="https://play.pachiplus.com/" target="blank">
                <div className="platform_links">
                  <img
                    src={assets.chrome_icon}
                    className="chrome_icon"
                    alt="Chrome Icon"
                  />
                  <span>WINDOWS</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <Footer className="landing_footer" />
      </div>
    </div>
  );
}

export default LandingPage;
