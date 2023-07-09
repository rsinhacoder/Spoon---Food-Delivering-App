import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import defaultFoodImage from "../../../assets/images/defultFoodImage.png";
import { urls } from "../../../config/urls";
import { editItem } from "../../../helperFunctions/apiCalls";
import {
  customErrorMessage,
  customSuccessMessage,
} from "../../../helperFunctions/sweetAlert";

const EditItem = ({ editPopUp, setEditPopUp, data, reload, setReload }) => {
  const [imageData, setImageData] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [itemImageName, setItemImageName] = useState("");
  const [itemName, setitemName] = useState(data.item.itemName);
  const [itemPrice, setitemPrice] = useState(data.item.price);
  const [itemDescription, setitemDescription] = useState(data.item.description);
  const [itemLimit, setitemLimit] = useState(data.item.limit);

  const handleItemImage = (e) => {
    try {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImageData(reader.result);
      };
      setItemImageName(e.target.files[0].name);
      setItemImage(e.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditItem = async () => {
    if (
      data.item.itemName === itemName &&
      data.item.price === itemPrice &&
      data.item.description === itemDescription &&
      data.item.limit === itemLimit &&
      itemImageName === ""
    ) {
      setEditPopUp(!editPopUp);
      return;
    }
    if (isNaN(itemPrice)) {
      customErrorMessage("Price should be a number");
      return;
    }
    if (isNaN(itemLimit)) {
      customErrorMessage("Limit should be a number");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("category", data.item.category);
      formData.append("imageName", itemImageName);
      formData.append("itemImage", itemImage);
      formData.append("itemName", itemName);
      formData.append("price", itemPrice);
      formData.append("description", itemDescription);
      formData.append("limit", itemLimit);
      const response = await editItem(
        `${urls.editFoodItem}/${data._id}`,
        formData
      );
      if (response.success) {
        customSuccessMessage(response.message);
        setEditPopUp(!editPopUp);
        setReload(!reload);
      } else {
        customErrorMessage(response.message);
      }
    } catch {
      customErrorMessage("Sorry, cannot edit this item.");
    }
  };

  return (
    <div className="fade-in-effect fixed w-[100vw] h-[100vh] top-0 bg-[#000000a4] opacity-8 left-0 flex justify-center items-center z-[500]">
      <div className="mx-4 bg-white py-2 px-8 md:py-8 md:px-9 rounded relative text-black">
        <CancelIcon
          className="text-red-700 absolute top-[3%] md:top-[6%] left-[88%] cursor-pointer"
          onClick={() => {
            setEditPopUp(!editPopUp);
          }}
        />
        <p className="text-[#081A2C] text-2xl font-medium py-2 mb-4">
          Update Item Details
        </p>
        <div className="md:flex justify-between items-center border-2 border-dashed border-[#C0CAD4] rounded-lg py-5 px-3">
          <div className="flex items-center mb-5 md:mb-0">
            <img
              src={imageData ? imageData : defaultFoodImage}
              alt="browserIcon"
              className="w-[6rem] h-[6rem] rounded-full"
            />

            <div className="ms-4">
              <p className="text-[#91969C]">Allowed file types:</p>{" "}
              <p className="text-[#092C4C]">png, jpg, jpeg</p>{" "}
            </div>
          </div>
          <label
            htmlFor="files"
            className="text-[#00904B] rounded border border-[#00904B] h-[14%] px-4 py-1 flex items-center justify-center cursor-pointer"
          >
            Browse
          </label>
          <input
            id="files"
            type="file"
            accept=".jpg, .jpeg, .png"
            className="hidden"
            onChange={handleItemImage}
          />
        </div>
        <div className="flex flex-col my-4">
          <label className="text-[#5A7DA0]">Item Name</label>
          <input
            className="border border-[#BECBD8] p-1 mt-1 md:mt-2 rounded font-semibold"
            value={itemName}
            onChange={(e) => {
              setitemName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col my-4">
          <label className="text-[#5A7DA0]">Item Price</label>
          <input
            className="border border-[#BECBD8] p-1 mt-1 md:mt-2 rounded font-semibold"
            value={itemPrice}
            onChange={(e) => {
              setitemPrice(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col my-4">
          <label className="text-[#5A7DA0]">Item Description</label>
          <textarea
            className="border border-[#BECBD8] p-1 mt-1 md:mt-2 rounded resize-none"
            rows="7"
            cols="10"
            value={itemDescription}
            onChange={(e) => {
              setitemDescription(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col my-4">
          <label className="text-[#5A7DA0]">Item Limit</label>
          <input
            className="border border-[#BECBD8] p-1 mt-1 md:mt-2 rounded font-semibold"
            value={itemLimit}
            onChange={(e) => {
              setitemLimit(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            onClick={handleEditItem}
            className="px-5 py-2 bg-gradient-to-r from-[#f24f22] to-[#FF0661] rounded mb-2 md:mb-4 w-[80vw] sm:w-[300px] md:w-[400px] text-white font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditItem;
