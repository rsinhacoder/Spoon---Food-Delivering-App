import React from "react";
import banner from "../../assets/images/banner.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Cookies from "js-cookie";
import { login } from "../../helperFunctions/apiCalls";
import CryptoJS from "crypto-js";
import { useRef } from "react";
import {
  customErrorMessage,
  customSuccessMessage,
} from "../../helperFunctions/sweetAlert";
import { regex } from "../../helperFunctions/regex";

const LogIn = () => {
  function setPasswordFromLocalStorage() {
    let bytes = CryptoJS.AES.decrypt(
      localStorage.getItem("password"),
      process.env.REACT_APP_SECRET_KEY
    );
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  const mailFormat = regex.mailFormat;
  const navigate = useNavigate();
  const [email, setEmail] = useState(
    localStorage.getItem("email") ? localStorage.getItem("email") : ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem("password") ? setPasswordFromLocalStorage() : ""
  );
  const { setAdminDetails } = useContext(GlobalContext);
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe")
  );
  const signInRef = useRef();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      customErrorMessage(`Enter email!`);
      return;
    }
    if (!email.match(mailFormat)) {
      customErrorMessage("Enter valid email!!");
      return;
    }
    if (password.trim() === "") {
      customErrorMessage(`Enter Password!`);
      return;
    }
    let cipherPassword = CryptoJS.AES.encrypt(
      password,
      process.env.REACT_APP_SECRET_KEY
    ).toString();
    if (rememberMe) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", cipherPassword);
      localStorage.setItem("rememberMe", rememberMe);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }
    try {
      const response = await login(email, password);
      if (response.success) {
        Cookies.set("token", response.data.token);
        setAdminDetails(response.data.userDetails);
        localStorage.setItem("selectedSidebarOption", "dashboard");
        navigate("/dashboard");
        customSuccessMessage(`Welcome to Spoon Restaurant!`);
        signInRef.current.disabled = false;
        setEmail("");
        setPassword("");
      } else {
        customErrorMessage(response.message);
        signInRef.current.disabled = false;
      }
    } catch (error) {
      customErrorMessage(`Something went wrong. Please try agaiin!`);
      signInRef.current.disabled = false;
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-[#030F1B] w-full my-20 lg:my-16 ">
      <div className="w-[80%] flex m-auto lg:flex-row flex-col ">
        <div className="bg-[#081A2C] text-white lg:w-[40%] lg:pt-10 py-4 px-10 w-full mt-5 lg:mt-0 ">
          <p className="text-2xl font-bold xl:text-3xl">
            Spoon<sup className="text-xs font-light">TM</sup>
          </p>
          <p className="my-2 text-[#5A7DA0] xl:text-xl xl:mt-5">Email Id</p>
          <input
            className="rounded p-2 w-full outline-0 border bg-transparent border-[#304E6B] xl:py-3"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p className="my-2 text-[#5A7DA0] xl:text-xl xl:mt-5">Password</p>

          <input
            className="p-2 outline-0 border rounded w-full bg-transparent border-[#304E6B] xl:py-3"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex justify-between my-3 xl:flex-row flex-col">
            <div className="flex items-center ">
              <input
                type="checkbox"
                className="me-1 lg:me-2 accent-[#05A4A0] w-4 h-4 cursor-pointer"
                onChange={(e) => {
                  setRememberMe(e.target.checked);
                }}
                defaultChecked={
                  localStorage.getItem("rememberMe") ? true : false
                }
              />
              <p className="lg:text-base text-xs text-[#5A7DA0] xl:text-xl">
                Remember me
              </p>
            </div>
            <p className="md:text-base text-xs xl:text-lg cursor-pointer my-auto">
              <Link to="/set-password">Forgot Password ?</Link>
            </p>
          </div>
          <button
            onClick={(e) => {
              handleSignIn(e);
            }}
            ref={signInRef}
            className="w-full hover:bg-gradient-to-r from-[#F26522] to-[#FF0661] border border-[#304E6B]  rounded py-3 lg:mt-4 mt-5 xl:mt-16 xl:text-xl cursor-pointer"
          >
            Sign In
          </button>
          <button className="w-full hover:bg-gradient-to-r from-[#F26522] to-[#FF0661] border border-[#304E6B] rounded py-3 mt-8 xl:mt-10 xl:text-xl cursor-pointer">
            Register
          </button>
        </div>
        <img
          src={banner}
          className="lg:w-[60%] w-full justify-center items-center lg:flex hidden"
          alt="food"
        />
      </div>
    </div>
  );
};

export default LogIn;
