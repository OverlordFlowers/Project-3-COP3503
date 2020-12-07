import React from "react";
import "./slider.css"

function ValueSlider(props) {
  return (
    <div className="emotion-slider">
        <label htmlFor="customRange1">{props.emotion}</label>
        <input type="range" className="custom-range" id="customRange1" />
    </div>
  );
}

export default ValueSlider;
