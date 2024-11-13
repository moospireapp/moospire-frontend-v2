"use client";

import React, { useState } from "react";
import { InspirationCard } from "@/app/_components";
import {
  FrameOne,
  FrameTwo,
  FrameThree,
  FrameFour,
  FrameFive,
  FrameSix,
  FrameSeven,
  FrameEight,
} from "@/app/_assets";
import "./InspirationDisplayBoard.scss";

const InspirationDisplayBoard = () => {
  const [boardData, _setBoardData] = useState<any[]>([
    {
      id: 1,
      image: FrameOne,
      alt: "Frame One",
    },
    {
      id: 2,
      image: FrameTwo,
      alt: "Frame Two",
    },
    {
      id: 3,
      image: FrameThree,
      alt: "Frame Three",
    },
    {
      id: 4,
      image: FrameFour,
      alt: "Frame Four",
    },
    {
      id: 5,
      image: FrameFive,
      alt: "Frame Five",
    },
    {
      id: 6,
      image: FrameSix,
      alt: "Frame Six",
    },
    {
      id: 7,
      image: FrameSeven,
      alt: "Frame Seven",
    },
    {
      id: 8,
      image: FrameEight,
      alt: "Frame Eight",
    },
  ]);

  return (
    <div className="inspiration-display-board">
      {boardData.map((item: string, index: number) => (
        <InspirationCard key={index} boardItem={item} />
      ))}
    </div>
  );
};

export default InspirationDisplayBoard;
