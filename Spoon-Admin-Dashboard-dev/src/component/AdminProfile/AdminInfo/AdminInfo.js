import React, { useState } from "react";
import dp from "../../../assets/images/dp.png";
import BasicInformation from "../BasicInformation/BasicInformation";
import ChangeAdminPassword from "../ChangeAdminPassword/ChangeAdminPassword";
import EditAdminInfo from "../EditAdminInfo/EditAdminInfo";

const AdminInfo = ({ adminDetails, reload, setReload }) => {
  const [editButton, setEditButton] = useState(false);
  const [resetPasswordButton, setResetPasswordButton] = useState(false);
  const [changedProfilePicture, setChangedProfilePicture] = useState("");

  return (
    <div className="lg:w-[80%] xl:w-[85%] lg:absolute lg:left-[20%] xl:left-[15%] h-[91vh] bg-[#030F1B] text-white">
      <div className="block lg:flex lg:gap-4 justify-start pt-6 text-start h-[350px]">
        <div className="bg-[#081A2C] flex flex-col justify-center items-center mx-5 lg:me-0 px-2 py-9 rounded-lg lg:w-[300px] xl:w-[372px]">
          <img
            src={
              changedProfilePicture === "" || changedProfilePicture === null
                ? adminDetails.imageURL
                  ? `${adminDetails.imageURL}`
                  : dp
                : changedProfilePicture
            }
            alt="admin-pic"
            className="w-[5rem] h-[5rem] sm:w-[6rem] sm:h-[6rem] rounded-full"
          />
          <h2 className="text-2xl sm:text-3xl mt-4 text-center w-full">
            {adminDetails.userName ? adminDetails.userName : "NA"}
          </h2>
          <p className="text-[#FF8E25] lg:mb-7 text-sm w-full text-center">
            {adminDetails.isAdmin
              ? "Admin"
              : adminDetails.isBackendUser
              ? "Backend User"
              : ""}
          </p>
        </div>
        {editButton ? (
          resetPasswordButton ? (
            <ChangeAdminPassword
              adminDetails={adminDetails}
              setEditButton={setEditButton}
              setResetPasswordButton={setResetPasswordButton}
            />
          ) : (
            <EditAdminInfo
              reload={reload}
              setReload={setReload}
              setChangedProfilePicture={setChangedProfilePicture}
              setEditButton={setEditButton}
              setResetPasswordButton={setResetPasswordButton}
              adminDetails={adminDetails}
            />
          )
        ) : (
          <BasicInformation
            editButton={editButton}
            setEditButton={setEditButton}
            adminDetails={adminDetails}
          />
        )}
      </div>
    </div>
  );
};

export default AdminInfo;
