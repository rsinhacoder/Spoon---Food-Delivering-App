import React, { useState, useEffect, useContext, useMemo } from "react";
import searchIcon from "../../../assets/images/search-icon.svg";
import { FoodItem } from "../FoodItem/FoodItem";
import { urls } from "../../../config/urls";
import loading from "../../../assets/loading-animation.gif";
import {
  getItemsByCategory,
  searchItemInCategory,
} from "../../../helperFunctions/apiCalls";
import { GlobalContext } from "../../../context/GlobalContext";

const ItemList = ({
  selectedCategory,
  showMenuEditor,
  reload,
  setReload,
  setSelectCategory,
}) => {
  const { setEditDeletePopup, restaurantStatus } = useContext(GlobalContext);
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [items, setItems] = useState(null);

  const getAllItems = async () => {
    const response = await getItemsByCategory(
      `${urls.getAllItems}/${selectedCategory}`
    );
    if (response.success) {
      setItems(response.data);
    }
  };

  const getSearchResult = async () => {
    const response = await searchItemInCategory(searchItem, selectedCategory);
    if (response.success) {
      setSearchResult(response.data);
    }
  };

  useEffect(() => {
    if (searchItem.trim() !== "" || searchItem !== null) {
      getSearchResult();
    } else {
      setSearchResult(null);
    }
  }, [searchItem]);

  useEffect(() => {
    getAllItems();
  }, [reload, restaurantStatus]);

  useMemo(() => {
    !restaurantStatus && setSelectCategory("");
  }, [restaurantStatus]);

  useEffect(() => {
    setEditDeletePopup(false);
  }, []);

  return (
    <div className="fade-in-effect relative">
      <div className="overflow-y-scroll w-full md:absolute h-[72vh] bg-[#030F1B] text-white">
        <div className="flex gap-4">
          <button className="text-[#06CB55] bg-[#0F2439] py-1 rounded-lg px-5">
            {selectedCategory}
          </button>
          <div className="flex bg-[#081A2C] border border-[#153453] py-1 rounded-lg">
            <img src={searchIcon} className="px-2" alt="searchIcon" />
            <input
              type="search"
              className="bg-transparent outline-0 pe-10"
              placeholder="Search Items"
              value={searchItem}
              onChange={(e) => {
                setSearchItem(e.target.value);
              }}
            />
          </div>
        </div>
        {searchItem ? (
          <div className="flex flex-wrap gap-2 max-h-[70vh] mx-auto overflow-y-auto py-3 mt-10">
            {searchResult.map((item, index) => {
              return (
                <FoodItem
                  data={item}
                  key={index}
                  reload={reload}
                  setReload={setReload}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 max-h-[70vh] mx-auto overflow-y-auto py-3 mt-10">
            {items ? (
              items.map((item, index) => {
                return (
                  <FoodItem
                    showMenuEditor={showMenuEditor}
                    data={item}
                    key={index}
                    reload={reload}
                    setReload={setReload}
                  />
                );
              })
            ) : (
              <div className="w-full h-[60vh] flex justify-center">
                <img
                  src={loading}
                  alt="loading-animation"
                  className="w-[50%] h-[85%] rounded-[50%]"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemList;
