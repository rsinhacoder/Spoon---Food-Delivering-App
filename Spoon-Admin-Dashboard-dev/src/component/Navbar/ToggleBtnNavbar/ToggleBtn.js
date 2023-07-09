import React, { useEffect, useState } from "react";
import "./ToggleBtn.scss";
import { urls } from "../../../config/urls";
import { canOrderStatus } from "../../../helperFunctions/apiCalls";
import Swal from "sweetalert2";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { sendSocketData } from "../../../helperFunctions/socketCall";

const ToggleBtn = ({ adminDetails, data }) => {
  const { setRestaurantStatus } = useContext(GlobalContext);
  const [active, setActive] = useState(data.isOpen);

  const animateToggle = () => {
    if (adminDetails?.isAdmin) {
      document.querySelector(".toggle").classList.toggle("active");
      setActive(!active);
      setCanOrderStatus(!active);
    }
  };

  const setCanOrderStatus = async (status) => {
    const response = await canOrderStatus(
      `${urls.canOrderStatus}/${adminDetails?._id}/${status}`
    );
    if (response.success) {
      sendSocketData("changeAvailability", {
        resturant: true,
        availability: status,
      });
      if (status === true) {
        Swal.fire({
          title: "Restaurant is Opening !!",
          timer: 3000,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }
      if (status === false) {
        Swal.fire({
          title: "Restaurant is Closing !!",
          timer: 2000,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }
      setRestaurantStatus(status);
    }
  };

  useEffect(() => {
    if (active) {
      document.querySelector(".toggle").classList.add("active");
      document.querySelector(".online").classList.add("active");
      document.querySelector(".offline").classList.remove("active");
    } else {
      document.querySelector(".toggle").classList.remove("active");
      document.querySelector(".online").classList.remove("active");
      document.querySelector(".offline").classList.add("active");
    }
  }, [active]);

  return (
    <div className="flex p-4 fade-in-effect">
      <span className="online">online</span>
      <div className="container" onClick={animateToggle}>
        <div className="toggle">
          <div className="toggle-button"></div>
        </div>
      </div>
      <span className="offline">offline</span>
    </div>
  );
};

export default ToggleBtn;
