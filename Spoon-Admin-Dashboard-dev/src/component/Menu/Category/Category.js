import React, { useContext, useState, useEffect } from "react";
import chocopie from "../../../assets/images/chocopie.svg";
import star from "../../../assets/images/star.svg";
import EditCategory from "../EditCategory/EditCategory.js";
import DeleteCategory from "../DeleteCategory/DeleteCategory.js";
import { GlobalContext } from "../../../context/GlobalContext";
import EditDeletePopup from "../EditDeletePopup/EditDeletePopup";
import { urls } from "../../../config/urls";
import {
  categoryAvailibility,
  togglePopularity,
} from "../../../helperFunctions/apiCalls";
import Swal from "sweetalert2";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { sendSocketData } from "../../../helperFunctions/socketCall";

const Category = ({
  data,
  setSelectCategory,
  reload,
  setReload,
  showMenuEditor,
}) => {
  const [popup, setPopup] = useState(false);
  const [availibility, setAvailibility] = useState(data && data.availability);
  const { editDeletePopup, setEditDeletePopup, restaurantStatus } =
    useContext(GlobalContext);
  const [updateCategory, setUpdateCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const parameterCheck = false;
  const [popularity, setPopularity] = useState(data && data.popularity);
  const [initialRender, setInitialRender] = useState(0);

  function animateToggle(e) {
    if (restaurantStatus) {
      e.currentTarget.firstElementChild.classList.toggle("active");
      setAvailibility(!availibility);
    }
  }

  const setCategoryAvailibilityStatus = async () => {
    if (initialRender >= 1) {
      const response = await categoryAvailibility(
        `${urls.setCategoryAvailibility}/${data._id}/${availibility}`
      );
      if (response.success) {
        sendSocketData("changeAvailability", {
          category: true,
          availability: response.data.availability,
          type: response.data.categoryName,
        });
        setReload(!reload);
        Swal.fire({
          title: "Processing...",
          timer: 1500,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }
    } else {
      setInitialRender(initialRender + 1);
    }
  };
  const handleSetPopularity = async () => {
    try {
      await togglePopularity(
        `${urls.setPopularityStatus}/${data._id}/${popularity}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCategoryAvailibilityStatus();
  }, [availibility]);

  useEffect(() => {
    handleSetPopularity();
    setReload(!reload);
  }, [popularity]);

  return (
    <div className="fade-in-effect relative bg-[#0F2439] flex flex-col mx-2 items-center py-5 rounded-lg mb-4">
      {showMenuEditor && (
        <MoreVertIcon
          className="text-white absolute top-1 end-0 cursor-pointer"
          onClick={() => {
            if (!editDeletePopup || !parameterCheck) {
              setPopup(true);
              setEditDeletePopup(true);
            }
          }}
        />
      )}
      {popup ? (
        <EditDeletePopup
          parameterCheck={parameterCheck}
          setUpdateCategory={setUpdateCategory}
          setDeleteCategory={setDeleteCategory}
          setPopup={setPopup}
          data={data}
          reload={reload}
          setReload={setReload}
        />
      ) : (
        ""
      )}
      {updateCategory ? (
        <EditCategory
          setUpdateCategory={setUpdateCategory}
          setPopup={setPopup}
          data={data}
          reload={reload}
          setReload={setReload}
        />
      ) : (
        ""
      )}
      {deleteCategory ? (
        <DeleteCategory
          setDeleteCategory={setDeleteCategory}
          setPopup={setPopup}
          data={data}
          reload={reload}
          setReload={setReload}
        />
      ) : (
        ""
      )}
      <p
        className="text-[#ADBCE9] text-xl py-2 cursor-pointer"
        onClick={() => {
          if (data.availability) {
            setSelectCategory(data.categoryName);
          }
        }}
      >
        {data.categoryName}
      </p>
      <div
        className="flex pb-2 cursor-pointer"
        onClick={() => {
          setPopularity(!popularity);
          Swal.fire({
            position: "center",
            width: 500,
            padding: "4em",
            title: "Updating category popularity...",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500,
          });
        }}
      >
        {popularity && <img src={star} alt="star" className="me-1" />}
        <p
          className={`text-[rgba(173,188,233,0.41)] text-sm ${
            popularity && "text-white"
          }`}
        >
          Popular
        </p>
      </div>
      {data.availability ? (
        <img
          src={data.imageURL ? `${data.imageURL}` : chocopie}
          alt="food"
          className="rounded-full w-[7rem] h-[7rem] cursor-pointer"
          onClick={() => {
            if (data.availability) {
              setSelectCategory(data.categoryName);
            }
          }}
        />
      ) : (
        <img
          src={data.imageURL ? `${data.imageURL}` : chocopie}
          alt="food"
          className="rounded-full w-[7rem] h-[7rem] cursor-pointer grayscale"
          onClick={() => {
            if (data.availability) {
              setSelectCategory(data.categoryName);
            }
          }}
        />
      )}
      {showMenuEditor ? (
        ""
      ) : (
        <div className="flex flex-col items-center">
          <p className="my-1 text-xs available">
            {data.availability ? "Available" : "Unavailable"}
          </p>
          <div className="flex p-1 mb-5">
            <div className="container cursor-pointer" onClick={animateToggle}>
              <div className={`food-toggle ${data?.availability && "active"}`}>
                <div className="food-toggle-button"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
