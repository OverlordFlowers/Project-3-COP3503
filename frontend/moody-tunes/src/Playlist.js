import React from "react";

function Playlist(props) {
  const playlistData = props.data;

  // We need to create a song card for each item in the playlist
  const songComponents = playlistData.map((song, index) => (
    <div
      key={index}
      data-num={index}
      className="row mb-4 playlist-row"
      onClick={(event) => {
        props.changeSong(event.target.dataset.num);
      }}
    >
      <div key={index * 200 + 200} className="col">
        <img
          data-num={index}
          style={{
            width: "90px",
            justifyContent: "center",
            display: "flex",
            position: "relative",
            boxShadow: "0 0 35px -2px rgba(0, 0, 0, 0.4)",
          }}
          src={song.image}
          alt="Albumn art"
        />
      </div>
      <div
        key={index * 300 + 300}
        data-num={index}
        className="col playlist-text"
      >
        {song.song}
      </div>
      <div
        key={index * 400 + 400}
        data-num={index}
        className="col playlist-text"
      >
        {song.albumn}
      </div>
      <div
        key={index * 500 + 500}
        data-num={index}
        className="col playlist-text"
      >
        {song.artist}
      </div>
    </div>
  ));

  return (
    <div>
      <div className="header-text">Playlist</div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "0px -20px",
        }}
      >
        <div className="content-card">
          <div className="row">
            <div className="col playlist-text"></div>
            <div className="col playlist-text">Song</div>
            <div className="col playlist-text">Album</div>
            <div className="col playlist-text">Artist</div>
          </div>
          <div className="content-text">{songComponents}</div>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
