import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { BoardImg, PinterestLogo } from "@/app/_assets";
import "./BoardDetails.scss";

const BoardDetails = () => {
  return (
    <div className="board-details">
      {/* BOARD IMAGE */}
      <div className="board-img">
        <Image src={BoardImg} alt="Board image" width={300} height={300} />
      </div>

      {/* BOARD INFO */}
      <div className="board-info">
        {/* OPTIONS ROW */}
        <div className="options-row">
          <div className="options-row--left">
            <div className="option-item">
              <div className="icon icon-copy"></div>
            </div>

            <div className="option-item">
              <div className="icon icon-external-link"></div>
            </div>
          </div>

          <div className="options-row--right">
            <div className="option-item group">
              <HandThumbUpIcon className="size-5 text-grey-500 group-hover:text-orange-400" />
            </div>

            <div className="option-item option-item-action">
              <div className="icon icon-bookmark"></div>
              <div className="text">Save</div>
            </div>
          </div>
        </div>

        {/* SOURCE ROW */}
        <div className="source-row">
          <div className="source-row--left">
            <div className="brand-icon">
              <Image src={PinterestLogo} alt="Pinterest logo"></Image>
            </div>

            <div className="brand-name">Pinterest</div>
          </div>

          <div className="source-row--right">
            <Link href="/" className="source-link">
              www.pinterest.com
            </Link>
          </div>
        </div>

        {/* TAG ROW */}
        <div className="tag-row">
          <div className="tag-item">UI design</div>

          <div className="tag-item">Sign up</div>
        </div>

        {/* COLORS ROW */}
        <div className="colors-row">
          <div className="title-text">Colors</div>

          <div className="color-row">
            <div className="color-item">Blue</div>
            <div className="color-item">Green</div>
            <div className="color-item">Red</div>
          </div>
        </div>

        {/* ANALYTIC ROW */}
        <div className="analytics-row">
          <div className="analytic-item">
            <HandThumbUpIcon className="size-5 text-grey-400" />
            <div className="count">20</div>
          </div>

          <div className="analytic-item">
            <div className="icon icon-eye"></div>
            <div className="count">100</div>
          </div>
        </div>

        {/* ACTION ROW */}
        <div className="action-row">
          <button className="btn btn-lg btn-primary w-full">
            {" "}
            <div className="icon-download"></div> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetails;
