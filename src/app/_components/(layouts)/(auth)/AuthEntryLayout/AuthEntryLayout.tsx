"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import {
  OrangeBg,
  YellowEllipse,
  MoospireBrandLight,
  MoospireBrandOrange,
} from "@/app/_assets";
import "./AuthEntryLayout.scss";

const AuthEntryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="auth-entry-layout">
      {/* AUTH LEFT PANE */}
      <div className="auth-left-pane">
        {/* BACKGROUND IMAGE */}
        <Image
          src={OrangeBg}
          alt="Moospire orange"
          width={1920}
          height={1080}
          className="background-img"
        />

        {/* CONTENT AREA */}
        <div className="content-area">
          <div className="app-container">
            {/* BRAND LOGO */}
            <div className="brand-logo">
              <Image
                src={MoospireBrandLight}
                alt="Moospire logo"
                width={132}
                height={75}
              />
            </div>

            {/* PRIMARY TEXT */}
            <h1 className="primary-text">The Spark You Need to Create.</h1>

            {/* SECONDARY TEXT */}
            <div className="secondary-text">
              Inspire your project with Moospire. Generate, customize, create
              and share moodboards that reflect your unique ideas.
            </div>
          </div>
        </div>

        {/* FOOTER COPY */}
        <div className="footer-copy">
          (c) 2024 Moospire. All Rights Reserved
        </div>
      </div>

      {/* AUTH RIGHT PANE */}
      <div className="auth-right-pane">
        {/* ELLIPSE IMAGE */}
        <Image
          src={YellowEllipse}
          alt="Moospire yellow ellipse"
          width={440}
          height={440}
          className="ellipse-img"
        />

        <div className="app-container">
          {/* BRAND LOGO ORANGE */}
          <div className="brand-logo-mobile">
            <Image
              src={MoospireBrandOrange}
              alt="Moospire orange logo"
              width={132}
              height={75}
            />
          </div>

          {/* CHILDREN SLOT */}
          <div className="w-full h-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthEntryLayout;
