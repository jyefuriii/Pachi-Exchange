//import React from "react";
import React, { useContext } from "react";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import AccountCreated from "./components/AccountCreated";
import ProductEmailVerify from "./components/ProductEmailVerify";
import ExchangeTrophy from "./components/ExchangeTrophy";
import ExchangeGiftCard from "./components/ExchangeGiftCard";
import ExchangeMysteryBox from "./components/ExchangeMysteryBox";
import Homepage from "./components/Homepage";
import Shop from "./components/Shop";
import Sweepstakes from "./components/Sweepstakes";
import SweepstakesResult from "./components/SweepstakesResult";
import MyAccount from "./components/MyAccount";
import UpdateAccount from "./components/UpdateAccount";
import ProductDescription from "./components/ProductDescription";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext.js";
import RedeemDescription from "./components/RedeemDescription";
import RedeemSuccess from "./components/RedeemSuccess";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import DailyDraw from "./components/DailyDraw";
import WeeklyDraw from "./components/WeeklyDraw";
import MonthlyDraw from "./components/MonthlyDraw";
import Cashout from "./components/Cashout";
import CashoutOption from "./components/CashoutOption";
import CashoutPaypal from "./components/CashoutPaypal";
import CashoutBank from "./components/CashoutBank";
import CashoutComplete from "./components/CashoutComplete";

function Routers() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      <div className="app_body">
        <Router>
          <Switch>
            <Route path="/Homepage" component={Homepage} />
            <Route path="/Shop" component={Shop} />
            {loggedIn === false && (
              <React.Fragment>
                <Route exact path="/" component={LandingPage} />
                <Route path="/Login" component={Login} />
                <Route path="/Signup" component={CreateAccount} />
                <Route path="/AccountCreated" component={AccountCreated} />
                <Route path="/ForgotPassword" component={ForgotPassword} />
                <Route
                  path="/password-reset/:userId/:token"
                  component={ResetPassword}
                />
              </React.Fragment>
            )}
            {loggedIn === true && (
              <React.Fragment>
                <Route path="/RedeemSuccess" component={RedeemSuccess} />
                <Route
                  path="/RedeemDescription"
                  component={RedeemDescription}
                />
                <Route path="/ExchangeTrophy" component={ExchangeTrophy} />
                <Route
                  path="/ExchangeMysteryBox"
                  component={ExchangeMysteryBox}
                />
                <Route path="/ExchangeGiftCard" component={ExchangeGiftCard} />
                <Route
                  path="/ProductEmailVerify"
                  component={ProductEmailVerify}
                />
                <Route path="/UpdateAccount" component={UpdateAccount} />
                <Route path="/MyAccount" component={MyAccount} />
                <Route
                  path="/Product_description"
                  component={ProductDescription}
                />
                <Route path="/CashoutComplete" component={CashoutComplete} />
                <Route path="/CashoutBank" component={CashoutBank} />
                <Route path="/CashoutPaypal" component={CashoutPaypal} />
                <Route path="/CashoutOption" component={CashoutOption} />
                <Route path="/Cashout" component={Cashout} />
                <Route path="/DailyDraw" component={DailyDraw} />
                <Route path="/WeeklyDraw" component={WeeklyDraw} />
                <Route path="/MonthlyDraw" component={MonthlyDraw} />
                <Route
                  path="/SweepstakesResult"
                  component={SweepstakesResult}
                />
                <Route path="/Sweepstakes" component={Sweepstakes} />
              </React.Fragment>
            )}
          </Switch>
        </Router>
        {/* <Route path="/VerifyEmail" component={VerifyEmail} />
         */}
      </div>
    </div>
  );
}

export default Routers;
