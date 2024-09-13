import React from "react";
import "../styles/Carousel.css";
import Carousel from "react-bootstrap/Carousel";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import * as assets from "../assets";

const arrowStyle = {
  carouselSize: {
    height: "100%",
    width: "75vh",
  },
  carouselMobileSize: {
    height: "auto",
    width: "100%",
    minWidth: "320px",
    maxWidth: "480px",
  },
};
let interval = 2000;

function Carousell() {
  return (
    <div className="carousel_container">
      <div className="carousel">
        <Carousel
          style={arrowStyle.carouselSize}
          prevIcon={<ArrowBackIosIcon className="backArrow" />}
          nextIcon={<ArrowForwardIosIcon className="forwardArrow" />}
        >
          <Carousel.Item interval={interval}>
            <img
              className="slide1_img"
              src={assets.carousel_1}
              alt="First slide"
              style={{
                background: "#e5f1fd",
                height: "450px",
              }}
            />
            <Carousel.Caption>
              <div className="banner_contents">
                <h1 className="banner_head">Enjoy Pachi+ Perks</h1>
                <h3 className="banner_subhead">
                  Play Pachi+ and take advantage of Pachi Exchange.
                </h3>
                <a
                  href="https://www.pachiplus.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="download_button">DOWNLOAD PACHI+</button>
                </a>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={interval}>
            <img
              className="slide2_img"
              src={assets.carousel_2}
              alt="Second slide"
              style={{
                background: "#e5f1fd",
                height: "450px",
              }}
            />
            <Carousel.Caption>
              <div className="banner_contents">
                <h1 className="banner_head2">
                  Exchange your Pachi Tickets for Rewards Now
                </h1>
                <a href="http://localhost:3000/Shop">
                  <button className="exchanges_button">EXCHANGE NOW</button>
                </a>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={interval}>
            <img
              className="slide3_img"
              src={assets.carousel_3}
              alt="Third slide"
              style={{
                background: "#e5f1fd",
                height: "450px",
              }}
            />
            <Carousel.Caption>
              <div className="banner_contents">
                <h1 className="banner_head3">Be in the draw to Win</h1>
                <h1 className="banner_head3b">Daily, Weekly or Monthly with</h1>
                <a href="http://localhost:3000/Sweepstakes">
                  <button className="draw_button">ENTER A DRAW</button>
                </a>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={interval}>
            <img
              className="slide4_img"
              src={assets.carousel_4}
              alt="Fourth slide"
              style={{
                background: "#e5f1fd",
                height: "450px",
              }}
            />
            <Carousel.Caption>
              <div className="banner_contents">
                <h1 className="banner_head4">
                  Become the weekly Champion and Win Real Cash Play Pachi Plus
                  to win
                </h1>
                <a
                  href="https://play.pachiplus.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="playPachi_button">Play Pachi Plus</button>
                </a>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="carousel_mobile">
        <Carousel
          style={arrowStyle.carouselMobileSize}
          prevIcon={<ArrowBackIosIcon className="backArrow" />}
          nextIcon={<ArrowForwardIosIcon className="forwardArrow" />}
        >
          <Carousel.Item interval={interval}>
            <img
              className="mobileSlide1_img"
              src={assets.carouselMobile_1}
              alt="First slide"
              style={{
                background: "#e5f1fd",
                height: "400px",
              }}
            />
            <Carousel.Caption>
              <div className="banner_contents">
                <a
                  href="https://www.pachiplus.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="download_button">DOWNLOAD PACHI+</button>
                </a>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={interval}>
            <img
              className="mobileSlide2_img"
              src={assets.carouselMobile_2}
              alt="Second slide"
              style={{
                background: "#e5f1fd",
                height: "400px",
              }}
            />
            <Carousel.Caption>
              <div className="banner_contents">
                <a href="http://localhost:3000/Shop">
                  <button className="exchanges_button">EXCHANGE NOW</button>
                </a>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={interval}>
            <img
              className="mobileSlide3_img"
              src={assets.carouselMobile_3}
              alt="Third slide"
              style={{
                background: "#e5f1fd",
                height: "400px",
              }}
            />
            <Carousel.Caption>
              <div className="banner_contents">
                <a href="http://localhost:3000/Sweepstakes">
                  <button className="draw_button">ENTER A DRAW</button>
                </a>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={interval}>
            <img
              className="mobileSlide4_img"
              src={assets.carouselMobile_4}
              alt="Fourth slide"
              style={{
                background: "#e5f1fd",
                height: "400px",
              }}
            />
            <Carousel.Caption>
              <div className="banner_contents">
                <a
                  href="https://play.pachiplus.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="playPachi_button">Play Pachi Plus</button>
                </a>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}
export default Carousell;
