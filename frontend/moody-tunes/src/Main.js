import React from "react";
import { Button } from "react-bootstrap";
import Banner from "./Banner";
import Footer from "./Footer";


function Main(props) {
  return (
    <div className="large-container">
      <Banner />
      <div className="header-text">Temp Title</div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "0px -20px",
        }}
      >
        <div className="content-card">
          <span
            style={{
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "0px",
            }}
          >
            Temp Title
          </span>
          <div className="content-text">
          temp values
          </div>
        </div>
        <div className="content-card">
          <span
            style={{
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "0px",
            }}
          >
            Temp Title
          </span>
          <div className="content-text">
          temp values
          </div>
        </div>
        <div className="content-card">
          <span
            style={{
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "0px",
            }}
          >
            Temp Title
          </span>
          <div className="content-text">
          temp values
          </div>
        </div>
      </div>
      <div className="header-text" style={{ marginTop: "40px" }}>
        Interested?
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "0px -20px",
        }}
      >
        <div className="learn-card">
          <span
            style={{
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "0px",
            }}
          >
            Temp Title
          </span>
          <div className="content-text">
          temp values
          </div>
          <div
            style={{
              display: "block",
              position: "absolute",
              bottom: "30px",
              width: `calc(100% - 75px)`,
            }}
          >
            <Button
              className="btn btn-main"
              style={{ margin: "0 auto" }}
              onClick={() => {
                props.history.push(`/student`);
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="learn-card">
          <span
            style={{
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "0px",
            }}
          >
            Temp Title
          </span>
          <div className="content-text">
          temp values 
          </div>
          <div
            style={{
              display: "block",
              position: "absolute",
              bottom: "30px",
              width: `calc(100% - 75px)`,
            }}
          >
            <Button
              className="btn btn-main"
              style={{ margin: "0 auto" }}
              onClick={() => {
                props.history.push(`/instructor`);
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
