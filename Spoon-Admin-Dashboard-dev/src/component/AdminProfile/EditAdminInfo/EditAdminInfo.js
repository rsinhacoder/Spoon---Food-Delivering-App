import React, { useState } from "react";
import "./EditAdminInfo.scss";
import { updateAdminDetails } from "../../../helperFunctions/apiCalls";
import { regex } from "../../../helperFunctions/regex";
import {
  customErrorMessage,
  customSuccessMessage,
} from "../../../helperFunctions/sweetAlert";

const EditAdminInfo = ({
  adminDetails,
  setEditButton,
  setResetPasswordButton,
  setChangedProfilePicture,
  reload,
  setReload,
}) => {
  const mailFormat = regex.mailFormat;
  const phoneNoFormat = regex.phoneNumberFormat;
  const [profileImage, setProfileImage] = useState("");
  const [profileImageName, setProfileImageName] = useState("");
  const [name, setName] = useState(
    adminDetails.userName ? adminDetails.userName : ""
  );
  const [email, setEmail] = useState(
    adminDetails.email ? adminDetails.email : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    adminDetails.phoneNumber ? adminDetails.phoneNumber : ""
  );
  const [address, setAddress] = useState(
    adminDetails.address ? adminDetails.address : ""
  );

  function handleProfileImage(e) {
    try {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setChangedProfilePicture(reader.result);
      };
      setProfileImageName(e.target.files[0].name);
      setProfileImage(e.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAdminEdit = async (e) => {
    e.preventDefault();
    if (
      adminDetails.email === email &&
      adminDetails.phoneNumber === phoneNumber &&
      adminDetails.userName === name &&
      adminDetails.address === address &&
      profileImageName === ""
    ) {
      setEditButton(false);
      return;
    }
    const formData = new FormData();
    formData.append("id", adminDetails._id);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber.toString());
    formData.append("address", address);
    formData.append("name", name);
    formData.append("imageName", profileImageName);
    formData.append("profileImage", profileImage);
    try {
      const response = await updateAdminDetails(formData);
      if (response.success) {
        customSuccessMessage(response.message);
        setReload(!reload);
        setEditButton(false);
        setChangedProfilePicture("");
      } else {
        customErrorMessage(response.message);
        return;
      }
    } catch (error) {
      customErrorMessage("Sorry! Failed to update.");
    }
  };

  return (
    <div className="fade-in-effect relative flex flex-col gap-3 lg:gap-5 px-9 py-8 lg:py-5 bg-[#081A2C] rounded-lg mt-8 lg:mt-0 mx-4 h-[630px] lg:ms-0 lg:me-2 lg:w-[590px] xl:w-[772px]">
      <div className="sm:flex sm:justify-between mt-2 pb-2">
        <p className="text-2xl md:text-3xl">Basic Information</p>
        <p
          className="text-[#005FF5] underline reset-button mt-2 sm:mt-0"
          onClick={() => {
            setResetPasswordButton(true);
          }}
        >
          Reset Password
        </p>
      </div>
      <input
        accept="image/*"
        type="file"
        className="custom-file-input"
        onChange={handleProfileImage}
      />
      <div className="flex flex-col mb-2">
        <label className="mb-1 sm:mb-2 text-[#5A7DA0]">Email ID</label>
        <input
          className="bg-[#081A2C] border border-[#2C4359] py-1 px-2 rounded"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className="relative">
          {!email.match(mailFormat) ? (
            <p className="text-red-500 absolute p-1">Wrong email address</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col mb-2">
        <label className="mb-1 sm:mb-2 text-[#5A7DA0]">Name</label>
        <input
          className="bg-[#081A2C] border border-[#2C4359] py-1 px-2 rounded"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div className="relative">
          {name.trim() === "" || name.trim === null ? (
            <p className="text-red-500 absolute p-1">Invalid name</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col mb-2">
        <label className="mb-1 sm:mb-2 text-[#5A7DA0]">Phone</label>
        <input
          className="bg-[#081A2C] border border-[#2C4359] py-1 px-2 rounded"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <div className="relative">
          {!phoneNumber.toString().match(phoneNoFormat) ? (
            <p className="text-red-500 absolute p-1">Invalid phone number</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col mb-2">
        <label className="mb-1 sm:mb-2 text-[#5A7DA0]">Address</label>
        <input
          className="bg-[#081A2C] border border-[#2C4359] py-1 px-2 rounded"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <div className="relative">
          {address.trim() === "" || address.trim === null ? (
            <p className="text-red-500 absolute p-1">Invalid address</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex sm:justify-end justify-start  mb-3 gap-4 mt-2">
        <button
          onClick={() => {
            setEditButton(false);
            setChangedProfilePicture("");
          }}
          className="px-5 py-2 rounded bg-[#081A2C] border border-white hover:bg-gradient-to-r from-[#F26522] to-[#FF0661]"
        >
          Cancel
        </button>
        <button
          onClick={handleAdminEdit}
          className="px-5 py-2 rounded bg-[#081A2C] border border-white hover:bg-gradient-to-r from-[#F26522] to-[#FF0661]"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditAdminInfo;
