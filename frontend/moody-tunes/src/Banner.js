import React from "react";

function Banner() {
  return (
    <div>
      <div className="home-div">
        <div className="banner-container">
          <div className="text-container">
            <div className="primary-text">YANTRA</div>
            <div className="secondary-text">Fostering Formative Learning</div>
          </div>
          <div style={{ display: "flex", flex: "1 1 50%" }}>
            <div className="demo-quiz">
              <h1>Question 16</h1>
              <div className="demo-question">
                <div className="demo-question-prompt">
                  What is the output of the following code:
                  <div className="demo-code-block">
                    <div
                      style={{ width: "15%" }}
                      className="demo-code-line"
                    ></div>
                    <div
                      style={{ width: "18%", marginLeft: "5%" }}
                      className="demo-code-line"
                    ></div>
                    <div
                      style={{ width: "24%", marginLeft: "10%" }}
                      className="demo-code-line"
                    ></div>
                    <div
                      style={{ width: "22%", marginLeft: "10%" }}
                      className="demo-code-line"
                    ></div>
                    <div
                      style={{ width: "27%", marginLeft: "10%" }}
                      className="demo-code-line"
                    ></div>
                    <div
                      style={{ width: "10%", marginLeft: "5%" }}
                      className="demo-code-line"
                    ></div>
                    <div
                      style={{ width: "10%" }}
                      className="demo-code-line"
                    ></div>
                  </div>
                  <div className="demo-line">
                    <div className="demo-form"></div>
                    <div className="demo-check">Check</div>
                  </div>
                </div>
              </div>
              <div className="demo-button">Next</div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-div-end"></div>
    </div>
  );
}

export default Banner;
