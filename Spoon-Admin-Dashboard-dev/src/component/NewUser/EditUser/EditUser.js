import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { editUser } from "../../../helperFunctions/apiCalls";
import { regex } from "../../../helperFunctions/regex";
import {
  customErrorMessage,
  customSuccessMessage,
  customWarningMessage,
} from "../../../helperFunctions/sweetAlert";

const EditUser = ({
  setEditUserDetail,
  reloadData,
  setReloadData,
  id,
  adminDetails,
  userDetails,
}) => {
  const [name, setName] = useState(userDetails && userDetails.userName);
  const [email, setEmail] = useState(userDetails && userDetails.email);
  const mailFormat = regex.mailFormat;

  const handleEditUser = async () => {
    if (name.trim() === "" || name.trim() === null) {
      customWarningMessage("Name cannot be empty !");
      return;
    }
    if (email.trim() === "" || email.trim() === null) {
      customWarningMessage("Email cannot be empty !");
      return;
    }
    if (!email.match(mailFormat)) {
      customErrorMessage("Invalid Email address !");
      return;
    }
    if (userDetails.userName === name && userDetails.email === email) {
      setEditUserDetail(false);
      return;
    }
    const response = await editUser(adminDetails._id, id, email, name);
    if (response.success) {
      customSuccessMessage(response.message);
      setEditUserDetail(false);
      setReloadData(!reloadData);
    }
    if (!response.success) {
      customErrorMessage(response.message);
      setEditUserDetail(false);
    }
  };

  return (
    <div className="fade-in-effect fixed w-[100vw] h-[100vh] top-0 left-0 bg-[#000000a4] opacity-8 flex justify-center items-center z-[200]">
      <div className="bg-white py-2 px-8 md:py-8 md:px-9 rounded relative text-black">
        <CancelIcon
          className="text-red-700 absolute top-[2%] left-[90%] cursor-pointer"
          onClick={() => {
            setEditUserDetail(false);
          }}
        />
        <p className="text-[#081A2C] text-xl font-medium py-2">Edit Profile</p>
        <div className="flex flex-col my-2 md:my-4">
          <label className="text-[#5A7DA0]">Full Name</label>
          <input
            className="border border-[#BECBD8] p-1 mt-1 md:mt-2 rounded font-semibold"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col mb-2 md:mb-4">
          <label className="text-[#5A7DA0]">Email</label>
          <input
            className="border border-[#BECBD8] p-1 mt-1 md:mt-2 rounded font-semibold"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <button
          onClick={handleEditUser}
          className="px-5 py-2 bg-gradient-to-r from-[#F26522] to-[#FF0661] rounded mb-2 md:mb-4 w-[70vw] sm:w-[300px] md:w-[400px] text-white font-medium"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditUser;
