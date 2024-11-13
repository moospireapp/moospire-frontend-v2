"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ColorWheel, FontText } from "@/app/_assets";
import { ClickOutsideWrapper } from "@/app/_components";
import "./AppFilterMenu.scss";

const AppFilterMenu = () => {
  const dropdownViewRef = useRef<any>();
  const [showViewDropdown, setShowViewDropdown] = useState<boolean>(false);

  const dropdownFontRef = useRef<any>();
  const [showFontDropdown, setShowFontDropdown] = useState<boolean>(false);

  return (
    <div className="app-filter-menu">
      <div className="filter-view-item">
        <div className="icon-img">
          <Image src={ColorWheel} alt="color-wheel" />
        </div>

        <div className="text">Color</div>
        <div className="icon-caret icon-caret-down"></div>
      </div>

      <div className="filter-view-item">
        <div
          className="filter-wrapper"
          ref={dropdownFontRef}
          onClick={() => setShowFontDropdown(!showFontDropdown)}
        >
          <div className="icon-img">
            <Image src={FontText} alt="font-text" />
          </div>
          <div className="text">Fonts</div>
          <div
            className={`icon-caret icon-caret-down transition duration-300 ease-in-out ${
              showFontDropdown && "rotate-180"
            }`}
          ></div>
        </div>

        <ClickOutsideWrapper
          togglerRef={dropdownFontRef}
          showDropdown={showFontDropdown}
          toggleDropdown={setShowFontDropdown}
        >
          <div className="dropdown-menu animate-slide-down !w-[140px]">
            <div className="dropdown-menu-item">
              <div className="text">Sans serif</div>
            </div>

            <div className="dropdown-menu-item">
              <div className="text">Serif</div>
            </div>
          </div>
        </ClickOutsideWrapper>
      </div>

      <div className="filter-view-item">
        <div
          className="filter-wrapper"
          ref={dropdownViewRef}
          onClick={() => setShowViewDropdown(!showViewDropdown)}
        >
          <div className="icon icon-monitor"></div>
          <div className="text">Desktop</div>
          <div
            className={`icon-caret icon-caret-down transition duration-300 ease-in-out ${
              showViewDropdown && "rotate-180"
            }`}
          ></div>
        </div>

        {/* DROPDOWN */}
        <ClickOutsideWrapper
          togglerRef={dropdownViewRef}
          showDropdown={showViewDropdown}
          toggleDropdown={setShowViewDropdown}
        >
          <div className="dropdown-menu animate-slide-down !w-[140px]">
            <div className="dropdown-menu-item">
              <div className="icon icon-monitor"></div>
              <div className="text">Desktop</div>
            </div>

            <div className="dropdown-menu-item">
              <div className="icon icon-mobile"></div>
              <div className="text">Mobile</div>
            </div>
          </div>
        </ClickOutsideWrapper>
      </div>

      {/* <div className="filter-view-item filter-view-item-md">
        <div className="icon icon-monitor"></div>
        <div className="text">Desktop</div>
      </div> */}

      {/* <div className="filter-view-item filter-view-item-md">
        <div className="icon icon-mobile"></div>
        <div className="text">Mobile</div>
      </div> */}
    </div>
  );
};

export default AppFilterMenu;
