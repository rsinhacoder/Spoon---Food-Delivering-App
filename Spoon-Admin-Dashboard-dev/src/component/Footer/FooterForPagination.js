import React from "react";
import leftArrow from "../../assets/images/left-arrow.svg";
import rightArrow from "../../assets/images/right-arrow.svg";
import "./Footer.scss";

export const FooterForPagination = ({
  setFooterStates,
  footerStates,
  totalItems,
  showOrderDetails,
}) => {
  function handleUpperLimitChange(range) {
    setFooterStates((existingValues) => ({
      ...existingValues,
      pageCounter: Math.trunc(totalItems / parseInt(range)) + 1,
    }));
    return Math.trunc(totalItems / parseInt(range)) * parseInt(range) + 1;
  }

  function handleLowerLimitChange(range) {
    setFooterStates((existingValues) => ({
      ...existingValues,
      pageCounter: Math.trunc(totalItems / parseInt(range)) + 1,
    }));
    return totalItems;
  }

  function handleRangeChange(e) {
    setFooterStates((existingValues) => ({
      ...existingValues,
      selectedRange: parseInt(e.target.value),
      endIndex:
        footerStates.pageCounter * parseInt(e.target.value) > totalItems
          ? handleLowerLimitChange(parseInt(e.target.value))
          : footerStates.pageCounter * parseInt(e.target.value),
      startingIndex:
        (footerStates.pageCounter - 1) * parseInt(e.target.value) + 1 >
        totalItems
          ? handleUpperLimitChange(parseInt(e.target.value))
          : (footerStates.pageCounter - 1) * parseInt(e.target.value) + 1,
    }));
  }

  function nextPage() {
    if (footerStates.endIndex < totalItems) {
      setFooterStates((existingValues) => ({
        ...existingValues,
        pageCounter: footerStates.pageCounter + 1,
        startingIndex: footerStates.endIndex + 1,
        endIndex:
          (footerStates.pageCounter + 1) * footerStates.selectedRange >
          totalItems
            ? totalItems
            : (footerStates.pageCounter + 1) * footerStates.selectedRange,
      }));
    }
  }

  function previousPage() {
    if (footerStates.startingIndex > 1) {
      setFooterStates((existingValues) => ({
        ...existingValues,
        pageCounter: footerStates.pageCounter - 1,
        startingIndex: footerStates.startingIndex - footerStates.selectedRange,
        endIndex:
          (footerStates.pageCounter - 1) * footerStates.selectedRange >
          totalItems
            ? totalItems
            : (footerStates.pageCounter - 1) * footerStates.selectedRange,
      }));
    }
  }

  return (
    <div
      className={`${
        showOrderDetails ? "invisible" : "visible"
      } flex fixed bottom-0 justify-end px-4 py-2 sm:justify-between w-screen md:w-[80%] lg:ps-5 lg:pe-3 sm:p-0`}
    >
      <div className="hidden sm:flex">
        <p className="rowsPerPage text-[#818589]">Rows per page :</p>
        <select
          name="option"
          className="selectToggle bg-transparent outline-0 cursor-pointer"
          value={footerStates.selectedRange}
          onChange={handleRangeChange}
        >
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
      </div>
      <div className="flex gap-2">
        <p className="text-[#818589]">{`${footerStates.startingIndex} - ${footerStates.endIndex} of ${totalItems} items`}</p>
        <button onClick={previousPage}>
          <img
            src={leftArrow}
            className="hover:scale-150 px-2"
            alt="arrowLeft"
          />
        </button>
        <button onClick={nextPage}>
          <img
            src={rightArrow}
            className="hover:scale-150 px-2"
            alt="arrowRight"
          />
        </button>
      </div>
    </div>
  );
};
