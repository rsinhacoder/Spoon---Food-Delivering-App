import React from "react";
import OrderHistoryCard from "../../../component/Order/OrderHistoryCard/OrderHistoryCard";

const OrderHistoryInfo = ({
  orderData,
  index,
  setShowOrderDetails,
  setSelectedOrderDetails,
}) => {
  return (
    <div
      className="bg-[#0F2439] flex lg:flex-row flex-col gap-4 md:gap-0 p-4 lg:py-3 mx-3 lg:mx-4 rounded-lg mt-4 lg:mt-3 cursor-pointer "
      onClick={() => {
        setShowOrderDetails(true);
        setSelectedOrderDetails(orderData);
      }}
    >
      <OrderHistoryCard orderData={orderData} index={index} />
      <div className="lg:w-[15%] xl:w-[30] flex justify-center mt-2 lg:mt-0 mx-2 items-center  ">
        <p className=" bg-[#1DBB40] py-2 px-5 rounded">Delivered</p>
      </div>
    </div>
  );
};

export default OrderHistoryInfo;
