import React, { useState } from "react";
import "./ResetPassword.css";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";
import { useHistory, useParams } from "react-router-dom";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import axios from "axios";
import Swal from "sweetalert2";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const { userId, token } = useParams();
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const history = useHistory();
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmNewPasswordShown, setConfirmNewPasswordShown] = useState(false);

  const toggleNewPassword = () => {
    setNewPasswordShown(!newPasswordShown);
  };
  const toggleConfirmNewPassword = () => {
    setConfirmNewPasswordShown(!confirmNewPasswordShown);
  };

  async function passwordReset() {
    try {
      const resetPasswordData = {
        userId: userId,
        token: token,
        password: newPassword,
        confirmNewPassword: confirmNewPassword,
      };
      await axios.post(
        "http://localhost:8001/password-reset/:userId/:token",
        resetPasswordData
      );
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        title: "Password Updated",
        showConfirmButton: false,
        html: `<span style="color: #3fa2f7; background: #fff; font-size: 18px;">
          Password reset successful
        </span>`,
        customClass: {
          closeButton: "swalCloseButton",
          title: "swalTitle",
        },
      });
      history.push("/Login");
    } catch (err) {
      Swal.fire({
        showCloseButton: true,
        closeButtonText: "X",
        title: "Required Field",
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
    <div className="resetPassword_container">
      <LandingHeader />
      <div className="resetPassword_header">
        <img src="/pachi-exchange-favicon.png" alt="" />
        <h1>Password Reset</h1>
      </div>
      <div className="resetPassword_contents">
        <h1>Reset your password</h1>
        <p>Strong passwords include numbers, letters, and punctuation marks.</p>
        <input
          type={newPasswordShown ? "text" : "password"}
          className="resetPassword_input"
          placeholder="New Password"
          value={newPassword}
          autoComplete="newPassword"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <VisibilityOff
          visibility={newPasswordShown ? "hidden" : "visible"}
          className="showNewPassword"
          onClick={toggleNewPassword}
        />
        <Visibility
          visibility={newPasswordShown ? "visible" : "hidden"}
          className="showNewPassword"
          onClick={toggleNewPassword}
        />
        <input
          type={confirmNewPasswordShown ? "text" : "password"}
          className="resetPassword_input1"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          autoComplete="ConfirmNewPassword"
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <VisibilityOff
          visibility={confirmNewPasswordShown ? "hidden" : "visible"}
          className="showConfirmNewPassword"
          onClick={toggleConfirmNewPassword}
        />
        <Visibility
          visibility={confirmNewPasswordShown ? "visible" : "hidden"}
          className="showConfirmNewPassword"
          onClick={toggleConfirmNewPassword}
        />
        <div className="reset_button">
          <button onClick={passwordReset} className="resetPassword_button">
            RESET PASSWORD
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
