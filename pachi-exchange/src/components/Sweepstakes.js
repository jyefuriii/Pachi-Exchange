import React, { useEffect, useState } from "react";
import "../styles/Sweepstakes.css";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import * as assets from "../assets";

function Sweepstakes() {
  const now = new Date();
  const [monthNumber, setMonthNumber] = useState(30);
  const monthIndex = now.getMonth();
  const monthDays = () => {
    if (
      monthIndex === 4 ||
      monthIndex === 6 ||
      monthIndex === 9 ||
      monthIndex === 11
    )
      return setMonthNumber(29);
    if (monthIndex === 1) return setMonthNumber(27);
  };

  // Daily timer
  const calculateTimeLeft = () => {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    start.setHours(12, 0, 0); // 12pm

    if (now > start) {
      start.setDate(start.getDate() + 1);
    }
    const difference = new Date(start) - new Date(now);
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Mins: Math.floor((difference / 1000 / 60) % 60),
        Sec: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  // Weekly Timer
  const calculateWeeklyTimeLeft = () => {
    const weeklyStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay() + 1
    );
    weeklyStart.setHours(12, 0, 0); // 12pm

    if (now > weeklyStart) {
      // too late, go to tomorrow
      weeklyStart.setDate(weeklyStart.getDate() + 7);
    }
    const weeklyDifference = new Date(weeklyStart) - new Date(now);
    let weeklyTimeLeft = {};

    if (weeklyDifference > 0) {
      weeklyTimeLeft = {
        Days: Math.floor(weeklyDifference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((weeklyDifference / (1000 * 60 * 60)) % 24),
        Mins: Math.floor((weeklyDifference / 1000 / 60) % 60),
        Sec: Math.floor((weeklyDifference / 1000) % 60),
      };
    }

    return weeklyTimeLeft;
  };

  // Monthly Timer
  const calculateMonthlyTimeLeft = () => {
    monthDays();
    const monthlyStart = new Date(now.getFullYear(), now.getMonth(), 1);
    monthlyStart.setHours(12, 0, 0); // 12pm

    if (now > monthlyStart) {
      // too late, go to tomorrow
      monthlyStart.setDate(monthlyStart.getDate() + Number(monthNumber));
    }
    const monthlyDifference = new Date(monthlyStart) - new Date(now);
    let monthlyTimeLeft = {};

    if (monthlyDifference > 0) {
      monthlyTimeLeft = {
        Days: Math.floor(monthlyDifference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((monthlyDifference / (1000 * 60 * 60)) % 24),
        Mins: Math.floor((monthlyDifference / 1000 / 60) % 60),
        Sec: Math.floor((monthlyDifference / 1000) % 60),
      };
    }

    return monthlyTimeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [weeklyTimeLeft, setWeeklyTimeLeft] = useState(
    calculateWeeklyTimeLeft()
  );
  const [monthlyTimeLeft, setMonthlyTimeLeft] = useState(
    calculateMonthlyTimeLeft()
  );

  useEffect(() => {
    var time = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      setWeeklyTimeLeft(calculateWeeklyTimeLeft());
      setMonthlyTimeLeft(calculateMonthlyTimeLeft());
    }, 999);
    return () => clearTimeout(time);
  });

  const timerComponents = [];
  const weeklyTimerComponents = [];
  const monthlyTimerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    } else {
      timerComponents.push(
        <div className="timer" key={timeLeft}>
          <h4>{timeLeft[interval]}</h4>
          <h6>{interval}</h6>
        </div>
      );
    }
  });

  Object.keys(weeklyTimeLeft).forEach((interval) => {
    if (!weeklyTimeLeft[interval]) {
      return;
    } else {
      weeklyTimerComponents.push(
        <div className="timer" key={weeklyTimeLeft}>
          <h4>{weeklyTimeLeft[interval]}</h4>
          <h6>{interval}</h6>
        </div>
      );
    }
  });

  Object.keys(monthlyTimeLeft).forEach((interval) => {
    if (!monthlyTimeLeft[interval]) {
      return;
    } else {
      monthlyTimerComponents.push(
        <div className="timer" key={monthlyTimeLeft}>
          <h4>{monthlyTimeLeft[interval]}</h4>
          <h6>{interval}</h6>
        </div>
      );
    }
  });

  return (
    <div className="sweepstakesPage">
      <HomeHeader />
      <div className="sweepstakesBackground_content">
        <img
          className="sweepstakesBackground"
          src={assets.sweepstakesBg}
          alt=""
        />
        <img
          className="sweepstakesMobileBackground"
          src={assets.sweepstakesMobileBg}
          alt=""
        />
      </div>
      <div className="sweepstakes_container">
        <div className="sweepstakesPage_header">
          <h1>How to Enter Sweepstakes</h1>
        </div>
        <div className="sweepstakes_content">
          <div className="sweepstakes_col1">
            <div>
              <img src={assets.sweepstakesStep1} className="steps_img" alt="" />
              <img
                src={assets.sweepstakesStep1Img}
                className="step1_img"
                alt=""
              />
            </div>
          </div>
          <img src={assets.shopArrow} className="sweepstakes_arrow" alt="" />
          <div className="sweepstakes_col2">
            <div>
              <img src={assets.sweepstakesStep2} className="steps_img" alt="" />
            </div>
          </div>
          <img src={assets.shopArrow} className="sweepstakes_arrow2" alt="" />
          <div className="sweepstakes_col3">
            <div>
              <img src={assets.sweepstakesStep3} className="steps_img" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="sweepstakesPrize_container">
        <h1>Upcoming Draw</h1>
        <div className="draws_container">
          <div>
            <img src={assets.dailyDraw} className="draw_img" alt="" />
            <div className="draw_fields">
              <div className="weeklyTimer">{timerComponents}</div>
              <div>
                <Link className="sweepstakesEntry_link" to="/DailyDraw">
                  <button className="drawButton">ENTER NOW</button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <img src={assets.weeklyDraw} className="draw_img" alt="" />
            <div className="draw_fields">
              <div className="weeklyTimer">{weeklyTimerComponents}</div>
              <div>
                <Link className="sweepstakesEntry_link" to="/WeeklyDraw">
                  <button className="drawButton">ENTER NOW</button>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <img src={assets.monthlyDraw} className="draw_img" alt="" />
            <div className="draw_fields">
              <div className="weeklyTimer">{monthlyTimerComponents}</div>
              <div>
                <Link className="sweepstakesEntry_link" to="/MonthlyDraw">
                  <button className="drawButton">ENTER NOW</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="drawResult_container">
        <h1>Is it Your Lucky Day?</h1>
        <span>
          Check the Daily, Weekly and Monthly results here to see if you’re one
          of the lucky winners.
        </span>
        <div className="drawResultButton_container">
          <div className="resultButton">
            <HashLink
              className="sweepstakesResult_link"
              scroll={(el) => el.scrollIntoView({ behavior: "smooth" })}
              to={"/SweepstakesResult#daily"}
            >
              <button className="drawResultButton">VIEW DAILY RESULT</button>
            </HashLink>
          </div>
          <div className="resultButton">
            <HashLink
              className="sweepstakesResult_link"
              scroll={(el) => el.scrollIntoView({ behavior: "smooth" })}
              to={"/SweepstakesResult#weekly"}
            >
              <button className="drawResultButton">VIEW WEEKLY RESULT</button>
            </HashLink>
          </div>
          <div className="resultButton">
            <HashLink
              className="sweepstakesResult_link"
              scroll={(el) => el.scrollIntoView({ behavior: "smooth" })}
              to={"/SweepstakesResult#monthly"}
            >
              <button className="drawResultButton">VIEW MONTHLY RESULT</button>
            </HashLink>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Sweepstakes;
