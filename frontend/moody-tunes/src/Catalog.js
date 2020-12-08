import React from "react";

// a card that displays catalog info
function Catalog() {
  return (
    <div>
      <div className="header-text" style={{ marginTop: "40px" }}>
        Music Catalog Provided By:
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "0px -20px",
        }}
      >
        <div className="spotify-card">
          <span
            style={{
              width: "100%",
            }}
          >
            <img
              src={
                "https://developer.spotify.com/assets/branding-guidelines/logo@2x.png"
              }
              alt="Spotify Logo"
            />
            ;
          </span>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
