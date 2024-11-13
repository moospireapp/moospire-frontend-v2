import React from "react";
import Link from "next/link";
import { CardStack } from "@/app/_components";
import "./MoodCard.scss";

const MoodCard = () => {
  return (
    <Link href="/moodframes/1" className="mood-card">
      <div className="mood-card--top">
        {/* DATE INDICATOR */}
        <div className="date-indicator">
          <div className="indicator"></div>
          <div className="time">Updated 3min ago</div>
        </div>

        {/* MOOD UI */}
        <div className="mood-ui">
          <CardStack />
        </div>
      </div>

      <div className="mood-card--base">
        <div>
          <div className="primary-text">All moods</div>
          <div className="secondary-text">21.5k moods</div>
        </div>

        <div className="options">
          <div className="icon icon-more"></div>
        </div>

        {/* <div className="btn btn-sm card-action-btn">View all</div> */}
      </div>
    </Link>
  );
};

export default MoodCard;
