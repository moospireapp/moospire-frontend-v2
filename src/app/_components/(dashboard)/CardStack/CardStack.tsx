import React from "react";
import "./CardStack.scss";

const CardStack = () => {
  return (
    <div className="card-stack">
      <div className="stack stack-one z-20 bg-orange-50"></div>
      <div className="stack stack-two z-10 bg-orange-200"></div>
      <div className="stack stack-three bg-orange-500"></div>
    </div>
  );
};

export default CardStack;
