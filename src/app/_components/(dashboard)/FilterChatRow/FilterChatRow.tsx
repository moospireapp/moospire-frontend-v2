import React from "react";
import Link from "next/link";
// import { ClickOutsideWrapper, AppFilterMenu } from "@/app/_components";
import "./FilterChatRow.scss";

const FilterChatRow = () => {
  return (
    <div className="filter-chat-row">
      {/* FILTER TAG ROW LEFT */}
      <div className="filter-chat-row--left">
        <div className="filter-wrapper">
          <div className="filter-dropdown">
            <div className="selected-text">New Chat</div>
            <div className="icon-caret icon-caret-down"></div>
          </div>
        </div>

        <Link
          href="/ask-my-ai"
          className="filter-chat-item filter-chat-item--active"
        >
          <div className="icon icon-add-square"></div>
          <div className="text">New Chat</div>
        </Link>

        <Link href="/recent-activity" className="filter-chat-item">
          <div className="icon icon-clock"></div>
          <div className="text">Recent Activity</div>
        </Link>

        <Link href="" className="filter-chat-item">
          <div className="icon icon-document-text"></div>
          <div className="text">My AI Moods</div>
        </Link>
      </div>

      {/* FILTER TAG ROW RIGHT */}
      <div className="filter-chat-row--right">{/* <AppFilterMenu /> */}</div>
    </div>
  );
};

export default FilterChatRow;
