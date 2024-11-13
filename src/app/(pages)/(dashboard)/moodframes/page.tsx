import React from "react";
import { MoodCard } from "@/app/_components";

const Moodframes = () => {
  return (
    <div className="px-5 mt-12 sm:mt-9">
      {/* TITLE ROW */}
      <div className="flex justify-between items-center gap-x-3 mb-9">
        <div className="text-grey-500 text-2xl sm:text-[22px] xs:text-lg font-bold">
          Saved Collections
        </div>

        <button className="btn btn-sm btn-secondary">
          <div className="icon-document-sketch"></div> Create Moodframes
        </button>
      </div>

      <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 grid-flow-row gap-x-4 lg:gap-x-6 md:gap-x-3 gap-y-6 mb-20">
        <MoodCard />
        <MoodCard />
        <MoodCard />
        <MoodCard />
        <MoodCard />
        <MoodCard />
        <MoodCard />
        <MoodCard />
      </div>
    </div>
  );
};

export default Moodframes;
