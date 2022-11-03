import React from "react";

const Loading = () => {
  return (
    <div
      className="loading d-flex flex-column justify-content-center align-items-center "
      style={{ width: "100wv", height: "100vh" }}
    >
      <div
        style={{ color: "#DFF6FF", fontSize: "16px" }}
        className="spinner-border "
        role="status"
      ></div>
      <div className="mt-3">
        <span style={{ color: "#DFF6FF", fontSize: "16px" }}>Loading...</span>
      </div>
    </div>
  );
};
export default Loading;
