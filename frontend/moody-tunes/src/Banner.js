import React from "react";
import MusicPlayer from "./MusicPlayer";
import ValueSlider from "./ValueSlider";

function Banner(props) {
  // Pass in spotify ID num
  const emotionList = ["Happiness", "Sadness", "Excited"];

  // we need to make a slider for each emotion in the list
  const sliderComponents = emotionList.map((emotion, index) => (
    <ValueSlider
      key={index}
      id={index}
      valueList={props.valueList}
      emotion={emotion}
      handleChange={(event) => props.setSlideValue(event)}
    />
  ));

  return (
    <div>
      <div className="home-div">
        <div className="banner-container">
          <div className="text-container">
            <div className="primary-text">Moody Tunes</div>
            {sliderComponents}
            <div
              style={{ padding: "100px", paddingBottom: "40px" }}
              className="row"
            >
              <button
                className="btn btn-main col"
                onClick={() => props.searchButton(1)}
              >
                BTS Search
              </button>
              <button
                className="btn btn-main col"
                onClick={() => props.searchButton(0)}
              >
                DFS Search
              </button>
            </div>
            {props.time !== null ? (
              <div style={{ color: "var(--primary-gray)", fontSize: "20px" }}>
                Time taken: {props.time}ms
              </div>
            ) : null}
          </div>
          <div style={{ display: "flex", flex: "1 1 50%" }}>
            {props.curentSong !== undefined ? (
              <MusicPlayer
                image={props.curentSong.image}
                song={props.curentSong.song}
                albumn={props.curentSong.albumn}
                artist={props.curentSong.artist}
                changeSong={props.changeSong}
                songIndex={props.songIndex}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className="home-div-end"></div>
    </div>
  );
}

export default Banner;
