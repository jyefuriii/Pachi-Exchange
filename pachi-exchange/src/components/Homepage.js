import React from "react";
import "../styles/Homepage.css";
import Carousel from "../components/Carousel";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import * as assets from "../assets";

function Homepage() {
  return (
    <div className="homePage">
      <HomeHeader className="header" />
      <div className="homeHeader_logo">
        <img
          className="pachiMobile_logo"
          src={assets.pachiLogo}
          alt="Pachi Logo"
        />
        <h2>Your Pachi+ Rewards Hub</h2>
      </div>
      <div className="homeBackground">
        <img src={assets.homeBg} alt="Home Background" className="home_bg" />
        <img
          src={assets.homeMobileBg}
          alt="Home Mobile Background"
          className="homeMobile_bg"
        />
        <Carousel className="carousel" />
      </div>
      <div className="homeRewards_container">
        <div className="homeRewards_header">
          <h1>Three Easy Steps in Receiving Rewards</h1>
        </div>
        <div className="receivedRewards_content">
          <div className="homeRewards_col1">
            <img src={assets.stepOne} className="one_img" alt="Step 1" />
            <div>
              <img src={assets.pachiPlus} className="" alt="Pachi+" />
            </div>
            <h3>Play Pachi+ with Pachi+ Account</h3>
            <p>Download Pachi+ on your device. </p>
            <p>Sign up for a Pachi+ Account before playing.</p>
          </div>
          <img src={assets.shopArrow} className="home_arrow1" alt="Arrow" />
          <div className="homeRewards_col2">
            <img src={assets.stepTwo} className="two_img" alt="Step 2" />
            <div>
              <img
                src={assets.pachiTicket}
                className="homeRewards_ticket"
                alt="Pachi Ticket"
              />
            </div>
            <h3>Win Pachi Tickets</h3>
            <p>Win Pachi Tickets as you play. </p>
            <p>
              Pachi Tickets are automatically credited to your Pachi+ Account.
            </p>
          </div>
          <img src={assets.shopArrow} className="home_arrow2" alt="Arrow" />
          <div className="homeRewards_col3">
            <img src={assets.stepThree} className="three_img" alt="Step 3" />
            <div>
              <img
                src={assets.giftBox}
                className="homeRewards_gift"
                alt="Gift Box"
              />
            </div>
            <h3>Use Pachi+ Tickets on Pachi Exchange</h3>
            <p>
              Claim your prizes and sweepstake entries on Pachi Exchange using
              Pachi Tickets.
            </p>
          </div>
        </div>
      </div>
      <div className="exchangeRewards_container">
        <h1>Pachi Exchange Rewards</h1>
        <div className="exchangeRewards_contents">
          <div className="exchangeRewards_col1">
            <div className="exchangeRewardsImg_container">
              <img
                src={assets.pachiTrophyCat}
                alt="Pachi Trophy Cat"
                className="cat_img"
              />
            </div>
            <Link
              className="shopPage_link"
              to="./Shop"
              style={{ textDecoration: "none" }}
            >
              <h2>Prizes</h2>
            </Link>
          </div>
          <div className="exchangeRewards_col2">
            <div className="exchangeRewardsImg_container">
              <img
                src={assets.pachiSweepstakes}
                alt="Pachi Sweepstakes"
                className="sweepstakes_img"
              />
            </div>

            <Link
              className="sweepstakesPage_link"
              to="./Sweepstakes"
              style={{ textDecoration: "none" }}
            >
              <h2>Sweepstakes</h2>
            </Link>
          </div>
        </div>
      </div>
      <div className="blog_container">
        <div className="blog_contents">
          <h1>Pachi Exchange Blog</h1>
          <h2>Welcome to our new community of Pachi Players</h2>
          <p>
            You may have been wondering when it may arrive, "what?" I hear you
            ask well the Pachi Exchange of course. The entire Pachi team have
            been extremely hard at work creating an awesome rewards hub with all
            sorts of Pachi+ Perks to reward you for playing.
          </p>
          <p>
            This is of course linked to our beautiful curated Pachi+ Digital
            Pachinko game which has been out in the wild for a couple of months,
            the entire Pachi+ team has been very blessed as Pachi+ I'm pleased
            to say has been amassing a large amount of Pachi Pals and Super Fans
            across the globe. A big shout out to all of you, we thank you from
            the bottom of our hearts.
          </p>
          <p>
            For those of you who don't know what Pachi+ is please check out our
            Social Media pages. The quick links are at the bottom of this blog
            page. We also have awesome guides on various player requested topics
            that have been put into video guides to make playing Pachi+ all the
            more accessible to those of you reading this and asking - "What is
            Pachinko, how do I sign-up and play?" the answers there are not only
            in video form, we have an extensive Knowledge Base that is updated
            with relevant content based on what you our fans have been searching
            for.
          </p>
          <div>
            <a
              href="https://pachiblast.pachiplus.com/pachiblast/yassss-it-is-finally-on-the-way"
              target="blank"
            >
              <button className="blog_button">Read More</button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
