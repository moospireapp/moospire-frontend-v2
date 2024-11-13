"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ClickOutsideWrapper } from "@/app/_components";
import { useRouter } from "next/navigation";
import "./InspirationCard.scss";

const InspirationCard = ({ boardItem }: { boardItem: any }) => {
  const router = useRouter();

  const dropdownRef = useRef<any>();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains("inspiration-trigger")) {
      router.push(`/board/${boardItem.id}`);
    }
  };

  return (
    <div className="inspiration-card">
      <Image src={boardItem.image} alt={boardItem.alt} />

      <div className="inspiration-overlay" onClick={handleCardClick}>
        <div className="relative inspiration-trigger inset-0 w-full h-full">
          <div className="top-row">
            <div className="top-row--left">
              <div className="action-item">
                <div className="icon icon-bookmark"></div>
              </div>

              <div className="action-item">
                <div className="icon icon-copy"></div>
              </div>
            </div>

            <div className="top-row--right relative">
              <div
                className="action-item"
                ref={dropdownRef}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="icon icon-more"></div>
              </div>

              <ClickOutsideWrapper
                togglerRef={dropdownRef}
                showDropdown={showDropdown}
                toggleDropdown={setShowDropdown}
              >
                <div className="dropdown-menu animate-slide-down">
                  <div className="dropdown-menu-item">
                    <div className="icon icon-external-link"></div>
                    <div className="text">Share</div>
                  </div>

                  <div className="dropdown-menu-item">
                    <div className="icon icon-search-normal"></div>
                    <div className="text">Find Similar</div>
                  </div>

                  <div className="dropdown-menu-item">
                    <div className="icon icon-download"></div>
                    <div className="text">Download</div>
                  </div>

                  <div className="dropdown-menu-item">
                    <div className="icon icon-slash"></div>
                    <div className="text">Blocked Mood</div>
                  </div>
                </div>
              </ClickOutsideWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspirationCard;
