import React from "react";
import { urls } from "../../../config/urls";
import { deleteUser } from "../../../helperFunctions/apiCalls";
import {
  customErrorMessage,
  customSuccessMessage,
} from "../../../helperFunctions/sweetAlert";

const DeleteUser = ({
  adminDetails,
  setDeleteUserDetail,
  id,
  setReloadData,
  reloadData,
}) => {
  const handleDeleteUser = async () => {
    const response = await deleteUser(
      `${urls.deleteUser}/${id}/${adminDetails._id}`
    );
    if (response.error) {
      console.log(response.error.message);
    } else {
      if (response.success) {
        customSuccessMessage(response.message);
        setDeleteUserDetail(false);
        setReloadData(!reloadData);
      }
      if (!response.success) {
        customErrorMessage(response.message);
        setDeleteUserDetail(false);
        setReloadData(!reloadData);
      }
    }
  };
  return (
    <div className="fade-in-effect fixed w-[100vw] h-[100vh] top-0 left-0 bg-[#000000a4] opacity-8 flex justify-center items-center z-50">
      <div className="bg-white text-black py-9 px-10 rounded text-center">
        <p className="text-xl font-medium text-[#081A2C] my-3">Are you sure?</p>
        <p className="mb-3 text-[#8893B7]">You are about to delete a user</p>
        <div className="flex justify-around">
          <button
            className="px-5 py-2 hover:bg-gradient-to-r from-[#F26522] to-[#FF0661] border border-[#B6BFC9] rounded text-[#081A2C] hover:text-white"
            onClick={() => {
              setDeleteUserDetail(false);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDeleteUser();
            }}
            className="px-5 py-2 hover:bg-gradient-to-r from-[#F26522] to-[#FF0661] border border-[#B6BFC9] rounded text-[#081A2C] hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
