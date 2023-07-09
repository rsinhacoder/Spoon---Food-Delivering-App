import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [adminDetails, setAdminDetails] = useState({});
  const [selectedSidebarOption, setSelectedSidebarOption] = useState("");
  const [editDeletePopup, setEditDeletePopup] = useState(false);
  const [restaurantStatus, setRestaurantStatus] = useState(null);
  const [currentOrderStatus, setCurrentOrderStatus] = useState("");
  const valueObj = {
    adminDetails,
    setAdminDetails,
    selectedSidebarOption,
    setSelectedSidebarOption,
    editDeletePopup,
    setEditDeletePopup,
    restaurantStatus,
    setRestaurantStatus,
    currentOrderStatus,
    setCurrentOrderStatus,
  };
  return (
    <GlobalContext.Provider value={valueObj}>{children}</GlobalContext.Provider>
  );
};
