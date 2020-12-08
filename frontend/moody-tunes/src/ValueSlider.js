import React, { useState } from "react";
import "./slider.css";

function ValueSlider(props) {
  const [value, setValue] = useState();

  let minValue = 0;
  let maxValue = 2500;
  let stepValue = 1;

  if (props.emotion === "Happiness") {
    minValue = 0;
    maxValue = 2500;
  } else if (props.emotion === "Sadness") {
    minValue = 0;
    maxValue = 5000;
  } else if (props.emotion === "Excited") {
    minValue = 1;
    maxValue = 2;
    stepValue = 0.01;
  }

  return (
    <div className="emotion-slider">
      <label htmlFor="customRange">{props.emotion}</label>
      <input
        type="range"
        className="custom-range"
        min={minValue}
        max={maxValue}
        step={stepValue}
        id="customRange"
        value={value}
        onChange={(event) => {
          setValue(value);
          event.target.name = props.emotion;
          props.handleChange(event);
        }}
      />
    </div>
  );
}

export default ValueSlider;
