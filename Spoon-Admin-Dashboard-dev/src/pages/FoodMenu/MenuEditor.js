import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../component/Sidebar/Sidebar";
import Navbar from "../../component/Navbar/Navbar";
import { GlobalContext } from "../../context/GlobalContext";
import "./MenuEditor.scss";
import CategoryMenu from "../../component/Menu/CategoryMenu/CategoryMenu";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { urls } from "../../config/urls";
import Loading from "../../component/Loading/Loading";
import { getCategories } from "../../helperFunctions/apiCalls";
import { getAdminData } from "../../helperFunctions/apiCalls";

const MenuEditor = () => {
  const { adminDetails, setAdminDetails, restaurantStatus } =
    useContext(GlobalContext);
  const [showSideBar, setShowSideBar] = useState(false);
  const [categories, setCategories] = useState(null);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  const adminData = async () => {
    const response = await getAdminData(Cookies.get("token"));
    if (response.success) {
      setAdminDetails(response.data);
      return;
    } else {
      navigate("/");
    }
  };

  const getAllCategories = async () => {
    const response = await getCategories(urls.getAllCategories);
    if (response.success) {
      setCategories(response.data);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [reload, restaurantStatus]);

  useEffect(() => {
    if (Cookies.get("token")) {
      adminData();
    } else {
      navigate("/");
    }
  }, []);

  if (!adminDetails || !categories) {
    return <Loading />;
  }

  if (adminDetails) {
    return (
      <div className="relative">
        <Navbar
          setShowSideBar={setShowSideBar}
          showSideBar={showSideBar}
          adminDetails={adminDetails}
        />
        <Sidebar showSideBar={showSideBar} />
        <div className="overflow-y-scroll w-full lg:w-[80%] xl:w-[85%] lg:absolute lg:left-[20%] xl:left-[15%] h-[91vh] bg-[#030F1B] text-white">
          <CategoryMenu
            adminDetails={adminDetails}
            categories={categories}
            getAllCategories={getAllCategories}
            reload={reload}
            setReload={setReload}
          />
        </div>
      </div>
    );
  }
};

export default MenuEditor;
