import React from "react";
import { Navbar } from "react-bootstrap";
import "./Navbar.css"

function Footer() {
  return (
    <Navbar
      className="navbar navbar-custom pt-3 pb-3 pr-4 pl-4 mt-5"
      style={{
        position: "static",
        width: "100%",
        bottom: "0px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div style={{ flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontWeight: "bold" }}>Contact Us</div>
            <a
              href="mailto:moody@tunes.com"
              style={{ padding: "0px" }}
              className="router-link"
            >
              moody@tunes.com
            </a>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "30px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div style={{ marginRight: "20px" }}>© 2020 Moody Tunes</div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default Footer;
