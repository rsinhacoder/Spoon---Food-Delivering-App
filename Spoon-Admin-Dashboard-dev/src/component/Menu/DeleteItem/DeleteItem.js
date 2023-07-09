import React from "react";
import { urls } from "../../../config/urls";
import { deleteItem } from "../../../helperFunctions/apiCalls";
import {
  customErrorMessage,
  customSuccessMessage,
} from "../../../helperFunctions/sweetAlert";

const DeleteItem = ({ setDeltetePopUp, id, reload, setReload }) => {
  const handleDeleteItem = async () => {
    const response = await deleteItem(`${urls.deleteFoodItem}/${id}`);
    if (response.error) {
      customErrorMessage(response.error.message);
    } else {
      customSuccessMessage(response.message);
      setDeltetePopUp(false);
      setReload(!reload);
    }
  };
  return (
    <div className="fade-in-effect fixed w-[100vw] h-[100vh] top-0 bg-[#000000a4] opacity-8 left-0 flex justify-center items-center z-50">
      <div className="bg-white text-black py-9 px-10 rounded text-center">
        <p className="text-xl font-medium text-[#081A2C] my-3">Are you sure?</p>
        <p className="mb-3 text-[#8893B7]">
          You are about to delete a category
        </p>
        <div className="flex justify-around">
          <button
            className="px-5 py-2 hover:bg-gradient-to-r from-[#F26522] to-[#FF0661] border border-[#B6BFC9] hover:text-white text-[#081A2C] rounded"
            onClick={() => {
              setDeltetePopUp(false);
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteItem}
            className="px-5 py-2 hover:bg-gradient-to-r from-[#F26522] to-[#FF0661] border border-[#B6BFC9] hover:text-white text-[#081A2C] rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItem;
