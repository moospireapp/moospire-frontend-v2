"use client";

import { ReactNode, useRef } from "react";
import { useClickOutside } from "@/app/_hooks";

type ClickOutsideWrapperType = {
  showDropdown: boolean;
  togglerRef?: any;
  toggleDropdown: (item: any) => void;
  children?: ReactNode;
};

function ClickOutsideWrapper({
  children,
  showDropdown,
  togglerRef,
  toggleDropdown,
}: ClickOutsideWrapperType) {
  const dialogRef = useRef<any>();
  useClickOutside(dialogRef, togglerRef, showDropdown, toggleDropdown);

  return (
    <div
      role="dialog"
      aria-modal
      ref={dialogRef}
      className={`${showDropdown ? "block" : "hidden"} `}
    >
      {children}
    </div>
  );
}

export default ClickOutsideWrapper;
