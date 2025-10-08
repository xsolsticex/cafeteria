import { useState } from "react";

function Progress({ value,maxValue,color }) {

  const progressPercent = Math.min((value / maxValue) * 100, 100);
  return (
    <div className="containerBar m-5">
      <div
        className="progress position-fixed w-100"
        style={{ bottom: 0, left: 0, right: 0, zIndex: 10, height: 30 }}
      >
        <div
          className="progress-bar progress-bar-striped"
          role="progressbar"
          style={{ width: `${progressPercent}%`, height: 30,backgroundColor:color}}
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax={maxValue}
        ></div>
      </div>
    </div>
  );
}

export default Progress;
