import React, { useState } from "react";
import LoginHeader from "../components/LoginHeader";
import Footer from "../components/Footer";
import "../styles/CreateAccount.css";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PhoneIphoneOutlinedIcon from "@material-ui/icons/PhoneIphoneOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import * as assets from "../assets";

function CreateAccount() {
  const history = useHistory();
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [shippingName, setShippingName] = useState("");
  const [shippingLastName, setShippingLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  async function register(e) {
    e.preventDefault();
    if (!checked) {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        background: "#fff",
        title: "Required Field",
        showConfirmButton: false,
        html: `
        <span class="swal-responsive-text" style="color: #3fa2f7; background: #fff;">
          Please confirm if you are 18 years old and above to sign up.
        </span>`,
        customClass: {
          popup: "custom-swal-widthSP", // Apply custom class for width
          closeButton: "swalCloseButtonLP",
          title: "swalTitle",
        },
      });
    } else if (!checked1) {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        title: "Required Field",
        showConfirmButton: false,
        html: `
        <span class="swal-responsive-text" style="color: #3fa2f7; background: #fff;">
          Please confirm if you understand and agree about the real prize competitions and its exceptions.
        </span>`,
        customClass: {
          popup: "custom-swal-widthSP", // Apply custom class for width
          closeButton: "swalCloseButtonLP",
          title: "swalTitle",
        },
      });
    } else {
      try {
        const registerData = {
          emailAddress,
          password,
          passwordVerify,
          fullName,
          gender,
          birthday,
          phoneNumber,
          country,
          username,
          shippingName,
          shippingLastName,
          address1,
          address2,
          city,
          postalCode,
        };

        await axios.post("http://localhost:8001/auth/", registerData);
        history.push("/AccountCreated");
      } catch (err) {
        Swal.fire({
          showCloseButton: true,
          closeButtonText: "X",
          title: "Error",
          showConfirmButton: false,
          html: `
          <span class="swal-responsive-text" style="color: #3fa2f7; background: #fff;">
            ${err.response.data.errorMessage}
          </span>`,
          customClass: {
            popup: "custom-swal-widthSP", // Apply custom class for width
            closeButton: "swalCloseButtonLP",
            title: "swalTitle",
          },
        });
      }
    }
  }

  return (
    <div className="account_mainContainer">
      <LoginHeader />
      <div className="account_container">
        <div className="account_contents">
          <div className="account_head">
            <h1>CREATE MY ACCOUNT</h1>
            <h3>
              Ensure your details are correct and match the details on your
              Pachi+ account.
            </h3>
          </div>
          <form onSubmit={register}>
            <div className="account_form">
              <div className="account_personal">
                <h1>Personal Details</h1>
                <div className="name_container">
                  <div className="userIcon_container">
                    <PersonOutlineOutlinedIcon
                      className="user_icon"
                      style={{ fontSize: "60px" }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="First Name / Last Name"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                  />
                </div>
                <div className="gender_container">
                  <select
                    className="gender_select"
                    style={{ border: "1px", borderColor: "#297fca" }}
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" default selected hidden>
                      Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div className="birthday_container">
                  <img src={assets.birthdayCake} alt="" />
                  <TextField
                    id="date"
                    type="date"
                    defaultValue="mm / dd / yyyy"
                    InputProps={{
                      shrink: true,
                      disableUnderline: true,
                    }}
                    onChange={(e) => setBirthday(e.target.value)}
                    value={birthday}
                  />
                  <label className="bday_label">Birthday</label>
                </div>
              </div>
              <div className="account_checkbox1">
                <input
                  type="checkbox"
                  className="account_check1"
                  onClick={(e) => setChecked(!checked)}
                  value={checked}
                />
                <label className="signup_label" htmlFor="account_check1">
                  I confirm that I am 18 years of age and have read and agreed
                  to the EULA. I do not have any existing accounts and
                  understand that all duplicate accounts will be cancelled.
                </label>
              </div>
              <div className="account_checkbox2">
                <input
                  type="checkbox"
                  className="account_check2"
                  onClick={(e) => setChecked1(!checked1)}
                  value={checked1}
                />
                <label className="signup_label" for="account_check2">
                  I understand real prize competitions are permitted US and
                  Canada - the exceptions being Arizona, Arkansas, Connecticut,
                  Delaware, Louisiana, Montana, South Carolina, South Dakota,
                  Tennessee and Quebec. Our virtual currency games are available
                  globally.
                </label>
              </div>
              <div className="contact_container">
                <PhoneIphoneOutlinedIcon
                  className="phone_icon"
                  style={{ fontSize: "70px" }}
                />
                <input
                  type="tel"
                  className="contact_input"
                  placeholder="+63 +++ ++++ +++"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                />
                <label className="mobile_label">Mobile</label>
              </div>
              <div className="email_container">
                <MailOutlineOutlinedIcon
                  className="mail_icon"
                  style={{ fontSize: "55px" }}
                />
                <input
                  type="email"
                  className="email_input"
                  placeholder="Email"
                  onChange={(e) =>
                    setEmailAddress(e.target.value.toLowerCase())
                  }
                  value={emailAddress}
                />
                <label className="email_label">Email</label>
              </div>
              <div className="country_container">
                <LanguageOutlinedIcon
                  className="language_icon"
                  style={{ fontSize: "55px" }}
                />
                <div className="langDropdown_container">
                  <select
                    style={{ border: "2px", borderColor: "#297fca" }}
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="" disabled selected hidden>
                      Country
                    </option>
                    <option value="Unspecified">Unspecified</option>
                    <option value="United States">
                      United States of America
                    </option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="China">China</option>
                    <option value="Japan">Japan</option>
                    <option value="South Korea">South Korea</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Italy">Italy</option>
                    <option value="Spain">Spain</option>
                  </select>
                </div>
              </div>
              <div className="account_loginDetails">
                <h1>Log-in Details</h1>
                <div className="username_container">
                  <PersonIcon
                    className="person_icon"
                    style={{ fontSize: "60px" }}
                  />
                  <input
                    type="text"
                    placeholder="Display Name"
                    autoComplete="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </div>
                <div className="password_containers">
                  <LockIcon
                    className="lock_icon"
                    style={{ fontSize: "50px" }}
                  />
                  <div className="password_contents">
                    <input
                      className="password_input"
                      type={passwordShown ? "text" : "password"}
                      id="pw-1"
                      autoComplete="new-password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <VisibilityOff
                      visibility={passwordShown ? "hidden" : "visible"}
                      className="showPassword1"
                      onClick={togglePassword}
                    />
                    <Visibility
                      visibility={passwordShown ? "visible" : "hidden"}
                      className="showPassword1"
                      onClick={togglePassword}
                    />
                    <input
                      className="confirmPassword_input"
                      type={confirmPasswordShown ? "text" : "password"}
                      placeholder="Confirm Password"
                      id="pw-2"
                      autoComplete="new-password"
                      onChange={(e) => setPasswordVerify(e.target.value)}
                      value={passwordVerify}
                    />
                    <VisibilityOff
                      visibility={confirmPasswordShown ? "hidden" : "visible"}
                      className="showPassword2"
                      onClick={toggleConfirmPassword}
                    />
                    <Visibility
                      visibility={confirmPasswordShown ? "visible" : "hidden"}
                      className="showPassword2"
                      onClick={toggleConfirmPassword}
                    />
                  </div>
                </div>
              </div>
              <div className="account_shipping">
                <h1>Shipping Details</h1>
                <div className="shipping_container">
                  <div className="shipping_name">
                    <div className="userIcon_container2">
                      <PersonOutlineOutlinedIcon
                        className="user_icon"
                        style={{ fontSize: "60px" }}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="First Name"
                      onChange={(e) => setShippingName(e.target.value)}
                      value={shippingName}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      onChange={(e) => setShippingLastName(e.target.value)}
                      value={shippingLastName}
                    />
                  </div>
                  <div className="shipping_address">
                    <LocationOnOutlinedIcon
                      className="location_icon"
                      style={{ fontSize: "60px" }}
                    />
                    <input
                      type="text"
                      placeholder="Address Line 1"
                      onChange={(e) => setAddress1(e.target.value)}
                      value={address1}
                    />
                    <input
                      type="text"
                      placeholder="Address Line 2"
                      onChange={(e) => setAddress2(e.target.value)}
                      value={address2}
                    />
                    <input
                      type="text"
                      className="city_placeholder"
                      placeholder="City"
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                    />
                  </div>
                  <div className="country_container2">
                    <select
                      style={{ border: "2px", borderColor: "#297fca" }}
                      id="country2"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="" disabled selected hidden>
                        Country
                      </option>
                      <option value="Unspecified">Unspecified</option>
                      <option value="United States">
                        United States of America
                      </option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                      <option value="China">China</option>
                      <option value="Japan">Japan</option>
                      <option value="South Korea">South Korea</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Italy">Italy</option>
                      <option value="Spain">Spain</option>
                    </select>
                    <input
                      className="postalCode_input"
                      type="number"
                      placeholder="Postal Code"
                      onChange={(e) => setPostalCode(e.target.value)}
                      value={postalCode}
                    />
                  </div>
                </div>
              </div>
              {/*<div className="kyc_container">
              <h2>KYC Verification</h2>
              <p>
                To enable cashout requests on this website, Pachi Exchange
                requires proper user identification. Click here to get verified.
              </p>
            </div>*/}
            </div>
            {/*<Link className="verifyEmail_link" to="/AccountCreated">*/}
            <button className="account_submitButton" type="submit">
              SUBMIT
            </button>
            {/*</Link>*/}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateAccount;
