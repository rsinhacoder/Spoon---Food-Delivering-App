import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { resetAdminPassword } from "../../../helperFunctions/apiCalls";
import { regex } from "../../../helperFunctions/regex";
import {
  customErrorMessage,
  customSuccessMessage,
} from "../../../helperFunctions/sweetAlert";

const ChangeAdminPassword = ({
  adminDetails,
  setEditButton,
  setResetPasswordButton,
}) => {
  let strongPassword = new RegExp(regex.strongPassword);
  let mediumPassword = new RegExp(regex.mediumPassword);
  const navigate = useNavigate();
  const oldPasswordRef = useRef();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrngth] = useState("");

  const handleResetPassword = async () => {
    if (
      oldPasswordRef.current.value.trim() === "" &&
      newPassword.trim() === "" &&
      confirmPassword.trim() === ""
    ) {
      setEditButton(false);
      setResetPasswordButton(false);
      return;
    }
    if (oldPasswordRef.current.value.trim() === "") {
      customErrorMessage("Enter Old password!");
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
    if (newPassword !== confirmPassword) {
      customErrorMessage("Password didn't matched!!");
      return;
    }
    if (oldPasswordRef.current.value === newPassword) {
      customErrorMessage("Old password and new password can not be same!");
      return;
    }
    if (passwordStrength === "Weak Password") {
      customErrorMessage("Please enter a stronger password!");
      return;
    }
    const response = await resetAdminPassword(
      adminDetails._id,
      oldPasswordRef.current.value,
      confirmPassword
    );
    if (response.success) {
      customSuccessMessage(response.message);
      Cookies.remove("token");
      navigate("/");
      setEditButton(false);
    } else {
      customErrorMessage(response.message);
    }
  };
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

  return (
    <div className="fade-in-effect flex flex-col gap-2 sm:gap-4 px-9 py-8 lg:py-5 bg-[#081A2C] rounded-lg mt-8 lg:mt-0 mx-4 lg:w-[590px] xl:w-[772px] lg:h-[420px]">
      <div className="mt-2">
        <p className="text-2xl sm:text-3xl sm:mb-4">Change Password</p>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-[#5A7DA0]">Old Password</label>
        <input
          className="bg-[#081A2C] border border-[#2C4359] py-1 px-2 rounded"
          type="password"
          ref={oldPasswordRef}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-[#5A7DA0]">New Password</label>
        <input
          className="bg-[#081A2C] border border-[#2C4359] py-1 px-2 rounded"
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <div className="relative flex justify-start">
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
        </div>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-[#5A7DA0]">Confirm Password</label>
        <input
          className="bg-[#081A2C] border border-[#2C4359] py-1 px-2 rounded"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>
      <div className="flex sm:justify-end justify-start gap-4 mt-2 sm:mt-0">
        <button
          onClick={() => {
            setEditButton(false);
            setResetPasswordButton(false);
          }}
          className="px-5 py-2 rounded bg-[#081A2C] border border-white hover:bg-gradient-to-r from-[#F26522] to-[#FF0661]"
        >
          Cancel
        </button>
        <button
          onClick={handleResetPassword}
          className="px-5 py-2 rounded bg-[#081A2C] border border-white hover:bg-gradient-to-r from-[#F26522] to-[#FF0661]"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ChangeAdminPassword;
