import React, { useEffect } from "react";
import dashboard from "../../assets/images/dashboard.svg";
import allOrders from "../../assets/images/allOrders.svg";
import foodMenu from "../../assets/images/foodMenu.svg";
import liveKitchen from "../../assets/images/liveKitchen.svg";
import deliveries from "../../assets/images/deliveries.svg";
import tableBooking from "../../assets/images/tableBooking.svg";
import analytics from "../../assets/images//analytics.svg";
import payment from "../../assets/images/payment.svg";
import manageStaff from "../../assets/images/manageStaffs.svg";
import coustomerReview from "../../assets/images/customerReview.svg";
import settings from "../../assets/images/settings.svg";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";
import "./Sidebar.scss";
import Cookies from "js-cookie";
import LogoutIcon from "@mui/icons-material/Logout";
import { customSuccessMessage } from "../../helperFunctions/sweetAlert";

const Sidebar = ({ showSideBar }) => {
  const { selectedSidebarOption, setSelectedSidebarOption } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const handleHighlight = () => {
    localStorage.setItem("selectedSidebarOption", `${selectedSidebarOption}`);
    document.querySelector(".dashboard").classList.remove("active");
    document.querySelector(".food-menu").classList.remove("active");
    document.querySelector(".all-orders").classList.remove("active");
    document.querySelector(".order-history").classList.remove("active");
    document.querySelector(".manage-staff").classList.remove("active");
    document.querySelector(`.${selectedSidebarOption}`).classList.add("active");
  };

  useEffect(() => {
    if (selectedSidebarOption !== "") {
      handleHighlight();
    } else {
      setSelectedSidebarOption(localStorage.getItem("selectedSidebarOption"));
    }
  }, [selectedSidebarOption]);

  const logOut = () => {
    Cookies.remove("token");
    customSuccessMessage(`Logged out Successfully`);
    localStorage.removeItem("cartData");
    navigate("/");
  };

  return (
    <div>
      <div
        className={` slide-in-effect text-[12px] sm:text-[15px] leading-3 sm:leading-5 bg-[#051424] w-[55%] sm:w-[27%] lg:w-[20%] xl:w-[15%] text-white h-[91vh] ps-4 absolute lg:block z-10 top-[9vh] ${
          !showSideBar && "hidden"
        }`}
      >
        <div className="flex flex-col h-[92%] justify-around">
          <ul>
            <li
              className="flex gap-2 mt-7"
              onClick={() => {
                setSelectedSidebarOption("dashboard");
              }}
            >
              <img src={dashboard} alt="Dashboard-icons" className="me-3" />
              <Link
                className="dashboard text-[#869AAF] hover:text-white"
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li
              className="flex gap-2 mt-7"
              onClick={() => {
                setSelectedSidebarOption("food-menu");
              }}
            >
              <img src={foodMenu} alt="Foodmenu-icons" className="me-3" />
              <Link
                className="food-menu text-[#869AAF] hover:text-white"
                to="/menu"
              >
                Food Menu
              </Link>
            </li>
            <li
              className="flex gap-2 mt-7"
              onClick={() => {
                setSelectedSidebarOption("all-orders");
              }}
            >
              <img src={allOrders} alt="All-orders-icons" className="me-3" />
              <Link
                className="text-[#869AAF] hover:text-white all-orders"
                to="/all-Orders"
              >
                All Orders
              </Link>
            </li>
            <li
              className="flex gap-2 mt-7"
              onClick={() => {
                setSelectedSidebarOption("order-history");
              }}
            >
              <img src={allOrders} alt="All-orders-icons" className="me-3" />
              <Link
                className="text-[#869AAF] hover:text-white order-history"
                to="/order-history"
              >
                Order History
              </Link>
            </li>
            <li
              className="flex gap-2 mt-7"
              onClick={() => {
                setSelectedSidebarOption("dashboard");
              }}
            >
              <img
                src={liveKitchen}
                alt="Live kitchen-icons"
                className="me-4"
              />
              <Link className="text-[#869AAF] hover:text-white" to="/dashboard">
                Live Kitchen
              </Link>
            </li>
            <li
              className="flex gap-2 mt-7"
              onClick={() => {
                setSelectedSidebarOption("dashboard");
              }}
            >
              <img
                src={deliveries}
                alt="Deliveries/Staff-icons"
                className="me-2"
              />
              <Link className="text-[#869AAF] hover:text-white" to="/dashboard">
                Deliveries/Staff
              </Link>
            </li>
            <li
              className="flex gap-2 mt-7"
              onClick={() => {
                setSelectedSidebarOption("dashboard");
              }}
            >
              <img
                src={tableBooking}
                alt="Table Booking-icons"
                className="me-2"
              />
              <Link className="text-[#869AAF] hover:text-white" to="/dashboard">
                Table Booking
              </Link>
            </li>
          </ul>
          <ul>
            <li
              className="flex gap-2 mt-7"
              onClick={() => {
                setSelectedSidebarOption("dashboard");
              }}
            >
              <img src={analytics} alt="Analytics-icons" className="me-3" />
              <Link className="text-[#869AAF] hover:text-white" to="/dashboard">
                Analytics
              </Link>
            </li>
            <li
              className="flex gap-2 mt-7"
              onClick={() => {
                setSelectedSidebarOption("dashboard");
              }}
            >
              <img src={payment} alt="Payment-icons" className="me-3" />
              <Link className="text-[#869AAF] hover:text-white" to="/dashboard">
                Payments
              </Link>
            </li>
            <li
              className="flex gap-2 mt-7 items-center"
              onClick={() => {
                setSelectedSidebarOption("manage-staff");
              }}
            >
              <img
                src={manageStaff}
                alt="Manage Staff-icons"
                className="me-3"
              />
              <Link
                className="text-[#869AAF] hover:text-white manage-staff"
                to="/users"
              >
                Manage Staff
              </Link>
            </li>
            <li
              className="flex gap-2 mt-7"
              onClick={() => {
                setSelectedSidebarOption("dashboard");
              }}
            >
              <img
                src={coustomerReview}
                alt="Customer Reviews-icons"
                className="me-3"
              />
              <Link className="text-[#869AAF] hover:text-white" to="/dashboard">
                Customer Reviews and Complaints
              </Link>
            </li>
            <li
              className="flex gap-2 mt-7"
              onClick={() => {
                setSelectedSidebarOption("dashboard");
              }}
            >
              <img src={settings} alt="Settings-icons" className="me-3" />
              <Link className="text-[#869AAF] hover:text-white" to="/dashboard">
                Settings
              </Link>
            </li>
            <li
              className="flex gap-2 mt-7 cursor-pointer"
              onClick={() => {
                setSelectedSidebarOption("");
                logOut();
              }}
            >
              <LogoutIcon className="me-3" />
              <p className="text-[#869AAF] hover:text-white">Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
