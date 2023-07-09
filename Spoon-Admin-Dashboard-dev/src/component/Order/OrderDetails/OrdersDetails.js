import React, { useEffect } from "react";
import { useContext } from "react";
import OrderStatus from "../OrderStatus/OrderStatus";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OrderCard from "../OrderCard/OrderCard";
import { GlobalContext } from "../../../context/GlobalContext";

const OrdersDetails = ({
  setShowOrderDetails,
  setSelectedOrderDetails,
  selectedOrderDetails,
  reload,
  setReload,
}) => {
  const { setCurrentOrderStatus } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentOrderStatus(selectedOrderDetails.orderStatus);
  }, []);
  return (
    <div>
      {setShowOrderDetails ? (
        <div
          className=" font-semibold px-[1rem] lg:px-[1.7rem] py-2 cursor-pointer"
          onClick={() => {
            setSelectedOrderDetails("");
            setShowOrderDetails(false);
            setReload(!reload);
          }}
        >
          <ArrowBackIcon />
        </div>
      ) : (
        ""
      )}
      <div className="flex lg:py-4 px-4 lg:px-8 justify-between flex-col md:flex-row">
        <div className="sm:flex justify-start sm:my-0 sm:me-5 w-full lg:w-[80%]">
          <div className="flex flex-col items-start">
            <p className="text-xl font-semibold sm:text-2xl py-2">
              OrderId : {selectedOrderDetails?._id}
            </p>
            <div className="grid grid-rows-1 w-full">
              <div className="grid grid-cols-2 py-2 items-center">
                <p className="text-[#869AAF]">Customer Name :</p>
                <p> {selectedOrderDetails?.customerName}</p>
              </div>
              <div className="grid grid-cols-2 py-2 items-center">
                <p className="text-[#869AAF]">Phone Number :</p>
                <p> {selectedOrderDetails?.phoneNumber}</p>
              </div>
              <div className="grid grid-cols-2 py-2 items-center">
                <p className="text-[#869AAF]">Email Address :</p>
                <p> {selectedOrderDetails?.email}</p>
              </div>
              <div className="grid grid-cols-2 py-2 items-center">
                <p className="text-[#869AAF]">Address :</p>
                <p> {selectedOrderDetails?.address}</p>
              </div>
              <div className="grid grid-cols-2 py-2 items-center">
                <p className="text-[#869AAF]">Cart Items :</p>
                <p> {selectedOrderDetails?.orderItems?.length}</p>
              </div>
            </div>
          </div>
        </div>
        {selectedOrderDetails?.orderStatus === "Delivered" ? (
          <div>
            <p className=" bg-[#1DBB40] text-center px-2 py-1 sm:py-2 sm:px-4 rounded">
              Delivered
            </p>
          </div>
        ) : (
          <div className="w-full lg:w-[30%]">
            <OrderStatus
              orderStatus={selectedOrderDetails.orderStatus}
              orderData={selectedOrderDetails}
              id={selectedOrderDetails._id}
              reload={reload}
              setReload={setReload}
            />
          </div>
        )}
      </div>
      {selectedOrderDetails &&
        selectedOrderDetails.orderItems?.map((data, index) => (
          <div
            key={index}
            className="lg:flex lg:justify-around bg-[#0F2439] py-2 my-2 overflow-scroll"
          >
            <OrderCard key={index} orderData={data} index={index} />
          </div>
        ))}
    </div>
  );
};

export default OrdersDetails;
