"use client";

import { useRef } from "react";

const useBtnClick = (text: string = "Button Text") => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const updateButtonState = (processing: boolean) => {
    const button = buttonRef.current;
    if (button) {
      if (processing) {
        button.disabled = true;
        button.innerHTML = `<div class="icon-spinner-ios text-2xl text-white animate-spin"></div>`;
      } else {
        button.innerHTML = text;
        button.disabled = false;
      }
    }
  };

  return { buttonRef, updateButtonState };
};

export default useBtnClick;
