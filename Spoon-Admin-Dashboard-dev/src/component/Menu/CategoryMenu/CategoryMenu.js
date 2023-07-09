import React, { useState, useEffect, useContext } from "react";
import plus from "../../../assets/images/plus.svg";
import Category from "../Category/Category";
import AddCategory from "../AddCategory/AddCategory";
import ItemList from "../ItemList/ItemList";
import AddItem from "../AddItem/AddItem";
import { GlobalContext } from "../../../context/GlobalContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CategoryMenu = ({
  adminDetails,
  categories,
  reload,
  setReload,
  getAllCategories,
}) => {
  const [addItem, setAddItem] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [showMenuEditor, setShowMenuEditor] = useState(true);
  const [selectCategory, setSelectCategory] = useState("");
  const { setEditDeletePopup } = useContext(GlobalContext);

  useEffect(() => {
    setEditDeletePopup(false);
  }, []);

  if (adminDetails) {
    return (
      <div>
        {selectCategory && (
          <div
            className="absolute font-semibold px-[3rem] py-2 cursor-pointer"
            onClick={() => {
              setSelectCategory("");
            }}
          >
            <ArrowBackIcon />
          </div>
        )}
        {selectCategory ? (
          <div className="sm:justify-end justify-center flex m-3">
            <div
              className="bg-[#00904B] py-2 rounded-lg text-lg flex items-center justify-around w-[12rem] mx-10 cursor-pointer"
              onClick={() => {
                setAddItem(true);
              }}
            >
              <img
                src={plus}
                alt="plus"
                className="w-[1.5rem] bg-[#036938] rounded-full p-[0.3rem] "
              />
              <button className="pe-3">Add an Item</button>
            </div>
          </div>
        ) : (
          <div className="sm:justify-end justify-center flex m-3">
            <div
              className="bg-[#00904B] py-2 rounded-lg text-lg flex items-center justify-around w-[12rem] mx-10 cursor-pointer"
              onClick={() => {
                setAddCategory(!addCategory);
              }}
            >
              <img
                src={plus}
                alt="plus"
                className="w-[1.5rem] bg-[#036938] rounded-full p-[0.3rem]"
              />
              <button className="pe-3">Add Category</button>
            </div>
          </div>
        )}

        <div className="m-5 sm:m-10 flex flex-col sm:flex-row">
          <button
            onClick={() => {
              getAllCategories();
              setShowMenuEditor(false);
              setSelectCategory("");
            }}
            className="item-availability sm:px-10 px-5 py-3 rounded-lg sm:me-8 me-0 mb-4 sm:mb-0 sm:text-lg text-sm hover:bg-[#14CC74]"
          >
            Item Availability
          </button>
          <button
            onClick={() => {
              getAllCategories();
              setShowMenuEditor(true);
              setSelectCategory("");
            }}
            className="menu-editor px-10 py-3 rounded-lg sm:text-lg text-sm hover:bg-[#14CC74]"
          >
            Menu Editor
          </button>
        </div>
        <div className="absolute xl:top-[30%] xl:left-[20%] xl:w-[40rem] sm:w-[20rem] sm:left-[15%] right-[2%] w-[19rem] z-40">
          {addCategory ? (
            <AddCategory
              setAddCategory={setAddCategory}
              reload={reload}
              setReload={setReload}
            />
          ) : (
            ""
          )}
          {addItem ? (
            <AddItem
              selectCategory={selectCategory}
              setAddItem={setAddItem}
              reload={reload}
              setReload={setReload}
            />
          ) : (
            ""
          )}
        </div>
        <div className="mx-10">
          {showMenuEditor ? (
            selectCategory ? (
              <ItemList
                setSelectCategory={setSelectCategory}
                showMenuEditor={showMenuEditor}
                selectedCategory={selectCategory}
                reload={reload}
                setReload={setReload}
              />
            ) : (
              <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2">
                {categories &&
                  categories.map((eachCategoryData, index) => {
                    return (
                      <Category
                        showMenuEditor={showMenuEditor}
                        key={index}
                        data={eachCategoryData}
                        setSelectCategory={setSelectCategory}
                        reload={reload}
                        setReload={setReload}
                      />
                    );
                  })}
              </div>
            )
          ) : selectCategory ? (
            <ItemList
              setSelectCategory={setSelectCategory}
              selectedCategory={selectCategory}
              reload={reload}
              setReload={setReload}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {categories &&
                categories.map((eachCategoryData, index) => {
                  return (
                    <Category
                      showMenuEditor={showMenuEditor}
                      key={index}
                      data={eachCategoryData}
                      setSelectCategory={setSelectCategory}
                      reload={reload}
                      setReload={setReload}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default CategoryMenu;
