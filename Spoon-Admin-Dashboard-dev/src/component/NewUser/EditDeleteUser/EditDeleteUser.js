import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../../context/GlobalContext";

const EditDeleteUser = ({
  setEditDeleteIcon,
  setDeleteUserDetail,
  setEditUserDetail,
  parameterCheck,
}) => {
  const initialRender = useRef();
  const editDeleteRef = useRef();
  const { editDeletePopup, setEditDeletePopup } = useContext(GlobalContext);

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
          setEditDeleteIcon(false);
        } else {
          initialRender.current = true;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className="absolute bg-[#1a2d41] right-[1%] z-[200] top-8 px-5 py-1 rounded"
      ref={editDeleteRef}
    >
      <p
        className="cursor-pointer hover:text-red-300"
        onClick={() => {
          if (editDeletePopup) {
            setEditDeleteIcon(false);
            setEditUserDetail(true);
            setEditDeletePopup(false);
          }
        }}
      >
        Edit
      </p>
      <p
        className="cursor-pointer hover:text-red-300"
        onClick={() => {
          if (editDeletePopup) {
            setEditDeleteIcon(false);
            setDeleteUserDetail(true);
            setEditDeletePopup(false);
          }
        }}
      >
        Delete
      </p>
    </div>
  );
};

export default EditDeleteUser;
