import React from "react";
import { InspirationDisplayBoard, GoBackBtn } from "@/app/_components";

const MoodframeItems = () => {
  return (
    <div className="mt-2 mb-16 pt-8 px-6 sm:px-3">
      {/* BACK BUTTON */}
      <GoBackBtn />

      {/* TOP ROW */}
      <div className="top-row flex justify-between items-center gap-x-3 mb-1">
        <div className="top-row--left">
          <div className="text-grey-500 text-2xl sm:text-[22px] xs:text-lg font-bold">
            Poster design
          </div>
        </div>

        <div className="top-row--right flex justify-end items-center gap-x-2.5">
          <button className="btn btn-sm btn-secondary">
            <div className="icon-external-link text-lg"></div> Share
          </button>

          <button className="btn btn-sm btn-secondary">
            <div className="icon-download text-xl"></div> Download
          </button>
        </div>
      </div>

      {/* INFO ROW */}
      <div className="info-row pb-8 mb-10 border-b border-b-grey-100/70 flex justify-start items-center text-sm">
        <div className="info-item text-grey-500 pr-2 border-r border-r-grey-400">
          200 moods
        </div>
        <div className="info-item text-orange-500 pl-2">Updated 1 day ago</div>
      </div>

      <InspirationDisplayBoard />
    </div>
  );
};

export default MoodframeItems;
