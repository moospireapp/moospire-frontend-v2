import React from "react";
import "./ItemChecker.scss";

const ItemChecker = ({ item, updateSelection }: any) => {
  return (
    <label
      htmlFor={item.label}
      className={`item-checker ${item.isSelected && "checked"}`}
    >
      <input
        type="checkbox"
        id={item.label}
        className="form-checkbox"
        checked={item.isSelected}
        onChange={updateSelection}
      />
      <div className="item-text">{item.label}</div>
    </label>
  );
};

export default ItemChecker;
