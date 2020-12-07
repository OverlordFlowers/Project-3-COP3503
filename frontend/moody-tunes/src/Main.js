import React from "react";
import Banner from "./Banner";
import Footer from "./Footer";


function Main(props) {
  return (
    <div className="large-container">
      <Banner />
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
          <div className="content-text">
            Listed Songs Here
          </div>
        </div>
      </div>
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
              width: "100%"
            }}
          >
            <img src={"https://developer.spotify.com/assets/branding-guidelines/logo@2x.png"} alt="Spotify Logo" />;
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
