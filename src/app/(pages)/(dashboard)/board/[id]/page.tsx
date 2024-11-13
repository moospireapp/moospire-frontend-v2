import React from "react";
import {
  BoardDetails,
  InspirationDisplayBoard,
  GoBackBtn,
} from "@/app/_components";

const Board = () => {
  return (
    <div className="mt-2 mb-16 pt-8 px-6 sm:px-3">
      {/* BACK BUTTON */}
      <GoBackBtn />

      {/* BOARD DETAILS */}
      <BoardDetails />

      {/* SIMILAR BOARDS */}
      <div className="title-text text-grey-500 font-medium text-lg mb-6">
        More similar images
      </div>

      <InspirationDisplayBoard />
    </div>
  );
};

export default Board;
