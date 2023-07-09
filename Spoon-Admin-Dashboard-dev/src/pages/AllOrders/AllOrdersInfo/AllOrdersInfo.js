import React from "react";
import "../AllOrders/AllOrders.scss";
import OrderCard from "../../../component/Order/OrderCard/OrderCard";

const AllOrdersInfo = ({
  index,
  orderData,
  setShowOrderDetails,
  setSelectedOrderDetails,
  setOrderId,
  setCurrentOrderStatus,
}) => {
  return (
    <div
      className="bg-[#0F2439] mb-6 flex lg:flex-row flex-col gap-4 md:gap-0 justify-between p-4 lg:py-3 mx-3 lg:mx-4 rounded-lg mt-4 lg:mt-3 cursor-pointer"
      onClick={() => {
        setShowOrderDetails(true);
        setSelectedOrderDetails(orderData);
      }}
      draggable="true"
      onDragStart={() => {
        setCurrentOrderStatus(orderData.orderStatus);
        setOrderId(orderData._id);
      }}
    >
      <OrderCard orderData={orderData} index={index} />
      <div className="lg:w-[30%] flex justify-center items-center">
        {orderData.orderStatus === "Pending" ? (
          <p className=" bg-[#BB691D] px-5 rounded py-2">Pending</p>
        ) : (
          ""
        )}
        {orderData.orderStatus === "Preparing" ? (
          <p className="bg-[#BB691D] px-5 rounded py-2">Preparing</p>
        ) : (
          ""
        )}
        {orderData.orderStatus === "Ready to deliver" ? (
          <p className="bg-[#1DBB40] px-5 rounded py-2">Ready to deliver</p>
        ) : (
          ""
        )}
        {orderData.orderStatus === "Completed" ? (
          <p className=" bg-[#1DBB40] px-5 rounded py-2 ">Delivered</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AllOrdersInfo;
