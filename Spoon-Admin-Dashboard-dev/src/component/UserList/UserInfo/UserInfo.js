import React, { useState, useContext, useEffect } from "react";
import emailIcon from "../../../assets/images/emaiIcon.svg";
import phoneIcon from "../../../assets/images/phoneIcon.svg";
import menuIcon from "../../../assets/images/menuIcon.svg";
import EditDeleteUser from "../../NewUser/EditDeleteUser/EditDeleteUser";
import EditUser from "../../NewUser/EditUser/EditUser";
import DeleteUser from "../../NewUser/DeleteUser/DeleteUser";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "../UserList/UserList.scss";
import { GlobalContext } from "../../../context/GlobalContext";

const UserInfo = ({ userDetails, setReloadData, reloadData, adminDetails }) => {
  const [editDeleteIcon, setEditDeleteIcon] = useState(false);
  const [editUserDetail, setEditUserDetail] = useState(false);
  const [deleteUserDetail, setDeleteUserDetail] = useState(false);
  const { editDeletePopup, setEditDeletePopup } = useContext(GlobalContext);
  const parameterCheck = false;

  useEffect(() => {
    setEditDeletePopup(false);
  }, []);

  return (
    <div className="mb-5 md:mb-2">
      <div className="bg-[#0F2439] flex md:flex-row flex-col gap-4 md:gap-0 justify-evenly pt-10 pb-2 px-2 md:p-2 lg:p-4 mx-2 lg:mx-4 rounded-lg mt-2 relative z-1">
        <div className="flex flex-row-reverse md:flex-row w-full md:w-[30%] justify-between">
          <PersonOutlineIcon className="text-[#818589] icon-hide" />
          <p>{userDetails.userName ? userDetails.userName : "NA"}</p>
        </div>
        <div className="flex flex-row-reverse md:flex-row md:gap-2 lg:gap-3 w-full md:w-[35%] justify-between md:justify-start">
          <img
            src={emailIcon}
            alt="email-icons"
            className="h-[15px] ms-1 mt-[6px]"
          />
          <p>{userDetails.email ? userDetails.email : "NA"}</p>
        </div>
        <div className="flex flex-row-reverse md:flex-row gap-3 w-full md:w-[40%] justify-between md:justify-start">
          <img
            src={phoneIcon}
            alt="phone-icons"
            className="h-[15px] mt-[6px] ps-1"
          />
          <p>{userDetails.phoneNumber ? userDetails.phoneNumber : "NA"}</p>
        </div>
        <img
          src={menuIcon}
          alt="menu-icons"
          className="w-[20px] cursor-pointer absolute right-3 top-3 md:static"
          onClick={() => {
            if (!editDeletePopup || !parameterCheck) {
              setEditDeleteIcon(true);
              setEditDeletePopup(true);
            }
          }}
        />
        {editDeleteIcon ? (
          <EditDeleteUser
            parameterCheck={parameterCheck}
            setEditDeleteIcon={setEditDeleteIcon}
            setEditUserDetail={setEditUserDetail}
            setDeleteUserDetail={setDeleteUserDetail}
          />
        ) : (
          ""
        )}
        {editUserDetail ? (
          <EditUser
            setEditUserDetail={setEditUserDetail}
            adminDetails={adminDetails}
            userDetails={userDetails}
            id={userDetails._id}
            setReloadData={setReloadData}
            reloadData={reloadData}
          />
        ) : (
          ""
        )}
        {deleteUserDetail ? (
          <DeleteUser
            adminDetails={adminDetails}
            setDeleteUserDetail={setDeleteUserDetail}
            id={userDetails._id}
            setReloadData={setReloadData}
            reloadData={reloadData}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UserInfo;
