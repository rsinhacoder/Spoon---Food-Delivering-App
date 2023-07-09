import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import food from "../../../assets/images/food-item.svg";
import EditItem from "../EditItem/EditItem.js";
import DeleteItem from "../DeleteItem/DeleteItem";
import "../FoodItem/FoodItem.scss";
import { urls } from "../../../config/urls";
import { itemAvailibilityStatus } from "../../../helperFunctions/apiCalls";
import Swal from "sweetalert2";
import { sendSocketData } from "../../../helperFunctions/socketCall";
import { customErrorMessage } from "../../../helperFunctions/sweetAlert";

export const FoodItem = ({ data, setReload, reload, showMenuEditor }) => {
  const [editPopUp, setEditPopUp] = useState(false);
  const [deletePopUp, setDeltetePopUp] = useState(false);
  const [active, setActive] = useState(data.availability);

  const animateToggle = (e) => {
    e.currentTarget.firstElementChild.classList.toggle("active");
    setActive(!active);
    setItemAvailibilityStatus();
  };

  const setItemAvailibilityStatus = async () => {
    const response = await itemAvailibilityStatus(
      `${urls.setItemAvailibility}/${data._id}/${!active}`
    );
    if (response.success) {
      sendSocketData("changeAvailability", {
        foodItem: true,
        availability: response.data.availability,
        id: response.data._id,
      });
      Swal.fire({
        title: "Processing...",
        timer: 1500,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    if (response.error) {
      customErrorMessage(response.error.message);
    }
  };

  useEffect(() => {
    setActive(data.availability);
  }, [data]);

  return (
    <div className="flex items-center h-[6.5rem] bg-[#153453] relative px-3 rounded-lg w-[17rem] justify-between">
      <CancelIcon
        className="absolute left-[91%] top-0 text-[#ADBCE9] p-1 cursor-pointer"
        onClick={() => {
          setDeltetePopUp(!deletePopUp);
        }}
      />
      {deletePopUp ? (
        <DeleteItem
          id={data._id}
          reload={reload}
          setReload={setReload}
          setDeltetePopUp={setDeltetePopUp}
        />
      ) : (
        ""
      )}
      <div className="flex items-center h-[6rem]">
        {active ? (
          <img
            src={data.item.imageURL ? `${data.item.imageURL}` : food}
            alt="food"
            className="w-[4rem] h-[4rem] rounded-[50%]"
          />
        ) : (
          <img
            src={data.item.imageURL ? `${data.item.imageURL}` : food}
            alt="food"
            className="w-[4rem] h-[4rem] rounded-[50%] grayscale"
          />
        )}

        <div className="flex flex-col justify-center h-[5rem] mx-2">
          <p className="text-[#ADBCE9] text-sm font-bold">
            {data.item.itemName}
          </p>
          <p
            className="text-[#05A4A0] underline decoration-1 text-xs cursor-pointer"
            onClick={() => {
              setEditPopUp(!editPopUp);
            }}
          >
            Edit Item
          </p>
          {editPopUp ? (
            <EditItem
              data={data}
              reload={reload}
              setReload={setReload}
              editPopUp={editPopUp}
              setEditPopUp={setEditPopUp}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {showMenuEditor ? (
        ""
      ) : (
        <div className="flex flex-col items-center">
          {active ? (
            <p className="my-1 text-xs available">Available</p>
          ) : (
            <p className="my-1 text-xs unavailable">Unavailable</p>
          )}
          <div className="flex p-1 mb-5">
            <div className="container cursor-pointer" onClick={animateToggle}>
              <div className={`food-toggle ${data?.availability && "active"}`}>
                <div className="food-toggle-button"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
