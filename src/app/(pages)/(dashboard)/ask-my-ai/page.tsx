import React from "react";
import { FilterChatRow, ChatBlock } from "@/app/_components";

const AskMyAI = () => {
  return (
    <div className="relative">
      <div className="px-6 sm:px-3 border-b border-b-grey-200/80 py-3">
        <FilterChatRow />
      </div>

      <div className="relative px-6 sm:px-3">
        <ChatBlock />
      </div>
    </div>
  );
};

export default AskMyAI;
