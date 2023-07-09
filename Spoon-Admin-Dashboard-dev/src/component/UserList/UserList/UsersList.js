import React, { useState } from "react";
import UserInfo from "../UserInfo/UserInfo";
import plusIcons from "../../../assets/images/plusIcons.svg";
import AddNewUser from "../../NewUser/AddNewUser/AddNewUser";
import { FooterForPagination } from "../../Footer/FooterForPagination";

const UsersList = ({
  adminDetails,
  users,
  newUser,
  setNewUser,
  reloadData,
  setReloadData,
  totalItems,
}) => {
  const [footerStates, setFooterStates] = useState({
    startingIndex: 1,
    endIndex: 6,
    pageCounter: 1,
    selectedRange: 6,
  });

  if (users) {
    return (
      <div className="lg:w-[80%] xl:w-[85%] lg:absolute lg:left-[20%] xl:left-[15%] h-[91vh] bg-[#030F1B] md:left-[27%] text-white">
        <div className="flex justify-between mx-3 md:mx-8 pt-6">
          <p>UserList</p>
          <button
            className="bg-[#00904B] px-8 py-2 rounded flex hover:bg-[#00947B] z-10"
            onClick={() => {
              setNewUser(!newUser);
            }}
          >
            <img
              src={plusIcons}
              alt="plus-icon"
              className="mt-1 me-2 rounded-full p-1 bg-[#036938]"
            />
            Add User
          </button>
        </div>

        <div className="h-[78vh] bg-[#081A2C] md:mx-3 lg:mx-6 mt-3 md:rounded-md hover:border-[black] overflow-y-scroll">
          <div className="md:flex hidden justify-between  p-4 mx-5 text-[#818589] text-center">
            <p>Name</p>
            <p>Email</p>
            <p>Phone Number</p>
            <div></div>
          </div>
          <div>
            {users &&
              users.map((user, index) => {
                if (
                  index >= footerStates.startingIndex - 1 &&
                  index < footerStates.endIndex
                ) {
                  return (
                    <UserInfo
                      adminDetails={adminDetails}
                      userDetails={user}
                      key={index}
                      setReloadData={setReloadData}
                      reloadData={reloadData}
                    />
                  );
                }
              })}
          </div>
        </div>
        <FooterForPagination
          setFooterStates={setFooterStates}
          footerStates={footerStates}
          totalItems={totalItems}
        />
        {newUser ? (
          <AddNewUser
            setNewUser={setNewUser}
            reloadData={reloadData}
            adminDetails={adminDetails}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
};

export default UsersList;
