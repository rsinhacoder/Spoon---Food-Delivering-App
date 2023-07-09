import React from "react";
import AlarmIcon from "@mui/icons-material/Alarm";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import food from "../../../assets/images/chocopie.svg";

const OrderCard = ({ orderData, index }) => {
  return (
    <>
      <div className="lg:w-[8%] flex items-center justify-center py-2">
        {orderData &&
          (orderData.orderItems ? (
            index + 1
          ) : (
            <img
              src={orderData?.itemImageURL ? `${orderData.itemImageURL}` : food}
              alt="food"
              className="w-[3rem] h-[3rem] rounded-full lg:ms-4"
            />
          ))}
      </div>
      <div className="lg:w-[25%] xl:w-[20%] flex justify-center font-medium lg:font-normal">
        <p className="md:my-auto text-sm text-center">
          {orderData?.orderItems ? orderData._id : orderData?.itemName}
        </p>
      </div>
      {orderData?.price ? (
        <div className="lg:w-[14%] xl:w-[20%] flex flex-col justify-start">
          <div className="flex justify-between lg:justify-center md:my-auto">
            <p className="m-1">Price : </p>
            <p className="m-1">₹{orderData?.price}</p>
          </div>
        </div>
      ) : (
        <div className="lg:w-[25%] xl:w-[20%] flex flex-col">
          <div className="flex justify-between items-center md:my-auto">
            <div className="flex items-center lg:hidden">
              <CalendarMonthIcon className="text-blue-200" />
              <span className="text-[#395B7D]">|</span>
              <AlarmIcon className="text-yellow-300" />
            </div>
            <p className="text-sm lg:mx-auto ">
              <span>{orderData?.date}</span>
              <span className="text-[#395B7D]"> | </span>
              <span>{orderData?.time}</span>
            </p>
          </div>
        </div>
      )}
      <div className="lg:w-[10%] xl:w-[20%] flex flex-col justify-start">
        <div className="flex justify-between lg:justify-center my-auto">
          <p className="m-1 lg:hidden">Quantity : </p>
          {orderData?.price ? (
            <p className="invisible lg:visible">Quantity : </p>
          ) : (
            ""
          )}
          <p className="px-1 my-auto">
            {orderData?.orderItems
              ? orderData.orderItems.length
              : orderData.quantity}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
