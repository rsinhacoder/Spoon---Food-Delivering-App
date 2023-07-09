import React, { useRef } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { addUser } from "../../../helperFunctions/apiCalls";
import {
  customErrorMessage,
  customSuccessMessage,
  customWarningMessage,
} from "../../../helperFunctions/sweetAlert";
import { regex } from "../../../helperFunctions/regex";

const AddNewUser = ({ setNewUser, adminDetails }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const mailFormat = regex.mailFormat;

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (
      nameRef.current.value.trim() === "" ||
      nameRef.current.value.trim() === null
    ) {
      customWarningMessage("Name cannot be empty !");
      return;
    }
    if (
      emailRef.current.value.trim() === "" ||
      emailRef.current.value.trim() === null
    ) {
      customWarningMessage("Email cannot be empty !");
      return;
    }
    if (!emailRef.current.value.match(mailFormat)) {
      customWarningMessage("Invalid Email address !");
      return;
    }

    const response = await addUser(
      adminDetails._id,
      emailRef.current.value,
      nameRef.current.value
    );
    if (response.success) {
      customSuccessMessage(response.message);
      setNewUser(false);
    }
    if (!response.success) {
      customErrorMessage(response.message);
      setNewUser(false);
    }
  };

  return (
    <div className="fade-in-effect fixed w-[100vw] h-[100vh] top-0 left-0 bg-[#000000a4] opacity-8 flex justify-center items-center z-[200]">
      <form className="bg-white py-2 px-8 md:py-8 md:px-9 rounded relative text-black">
        <CancelIcon
          className="text-red-700 absolute top-[2%] left-[90%] cursor-pointer"
          onClick={() => {
            setNewUser(false);
          }}
        />
        <p className="text-[#081A2C] text-xl font-medium py-2">Add New User</p>
        <div className="flex flex-col my-2 md:my-4">
          <label className="text-[#5A7DA0]">Full Name</label>
          <input
            type="text"
            className="border border-[#BECBD8] p-1 mt-1 md:mt-2 rounded font-semibold"
            ref={nameRef}
          />
        </div>
        <div className="flex flex-col mb-2 md:mb-4">
          <label className="text-[#5A7DA0]">Email</label>
          <input
            type="email"
            required={true}
            className="border border-[#BECBD8] p-1 mt-1 md:mt-2 rounded font-semibold"
            ref={emailRef}
          />
        </div>
        <button
          type="submit"
          onClick={handleAddUser}
          className="px-5 py-2 bg-gradient-to-r from-[#F26522] to-[#FF0661] rounded mb-2 md:mb-4 w-[70vw] sm:w-[300px] md:w-[400px] text-white font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewUser;
