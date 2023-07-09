import React from "react";

const BasicInformation = (props) => {
  return (
    <div className="fade-in-effect flex flex-col sm:gap-7 gap-4 px-9 py-8 lg:py-5 bg-[#081A2C] rounded-lg mt-6 lg:mt-0 mx-4 lg:ms-0 lg:me-2 lg:w-[590px] xl:w-[772px]">
      <div className="sm:flex sm:justify-between sm:items-center">
        <p className="text-2xl sm:text-3xl">Basic Information</p>
        <button
          className="bg-[#00904B] px-4 py-2 rounded hidden sm:block"
          onClick={() => {
            props.setEditButton(true);
          }}
        >
          Edit Profile
        </button>
      </div>
      <div className="sm:flex sm:justify-between sm:w-[65%]">
        <div>
          <p className="text-[#838F9C]">Email ID</p>
          <p className="text-[#ADBCE9]">
            {props.adminDetails.email ? props.adminDetails.email : "NA"}
          </p>
        </div>

        <div className="mt-2 sm:mt-0">
          <p className="text-[#838F9C]">Phone</p>
          <p className="text-[#ADBCE9]">
            {props.adminDetails.phoneNumber
              ? props.adminDetails.phoneNumber
              : "NA"}
          </p>
        </div>
      </div>
      <div className="">
        <p className="text-[#838F9C]">Address</p>
        <p className="text-[#ADBCE9] w-full sm:w-[80%] overflow-x-hidden">
          {props.adminDetails.address ? props.adminDetails.address : "NA"}
        </p>
      </div>
      <div>
        <button
          className="bg-[#00904B] px-4 py-2 rounded hover:bg-[#00905B] sm:hidden block"
          onClick={() => {
            props.setEditButton(true);
          }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default BasicInformation;
