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

  // Function to check leap year
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  // Set the correct number of days for the month
  useEffect(() => {
    const monthDays = () => {
      if ([4, 6, 9, 11].includes(monthIndex)) {
        setMonthNumber(30); // Months with 30 days
      } else if (monthIndex === 1) {
        // February
        setMonthNumber(isLeapYear(now.getFullYear()) ? 29 : 28);
      } else {
        setMonthNumber(31); // Months with 31 days
      }
    };
    monthDays();
  }, [monthIndex, now]); // Dependency array includes `now` to capture the year

  // Daily timer
  const calculateTimeLeft = (now) => {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    start.setHours(12, 0, 0); // 12pm

    if (now > start) {
      start.setDate(start.getDate() + 1);
    }
    const difference = new Date(start) - new Date(now);
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
          2,
          "0"
        ),
        Hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0"),
        Mins: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
          2,
          "0"
        ),
        Sec: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }
    return timeLeft;
  };

  // Weekly timer
  const calculateWeeklyTimeLeft = (now) => {
    const weeklyStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay() + 1
    );
    weeklyStart.setHours(12, 0, 0); // 12pm

    if (now > weeklyStart) {
      weeklyStart.setDate(weeklyStart.getDate() + 7);
    }
    const weeklyDifference = new Date(weeklyStart) - new Date(now);
    let weeklyTimeLeft = {};

    if (weeklyDifference > 0) {
      weeklyTimeLeft = {
        Days: String(
          Math.floor(weeklyDifference / (1000 * 60 * 60 * 24))
        ).padStart(2, "0"),
        Hours: String(
          Math.floor((weeklyDifference / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0"),
        Mins: String(Math.floor((weeklyDifference / 1000 / 60) % 60)).padStart(
          2,
          "0"
        ),
        Sec: String(Math.floor((weeklyDifference / 1000) % 60)).padStart(
          2,
          "0"
        ),
      };
    }

    return weeklyTimeLeft;
  };

  // Monthly timer
  const calculateMonthlyTimeLeft = (now, monthNumber) => {
    const monthlyStart = new Date(now.getFullYear(), now.getMonth(), 1);
    monthlyStart.setHours(12, 0, 0); // 12pm

    if (now > monthlyStart) {
      monthlyStart.setDate(monthlyStart.getDate() + Number(monthNumber));
    }
    const monthlyDifference = new Date(monthlyStart) - new Date(now);
    let monthlyTimeLeft = {};

    if (monthlyDifference > 0) {
      monthlyTimeLeft = {
        Days: String(
          Math.floor(monthlyDifference / (1000 * 60 * 60 * 24))
        ).padStart(2, "0"),
        Hours: String(
          Math.floor((monthlyDifference / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0"),
        Mins: String(Math.floor((monthlyDifference / 1000 / 60) % 60)).padStart(
          2,
          "0"
        ),
        Sec: String(Math.floor((monthlyDifference / 1000) % 60)).padStart(
          2,
          "0"
        ),
      };
    }

    return monthlyTimeLeft;
  };

  // Initialize timers
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(now));
  const [weeklyTimeLeft, setWeeklyTimeLeft] = useState(
    calculateWeeklyTimeLeft(now)
  );
  const [monthlyTimeLeft, setMonthlyTimeLeft] = useState(
    calculateMonthlyTimeLeft(now, monthNumber)
  );

  // Update timers every second
  useEffect(() => {
    const time = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(now));
      setWeeklyTimeLeft(calculateWeeklyTimeLeft(now));
      setMonthlyTimeLeft(calculateMonthlyTimeLeft(now, monthNumber));
    }, 999);

    return () => clearTimeout(time);
  }, [now, monthNumber]);

  const timerComponents = [];
  const weeklyTimerComponents = [];
  const monthlyTimerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval]) {
      timerComponents.push(
        <div className="timer" key={interval}>
          <h4>{timeLeft[interval]}</h4>
          <h6>{interval}</h6>
        </div>
      );
    }
  });

  Object.keys(weeklyTimeLeft).forEach((interval) => {
    if (weeklyTimeLeft[interval]) {
      weeklyTimerComponents.push(
        <div className="timer" key={interval}>
          <h4>{weeklyTimeLeft[interval]}</h4>
          <h6>{interval}</h6>
        </div>
      );
    }
  });

  Object.keys(monthlyTimeLeft).forEach((interval) => {
    if (monthlyTimeLeft[interval]) {
      monthlyTimerComponents.push(
        <div className="timer" key={interval}>
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
