import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import defaultFoodImage from "../../../assets/images/defultFoodImage.png";
import { urls } from "../../../config/urls";
import { editCategory } from "../../../helperFunctions/apiCalls";
import {
  customErrorMessage,
  customSuccessMessage,
} from "../../../helperFunctions/sweetAlert";

const EditCategory = ({
  setUpdateCategory,
  setPopup,
  data,
  reload,
  setReload,
}) => {
  const [imageData, setImageData] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryImageName, setCategoryImageName] = useState("");
  const [categoryName, setCategoryName] = useState(
    data.categoryName ? data.categoryName : ""
  );

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

  const handleEditCategory = async () => {
    if (data.categoryName === categoryName && categoryImageName === "") {
      setUpdateCategory(false);
      setPopup(false);
      return;
    }
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("imageName", categoryImageName);
    formData.append("categoryImage", categoryImage);
    const response = await editCategory(
      `${urls.editCategory}/${data._id}`,
      formData
    );
    if (response.success) {
      customSuccessMessage(response.message);
      setUpdateCategory(false);
      setPopup(false);
      setReload(!reload);
    } else {
      customErrorMessage(response.message);
      setUpdateCategory(false);
      setPopup(false);
      setReload(!reload);
    }
  };

  return (
    <div className="fade-in-effect fixed w-[100vw] h-[100vh] top-0 bg-[#000000a4] opacity-8 left-0 flex justify-center items-center z-[200]">
      <div className="bg-white py-2 px-8 md:py-8 md:px-9 rounded relative text-black">
        <CancelIcon
          className="text-red-700 absolute top-[6%] md:top-[10%] left-[90%] cursor-pointer"
          onClick={() => {
            setUpdateCategory(false);
            setPopup(false);
          }}
        />
        <p className="text-[#081A2C] text-2xl font-medium py-2 mb-4">
          Update Category
        </p>
        <div className="md:flex justify-between items-center border border-dashed border-[#C0CAD4] rounded-lg py-5 px-3">
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
        <div className="flex flex-col mb-4 mt-4">
          <label className="text-[#5A7DA0]">Category Name</label>
          <input
            className="border border-[#BECBD8] p-1 mt-1 md:mt-2 rounded text-[#081A2C] font-semibold"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            onClick={handleEditCategory}
            className="px-5 py-2 bg-gradient-to-r from-[#f24f22] to-[#FF0661] rounded mb-2 md:mb-4 w-[70vw] sm:w-[300px] md:w-[400px] text-white font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
