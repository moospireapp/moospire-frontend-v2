"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/app/_context/ToastContext";
import { useAuth } from "@/app/_hooks";
import { commonUtil } from "@/app/_utils";
import useStore from "@/app/_app-store";
import "./TopbarMenu.scss";

const TopbarMenu = () => {
  const authUser = useAuth();
  const router = useRouter();

  const { showToast } = useToast();
  const { logoutUser } = useStore();

  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    image: "",
  });

  const handleUserLogout = async () => {
    showToast("Logging out user...", "warning");

    const response = await logoutUser();

    if (response.code === 200) {
      showToast(response.message, "success");
      router.push("/");
    }
  };

  useEffect(() => {
    setUserData(authUser);
  }, []);

  return (
    <div className="base-dropdown menu-card">
      {/* PROFILE DETAILS */}
      <div className="profile-details">
        <div className="profile-avatar bg-grey-50/50 flex justify-center items-center">
          {userData.image ? (
            <Image
              src={userData.image}
              alt={userData.fullname}
              width={32}
              height={32}
            />
          ) : (
            <div className="text-grey-500 text-base font-medium">
              {commonUtil.extractStringInitials(userData.fullname)}
            </div>
          )}
        </div>

        <div>
          <div className="top-row">
            <div className="profile-name">{userData.fullname}</div>
            <div className="profile-status">FREE</div>
          </div>

          <div className="bottom-row">{userData.email}</div>
        </div>
      </div>

      {/* MENU LIST */}
      <div className="menu-list">
        <Link href="/user-profile" className="dropdown-item menu-list-item">
          <div className="icon icon-pen-edit"></div>
          <div className="text">Edit Profile</div>
        </Link>

        <Link href="" className="dropdown-item menu-list-item">
          <div className="icon icon-export"></div>
          <div className="text">Upgrade Plan</div>
        </Link>

        <Link href="" className="dropdown-item menu-list-item">
          <div className="icon icon-help"></div>
          <div className="text">Help Center</div>
        </Link>

        <Link
          href=""
          onClick={handleUserLogout}
          className="dropdown-item menu-list-item mt-1 border-t border-grey-100"
        >
          <div className="icon icon-logout"></div>
          <div className="text">Sign Out</div>
        </Link>
      </div>
    </div>
  );
};

export default TopbarMenu;
