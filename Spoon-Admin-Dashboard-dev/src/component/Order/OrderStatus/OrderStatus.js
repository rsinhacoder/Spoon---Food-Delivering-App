import React, { useEffect, useState, useContext } from "react";
import { urls } from "../../../config/urls";
import { updateOrderByStatusApi } from "../../../helperFunctions/apiCalls";
import { GlobalContext } from "../../../context/GlobalContext";
import { sendSocketData } from "../../../helperFunctions/socketCall";

const OrderStatus = ({ orderStatus, orderData, id, reload, setReload }) => {
  const { currentOrderStatus } = useContext(GlobalContext);
  const [options, setOptions] = useState([]);
  const [orderCurrentStatus, setOrderCurrentStatus] = useState(
    orderStatus ? orderStatus : "Pending"
  );
  useEffect(() => {
    orderStatus === "Pending"
      ? setOptions(["Pending", "Preparing"])
      : orderStatus === "Preparing"
      ? setOptions(["Preparing", "Ready to deliver"])
      : setOptions(["Ready to deliver", "Delivered"]);
  }, []);

  const updateOrderStatus = async () => {
    if (
      (currentOrderStatus === "Pending" &&
        orderCurrentStatus === "Preparing") ||
      (currentOrderStatus === "Preparing" &&
        orderCurrentStatus === "Ready to deliver") ||
      orderCurrentStatus === "Delivered"
    ) {
      const response = await updateOrderByStatusApi(
        `${urls.updateOrderStatus}/${id}/${orderCurrentStatus}`
      );
      if (response.success) {
        sendSocketData("orders", {
          changeStatus: true,
          customerId: orderData.customerId,
          orderId: orderData._id,
          orderStatus: orderCurrentStatus,
        });
      }
    }
  };

  useEffect(() => {
    updateOrderStatus();
  }, [orderCurrentStatus]);

  return (
    <div
      className={`flex w-full  ${
        orderCurrentStatus === "Ready to deliver" ||
        orderCurrentStatus === "Delivered"
          ? "bg-[#1DBB40]"
          : "bg-[#BB691D]"
      }  justify-between  rounded   md:mt-0 `}
    >
      <select
        className={`${
          orderCurrentStatus === "Ready to deliver" ||
          orderCurrentStatus === "Delivered"
            ? "bg-[#1DBB40]"
            : "bg-[#BB691D]"
        } py-3 px-3 w-[full] me-3 font-medium rounded-lg border-none hover:border-none cursor-pointer`}
        value={orderCurrentStatus}
        onChange={(e) => {
          setOrderCurrentStatus(e.target.value);
          setReload(!reload);
        }}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrderStatus;
