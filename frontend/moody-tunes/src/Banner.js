import React, { useEffect } from "react";
import MusicPlayer from "./MusicPlayer";
import ValueSlider from "./ValueSlider";

function Banner(props) {
  // Pass in spotify ID num
  const emotionList = ["Happiness", "Sadness", "Excited"];

  useEffect(() => {
    const valueObject = { Happiness: 0, Sadness: 0, Excited: 0 };
    props.setValueList(valueObject);
  }, []);

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
            <div style={{ padding: "100px" }} className="row">
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
            <div></div>
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
