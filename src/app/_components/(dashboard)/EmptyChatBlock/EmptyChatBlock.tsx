import React from "react";
import { FileOne, FileTwo, FileThree } from "@/app/_assets";
import "./EmptyChatBlock.scss";
import Image from "next/image";

const EmptyChatBlock = () => {
  return (
    <div className="empty-chat-block">
      <div className="title-text">How can I inspire your project?</div>

      {/* ITEM LIST */}
      <div className="item-list">
        <div className="item-row">
          <div className="item-wrapper bg-orange-50">
            <Image src={FileOne} alt="ItemOne"></Image>
          </div>

          <div>
            <div className="primary-text">Describe and Generate</div>
            <div className="secondary-text">
              Let AI inspire your creativity & ideas with stunning moodboards
            </div>
          </div>
        </div>

        <div className="item-row">
          <div className="item-wrapper bg-yellow-50">
            <Image src={FileTwo} alt="ItemTwo"></Image>
          </div>

          <div>
            <div className="primary-text">Image Direction</div>
            <div className="secondary-text">
              AI analyze uploaded images and suggest design directions, themes,
              or complementary elements
            </div>
          </div>
        </div>

        <div className="item-row">
          <div className="item-wrapper bg-red-50">
            <Image src={FileThree} alt="ItemThree"></Image>
          </div>

          <div>
            <div className="primary-text">
              Transform sketches and VN into Moodbaords
            </div>
            <div className="secondary-text">
              Upload your sketches and voice notes, let AI analyze and create
              beautiful moodboards based on your ideas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyChatBlock;
