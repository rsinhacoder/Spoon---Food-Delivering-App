import React, { useState, useEffect } from "react";
import banner from "../../assets/images/banner.svg";
import { useParams, useNavigate } from "react-router-dom";
import { urls } from "../../config/urls";
import { resetPassword, tokenValidation } from "../../helperFunctions/apiCalls";
import { regex } from "../../helperFunctions/regex";
import {
  customErrorMessage,
  customSuccessMessage,
} from "../../helperFunctions/sweetAlert";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showResetPasswordPage, setShowResetPasswordPage] = useState(false);
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordStrength, setPasswordStrngth] = useState("");
  let strongPassword = new RegExp(regex.strongPassword);
  let mediumPassword = new RegExp(regex.mediumPassword);

  const validateToken = async () => {
    const response = await tokenValidation(
      `${urls.resetPassword}/${id}/${token}`
    );
    if (response.success) {
      setShowResetPasswordPage(true);
      setEmail(response.email);
    } else {
      setShowResetPasswordPage(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.trim() === "" && confirmPassword.trim() === "") {
      return;
    }
    if (newPassword !== confirmPassword) {
      customErrorMessage("Password didn't matched!!");
      return;
    }
    if (newPassword.trim() === "") {
      customErrorMessage("Enter new password!");
      return;
    }
    if (confirmPassword.trim() === "") {
      customErrorMessage("Enter confirm password!");
      return;
    }
    if (passwordStrength === "Weak Password") {
      customErrorMessage("Please enter a stronger password!");
      return;
    }
    try {
      const response = await resetPassword(token, email, newPassword);
      if (response.success) {
        customSuccessMessage(response.message);
        setConfirmPassword("");
        setNewPassword("");
        navigate("/");
      } else {
        customErrorMessage(response.message);
        setConfirmPassword("");
        setNewPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  useEffect(() => {
    strongPassword.test(newPassword)
      ? setPasswordStrngth("Strong Password")
      : mediumPassword.test(newPassword)
      ? setPasswordStrngth("Medium Password")
      : setPasswordStrngth("Weak Password");
    if (newPassword === "") {
      setPasswordStrngth("");
    }
  }, [newPassword]);

  if (showResetPasswordPage) {
    return (
      <div className="bg-[#030F1B] w-full my-20 lg:my-16">
        <div className="w-[80%] flex m-auto lg:flex-row flex-col">
          <div className="bg-[#081A2C] text-white lg:w-[40%] lg:pt-10 py-4 px-10 w-full mt-5 lg:mt-0">
            <p className="text-2xl font-bold xl:text-3xl">
              Spoon<sup className="text-xs font-light">TM</sup>
            </p>
            <p className="text-xl mb-5 xl:mt-5 xl:text-2xl">
              Reset your Password
            </p>
            <p className="text-[#8893B7] mb-10 xl:text-xl">
              Your new password must be different from previous used password.
            </p>
            <p className="my-2 text-[#5A7DA0] xl:mt-5">New Password</p>
            <input
              className="p-2 outline-0 border rounded w-full bg-transparent border-[#304E6B] py-3 xl:text-xl"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <p
              className={`absolute text-[10px] ${
                passwordStrength === "Strong Password"
                  ? "text-green-500"
                  : passwordStrength === "Medium Password"
                  ? "text-blue-500"
                  : "text-red-500"
              }`}
            >
              {passwordStrength}
            </p>
            <p className="my-2 mt-6 text-[#5A7DA0]">Confirm Password</p>
            <div className="relative flex justify-start"></div>
            <input
              className="p-2 outline-0 border rounded w-full bg-transparent border-[#304E6B] py-3 xl:text-xl"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-gradient-to-r from-[#F26522] to-[#FF0661] rounded py-3 lg:mt-10 mt-5 mb-10 xl:mb-5"
            >
              Save
            </button>
          </div>
          <img
            src={banner}
            className="lg:w-[60%] w-full lg:flex hidden"
            alt="banner"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p className="text-slate-100 text-center">Invalid Link</p>
      </div>
    );
  }
};

export default ResetPassword;
