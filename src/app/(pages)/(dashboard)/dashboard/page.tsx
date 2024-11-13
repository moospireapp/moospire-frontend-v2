import React from "react";
import {
  FilterRow,
  FilterTagRow,
  InspirationDisplayBoard,
} from "@/app/_components";

const Home = () => {
  return (
    <div>
      {/* FILTER ROW  */}
      <FilterRow />

      {/* BODY AREA */}
      <div className="mt-3 mb-16 px-6 sm:px-3">
        {/* FILTER TAG ROW */}
        <FilterTagRow />

        {/* INSPIRATION DISPLAY BOARD */}
        <InspirationDisplayBoard />
      </div>
    </div>
  );
};

export default Home;
