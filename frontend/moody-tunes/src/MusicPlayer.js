import React from "react";

// a music player to display the current song picked
function MusicPlayer(props) {
  return (
    <div className="music-info">
      <h1>Music Player</h1>
      <div className="col music-canvas">
        <div className="row pt-4">
          <img
            style={{
              width: "45%",
              height: "45%",
              justifyContent: "center",
              display: "flex",
              position: "relative",
              boxShadow: "0 0 35px -2px rgba(0, 0, 0, 0.4)",
            }}
            src={props.image}
            alt="Albumn art"
          />
        </div>
        <div className="row music-text-prompt">
          <div className="col">
            <div
              style={{ display: "block", fontSize: "29px", fontWeight: "600" }}
              className="row"
            >
              {props.song}
            </div>
            <div
              style={{ display: "block", fontSize: "22px", fontWeight: "400" }}
              className="row"
            >
              {props.albumn}
            </div>
            <div
              style={{ display: "block", fontSize: "20px", fontWeight: "400" }}
              className="row"
            >
              {props.artist}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <button
          className="btn btn-main col"
          onClick={() => props.changeSong(Number(props.songIndex) - 1)}
        >
          Previous
        </button>
        <button
          className="btn btn-main col"
          onClick={() => props.changeSong(Number(props.songIndex) + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
