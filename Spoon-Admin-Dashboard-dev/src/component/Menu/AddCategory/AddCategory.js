import React, { useRef, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import defaultFoodImage from "../../../assets/images/defultFoodImage.png";
import { addCategory } from "../../../helperFunctions/apiCalls";
import {
  customErrorMessage,
  customSuccessMessage,
} from "../../../helperFunctions/sweetAlert";

const AddCategory = ({ setAddCategory, reload, setReload }) => {
  const [imageData, setImageData] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryImageName, setCategoryImageName] = useState("");
  const categoryNameRef = useRef("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCategoryImage = (e) => {
    try {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImageData(reader.result);
      };
      setCategoryImageName(e.target.files[0].name);
      setCategoryImage(e.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCategory = async (e) => {
    if (
      categoryNameRef.current.value.trim() === "" ||
      categoryNameRef.current.value.trim() === null
    ) {
      setErrorMsg("Invalid category name!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("categoryName", categoryNameRef.current.value);
      formData.append("imageName", categoryImageName);
      formData.append("categoryImage", categoryImage);
      const response = await addCategory(formData);
      if (response.success) {
        customSuccessMessage(response.message);
        setAddCategory(false);
        setReload(!reload);
      } else {
        customErrorMessage(response.message);
        setAddCategory(false);
      }
    } catch {
      setAddCategory(false);
      customErrorMessage("Sorry, cannot add this category.");
    }
  };

  return (
    <div className="fade-in-effect fixed w-[100vw] h-[100vh] top-0 bg-[#000000a4] opacity-8 left-0 flex justify-center items-center z-[200]">
      <div className="bg-white py-2 px-8 md:py-8 md:px-9 rounded relative text-black">
        <CancelIcon
          className="text-red-700 absolute top-[6%] md:top-[10%] left-[90%] cursor-pointer"
          onClick={() => {
            setAddCategory(false);
          }}
        />
        <p className="text-[#081A2C] text-2xl font-medium py-2 mb-4">
          Add New Category
        </p>
        <div className="md:flex justify-between items-center border-2 border-dashed border-[#C0CAD4] rounded-lg py-5 px-3">
          <div className="flex items-center mb-5 md:mb-0">
            <img
              src={
                imageData === "" || imageData === null
                  ? defaultFoodImage
                  : imageData
              }
              alt="browserIcon"
              className="w-[4rem] h-[4rem] rounded-full"
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
            onChange={handleCategoryImage}
          />
        </div>
        <div className="flex flex-col mb-8 mt-4">
          <label className="text-[#5A7DA0]">Category Name</label>
          <input
            className="border border-[#BECBD8] p-1 mt-1 md:mt-2 rounded text-[#081A2C] font-semibold"
            ref={categoryNameRef}
          />
          <div className="relative">
            <p className="text-red-500 absolute p-1">{errorMsg}</p>
          </div>
        </div>
        <div>
          <button
            onClick={(e) => {
              handleAddCategory();
            }}
            className="px-5 py-2 bg-gradient-to-r from-[#f24f22] to-[#FF0661] rounded mb-2 md:mb-4 w-[70vw] sm:w-[300px] md:w-[400px] text-white font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
