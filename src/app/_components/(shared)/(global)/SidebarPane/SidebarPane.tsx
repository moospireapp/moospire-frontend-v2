"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname hook
import { MoospireBeta } from "@/app/_assets";
import "./SidebarPane.scss";

const SidebarPane = () => {
  const pathname = usePathname(); // Get the current route path

  return (
    <div className="sidebar-block">
      {/* BRAND LOGO */}
      <div className="brand-logo">
        <Image src={MoospireBeta} alt="Moospire beta" width={120} height={46} />
      </div>

      <div className="nav-area">
        {/* NAVIGATIONS */}
        <div className="navigations">
          <Link
            href="/dashboard"
            className={`nav-item ${
              pathname === "/dashboard" ? "nav-item-active" : ""
            }`}
          >
            <div className="nav-icon icon-home text-[17.75px]"></div>
            <div className="nav-text">Home</div>
          </Link>

          <Link
            href="/ask-my-ai"
            className={`nav-item ${
              pathname === "/ask-my-ai" ? "nav-item-active" : ""
            }`}
          >
            <div className="nav-icon icon-double-star text-xl"></div>
            <div className="nav-text">Ask my AI</div>
          </Link>
        </div>

        <div className="nav-category">Workspace</div>

        <div className="navigations">
          <Link
            href="/recent-activity"
            className={`nav-item ${
              pathname === "/recent-activity" ? "nav-item-active" : ""
            }`}
          >
            <div className="nav-icon icon-clock text-xl"></div>
            <div className="nav-text">Recent Activity</div>
          </Link>

          <Link
            href="/moodframes"
            className={`nav-item ${
              pathname === "/moodframes" ? "nav-item-active" : ""
            }`}
          >
            <div className="nav-icon icon-files text-xl"></div>
            <div className="nav-text">My Moodframes</div>
          </Link>
        </div>
      </div>

      <div className="nav-base-wrapper">
        <div className="coming-soon-card">
          <div className="primary-tag">Coming Soon</div>

          <div className="primary-title">Unlock more with Premium</div>

          <div className="primary-description">
            Generate Infinite Ideas with GEMINI Advance and more
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarPane;
