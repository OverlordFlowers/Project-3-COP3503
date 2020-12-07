import React from "react";
import ValueSlider from "./ValueSlider"

function Banner() {
  return (
    <div>
      <div className="home-div">
        <div className="banner-container">
          <div className="text-container">
            <div className="primary-text">Moody Tunes</div>
            < ValueSlider emotion="Happiness"/>
            < ValueSlider emotion="Sadness"/>
            < ValueSlider emotion="Excited"/>
          </div>
          <div style={{ display: "flex", flex: "1 1 50%" }}>
            <div className="music-info">
              <h1>Music Player</h1>
              <div className="music-text">
                <div className="music-text-prompt">
                  
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="music-button">Previous</div>
                </div>
                <div className="col">
                <div className="music-button">Next</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-div-end"></div>
    </div>
  );
}

export default Banner;
