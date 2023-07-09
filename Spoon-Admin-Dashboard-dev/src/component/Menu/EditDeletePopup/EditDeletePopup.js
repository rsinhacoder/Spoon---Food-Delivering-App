import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../../context/GlobalContext.js";

const EditDeletePopup = ({
  setPopup,
  setUpdateCategory,
  setDeleteCategory,
  parameterCheck,
}) => {
  const { editDeletePopup, setEditDeletePopup } = useContext(GlobalContext);
  const initialRender = useRef();
  const editDeleteRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleOutsideComponentClick);
  }, []);

  const handleOutsideComponentClick = (e) => {
    if (editDeleteRef.current !== null) {
      try {
        if (editDeletePopup && !parameterCheck) {
          setEditDeletePopup(true);
        }
        if (
          !editDeleteRef.current.contains(e.target) &&
          initialRender.current
        ) {
          setEditDeletePopup(false);
          setPopup(false);
        } else {
          initialRender.current = true;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div
        className="bg-[#030F1B] flex flex-col absolute end-2 top-8 z-20 p-1 rounded-md"
        ref={editDeleteRef}
      >
        <i
          className="fa-solid fa-pen-nib p-2 cursor-pointer"
          onClick={() => {
            if (editDeletePopup) {
              setUpdateCategory(true);
              setEditDeletePopup(false);
            }
          }}
        ></i>
        <i
          className="fas fa-regular fa-trash p-2 cursor-pointer"
          onClick={() => {
            if (editDeletePopup) {
              setDeleteCategory(true);
              setEditDeletePopup(false);
            }
          }}
        ></i>
      </div>
    </div>
  );
};

export default EditDeletePopup;
