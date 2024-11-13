import React from "react";
import { EmptyChatBlock, ChatMessageInput } from "@/app/_components";
import "./ChatBlock.scss";

const ChatBlock = () => {
  return (
    <div className="chat-block">
      <div className="chat-display-area">
        <EmptyChatBlock />
      </div>

      {/* MESSAGE INPUT */}
      <div className="chat-input-area">
        <ChatMessageInput />
      </div>
    </div>
  );
};

export default ChatBlock;
