import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../../component/Sidebar/Sidebar";
import Navbar from "../../component/Navbar/Navbar";
import { GlobalContext } from "../../context/GlobalContext";
import UsersList from "../../component/UserList/UserList/UsersList";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { urls } from "../../config/urls";
import Loading from "../../component/Loading/Loading";
import { allBackendUsers, getAdminData } from "../../helperFunctions/apiCalls";

export const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const { adminDetails, setAdminDetails } = useContext(GlobalContext);
  const [showSideBar, setShowSideBar] = useState(false);

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

  const getAllUsers = async () => {
    const response = await allBackendUsers(urls.getAllUsers);
    if (response.success) {
      setTotalItems(response.data.length);
      setUsers(response.data);
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
    getAllUsers();
  }, [newUser, reloadData]);

  if (!users) {
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
        {users && (
          <UsersList
            adminDetails={adminDetails}
            users={users}
            newUser={newUser}
            setNewUser={setNewUser}
            reloadData={reloadData}
            setReloadData={setReloadData}
            totalItems={totalItems}
          />
        )}
      </div>
    );
  }
};
