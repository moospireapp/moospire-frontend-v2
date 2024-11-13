"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TopbarMenu, ClickOutsideWrapper } from "@/app/_components";
import { useAuth } from "@/app/_hooks";
import { commonUtil } from "@/app/_utils";
import "./TopbarPane.scss";

const TopbarPane = ({ emitShowSidebar }: { emitShowSidebar: () => void }) => {
  const authUser = useAuth();
  const pathname = usePathname();

  const dropdownRef = useRef<any>();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const [pageTitle, setPageTitle] = useState<string | null>(null); // initially null

  const [pagesWithTitle] = useState([
    {
      route: "/user-profile",
      title: "Personal details",
    },
    {
      route: "/ask-my-ai",
      title: "Chat",
    },
  ]);

  const [userData, setUserData] = useState({
    fullname: "",
    image: "",
  });

  const getCurrentPageTitle = () => {
    const page = pagesWithTitle.find((page) => page.route === pathname);
    setPageTitle(page?.title ?? ""); // fallback to an empty string if no title is found
  };

  useEffect(() => {
    setUserData(authUser);
  }, [authUser]);

  // Watch for route changes to close the dropdown
  useEffect(() => {
    getCurrentPageTitle();
    if (showDropdown) {
      setShowDropdown(false);
    }
  }, [pathname]); // Dependency on pathname for route changes

  return (
    <div className="topbar-block">
      {/* SEARCH INPUT */}
      <div className="topbar-block--left">
        <div className="icon-menu" onClick={emitShowSidebar}></div>
        {pageTitle === null ? (
          <div className="loading-placeholder"></div> // Placeholder while loading
        ) : pageTitle ? (
          <div className="page-title">{pageTitle}</div>
        ) : (
          <div className="search-input sm:hidden">
            <div className="icon-search icon-search-normal"></div>
            <input
              type="text"
              placeholder="Search for inspiration"
              className="form-control"
            />
          </div>
        )}
      </div>

      {/* TOP ITEMS */}
      <div className="top-items">
        {/* SEARCH */}
        <div className="item-square search-item">
          <div className="icon icon-search-normal"></div>
        </div>

        {/* NOTIFICATION */}
        <div className="item-square notification">
          <div className="icon icon-notification-bing"></div>
        </div>

        {/* PROFILE AVATAR */}
        <div className="profile-wrapper relative">
          <div
            className="profile-toggler"
            ref={dropdownRef}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="item-square profile bg-grey-50/40">
              {userData.image ? (
                <Image
                  src={userData.image}
                  alt={userData.fullname}
                  width={40}
                  height={40}
                />
              ) : (
                <div className="text-grey-500 text-[14.5px] font-medium">
                  {commonUtil.extractStringInitials(userData.fullname)}
                </div>
              )}
            </div>

            <div
              className={`relative icon-toggle icon-caret-down transition duration-300 ease-out ${
                showDropdown ? "rotate-180" : "rotate-0"
              }`}
            ></div>
          </div>

          {/* DROPDOWN */}
          <ClickOutsideWrapper
            togglerRef={dropdownRef}
            showDropdown={showDropdown}
            toggleDropdown={setShowDropdown}
          >
            <TopbarMenu />
          </ClickOutsideWrapper>
        </div>
      </div>
    </div>
  );
};

export default TopbarPane;
