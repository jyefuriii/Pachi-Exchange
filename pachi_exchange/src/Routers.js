//import React from "react";
import React, { useContext } from "react";
import LandingPage from "./LandingPage";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import AccountCreated from "./AccountCreated";
import ProductEmailVerify from "./ProductEmailVerify";
import ExchangeTrophy from "./ExchangeTrophy";
import ExchangeGiftCard from "./ExchangeGiftCard";
import ExchangeMysteryBox from "./ExchangeMysteryBox";
import Homepage from "./Homepage";
import Shop from "./Shop";
import Sweepstakes from "./Sweepstakes";
import SweepstakesResult from "./SweepstakesResult";
import MyAccount from "./MyAccount";
import UpdateAccount from "./UpdateAccount";
import ProductDescription from "./ProductDescription";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext.js";
import RedeemDescription from "./RedeemDescription";
import RedeemSuccess from "./RedeemSuccess";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import DailyDraw from "./DailyDraw";
import WeeklyDraw from "./WeeklyDraw";
import MonthlyDraw from "./MonthlyDraw";
import Cashout from "./Cashout";
import CashoutOption from "./CashoutOption";
import CashoutPaypal from "./CashoutPaypal";
import CashoutBank from "./CashoutBank";
import CashoutComplete from "./CashoutComplete";

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
