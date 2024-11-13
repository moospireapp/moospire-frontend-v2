"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const GoBackBtn = () => {
  const router = useRouter();

  const goBack = () => router.back();

  return (
    <div
      onClick={goBack}
      className="flex justify-start items-center gap-x-2 w-max group mb-8 cursor-pointer"
    >
      <div className="size-8 min-w-8 min-h-8 rounded-full flex justify-center items-center bg-grey-100/50 group-hover:bg-orange-50 transition duration-300 ease-in-out">
        <ArrowLeftIcon className="size-5 font-medium text-grey-500 group-hover:text-orange-500 transition duration-300 ease-in-out" />
      </div>

      <div className="text text-grey-400 text-[14.5px] font-medium group-hover:text-orange-400 transition duration-300 ease-in-out">
        Go back
      </div>
    </div>
  );
};

export default GoBackBtn;
