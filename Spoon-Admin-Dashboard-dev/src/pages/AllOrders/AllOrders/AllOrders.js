import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../../component/Sidebar/Sidebar";
import Navbar from "../../../component/Navbar/Navbar";
import { GlobalContext } from "../../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { urls } from "../../../config/urls";
import AllOrdersInfo from "../AllOrdersInfo/AllOrdersInfo";
import OrdersDetails from "../../../component/Order/OrderDetails/OrdersDetails";
import Loading from "../../../component/Loading/Loading";
import {
  getAdminData,
  getOrderByStatus,
  updateOrderByStatusApi,
} from "../../../helperFunctions/apiCalls";
import { socket } from "../../../config/socketConnection";
import { FooterForPagination } from "../../../component/Footer/FooterForPagination";

const AllOrders = () => {
  const navigate = useNavigate();
  const {
    adminDetails,
    setAdminDetails,
    currentOrderStatus,
    setCurrentOrderStatus,
  } = useContext(GlobalContext);
  const [showSideBar, setShowSideBar] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [showNewOrders, setShowNewOrders] = useState(false);
  const [showPreparingOrders, setShowPreparingOrders] = useState(false);
  const [showReadyOrders, setShowReadyOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState("");
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [reload, setReload] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [footerStates, setFooterStates] = useState({
    startingIndex: 1,
    endIndex: 6,
    pageCounter: 1,
    selectedRange: 6,
  });
  const [totalItems, setTotalItems] = useState(0);

  const adminData = async () => {
    const response = await getAdminData(Cookies.get("token"));
    if (response.error) {
      navigate("/");
      return;
    }
    if (response.success) {
      setAdminDetails(response.data);
      return;
    } else {
      navigate("/");
    }
  };

  const getAllOrdersByStatus = async () => {
    const response = await getOrderByStatus(
      `${urls.getAllordersByStatus}/${status}`
    );
    if (response.error) {
      console.log(response.error.message);
    } else {
      setFooterStates((existingValues) => ({
        ...existingValues,
        pageCounter: 1,
        startingIndex: response.data.length > 0 ? 1 : 0,
        endIndex:
          footerStates.selectedRange < response.data.length
            ? footerStates.selectedRange
            : response.data.length,
      }));
      setOrders(response.data);
      setTotalItems(response.data.length);
    }
  };

  orders.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const setActive = () => {
    if (showNewOrders) {
      document.querySelector(".new-orders").classList.add("active");
      document.querySelector(".preparing").classList.remove("active");
      document.querySelector(".ready-to-deliver").classList.remove("active");
    } else if (showPreparingOrders) {
      document.querySelector(".new-orders").classList.remove("active");
      document.querySelector(".preparing").classList.add("active");
      document.querySelector(".ready-to-deliver").classList.remove("active");
    } else if (showReadyOrders) {
      document.querySelector(".new-orders").classList.remove("active");
      document.querySelector(".preparing").classList.remove("active");
      document.querySelector(".ready-to-deliver").classList.add("active");
    }
  };

  const draggingOver = (e) => {
    e.preventDefault();
  };

  const dragDroppedPreparing = async () => {
    if (currentOrderStatus === "Pending") {
      await updateOrderByStatusApi(
        `${urls.updateOrderStatus}/${orderId}/Preparing`
      );
      setReload(!reload);
    }
  };

  const dragDroppedReady = async () => {
    if (currentOrderStatus === "Preparing") {
      await updateOrderByStatusApi(
        `${urls.updateOrderStatus}/${orderId}/Ready to deliver`
      );
      setReload(!reload);
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      adminData();
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getAllOrdersByStatus();
  }, [status, reload]);

  useEffect(() => {
    setActive();
  }, [showNewOrders, showPreparingOrders, showReadyOrders]);

  useEffect(() => {
    socket.on("new_order", (data) => {
      if (data?.placed) {
        getAllOrdersByStatus();
      }
    });
  }, [socket]);

  if (!adminDetails || !orders) {
    return <Loading />;
  }

  if (adminDetails && orders) {
    return (
      <div>
        <Navbar
          setShowSideBar={setShowSideBar}
          showSideBar={showSideBar}
          adminDetails={adminDetails}
        />
        <Sidebar showSideBar={showSideBar} />
        <div className="w-full lg:w-[80%] xl:w-[85%] lg:absolute xl:left-[15%] h-[91vh] bg-[#030F1B] lg:left-[20%] text-white">
          <h1 className="text-white ms-5 mt-8">All Orders</h1>
          <div className="m-3 mt-8 flex flex-col sm:flex-row ">
            <button
              onClick={() => {
                setStatus("Pending");
                setShowNewOrders(true);
                setShowPreparingOrders(false);
                setShowReadyOrders(false);
                setShowOrderDetails(false);
              }}
              className="new-orders active sm:px-10 px-5 py-3 rounded-lg sm:me-4 me-0 mb-4 sm:mb-0 sm:text-lg text-sm"
            >
              New Orders
            </button>
            <button
              onClick={() => {
                setStatus("Preparing");
                setShowNewOrders(false);
                setShowPreparingOrders(true);
                setShowReadyOrders(false);
                setShowOrderDetails(false);
              }}
              droppable="true"
              onDragOver={(e) => {
                draggingOver(e);
              }}
              onDrop={(e) => {
                dragDroppedPreparing(e);
              }}
              className="preparing sm:px-10 px-5 py-3 rounded-lg sm:me-4 me-0 mb-4 sm:mb-0 sm:text-lg text-sm"
            >
              Preparing
            </button>
            <button
              onClick={() => {
                setStatus("Ready to deliver");
                setShowNewOrders(false);
                setShowPreparingOrders(false);
                setShowReadyOrders(true);
                setShowOrderDetails(false);
              }}
              droppable="true"
              onDragOver={(e) => {
                draggingOver(e);
              }}
              onDrop={(e) => {
                dragDroppedReady(e);
              }}
              className="ready-to-deliver sm:px-10 px-5 py-3 rounded-lg sm:me-4 me-0 mb-4 sm:mb-0 sm:text-lg text-sm"
            >
              Ready to deliver
            </button>
          </div>
          <div className="h-[68vh] bg-[#081A2C] mt-4 mx-3 md:rounded-md hover:border-[black] overflow-y-scroll">
            {showOrderDetails && selectedOrderDetails ? (
              <OrdersDetails
                setShowOrderDetails={setShowOrderDetails}
                setSelectedOrderDetails={setSelectedOrderDetails}
                selectedOrderDetails={selectedOrderDetails}
                reload={reload}
                setReload={setReload}
              />
            ) : (
              <>
                <div className="hidden lg:flex justify-between p-5 text-[#818589] text-start sticky top-0 bg-[#081A2C]">
                  <p className="lg:w-[8.3%]"></p>
                  <p className="lg:w-[25%] xl:w-[20%] text-[#7E89A8] text-center">
                    Order Id
                  </p>
                  <p className="lg:w-[25%] xl:w-[20%] text-[#7E89A8] text-center">
                    Date/Time
                  </p>
                  <p className="lg:w-[10%] xl:w-[20%] text-[#7E89A8] text-center">
                    Quantity
                  </p>
                  <p className="lg:w-[30%] xl:w-[31%] text-[#7E89A8] text-center">
                    Order Status
                  </p>
                </div>
                <div className="mt-4 pb-3">
                  {orders &&
                    orders.map((order, index) => {
                      if (
                        index >= footerStates.startingIndex - 1 &&
                        index < footerStates.endIndex
                      ) {
                        return (
                          <AllOrdersInfo
                            key={index}
                            index={index}
                            setOrderId={setOrderId}
                            orderData={order}
                            setCurrentOrderStatus={setCurrentOrderStatus}
                            setShowOrderDetails={setShowOrderDetails}
                            setSelectedOrderDetails={setSelectedOrderDetails}
                          />
                        );
                      }
                    })}
                </div>
              </>
            )}
          </div>
          <FooterForPagination
            setFooterStates={setFooterStates}
            footerStates={footerStates}
            showOrderDetails={showOrderDetails}
            totalItems={totalItems}
          />
        </div>
      </div>
    );
  }
};

export default AllOrders;
