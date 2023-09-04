import React, { useState, useEffect } from "react";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import "./UpdateAccount.css";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PhoneIphoneOutlinedIcon from "@material-ui/icons/PhoneIphoneOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import LockIcon from "@material-ui/icons/Lock";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function CreateAccount() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  async function getUsers() {
    const usersRes = await axios.get("http://localhost:8001/auth/login");
    setUsers(usersRes.data);
  }
  //useEffect
  useEffect(() => {
    getUsers();
  }, [users]);

  const [gender, setGender] = useState(users.gender);
  const [countrySelect, setCountrySelect] = useState(users.country);
  const [fullName, setFullName] = useState(users.fullName);
  const [birthday, setBirthday] = useState(users.birthday);
  const [phoneNumber, setPhoneNumber] = useState(users.phoneNumber);
  const [shippingName, setShippingName] = useState(users.shippingName);
  const [shippingLastName, setShippingLastName] = useState(
    users.shippingLastName
  );
  const [address1, setAddress1] = useState(users.address1);
  const [address2, setAddress2] = useState(users.address2);
  const [city, setCity] = useState(users.city);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [postalCode, setPostalCode] = useState(users.postalCode);
  const [editPasswordShown, setEditPasswordShown] = useState(false);
  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const [confirmEditPasswordShown, setConfirmEditPasswordShown] =
    useState(false);

  const togglePassword = () => {
    setEditPasswordShown(!editPasswordShown);
  };
  const toggleOldPassword = () => {
    setOldPasswordShown(!oldPasswordShown);
  };
  const toggleConfirmPassword = () => {
    setConfirmEditPasswordShown(!confirmEditPasswordShown);
  };

  async function updateAccount() {
    try {
      const accountData = {
        currentUser: users._id,
        fullName: fullName,
        gender: gender,
        country: countrySelect,
        birthday: birthday,
        phoneNumber: phoneNumber,
        shippingName: shippingName,
        shippingLastName: shippingLastName,
        address1: address1,
        address2: address2,
        city: city,
        postalCode: postalCode,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      };

      await axios.put("http://localhost:8001/auth/updateAccount", accountData);
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        title: "Account Updated",
        showConfirmButton: false,
        html: `<span style="color: #3fa2f7; background: #fff; font-size: 18px;">
          Update Account Successful
        </span>`,
        customClass: {
          closeButton: "swalCloseButton",
          title: "swalTitle",
        },
      });
      history.push("/myAccount");
    } catch (err) {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        title: "Update Password Failed",
        showConfirmButton: false,
        html: `<span style="color: #3fa2f7; background: #fff; font-size: 18px;">
          ${err.response.data.errorMessage}
        </span>`,
        customClass: {
          closeButton: "swalCloseButton",
          title: "swalTitle",
        },
      });
    }
  }

  return (
    <div className="account_mainContainer">
      <HomeHeader />
      <div className="account_container">
        <div className="account_contents">
          <div className="account_head">
            <h1>EDIT MY ACCOUNT</h1>
            <h3>
              Ensure your details are correct and match the details on your
              Pachi+ account.
            </h3>
          </div>
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
                  defaultValue={users.fullName}
                />
              </div>
              <div className="gender_container">
                <select
                  className="updateGender_select"
                  style={{ border: "2px", borderColor: "#297fca" }}
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                >
                  <option value="" default selected hidden>
                    {users.gender}
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div className="birthday_container">
                <img src="./birthday_cake.png" alt="" />
                <form noValidate>
                  <input
                    id="date"
                    type="date"
                    className="updateBirthday"
                    defaultValue={users.birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    style={{ width: "295.5px" }}
                    placeholder="mm / dd / yyyy"
                    InputProps={{
                      shrink: true,
                      disableUnderline: true,
                    }}
                  />
                </form>
              </div>
              <div className="contact_container">
                <PhoneIphoneOutlinedIcon
                  className="phone_icon"
                  style={{ fontSize: "70px" }}
                />
                <input
                  type="tel"
                  defaultValue={users.phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="contact_input"
                  placeholder="+63 +++ ++++ +++"
                />
              </div>
              <div className="email_container">
                <MailOutlineOutlinedIcon
                  className="mail_icon"
                  style={{ fontSize: "55px" }}
                />
                <input
                  type="email"
                  value={users.emailAddress}
                  className="email_input"
                  placeholder="Email"
                />
              </div>
              <div className="country_container">
                <LanguageOutlinedIcon
                  className="language_icon"
                  style={{ fontSize: "55px" }}
                />
                <div className="langDropdown_container">
                  <select
                    className="updateCountry_select"
                    style={{ width: "297px" }}
                    id="demo-customized-select-native"
                    onChange={(e) => setCountrySelect(e.target.value)}
                    value={countrySelect}
                  >
                    <option value="" disabled selected hidden>
                      {users.country}
                    </option>
                    <option value="N/A">Unspecified</option>
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
                    defaultValue={users.shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    defaultValue={users.shippingLastName}
                    onChange={(e) => setShippingLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </div>
                <div className="shipping_address">
                  <LocationOnOutlinedIcon
                    className="location_icon"
                    style={{ fontSize: "60px" }}
                  />
                  <input
                    type="text"
                    defaultValue={users.address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    placeholder="Address Line 1"
                  />
                  <input
                    type="text"
                    defaultValue={users.address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    placeholder="Address Line 2"
                  />
                  <input
                    type="text"
                    defaultValue={users.city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div className="country_editContainer2">
                  <select
                    className="shippingCountry_select"
                    style={{ width: "297px" }}
                    value={countrySelect}
                    onChange={(e) => setCountrySelect(e.target.value)}
                  >
                    <option value="" disabled selected hidden>
                      {users.country}
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
                    type="number"
                    defaultValue={users.postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Postal Code"
                  />
                </div>
              </div>
            </div>
            <div className="oldPassword_replace">
              <h1>Replace Password</h1>
              <div className="oldPassword_container">
                <LockIcon className="lock_icon" style={{ fontSize: "60px" }} />
                <input
                  type={oldPasswordShown ? "text" : "password"}
                  placeholder="Old Password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                />
                <VisibilityOff
                  visibility={oldPasswordShown ? "hidden" : "visible"}
                  className="showOldPassword"
                  onClick={toggleOldPassword}
                />
                <Visibility
                  visibility={oldPasswordShown ? "visible" : "hidden"}
                  className="showOldPassword"
                  onClick={toggleOldPassword}
                />
              </div>
              <div className="password_container">
                <div className="password_contents">
                  <input
                    className="password_input"
                    type={editPasswordShown ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                  />
                  <VisibilityOff
                    visibility={editPasswordShown ? "hidden" : "visible"}
                    className="showEditPassword1"
                    onClick={togglePassword}
                  />
                  <Visibility
                    visibility={editPasswordShown ? "visible" : "hidden"}
                    className="showEditPassword1"
                    onClick={togglePassword}
                  />
                  <input
                    type={confirmEditPasswordShown ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    value={confirmNewPassword}
                  />
                  <VisibilityOff
                    visibility={confirmEditPasswordShown ? "hidden" : "visible"}
                    className="showEditPassword2"
                    onClick={toggleConfirmPassword}
                  />
                  <Visibility
                    visibility={confirmEditPasswordShown ? "visible" : "hidden"}
                    className="showEditPassword2"
                    onClick={toggleConfirmPassword}
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
          <button
            className="account_submitButton"
            onClick={updateAccount}
            type="submit"
          >
            SUBMIT
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateAccount;
