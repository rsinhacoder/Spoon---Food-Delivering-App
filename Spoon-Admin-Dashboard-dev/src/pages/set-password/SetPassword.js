import React, { useRef } from "react";
import banner from "../../assets/images/banner.svg";
import { setNewPassword } from "../../helperFunctions/apiCalls";
import {
  customErrorMessage,
  customSuccessMessage,
} from "../../helperFunctions/sweetAlert";

const SetPassword = () => {
  const emailRef = useRef();
  const handleSetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await setNewPassword(emailRef.current.value);
      if (response.success === true) {
        customSuccessMessage(response.message);
      } else {
        customErrorMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#030F1B] w-full my-20 lg:my-16">
      <div className="w-[80%] flex m-auto lg:flex-row flex-col">
        <div className="bg-[#081A2C] text-white lg:w-[40%] lg:pt-10 py-4 px-10 w-full mt-5 lg:mt-0 ">
          <p className="text-2xl font-bold xl:text-3xl">
            Spoon<sup className="text-xs font-light">TM</sup>
          </p>
          <p className="text-xl mb-5 xl:mt-5 xl:text-2xl">
            Set Profile Password
          </p>
          <p className="text-[#8893B7] mb-10 xl:text-xl">
            Enter the email associated with your account and we will send an
            email with instructions to reset your password.
          </p>
          <p className="my-2 text-[#5A7DA0] xl:text-xl xl:mt-5">Email ID</p>
          <input
            className="rounded p-2 w-full outline-0 border bg-transparent border-[#304E6B] py-3 mb-3  xl:text-xl"
            type="email"
            ref={emailRef}
          />
          <button
            onClick={handleSetPassword}
            className="w-full bg-gradient-to-r from-[#F26522] to-[#FF0661] rounded py-3 lg:mt-4 mt-5 xl:text-xl mb-10 xl:mb-5"
          >
            Send Link
          </button>
        </div>
        <img
          src={banner}
          className="lg:w-[60%] w-full lg:flex hidden"
          alt="banner-log0"
        />
      </div>
    </div>
  );
};

export default SetPassword;
