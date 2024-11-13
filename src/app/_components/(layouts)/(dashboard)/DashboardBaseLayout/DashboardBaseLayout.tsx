"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { SidebarPane, TopbarPane } from "@/app/_components";
import { usePathname } from "next/navigation";
import "./DashboardBaseLayout.scss";

const DashboardBaseLayout = ({ children }: { children: ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const pathname = usePathname();

  // Close sidebar on route changes if screen width is <= 1023px
  useEffect(() => {
    const handleRouteChangeForSmallScreens = () => {
      if (window.innerWidth <= 1023 && showSidebar) {
        setShowSidebar(false);
      }
    };

    handleRouteChangeForSmallScreens();

    // Adding resize listener to ensure sidebar stays closed on resize
    window.addEventListener("resize", handleRouteChangeForSmallScreens);

    return () => {
      window.removeEventListener("resize", handleRouteChangeForSmallScreens);
    };
  }, [pathname]);

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR PANE */}
      <div
        className={`sidebar-pane ${
          showSidebar && "animate-drift-left show-sidebar"
        }`}
      >
        {showSidebar && (
          <div
            className="sidebar-mobile-overlay"
            onClick={() => setShowSidebar(!showSidebar)}
          ></div>
        )}

        <SidebarPane />
      </div>

      {/* MAIN CONTENT PANE */}
      <div className="main-content-pane">
        {/* TOP PANE */}
        <div className="top-pane">
          <TopbarPane emitShowSidebar={() => setShowSidebar(!showSidebar)} />
        </div>

        {/* CHILDREN SLOT */}
        <div className="body-pane">{children}</div>
      </div>
    </div>
  );
};

export default DashboardBaseLayout;
