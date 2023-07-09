import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import Navbar from "../../../component/Navbar/Navbar";
import Sidebar from "../../../component/Sidebar/Sidebar";
import { urls } from "../../../config/urls";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import OrderHistoryInfo from "../OrderHistoryInfo/OrderHistoryInfo";
import OrdersDetails from "../../../component/Order/OrderDetails/OrdersDetails";
import Loading from "../../../component/Loading/Loading";
import { getAdminData, orderHistory } from "../../../helperFunctions/apiCalls";
import { FooterForPagination } from "../../../component/Footer/FooterForPagination";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { adminDetails, setAdminDetails } = useContext(GlobalContext);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState("");
  const [reload, setReload] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const [footerStates, setFooterStates] = useState({
    startingIndex: 1,
    endIndex: 6,
    pageCounter: 1,
    selectedRange: 6,
  });

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

  const getAllOrders = async () => {
    const response = await orderHistory(`${urls.getAllOrderHistory}`);
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

  useEffect(() => {
    getAllOrders();
  }, [reload]);

  useEffect(() => {
    if (Cookies.get("token")) {
      adminData();
    } else {
      navigate("/");
    }
  }, []);

  orders.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

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
          <p
            className="text-lg mt-5 ms-5 cursor-pointer"
            onClick={() => {
              setShowOrderDetails(false);
            }}
          >
            Order History
          </p>
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
                <div className="hidden lg:flex p-5 text-[#818589] text-start bg-[#081A2C] sticky top-0">
                  <p className="lg:w-[8.5%]"></p>
                  <p className="lg:w-[18%] text-[#7E89A8] text-center">
                    Order Id
                  </p>
                  <p className="lg:w-[22%] text-[#7E89A8] text-center">
                    Date/Time
                  </p>
                  <p className="lg:w-[22%] xl:w-[25%] text-[#7E89A8] text-center">
                    Order Complete Date/Time
                  </p>
                  <p className="lg:w-[10%] text-[#7E89A8] text-center">
                    Quantity
                  </p>
                  <p className="lg:w-[15%] text-[#7E89A8] text-center">
                    Order Status
                  </p>
                </div>
                <div>
                  {orders &&
                    orders.map((order, index) => {
                      if (
                        index >= footerStates.startingIndex - 1 &&
                        index < footerStates.endIndex
                      ) {
                        return (
                          <OrderHistoryInfo
                            orderData={order}
                            index={index}
                            key={index}
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

export default OrderHistory;
