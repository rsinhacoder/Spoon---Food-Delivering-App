import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../component/Sidebar/Sidebar";
import Navbar from "../../component/Navbar/Navbar";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AdminInfo from "../../component/AdminProfile/AdminInfo/AdminInfo";
import Loading from "../../component/Loading/Loading";
import { getAdminData } from "../../helperFunctions/apiCalls";
import "../../App.scss";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { adminDetails, setAdminDetails, setSelectedSidebarOption } =
    useContext(GlobalContext);
  const [showSideBar, setShowSideBar] = useState(false);
  const [reload, setReload] = useState(true);

  const adminData = async () => {
    const response = await getAdminData(Cookies.get("token"));
    if (response.success) {
      setAdminDetails(response.data);
      return;
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      adminData();
      setSelectedSidebarOption("dashboard");
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    adminData();
  }, [reload]);

  if (!adminDetails) {
    return <Loading />;
  }

  if (adminDetails) {
    return (
      <div>
        <Navbar
          setShowSideBar={setShowSideBar}
          showSideBar={showSideBar}
          adminDetails={adminDetails}
        />
        <Sidebar showSideBar={showSideBar} />
        {adminDetails && (
          <AdminInfo
            adminDetails={adminDetails}
            reload={reload}
            setReload={setReload}
          />
        )}
      </div>
    );
  }
};

export default AdminDashboard;
