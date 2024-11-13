import React from "react";
// import { ClickOutsideWrapper, AppFilterMenu } from "@/app/_components";
import { AppFilterMenu } from "@/app/_components";
import "./FilterTagRow.scss";

const FilterTagRow = () => {
  return (
    <div className="filter-tag-row">
      {/* FILTER TAG ROW LEFT */}
      <div className="filter-tag-row--left">
        <div className="filter-wrapper">
          <div className="filter-dropdown">
            <div className="selected-text">Recommended for You</div>
            <div className="icon-caret icon-caret-down"></div>
          </div>
        </div>

        <div className="filter-tag-item filter-tag-item--active">
          <div className="text">Recommended for You</div>
        </div>

        <div className="filter-tag-item">
          <div className="text">Latest Moods</div>
          <div className="tag">New</div>
        </div>

        <div className="filter-tag-item">
          <div className="text">Most Downloaded</div>
        </div>
      </div>

      {/* FILTER TAG ROW RIGHT */}
      <div className="filter-tag-row--right">
        <AppFilterMenu />
      </div>
    </div>
  );
};

export default FilterTagRow;
