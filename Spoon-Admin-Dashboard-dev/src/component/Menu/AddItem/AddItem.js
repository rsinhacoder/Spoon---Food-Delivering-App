import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import defaultFoodImage from "../../../assets/images/defultFoodImage.png";
import { addItem } from "../../../helperFunctions/apiCalls";
import {
  customErrorMessage,
  customSuccessMessage,
} from "../../../helperFunctions/sweetAlert";

const AddItem = ({ setAddItem, selectCategory, reload, setReload }) => {
  const [imageData, setImageData] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [itemImageName, setItemImageName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemLimit, setItemLimit] = useState("");

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

  const handleAddItem = async () => {
    if (
      itemName.trim() === "" &&
      itemPrice.trim() === "" &&
      itemDescription.trim() === "" &&
      itemLimit.trim() === "" &&
      itemImageName.trim() === ""
    ) {
      setAddItem(false);
      return;
    }
    if (itemName.trim() === "") {
      customErrorMessage("Invalid item name");
      return;
    }
    if (itemPrice.trim() === "" || isNaN(itemPrice.trim())) {
      customErrorMessage("Invalid Price");
      return;
    }
    if (itemDescription.trim() === "") {
      customErrorMessage("Invalid Description");
      return;
    }
    if (itemLimit.trim() === "" || isNaN(itemLimit.trim())) {
      customErrorMessage("Invalid Limit");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("category", selectCategory);
      formData.append("imageName", itemImageName);
      formData.append("itemImage", itemImage);
      formData.append("itemName", itemName);
      formData.append("price", itemPrice);
      formData.append("description", itemDescription);
      formData.append("limit", itemLimit);
      const response = await addItem(formData);
      if (response.success) {
        customSuccessMessage(response.message);
        setAddItem(false);
        setReload(!reload);
      } else {
        customErrorMessage(response.message);
      }
    } catch {
      setAddItem(false);
      customErrorMessage("Sorry, cannot add this item.");
      return;
    }
  };

  return (
    <div className="fixed w-[100vw] h-[100vh] top-0 bg-[#000000a4] opacity-8 left-0 flex justify-center items-center z-[500]">
      <div className="mx-4 bg-white py-2 px-8 md:py-8 md:px-9 rounded relative text-black">
        <CancelIcon
          className="text-red-700 absolute top-[3%] md:top-[6%] left-[88%] cursor-pointer"
          onClick={() => {
            setAddItem(false);
          }}
        />
        <p className="text-[#081A2C] text-2xl font-medium py-2 mb-4">
          Add New Item
        </p>
        <div className="md:flex justify-between items-center border-2 border-dashed border-[#C0CAD4] rounded-lg py-5 px-3">
          <div className="flex items-center mb-5 md:mb-0">
            <img
              src={imageData ? imageData : defaultFoodImage}
              alt="default-food"
              className="w-[6rem] h-[6rem] rounded-full"
            />
            <div className="ms-4">
              <p className="text-[#91969C]">Allowed file types:</p>
              <p className="text-[#092C4C]">png, jpg, jpeg</p>
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
        <div className="flex flex-col my-4 relative">
          <label className="text-[#5A7DA0]">Item Name</label>
          <input
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
            }}
            className="border border-[#BECBD8] p-1 mt-1 md:mt-2 rounded font-semibold"
          />
          <p className="absolute bottom-[-15px] text-xs text-red-700">
            {itemName.trim() === "" ? "Invalid item name." : ""}
          </p>
        </div>
        <div className="flex flex-col my-4 relative">
          <label className="text-[#5A7DA0]">Item Price</label>
          <input
            value={itemPrice}
            onChange={(e) => {
              setItemPrice(e.target.value);
            }}
            className="border border-[#BECBD8] p-1 mt-1 md:mt-2 rounded font-semibold"
          />
          <p className="absolute bottom-[-15px] text-xs text-red-700">
            {itemPrice.trim() === "" ? "Invalid Price." : ""}
          </p>
        </div>
        <div className="flex flex-col my-4 relative">
          <label className="text-[#5A7DA0]">Item Description</label>
          <textarea
            value={itemDescription}
            onChange={(e) => {
              setItemDescription(e.target.value);
            }}
            className="border border-[#BECBD8] p-1 mt-1 md:mt-2 rounded resize-none"
            rows="5"
            cols="10"
          />
          <p className="absolute bottom-[-15px] text-xs text-red-700">
            {itemDescription.trim() === "" ? "Invalid Description." : ""}
          </p>
        </div>
        <div className="flex flex-col my-4 relative">
          <label className="text-[#5A7DA0]">Item Limit</label>
          <input
            value={itemLimit}
            onChange={(e) => {
              setItemLimit(e.target.value);
            }}
            className="border border-[#BECBD8] p-1 mt-1 md:mt-2 rounded font-semibold"
          />
          <p className="absolute bottom-[-15px] text-xs text-red-700">
            {itemLimit.trim() === "" ? "Invalid Limit." : ""}
          </p>
        </div>
        <div>
          <button
            onClick={(e) => {
              handleAddItem();
            }}
            className="px-5 py-2 bg-gradient-to-r from-[#f24f22] to-[#FF0661] rounded mb-2 md:mb-4 w-[80vw] sm:w-[300px] md:w-[400px] text-white font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddItem;
