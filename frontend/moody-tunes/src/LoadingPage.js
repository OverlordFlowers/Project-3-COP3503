import React from "react";
import { Spinner } from "react-bootstrap";

function LoadingPage() {
  return (
    <div className="loading-container">
      <Spinner className="loader" animation="border" />
    </div>
  );
}

export default LoadingPage;
