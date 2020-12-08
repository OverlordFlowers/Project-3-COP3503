import React, { useState } from "react";
import "./slider.css";

function ValueSlider(props) {
  const [value, setValue] = useState(props.valueList[props.emotion]);

  return (
    <div className="emotion-slider">
      <label htmlFor="customRange">{props.emotion}</label>
      <input
        type="range"
        className="custom-range"
        min="0"
        max="100"
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
