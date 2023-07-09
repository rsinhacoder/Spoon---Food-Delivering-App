import React from "react";
import { urls } from "../../../config/urls";
import { deleteCategory } from "../../../helperFunctions/apiCalls";
import { customSuccessMessage } from "../../../helperFunctions/sweetAlert";

const DeleteCategory = ({
  setDeleteCategory,
  setPopup,
  data,
  reload,
  setReload,
}) => {
  const handleDeleteCategory = async () => {
    const response = await deleteCategory(`${urls.deleteCategory}/${data._id}`);
    if (response.error) {
      console.log(response.error.message);
    } else {
      customSuccessMessage(response.message);
      setDeleteCategory(false);
      setPopup(false);
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
            className="px-5 py-2 hover:bg-gradient-to-r from-[#F26522] to-[#FF0661] border border-[#B6BFC9] rounded hover:text-white"
            onClick={() => {
              setDeleteCategory(false);
              setPopup(false);
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteCategory}
            className="px-5 py-2 hover:bg-gradient-to-r from-[#F26522] to-[#FF0661] border border-[#B6BFC9] rounded hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategory;
