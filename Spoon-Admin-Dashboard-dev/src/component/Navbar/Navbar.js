import React from "react";
import calendar from "../../assets/images/calendar.svg";
import dp from "../../assets/images/dp.png";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleBtn from "./ToggleBtnNavbar/ToggleBtn";
import "./Navbar.scss";
import { urls } from "../../config/urls";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { getCanOrderStatus } from "../../helperFunctions/apiCalls";

export const Navbar = ({ setShowSideBar, showSideBar, adminDetails }) => {
  const { setRestaurantStatus } = useContext(GlobalContext);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let todaysDate = `${new Date().getDate()} ${
    months[new Date().getMonth()]
  } ${new Date().getFullYear()}`;
  const [data, setdata] = useState("");

  const getRestaurantOpenStatus = async () => {
    const response = await getCanOrderStatus(urls.getRestaurantOpenStatus);
    if (response.error) {
      console.log(response.error.message);
    } else {
      setRestaurantStatus(response.data.isOpen);
      setdata(response.data);
    }
  };

  useEffect(() => {
    getRestaurantOpenStatus();
  }, []);

  return (
    <div className="h-[9vh] bg-[#051424] text-white flex items-center z-2 navbar">
      <div className="w-[70%] md:w-[26%] lg:w-[16%]">
        <h1 className="text-3xl font-medium lg:font-bold ps-1 sm:ps-4">
          Spoon <sup className="text-sm font-medium">TM</sup>
        </h1>
      </div>
      <div className="ms-5 w-full flex justify-end lg:justify-between text-md">
        <div className="flex ps-2 items-center xl:w-[60%] md:gap-5 2xl:gap-9 bg-red text-[#748BA0]">
          <p className="hidden xl:block">
            Hello{" "}
            {adminDetails.userName ? adminDetails.userName.split(" ")[0] : ""},
            Welcome to Spoon
          </p>
          <div className="hidden sm:flex items-center">
            <button className="ms-[6.5rem] lg:m-14 xl:m-0">
              {data && <ToggleBtn adminDetails={adminDetails} data={data} />}
            </button>
          </div>
          <div className="xl:flex bg-black px-5 py-3 rounded-md gap-4 hidden">
            <img src={calendar} alt="Calender-icons" className="" />
            <p className="text-sm">{todaysDate}</p>
          </div>
        </div>
        <div className="xl:w-[40%] w-full me-9 flex justify-end items-center gap-2 text-center md:gap-8 ">
          <p className="py-2 text-[#215FFF] px-4 rounded-md bg-black hidden lg:block">
            Last login :{" "}
            {adminDetails.lastLogin ? adminDetails.lastLogin : "NA"}
          </p>
          <img
            src={adminDetails.imageURL ? `${adminDetails.imageURL}` : dp}
            alt="User icon"
            className="hidden lg:block rounded-full w-[2.5rem] h-[2.3rem]"
          />
          <p className="hidden lg:block">
            {adminDetails.userName ? adminDetails.userName : ""}
          </p>
          <MenuIcon
            className="mt-1 hamburger cursor-pointer"
            onClick={() => {
              setShowSideBar(!showSideBar);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
