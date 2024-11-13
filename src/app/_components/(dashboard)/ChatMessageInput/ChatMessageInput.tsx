"use client";

import React, { ClipboardEvent, useRef, useEffect } from "react";
import "./ChatMessageInput.scss";

const ChatMessageInput = () => {
  const editableRef = useRef<HTMLDivElement>(null);

  const handleEditablePasteEvent = (
    e: ClipboardEvent<HTMLDivElement>
  ): void => {
    e.preventDefault();

    const pastedText = e.clipboardData?.getData("text/plain");
    if (pastedText) {
      const selection = window.getSelection();
      if (!selection || !editableRef.current) return;

      const range = selection.getRangeAt(0);
      range.deleteContents();

      const textNode = document.createTextNode(pastedText);
      range.insertNode(textNode);

      // Move the caret to the end of the newly pasted text
      range.setStartAfter(textNode);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  useEffect(() => {
    const handleInput = () => {
      const element = editableRef.current;
      if (
        element &&
        (element.innerHTML === "" || element.innerHTML === "<br>")
      ) {
        element.innerHTML = ""; // Clear any lingering <br> tags
      }
    };

    const element = editableRef.current;
    element?.addEventListener("input", handleInput);

    return () => {
      element?.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <div className="chat-message-input">
      {/* CHAT INPUT TOP */}
      <div className="chat-input--top">
        <div
          ref={editableRef}
          className="extended-textarea"
          role="textbox"
          contentEditable
          onPaste={handleEditablePasteEvent}
        ></div>
      </div>

      {/* CHAT INPUT BASE */}
      <div className="chat-input--base">
        <div className="chat-input--base--left">
          <div className="action-item">
            <div className="icon icon-image"></div>
            <div className="text">Add Image</div>
          </div>

          <div className="action-item">
            <div className="icon icon-document-sketch"></div>
            <div className="text">Add Sketch</div>
          </div>

          <div className="action-item">
            <div className="icon icon-voice-square"></div>
            <div className="text">Add Voice Notes</div>
          </div>
        </div>

        <div className="chat-input--base--right">
          <button className="btn btn-sm btn-primary !rounded-3xl">
            <div className="icon-double-star text-[19px]"></div> Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageInput;
